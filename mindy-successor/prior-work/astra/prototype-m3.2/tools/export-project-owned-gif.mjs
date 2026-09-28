import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname,isAbsolute,relative,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_MANIFEST='content/presentation-drafts/project-owned-animation-source-manifest-v3.json';
const DEFAULT_WIDTH=640;
const DEFAULT_HEIGHT=360;
const DEFAULT_PALETTE=256;
const DEFAULT_LOOP=0;

function fail(message){
  throw new Error(message);
}

function intValue(name,value,{min,max,allowMinusOne=false}){
  if(value===undefined||value===null||value==='')fail(name+' requires a value');
  const parsed=Number(value);
  if(!Number.isInteger(parsed))fail(name+' must be an integer');
  if(allowMinusOne&&parsed===-1)return parsed;
  if(parsed<min||parsed>max)fail(name+' must be between '+min+' and '+max);
  return parsed;
}

function rejectUrlOrAbsolute(value,label){
  if(typeof value!=='string'||value.trim()==='')fail(label+' must be a non-empty path');
  if(isAbsolute(value))fail(label+' must be repository-relative');
  if(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)||value.startsWith('//'))fail(label+' must not be a URL/scheme path');
  if(value.includes('\\'))fail(label+' must use repository forward-slash paths');
}

export function assertLocalRepoPath(value,{label='path',prefix,extension}={}){
  rejectUrlOrAbsolute(value,label);
  const parts=value.split('/');
  if(parts.some(part=>part===''||part==='.'||part==='..'))fail(label+' contains invalid traversal/path segments');
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

export function parseCliArgs(argv){
  const args={
    manifest:DEFAULT_MANIFEST,
    presentationId:null,
    sequence:null,
    output:null,
    width:DEFAULT_WIDTH,
    height:DEFAULT_HEIGHT,
    delayMs:null,
    palette:DEFAULT_PALETTE,
    loop:DEFAULT_LOOP,
    dryRun:false
  };

  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    if(token==='--dry-run'){args.dryRun=true;continue;}
    const next=()=> {
      if(i+1>=argv.length)fail(token+' requires a value');
      i++;
      return argv[i];
    };
    if(token==='--manifest')args.manifest=next();
    else if(token==='--presentation-id')args.presentationId=next();
    else if(token==='--sequence')args.sequence=next();
    else if(token==='--output')args.output=next();
    else if(token==='--width')args.width=intValue('--width',next(),{min:64,max:1920});
    else if(token==='--height')args.height=intValue('--height',next(),{min:64,max:1080});
    else if(token==='--delay-ms')args.delayMs=intValue('--delay-ms',next(),{min:20,max:5000});
    else if(token==='--palette')args.palette=intValue('--palette',next(),{min:2,max:256});
    else if(token==='--loop')args.loop=intValue('--loop',next(),{min:0,max:65535,allowMinusOne:true});
    else fail('unknown argument: '+token);
  }

  if(!args.presentationId)fail('--presentation-id is required');
  if(!args.sequence)fail('--sequence is required');
  if(args.delayMs!==null&&args.delayMs%10!==0)fail('--delay-ms must be divisible by 10 ms for GIF centisecond timing');
  return args;
}

export function defaultOutputPath(candidateKey){
  if(typeof candidateKey!=='string'||!/^[a-z0-9][a-z0-9._-]*$/.test(candidateKey)){
    fail('candidateKey must be stable lowercase [a-z0-9._-]');
  }
  return 'assets/gif/project-owned/'+candidateKey+'.gif';
}

async function readJson(path,label){
  let raw;
  try{raw=await readFile(path,'utf8');}catch(error){fail(label+' cannot be read: '+error.message);}
  try{return JSON.parse(raw);}catch(error){fail(label+' is invalid JSON: '+error.message);}
}

function validateManifestShape(manifest){
  if(!manifest||typeof manifest!=='object')fail('manifest must be an object');
  if(!Array.isArray(manifest.sequences))fail('manifest.sequences must be an array');
}

