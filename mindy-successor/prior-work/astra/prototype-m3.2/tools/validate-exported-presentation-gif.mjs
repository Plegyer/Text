import {readFile,stat} from 'node:fs/promises';
import {isAbsolute,relative,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

export const DEFAULT_MAX_BYTES=5*1024*1024;

function fail(message){
  throw new Error(message);
}

function assertLocalGifPath(value,label){
  if(typeof value!=='string'||value.trim()==='')fail(label+' must be a non-empty path');
  if(isAbsolute(value))fail(label+' must be repository-relative');
  if(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)||value.startsWith('//'))fail(label+' must not be a URL/scheme');
  if(value.includes('\\'))fail(label+' must use forward slashes');
  const parts=value.split('/');
  if(parts.some(part=>part===''||part==='.'||part==='..'))fail(label+' contains invalid traversal/path segments');
  if(!value.startsWith('assets/gif/'))fail(label+' must stay under assets/gif/');
  if(!value.toLowerCase().endsWith('.gif'))fail(label+' must end with .gif');
  return value;
}

function resolveInside(rootDir,repoRelative,label){
  const root=resolve(rootDir);
  const absolute=resolve(root,repoRelative);
  const rel=relative(root,absolute);
  if(rel===''||(!rel.startsWith('..'+sep)&&rel!=='..'&&!isAbsolute(rel)))return absolute;
  fail(label+' escapes repository root');
}

function parseInteger(name,value,{min,max}){
  const parsed=Number(value);
  if(!Number.isInteger(parsed))fail(name+' must be an integer');
  if(parsed<min||parsed>max)fail(name+' must be between '+min+' and '+max);
  return parsed;
}

export function parseArgs(argv){
  const args={
    file:null,
    expectedPath:null,
    width:null,
    height:null,
    frameCount:null,
    frameDurationMs:null,
    loopCount:null,
    maxBytes:DEFAULT_MAX_BYTES
  };

  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    const next=()=>{
      if(i+1>=argv.length)fail(token+' requires a value');
      i+=1;
      return argv[i];
    };

    if(token==='--file')args.file=next();
    else if(token==='--expected-path')args.expectedPath=next();
    else if(token==='--width')args.width=parseInteger('--width',next(),{min:1,max:65535});
    else if(token==='--height')args.height=parseInteger('--height',next(),{min:1,max:65535});
    else if(token==='--frames')args.frameCount=parseInteger('--frames',next(),{min:1,max:1000});
    else if(token==='--frame-duration-ms')args.frameDurationMs=parseInteger('--frame-duration-ms',next(),{min:0,max:655350});
    else if(token==='--loop-count')args.loopCount=parseInteger('--loop-count',next(),{min:0,max:65535});
    else if(token==='--max-bytes')args.maxBytes=parseInteger('--max-bytes',next(),{min:1,max:Number.MAX_SAFE_INTEGER});
    else fail('unknown argument: '+token);
  }

  if(!args.file)fail('--file is required');
  if(!args.expectedPath)fail('--expected-path is required');
  assertLocalGifPath(args.file,'file');
  assertLocalGifPath(args.expectedPath,'expected path');
  if(args.file!==args.expectedPath)fail('file must exactly match expected path');
  if(args.frameDurationMs!==null&&args.frameDurationMs%10!==0){
    fail('--frame-duration-ms must be divisible by 10');
  }
  return args;
}

function requireBytes(bytes,cursor,count,label){
  if(cursor<0||cursor+count>bytes.length)fail('truncated GIF while reading '+label);
}

function skipSubBlocks(bytes,cursor){
  while(true){
    requireBytes(bytes,cursor,1,'sub-block size');
    const size=bytes[cursor];
    cursor+=1;
    if(size===0)return cursor;
    requireBytes(bytes,cursor,size,'sub-block payload');
    cursor+=size;
  }
}

