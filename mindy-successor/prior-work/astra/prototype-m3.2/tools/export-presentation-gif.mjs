import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname,isAbsolute,relative,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

export const EXPORTER_DEPENDENCIES=Object.freeze({
  sharp:'0.35.4',
  gifenc:'1.0.3'
});

const DEFAULT_WIDTH=640;
const DEFAULT_HEIGHT=360;
const DEFAULT_PALETTE=256;
const DEFAULT_LOOP=0;

function fail(message){
  throw new Error(message);
}

function parseInteger(name,value,{min,max,allowMinusOne=false}){
  const parsed=Number(value);
  if(!Number.isInteger(parsed))fail(name+' must be an integer');
  if(allowMinusOne&&parsed===-1)return parsed;
  if(parsed<min||parsed>max)fail(name+' must be between '+min+' and '+max);
  return parsed;
}

function assertLocalPath(value,{label,prefix,extension}){
  if(typeof value!=='string'||value.trim()==='')fail(label+' must be a non-empty path');
  if(isAbsolute(value))fail(label+' must be repository-relative');
  if(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)||value.startsWith('//'))fail(label+' must not use a URL/scheme');
  if(value.includes('\\'))fail(label+' must use forward slashes');
  const parts=value.split('/');
  if(parts.some(part=>part===''||part==='.'||part==='..'))fail(label+' contains invalid path traversal');
  if(prefix&&!value.startsWith(prefix))fail(label+' must stay under '+prefix);
  if(extension&&!value.toLowerCase().endsWith(extension.toLowerCase()))fail(label+' must end with '+extension);
  return value;
}

function resolveInside(rootDir,repoRelative,label){
  const root=resolve(rootDir);
  const absolute=resolve(root,repoRelative);
  const rel=relative(root,absolute);
  if(rel===''||(!rel.startsWith('..'+sep)&&rel!=='..'&&!isAbsolute(rel)))return absolute;
  fail(label+' escapes repository root');
}

async function readJson(file,label){
  let raw;
  try{raw=await readFile(file,'utf8');}
  catch(error){fail(label+' cannot be read: '+error.message);}
  try{return JSON.parse(raw);}
  catch(error){fail(label+' is invalid JSON: '+error.message);}
}

export function parseArgs(argv){
  const args={
    manifest:null,
    presentationId:null,
    sequence:null,
    output:null,
    width:DEFAULT_WIDTH,
    height:DEFAULT_HEIGHT,
    frameDurationMs:null,
    loopCount:DEFAULT_LOOP,
    palette:DEFAULT_PALETTE,
    dryRun:false
  };

  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    if(token==='--dry-run'){args.dryRun=true;continue;}
    const next=()=>{
      if(i+1>=argv.length)fail(token+' requires a value');
      i+=1;
      return argv[i];
    };

    if(token==='--manifest')args.manifest=next();
    else if(token==='--presentation-id')args.presentationId=next();
    else if(token==='--sequence')args.sequence=next();
    else if(token==='--output')args.output=next();
    else if(token==='--width')args.width=parseInteger('--width',next(),{min:64,max:1920});
    else if(token==='--height')args.height=parseInteger('--height',next(),{min:64,max:1080});
    else if(token==='--frame-duration-ms')args.frameDurationMs=parseInteger('--frame-duration-ms',next(),{min:20,max:5000});
    else if(token==='--loop-count')args.loopCount=parseInteger('--loop-count',next(),{min:0,max:65535,allowMinusOne:true});
    else if(token==='--palette')args.palette=parseInteger('--palette',next(),{min:2,max:256});
    else fail('unknown argument: '+token);
  }

  if(!args.manifest)fail('--manifest is required');
  if(!args.presentationId)fail('--presentation-id is required');
  if(!args.sequence)fail('--sequence is required');
  if(!args.output)fail('--output is required');

  assertLocalPath(args.manifest,{label:'manifest path',prefix:'content/presentation-drafts/',extension:'.json'});
  assertLocalPath(args.output,{label:'output path',prefix:'assets/gif/',extension:'.gif'});
  if(args.frameDurationMs!==null&&args.frameDurationMs%10!==0){
    fail('--frame-duration-ms must be divisible by 10 for exact GIF centisecond timing');
  }
  return args;
}

