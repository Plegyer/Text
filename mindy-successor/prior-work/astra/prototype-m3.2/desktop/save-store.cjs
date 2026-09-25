const fs=require('node:fs/promises');
const path=require('node:path');
function createStore(directory,validate){
  const file=path.join(directory,'save-v1.json'),backup=file+'.bak';let queue=Promise.resolve();
  async function read(){
    let primaryError;
    try{const text=await fs.readFile(file,'utf8');validate(text);return {text,recovered:false};}catch(e){primaryError=e;}
    try{const text=await fs.readFile(backup,'utf8');validate(text);return {text,recovered:true};}catch(e){
      if(primaryError.code==='ENOENT'&&e.code==='ENOENT')return null;
      throw new Error('Основное сохранение и резервная копия недоступны или несовместимы. Файлы не изменены.');
    }
  }
  function save(text){
    const operation=queue.then(async()=>{
      if(typeof text!=='string'||Buffer.byteLength(text)>2_000_000)throw new Error('Недопустимый размер сохранения.');
      validate(text);await fs.mkdir(directory,{recursive:true});
      let previous;
      try{previous=await fs.readFile(file,'utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
      let validPrevious=false;
      if(previous){try{validate(previous);validPrevious=true;}catch{/* Keep known good backup. */}}
      if(validPrevious)await fs.copyFile(file,backup);
      const tmp=file+'.tmp';const handle=await fs.open(tmp,'w');
      try{await handle.writeFile(text,'utf8');await handle.sync();}finally{await handle.close();}
      await fs.rename(tmp,file);
    });
    queue=operation.catch(()=>{});return operation;
  }
  return {read,save,flush:()=>queue};
}
module.exports={createStore};
