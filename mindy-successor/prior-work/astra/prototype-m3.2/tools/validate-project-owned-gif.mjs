import {readFile,stat} from 'node:fs/promises';
import {isAbsolute,relative,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_MAX_BYTES=5*1024*1024;

function pathError(value){
  if(typeof value!=='string'||value.trim()==='')return 'GIF path must be a non-empty string';
  if(isAbsolute(value))return 'GIF path must be repository-relative';
  if(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)||value.startsWith('//'))return 'GIF path must not be an external/scheme URL';
  if(value.includes('\\'))return 'GIF path must use repository forward-slash paths';
  const parts=value.split('/');
  if(parts.some(part=>part===''||part==='.'||part==='..'))return 'GIF path contains invalid traversal/path segments';
  if(!value.startsWith('assets/gif/'))return 'GIF path must stay under assets/gif/';
  if(!value.toLowerCase().endsWith('.gif'))return 'GIF path must end with .gif';
  if(/(?:^|\/)(?:placeholder|staging|non-shipped|test-fixture|fake)(?:\/|[-_.])/i.test(value)){
    return 'GIF path contains a forbidden placeholder/staging/test marker';
  }
  return null;
}

function resolveInside(rootDir,repoRelative){
  const root=resolve(rootDir);
  const absolute=resolve(root,repoRelative);
  const rel=relative(root,absolute);
  if(rel===''||(!rel.startsWith('..'+sep)&&rel!=='..'&&!isAbsolute(rel)))return absolute;
  throw new Error('GIF path escapes repository root');
}

