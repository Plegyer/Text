import {readFile,stat} from 'node:fs/promises';
import {isAbsolute,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

const PLACEHOLDER_MARKER=/(?:^|[/_.\s-])(placeholder|staging|non-shipped|todo|tbd)(?:[/_.\s-]|$)/i;
const EXTERNAL_OR_SCHEME=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const GIF_SIGNATURES=new Set(['GIF87a','GIF89a']);
const STATIC_EXT=/\.(?:svg|png|jpe?g|webp)$/i;

function object(value){
  return !!value&&typeof value==='object'&&!Array.isArray(value);
}

function safeAssetPath(src,rootDir,errors,label){
  if(typeof src!=='string'||!src){
    errors.push(`${label}: src must be a non-empty string.`);
    return null;
  }
  if(EXTERNAL_OR_SCHEME.test(src)){
    errors.push(`${label}: external/scheme URL is forbidden: ${src}`);
    return null;
  }
  if(isAbsolute(src)){
    errors.push(`${label}: absolute path is forbidden: ${src}`);
    return null;
  }
  if(!src.startsWith('assets/')){
    errors.push(`${label}: path must be prototype-relative under assets/: ${src}`);
    return null;
  }
  if(src.split(/[\\/]+/).includes('..')){
    errors.push(`${label}: parent traversal is forbidden: ${src}`);
    return null;
  }
  if(PLACEHOLDER_MARKER.test(src)){
    errors.push(`${label}: placeholder/TODO path marker is forbidden: ${src}`);
    return null;
  }
  const root=resolve(rootDir);
  const full=resolve(root,src);
  if(full!==root&&!full.startsWith(root+sep)){
    errors.push(`${label}: resolved path escapes repository root: ${src}`);
    return null;
  }
  return full;
}

async function validateExistingFile(src,rootDir,errors,label){
  const full=safeAssetPath(src,rootDir,errors,label);
  if(!full)return null;
  try{
    const info=await stat(full);
    if(!info.isFile()){
      errors.push(`${label}: referenced path is not a file: ${src}`);
      return null;
    }
    return full;
  }catch{
    errors.push(`${label}: referenced file does not exist: ${src}`);
    return null;
  }
}

async function validateGif(candidate,rootDir,errors,label){
  if(!object(candidate)){
    errors.push(`${label}: candidate must be an object.`);
    return;
  }
  if(candidate.kind!=='gif')errors.push(`${label}: media kind must be gif.`);
  if(typeof candidate.key!=='string'||!/^[a-z0-9][a-z0-9._-]*$/.test(candidate.key)){
    errors.push(`${label}: invalid candidate key.`);
  }
  if(typeof candidate.provenanceSourceNote!=='string'||!candidate.provenanceSourceNote.trim()){
    errors.push(`${label}: provenance/source note is required.`);
  }else if(PLACEHOLDER_MARKER.test(candidate.provenanceSourceNote)){
    errors.push(`${label}: provenance/source note contains a placeholder/TODO marker.`);
  }
  const full=await validateExistingFile(candidate.src,rootDir,errors,label);
  if(!full)return;
  if(!/\.gif$/i.test(candidate.src)){
    errors.push(`${label}: GIF candidate path must end in .gif: ${candidate.src}`);
    return;
  }
  try{
    const bytes=await readFile(full);
    const signature=bytes.subarray(0,6).toString('ascii');
    if(!GIF_SIGNATURES.has(signature)){
      errors.push(`${label}: file extension is .gif but signature is not GIF87a/GIF89a: ${candidate.src}`);
    }
  }catch{
    errors.push(`${label}: could not read GIF bytes: ${candidate.src}`);
  }
}

async function validateStaticFallback(fallback,rootDir,errors,label){
  if(!object(fallback)){
    errors.push(`${label}: static fallback is required.`);
    return;
  }
  if(fallback.kind!=='image')errors.push(`${label}: static fallback kind must be image.`);
  const full=await validateExistingFile(fallback.src,rootDir,errors,label);
  if(full&&!STATIC_EXT.test(fallback.src)){
    errors.push(`${label}: static fallback must use svg/png/jpg/jpeg/webp: ${fallback.src}`);
  }
}

export async function validateMediaIntakeManifest(manifest,{rootDir=process.cwd()}={}){
  const errors=[];
  if(!object(manifest)){
    return {ok:false,errors:['Manifest must be an object.']};
  }
  if(manifest.schemaVersion!==1)errors.push('Manifest schemaVersion must be 1.');
  if(manifest.kind!=='real-media-intake-manifest')errors.push('Manifest kind must be real-media-intake-manifest.');
  if(!Array.isArray(manifest.pools)){
    errors.push('Manifest pools must be an array.');
    return {ok:false,errors};
  }

  const presentationIds=new Set();
  for(let poolIndex=0;poolIndex<manifest.pools.length;poolIndex++){
    const pool=manifest.pools[poolIndex];
    const label=`pools[${poolIndex}]`;
    if(!object(pool)){
      errors.push(`${label}: pool must be an object.`);
      continue;
    }
    if(typeof pool.presentationId!=='string'||!pool.presentationId){
      errors.push(`${label}: presentationId is required.`);
    }else{
      if(presentationIds.has(pool.presentationId))errors.push(`${label}: duplicate semantic pool ${pool.presentationId}.`);
      presentationIds.add(pool.presentationId);
    }
    if(!Array.isArray(pool.candidates)){
      errors.push(`${label}: candidates must be an array.`);
      await validateStaticFallback(pool.staticFallback,rootDir,errors,`${label}.staticFallback`);
      continue;
    }

    if(pool.readiness==='PRODUCTION_READY'){
      if(pool.candidates.length<3||pool.candidates.length>5){
        errors.push(`${label}: PRODUCTION_READY pool must contain 3..5 candidates; got ${pool.candidates.length}.`);
      }
    }else if(pool.readiness!=='INTAKE_ONLY'){
      errors.push(`${label}: readiness must be INTAKE_ONLY or PRODUCTION_READY.`);
    }

    const keys=new Set();
    for(let candidateIndex=0;candidateIndex<pool.candidates.length;candidateIndex++){
      const candidate=pool.candidates[candidateIndex];
      const candidateLabel=`${label}.candidates[${candidateIndex}]`;
      if(object(candidate)&&typeof candidate.key==='string'){
        if(keys.has(candidate.key))errors.push(`${candidateLabel}: duplicate candidate key ${candidate.key} within semantic pool.`);
        keys.add(candidate.key);
      }
      await validateGif(candidate,rootDir,errors,candidateLabel);
    }

    await validateStaticFallback(pool.staticFallback,rootDir,errors,`${label}.staticFallback`);
  }

  return {ok:errors.length===0,errors};
}

export async function validateMediaIntakeManifestFile(manifestPath,{rootDir=process.cwd()}={}){
  const raw=await readFile(manifestPath,'utf8');
  const manifest=JSON.parse(raw);
  return validateMediaIntakeManifest(manifest,{rootDir});
}

async function cli(){
  const manifestPath=process.argv[2];
  const rootDir=process.argv[3]??process.cwd();
  if(!manifestPath){
    console.error('Usage: node tools/media-asset-preflight.mjs <manifest.json> [prototype-root]');
    process.exitCode=2;
    return;
  }
  try{
    const result=await validateMediaIntakeManifestFile(manifestPath,{rootDir});
    if(result.ok){
      console.log('Media asset preflight: PASS');
      return;
    }
    console.error('Media asset preflight: FAIL');
    for(const error of result.errors)console.error('- '+error);
    process.exitCode=1;
  }catch(error){
    console.error('Media asset preflight: FAIL');
    console.error('- '+String(error));
    process.exitCode=1;
  }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  await cli();
}