function normalizeManifestSequences(manifest){
  if(Array.isArray(manifest?.sequences))return manifest.sequences;
  if(Array.isArray(manifest?.candidates)){
    return manifest.candidates.map(candidate=>({
      presentationId:manifest.presentationId,
      sequenceKey:candidate.sourceSequenceKey,
      candidateKey:candidate.candidateKey,
      frames:candidate.sourceFrames,
      normalizedFrameDelayMs:candidate.normalizedFrameDelayMs??candidate.targetTiming?.normalizedFrameDelayMs,
      normalizedExportLoopDurationMs:candidate.normalizedExportLoopDurationMs??candidate.targetTiming?.normalizedExportLoopDurationMs,
      staticFallback:manifest.staticFallback,
      gifPath:candidate.gifPath??null
    }));
  }
  fail('manifest must contain sequences[] or candidates[]');
}

function validateSequence(sequence){
  if(!sequence||typeof sequence!=='object')fail('sequence record must be an object');
  if(typeof sequence.presentationId!=='string')fail('sequence presentationId is required');
  if(typeof sequence.sequenceKey!=='string')fail('sequence sequenceKey is required');
  if(typeof sequence.candidateKey!=='string'||!/^[a-z0-9][a-z0-9._-]*$/.test(sequence.candidateKey)){
    fail('sequence candidateKey must be stable lowercase [a-z0-9._-]');
  }
  if(!Array.isArray(sequence.frames)||sequence.frames.length<3||sequence.frames.length>8){
    fail('sequence must contain 3..8 ordered frames');
  }
  if(typeof sequence.staticFallback!=='string')fail('sequence staticFallback is required');
  if(sequence.gifPath!==null&&sequence.gifPath!==undefined)fail('source sequence already claims gifPath');
}

async function validateFrame({rootDir,file,sequence,index}){
  assertLocalPath(file,{label:'frame path',prefix:'assets/presentation-frames/',extension:'.svg'});
  const absolute=resolveInside(rootDir,file,'frame path');
  if(!existsSync(absolute))fail('frame does not exist: '+file);

  const svg=await readFile(absolute,'utf8');
  if(!/^\s*<svg\b/i.test(svg)||!/<\/svg>\s*$/i.test(svg))fail('frame is not valid SVG text: '+file);
  if(/<script\b/i.test(svg))fail('frame contains forbidden script: '+file);
  if(/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i.test(svg))fail('frame contains forbidden remote/embedded resource: '+file);
  if(!svg.includes('data-presentation-id="'+sequence.presentationId+'"'))fail('frame presentationId mismatch: '+file);
  if(!svg.includes('data-sequence-id="'+sequence.sequenceKey+'"'))fail('frame sequenceKey mismatch: '+file);
  if(!svg.includes('data-frame-index="'+(index+1)+'"'))fail('frame index mismatch: '+file);
  return svg;
}

export async function resolvePlan(args,{rootDir=process.cwd()}={}){
  const manifestAbsolute=resolveInside(rootDir,args.manifest,'manifest path');
  const manifest=await readJson(manifestAbsolute,'manifest');
  const sequences=normalizeManifestSequences(manifest);

  const matchingPresentation=sequences.filter(sequence=>sequence.presentationId===args.presentationId);
  if(matchingPresentation.length===0)fail('unknown presentationId: '+args.presentationId);

  const sequence=matchingPresentation.find(sequence=>sequence.sequenceKey===args.sequence);
  if(!sequence)fail('sequence '+args.sequence+' is not owned by presentationId '+args.presentationId);
  validateSequence(sequence);

  assertLocalPath(sequence.staticFallback,{label:'static fallback',prefix:'assets/',extension:'.svg'});
  const fallbackAbsolute=resolveInside(rootDir,sequence.staticFallback,'static fallback');
  if(!existsSync(fallbackAbsolute))fail('static fallback does not exist: '+sequence.staticFallback);

  const frameSvgs=[];
  for(let index=0;index<sequence.frames.length;index++){
    frameSvgs.push(await validateFrame({rootDir,file:sequence.frames[index],sequence,index}));
  }

  const frameDurationMs=args.frameDurationMs??sequence.normalizedFrameDelayMs;
  if(!Number.isInteger(frameDurationMs)||frameDurationMs<20||frameDurationMs>5000||frameDurationMs%10!==0){
    fail('resolved frame duration must be 20..5000 ms and divisible by 10');
  }

  const output=args.output;
  resolveInside(rootDir,output,'output path');

  return {
    manifest:args.manifest,
    presentationId:sequence.presentationId,
    sequenceKey:sequence.sequenceKey,
    candidateKey:sequence.candidateKey,
    frames:[...sequence.frames],
    staticFallback:sequence.staticFallback,
    output,
    width:args.width,
    height:args.height,
    frameDurationMs,
    totalDurationMs:frameDurationMs*sequence.frames.length,
    loopCount:args.loopCount,
    palette:args.palette,
    dryRun:Boolean(args.dryRun),
    _frameSvgs:frameSvgs
  };
}