function validateSequenceMetadata(sequence){
  if(!sequence||typeof sequence!=='object')fail('sequence record must be an object');
  if(typeof sequence.sequenceKey!=='string')fail('sequenceKey is required');
  if(typeof sequence.presentationId!=='string')fail('presentationId is required in sequence');
  if(typeof sequence.candidateKey!=='string')fail('candidateKey is required in sequence');
  if(!Array.isArray(sequence.frames)||sequence.frames.length<3||sequence.frames.length>8)fail('sequence must contain 3..8 ordered frames');
  if(!Number.isInteger(sequence.normalizedFrameDelayMs)||sequence.normalizedFrameDelayMs<20||sequence.normalizedFrameDelayMs>5000||sequence.normalizedFrameDelayMs%10!==0){
    fail('sequence normalizedFrameDelayMs must be a 20..5000 ms integer divisible by 10');
  }
  if(typeof sequence.staticFallback!=='string')fail('sequence staticFallback is required');
}

async function validateSvgFrame({rootDir,framePath,sequence,index}){
  assertLocalRepoPath(framePath,{label:'frame path',prefix:'assets/presentation-frames/',extension:'.svg'});
  const absolute=resolveInside(rootDir,framePath,'frame path');
  if(!existsSync(absolute))fail('frame does not exist: '+framePath);
  const svg=await readFile(absolute,'utf8');
  if(!/^\s*<svg\b/i.test(svg)||!/<\/svg>\s*$/i.test(svg))fail('frame is not valid SVG text: '+framePath);
  if(/<script\b/i.test(svg))fail('frame contains forbidden script: '+framePath);
  if(/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i.test(svg))fail('frame contains forbidden external/embedded resource: '+framePath);
  if(!svg.includes('data-presentation-id="'+sequence.presentationId+'"'))fail('frame presentationId metadata mismatch: '+framePath);
  if(!svg.includes('data-sequence-id="'+sequence.sequenceKey+'"'))fail('frame sequence metadata mismatch: '+framePath);
  if(!svg.includes('data-frame-index="'+(index+1)+'"'))fail('frame index metadata mismatch: '+framePath);
  return {absolute,svg};
}

export async function resolveExportPlan(args,{rootDir=process.cwd()}={}){
  assertLocalRepoPath(args.manifest,{label:'manifest path',prefix:'content/presentation-drafts/',extension:'.json'});
  const manifestPath=resolveInside(rootDir,args.manifest,'manifest path');
  const manifest=await readJson(manifestPath,'manifest');
  validateManifestShape(manifest);

  const sameId=manifest.sequences.filter(sequence=>sequence.presentationId===args.presentationId);
  if(sameId.length===0)fail('unknown presentationId: '+args.presentationId);

  const sequence=sameId.find(record=>record.sequenceKey===args.sequence);
  if(!sequence)fail('sequence '+args.sequence+' is not owned by presentationId '+args.presentationId);
  validateSequenceMetadata(sequence);

  if(sequence.exportReady===false)fail('sequence is not marked exportReady: '+sequence.sequenceKey);
  if(sequence.gifPath!==null&&sequence.gifPath!==undefined)fail('source manifest already claims a GIF path for '+sequence.sequenceKey);

  assertLocalRepoPath(sequence.staticFallback,{label:'static fallback',prefix:'assets/',extension:'.svg'});
  const fallbackAbsolute=resolveInside(rootDir,sequence.staticFallback,'static fallback');
  if(!existsSync(fallbackAbsolute))fail('static fallback does not exist: '+sequence.staticFallback);

  const frameRecords=[];
  for(let index=0;index<sequence.frames.length;index++){
    frameRecords.push(await validateSvgFrame({rootDir,framePath:sequence.frames[index],sequence,index}));
  }

  const output=args.output??defaultOutputPath(sequence.candidateKey);
  assertLocalRepoPath(output,{label:'output path',prefix:'assets/gif/',extension:'.gif'});
  resolveInside(rootDir,output,'output path');

  const delayMs=args.delayMs??sequence.normalizedFrameDelayMs;
  if(!Number.isInteger(delayMs)||delayMs<20||delayMs>5000||delayMs%10!==0)fail('resolved frame delay must be 20..5000 ms and divisible by 10');

  const width=intValue('width',args.width,{min:64,max:1920});
  const height=intValue('height',args.height,{min:64,max:1080});
  const palette=intValue('palette',args.palette,{min:2,max:256});
  const loop=intValue('loop',args.loop,{min:0,max:65535,allowMinusOne:true});

  return {
    manifest:args.manifest,
    presentationId:sequence.presentationId,
    sequenceKey:sequence.sequenceKey,
    candidateKey:sequence.candidateKey,
    frames:[...sequence.frames],
    sourceLoopDurationMs:sequence.sourceLoopDurationMs??null,
    normalizedExportLoopDurationMs:sequence.normalizedExportLoopDurationMs??delayMs*sequence.frames.length,
    frameDelayMs:delayMs,
    width,
    height,
    palette,
    loop,
    output,
    staticFallback:sequence.staticFallback,
    dryRun:Boolean(args.dryRun),
    _frameRecords:frameRecords
  };
}