function provenanceError(note){
  if(typeof note!=='string'||note.trim()==='')return 'provenance note is required';
  if(/https?:\/\//i.test(note))return 'provenance note must not depend on an external URL';
  if(/\b(?:external|downloaded|placeholder|unknown|tbd|todo|test[- ]?fixture|stock)\b/i.test(note)){
    return 'provenance note contains forbidden external/placeholder/unknown provenance';
  }
  if(!/(?:project-owned|repository-local)/i.test(note)){
    return 'provenance note must identify project-owned or repository-local origin';
  }
  return null;
}

function requireBytes(bytes,cursor,count,label){
  if(cursor<0||cursor+count>bytes.length)throw new Error('truncated GIF while reading '+label);
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
  if(bytes.length<13)throw new Error('GIF is too small to contain a logical screen descriptor');

  const signature=bytes.subarray(0,6).toString('ascii');
  if(signature!=='GIF87a'&&signature!=='GIF89a')throw new Error('invalid GIF signature');

  const width=bytes.readUInt16LE(6);
  const height=bytes.readUInt16LE(8);
  if(width<=0||height<=0)throw new Error('GIF dimensions must be nonzero');

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
        if(bytes[cursor+2]!==0x04)throw new Error('invalid graphic control extension size');
        pendingDelayMs=bytes.readUInt16LE(cursor+4)*10;
        if(bytes[cursor+7]!==0x00)throw new Error('invalid graphic control terminator');
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
          requireBytes(bytes,subCursor,1,'loop extension block size');
          const blockSize=bytes[subCursor];
          if(blockSize>=3){
            requireBytes(bytes,subCursor+1,blockSize,'loop extension payload');
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

    throw new Error('unexpected GIF block marker 0x'+marker.toString(16).padStart(2,'0'));
  }

  if(frameCount===0)throw new Error('GIF contains no image frames');
  if(!trailerFound)throw new Error('GIF trailer is missing');

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

function expectedMismatch(metadata,expected){
  const errors=[];
  if(expected.width!==undefined&&metadata.width!==expected.width)errors.push('width mismatch: expected '+expected.width+', got '+metadata.width);
  if(expected.height!==undefined&&metadata.height!==expected.height)errors.push('height mismatch: expected '+expected.height+', got '+metadata.height);
  if(expected.frameCount!==undefined&&metadata.frameCount!==expected.frameCount)errors.push('frameCount mismatch: expected '+expected.frameCount+', got '+metadata.frameCount);
  if(expected.loopCount!==undefined&&metadata.loopCount!==expected.loopCount)errors.push('loopCount mismatch: expected '+expected.loopCount+', got '+metadata.loopCount);
  if(expected.totalDurationMs!==undefined&&metadata.totalDurationMs!==expected.totalDurationMs)errors.push('totalDurationMs mismatch: expected '+expected.totalDurationMs+', got '+metadata.totalDurationMs);
  if(expected.frameDelayMs!==undefined&&metadata.frameDelaysMs.some(delay=>delay!==expected.frameDelayMs)){
    errors.push('frame delay mismatch: expected every frame to be '+expected.frameDelayMs+' ms');
  }
  return errors;
}

export async function validateProjectOwnedGif(
  {src,provenanceNote,expected={}},
  {rootDir=process.cwd(),maxBytes=DEFAULT_MAX_BYTES}={}
){
  const errors=[];
  const pError=pathError(src);
  if(pError)errors.push(pError);

  const provError=provenanceError(provenanceNote);
  if(provError)errors.push(provError);

  if(!Number.isInteger(maxBytes)||maxBytes<=0)errors.push('maxBytes must be a positive integer');

  if(errors.length>0)return {ok:false,errors,metadata:null};

  let absolute;
  try{absolute=resolveInside(rootDir,src);}catch(error){
    return {ok:false,errors:[error.message],metadata:null};
  }

  let info;
  let bytes;
  try{
    info=await stat(absolute);
    if(!info.isFile())errors.push('GIF path is not a file: '+src);
    bytes=await readFile(absolute);
  }catch(error){
    errors.push('GIF file cannot be read: '+src+' ('+error.message+')');
    return {ok:false,errors,metadata:null};
  }

  if(bytes.length>maxBytes)errors.push('GIF exceeds maxBytes budget: '+bytes.length+' > '+maxBytes);

  let metadata=null;
  try{
    metadata=parseGifMetadata(bytes);
    errors.push(...expectedMismatch(metadata,expected));
  }catch(error){
    errors.push(error.message);
  }

  return {
    ok:errors.length===0,
    errors,
    metadata
  };
}

function intArg(name,value,{min=0,max=Number.MAX_SAFE_INTEGER,allowMinusOne=false}={}){
  const parsed=Number(value);
  if(!Number.isInteger(parsed))throw new Error(name+' must be an integer');
  if(allowMinusOne&&parsed===-1)return parsed;
  if(parsed<min||parsed>max)throw new Error(name+' must be between '+min+' and '+max);
  return parsed;
}

export function parseValidatorArgs(argv){
  const args={
    file:null,
    provenanceNote:null,
    maxBytes:DEFAULT_MAX_BYTES,
    expected:{}
  };

  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    const next=()=>{
      if(i+1>=argv.length)throw new Error(token+' requires a value');
      i+=1;
      return argv[i];
    };

    if(token==='--file')args.file=next();
    else if(token==='--provenance-note')args.provenanceNote=next();
    else if(token==='--max-bytes')args.maxBytes=intArg('--max-bytes',next(),{min:1});
    else if(token==='--width')args.expected.width=intArg('--width',next(),{min:1,max:65535});
    else if(token==='--height')args.expected.height=intArg('--height',next(),{min:1,max:65535});
    else if(token==='--frames')args.expected.frameCount=intArg('--frames',next(),{min:1,max:1000});
    else if(token==='--loop')args.expected.loopCount=intArg('--loop',next(),{min:0,max:65535,allowMinusOne:true});
    else if(token==='--duration-ms')args.expected.totalDurationMs=intArg('--duration-ms',next(),{min:0});
    else if(token==='--delay-ms')args.expected.frameDelayMs=intArg('--delay-ms',next(),{min:0});
    else throw new Error('unknown argument: '+token);
  }

  if(!args.file)throw new Error('--file is required');
  if(!args.provenanceNote)throw new Error('--provenance-note is required');
  return args;
}

async function main(){
  try{
    const args=parseValidatorArgs(process.argv.slice(2));
    const result=await validateProjectOwnedGif(
      {src:args.file,provenanceNote:args.provenanceNote,expected:args.expected},
      {maxBytes:args.maxBytes}
    );
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
    if(!result.ok)process.exitCode=1;
  }catch(error){
    process.stderr.write('GIF validator error: '+error.message+'\n');
    process.exitCode=1;
  }
}

const invoked=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invoked===import.meta.url)await main();