export function publicPlan(plan){
  const {_frameSvgs,...clean}=plan;
  return clean;
}

async function loadDependencies(){
  try{
    const [{default:sharp},gifenc]=await Promise.all([import('sharp'),import('gifenc')]);
    const {GIFEncoder,quantize,applyPalette}=gifenc;
    if(typeof sharp!=='function'||typeof GIFEncoder!=='function'||typeof quantize!=='function'||typeof applyPalette!=='function'){
      fail('exporter dependency API mismatch');
    }
    return {sharp,GIFEncoder,quantize,applyPalette};
  }catch(error){
    fail(
      'real export requires Lead-approved devDependencies sharp@'+
      EXPORTER_DEPENDENCIES.sharp+' and gifenc@'+EXPORTER_DEPENDENCIES.gifenc+
      ': '+error.message
    );
  }
}

export async function exportPlan(plan,{rootDir=process.cwd()}={}){
  const {sharp,GIFEncoder,quantize,applyPalette}=await loadDependencies();
  const rgbaFrames=[];

  for(const svg of plan._frameSvgs){
    const rgba=await sharp(Buffer.from(svg,'utf8'),{failOn:'error'})
      .resize(plan.width,plan.height,{fit:'fill'})
      .ensureAlpha()
      .toColourspace('srgb')
      .raw()
      .toBuffer();
    const expected=plan.width*plan.height*4;
    if(rgba.length!==expected)fail('rasterized RGBA length mismatch');
    rgbaFrames.push(rgba);
  }

  // One ordered global palette removes per-frame palette choice as a source of nondeterminism.
  const orderedPixels=Buffer.concat(rgbaFrames);
  const palette=quantize(orderedPixels,plan.palette,{format:'rgb565'});
  const gif=GIFEncoder();

  rgbaFrames.forEach((rgba,index)=>{
    const indexed=applyPalette(rgba,palette,'rgb565');
    const options={delay:plan.frameDurationMs};
    if(index===0){
      options.palette=palette;
      options.repeat=plan.loopCount;
    }
    gif.writeFrame(indexed,plan.width,plan.height,options);
  });

  gif.finish();
  const bytes=Buffer.from(gif.bytes());
  const outputAbsolute=resolveInside(rootDir,plan.output,'output path');
  await mkdir(dirname(outputAbsolute),{recursive:true});
  await writeFile(outputAbsolute,bytes);

  return {
    ...publicPlan(plan),
    dryRun:false,
    frameCount:rgbaFrames.length,
    byteSize:bytes.length,
    sha256:createHash('sha256').update(bytes).digest('hex')
  };
}

export async function run(argv=process.argv.slice(2),{rootDir=process.cwd()}={}){
  const args=parseArgs(argv);
  const plan=await resolvePlan(args,{rootDir});
  if(args.dryRun)return publicPlan(plan);
  return exportPlan(plan,{rootDir});
}

async function main(){
  try{
    const result=await run();
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
  }catch(error){
    process.stderr.write('presentation GIF exporter error: '+error.message+'\n');
    process.exitCode=1;
  }
}

const invoked=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invoked===import.meta.url)await main();