export function publicPlan(plan){
  const {_frameRecords,...clean}=plan;
  return clean;
}

async function loadExporterDependencies(){
  try{
    const [{default:sharp},gifenc]=await Promise.all([import('sharp'),import('gifenc')]);
    const {GIFEncoder,quantize,applyPalette}=gifenc;
    if(typeof sharp!=='function'||typeof GIFEncoder!=='function'||typeof quantize!=='function'||typeof applyPalette!=='function'){
      fail('approved exporter dependencies do not expose the expected API');
    }
    return {sharp,GIFEncoder,quantize,applyPalette};
  }catch(error){
    fail('GIF exporter dependencies are not installed/usable; Lead must approve exact devDependencies sharp@0.35.4 and gifenc@1.0.3 before real export: '+error.message);
  }
}

export async function exportGif(plan,{rootDir=process.cwd()}={}){
  const {sharp,GIFEncoder,quantize,applyPalette}=await loadExporterDependencies();
  const rgbaFrames=[];

  for(const record of plan._frameRecords){
    const svgBuffer=Buffer.from(record.svg,'utf8');
    const rgba=await sharp(svgBuffer,{failOn:'error'})
      .resize(plan.width,plan.height,{fit:'fill'})
      .ensureAlpha()
      .raw()
      .toBuffer();

    const expected=plan.width*plan.height*4;
    if(rgba.length!==expected)fail('rasterized frame byte length mismatch');
    rgbaFrames.push(rgba);
  }

  const allPixels=Buffer.concat(rgbaFrames);
  const palette=quantize(allPixels,plan.palette,{format:'rgb565'});
  const gif=GIFEncoder();

  rgbaFrames.forEach((rgba,index)=>{
    const indexed=applyPalette(rgba,palette,'rgb565');
    const options={delay:plan.frameDelayMs};
    if(index===0){
      options.palette=palette;
      options.repeat=plan.loop;
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
    byteSize:bytes.length,
    sha256:createHash('sha256').update(bytes).digest('hex'),
    frameCount:rgbaFrames.length
  };
}

export async function runCli(argv=process.argv.slice(2),{rootDir=process.cwd()}={}){
  const args=parseCliArgs(argv);
  const plan=await resolveExportPlan(args,{rootDir});
  if(args.dryRun)return publicPlan(plan);
  return exportGif(plan,{rootDir});
}

async function main(){
  try{
    const result=await runCli();
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
  }catch(error){
    process.stderr.write('GIF exporter error: '+error.message+'\n');
    process.exitCode=1;
  }
}

const invokedPath=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invokedPath===import.meta.url)await main();