export function parseGifMetadata(input){
  const bytes=Buffer.isBuffer(input)?input:Buffer.from(input);
  if(bytes.length<13)fail('GIF is too small');

  const signature=bytes.subarray(0,6).toString('ascii');
  if(signature!=='GIF87a'&&signature!=='GIF89a')fail('invalid GIF signature');

  const width=bytes.readUInt16LE(6);
  const height=bytes.readUInt16LE(8);
  if(width<=0||height<=0)fail('GIF dimensions must be nonzero');

  const packed=bytes[10];
  const hasGlobalColorTable=(packed&0x80)!==0;
  const globalColorCount=1<<((packed&0x07)+1);
  let cursor=13+(hasGlobalColorTable?globalColorCount*3:0);
  requireBytes(bytes,0,cursor,'global color table');

  let frameCount=0;
  let pendingDelayMs=0;
  const frameDelaysMs=[];
  let loopCount=null;
  let trailerFound=false;

  while(cursor<bytes.length){
    const marker=bytes[cursor];

    if(marker===0x3B){
      trailerFound=true;
      cursor+=1;
      break;
    }

    if(marker===0x21){
      requireBytes(bytes,cursor,2,'extension header');
      const label=bytes[cursor+1];

      if(label===0xF9){
        requireBytes(bytes,cursor,8,'graphic control extension');
        if(bytes[cursor+2]!==0x04)fail('invalid graphic control extension size');
        pendingDelayMs=bytes.readUInt16LE(cursor+4)*10;
        if(bytes[cursor+7]!==0x00)fail('invalid graphic control terminator');
        cursor+=8;
        continue;
      }

      if(label===0xFF){
        requireBytes(bytes,cursor+2,1,'application extension size');
        const appSize=bytes[cursor+2];
        requireBytes(bytes,cursor+3,appSize,'application identifier');
        const appId=bytes.subarray(cursor+3,cursor+3+appSize).toString('ascii');
        let subCursor=cursor+3+appSize;

        if(appId==='NETSCAPE2.0'||appId==='ANIMEXTS1.0'){
          requireBytes(bytes,subCursor,1,'loop block size');
          const blockSize=bytes[subCursor];
          if(blockSize>=3){
            requireBytes(bytes,subCursor+1,blockSize,'loop block payload');
            if(bytes[subCursor+1]===0x01){
              loopCount=bytes.readUInt16LE(subCursor+2);
            }
          }
        }

        cursor=skipSubBlocks(bytes,subCursor);
        continue;
      }

      cursor=skipSubBlocks(bytes,cursor+2);
      continue;
    }

    if(marker===0x2C){
      requireBytes(bytes,cursor,10,'image descriptor');
      const localPacked=bytes[cursor+9];
      const hasLocalColorTable=(localPacked&0x80)!==0;
      const localColorCount=1<<((localPacked&0x07)+1);
      cursor+=10;

      if(hasLocalColorTable){
        requireBytes(bytes,cursor,localColorCount*3,'local color table');
        cursor+=localColorCount*3;
      }

      requireBytes(bytes,cursor,1,'LZW minimum code size');
      cursor+=1;
      cursor=skipSubBlocks(bytes,cursor);

      frameCount+=1;
      frameDelaysMs.push(pendingDelayMs);
      pendingDelayMs=0;
      continue;
    }

    fail('unexpected GIF block marker 0x'+marker.toString(16).padStart(2,'0'));
  }

  if(frameCount===0)fail('GIF contains no image frames');
  if(!trailerFound)fail('GIF trailer is missing');

  return {
    signature,
    width,
    height,
    frameCount,
    frameDelaysMs,
    totalDurationMs:frameDelaysMs.reduce((sum,value)=>sum+value,0),
    loopCount,
    byteSize:bytes.length
  };
}

export async function validateExportedPresentationGif(args,{rootDir=process.cwd()}={}){
  assertLocalGifPath(args.file,'file');
  assertLocalGifPath(args.expectedPath,'expected path');
  if(args.file!==args.expectedPath)fail('file must exactly match expected path');

  const absolute=resolveInside(rootDir,args.file,'file');
  const info=await stat(absolute);
  if(!info.isFile())fail('GIF path is not a file');

  if(info.size>args.maxBytes){
    fail('GIF exceeds max file size: '+info.size+' > '+args.maxBytes);
  }

  const bytes=await readFile(absolute);
  const metadata=parseGifMetadata(bytes);

  if(args.width!==null&&metadata.width!==args.width)fail('width mismatch');
  if(args.height!==null&&metadata.height!==args.height)fail('height mismatch');
  if(args.frameCount!==null&&metadata.frameCount!==args.frameCount)fail('frame count mismatch');
  if(args.loopCount!==null&&metadata.loopCount!==args.loopCount)fail('loop count mismatch');

  if(args.frameDurationMs!==null){
    if(metadata.frameDelaysMs.some(delay=>delay!==args.frameDurationMs)){
      fail('frame duration mismatch');
    }
  }

  return {
    ok:true,
    file:args.file,
    expectedPath:args.expectedPath,
    metadata
  };
}

export async function run(argv=process.argv.slice(2),options={}){
  const args=parseArgs(argv);
  return validateExportedPresentationGif(args,options);
}

async function main(){
  try{
    const result=await run();
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
  }catch(error){
    process.stderr.write('presentation GIF validator error: '+error.message+'\n');
    process.exitCode=1;
  }
}

const invoked=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invoked===import.meta.url)await main();
