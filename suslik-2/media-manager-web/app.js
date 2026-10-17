import {OWNER_REPO,BRANCH,MANIFEST_PATH,MAX_BYTES,fileExtension,validateEvent,validateFiles,planPublication,parseManifest,encodeFile,toBase64Text,decodeContent} from './core.js';

const $=id=>document.getElementById(id);
const eventBox=$('event'),fileInput=$('file-input'),tokenBox=$('token'),fileList=$('file-list'),
 statusBox=$('status'),countBox=$('count'),publishedBox=$('published'),hintBox=$('event-hint'),
 publishBtn=$('publish'),commitLink=$('commit-link'),modeBox=$('publication-mode'),
 modeHint=$('mode-hint'),dropZone=$('drop-zone'),clearToken=$('clear-token');
let events=[];
let selectedFiles=[];
let remoteManifest=null;
let busy=false;
const API='https://api.github.com/repos/'+OWNER_REPO+'/';

function status(message,kind=''){
 statusBox.textContent=message;
 statusBox.className='status'+(kind?' '+kind:'');
}
function event(){
 return events.find(x=>x.id===eventBox.value)||null;
}
function countPublished(slot=event()){
 const paths=slot&&remoteManifest?.[slot.key];
 return Array.isArray(paths)?paths.length:0;
}
function updateModeHint(){
 const slot=event();
 const count=countPublished(slot);
 if(!slot){modeHint.textContent='Выбери событие.';return;}
 const remaining=slot.maxFiles-count;
 modeHint.textContent=modeBox.value==='append'
  ?('Уже опубликовано: '+count+' из '+slot.maxFiles+'. Свободно: '+remaining+'. Старые файлы сохраняются.')
  :('Новый набор заменит список из '+count+' файлов. Старые файлы останутся в истории GitHub.');
}
function sync(){
 const slot=event();
 const remaining=slot?(modeBox.value==='append'?slot.maxFiles-countPublished(slot):slot.maxFiles):0;
 countBox.textContent=selectedFiles.length+' новых файлов; свободно '+Math.max(0,remaining)+'.';
 publishBtn.disabled=busy||!slot||!selectedFiles.length||!tokenBox.value.trim()||selectedFiles.length>remaining;
 fileInput.disabled=busy||!slot;
 eventBox.disabled=busy||!events.length;
 modeBox.disabled=busy||!slot;
 tokenBox.disabled=busy;
 clearToken.disabled=busy;
 updateModeHint();
}
function renderFiles(){
 fileList.replaceChildren();
 if(!selectedFiles.length){
  const li=document.createElement('li');li.className='placeholder';li.textContent='Файлы ещё не выбраны.';fileList.append(li);
 }
 selectedFiles.forEach((file,index)=>{
  const li=document.createElement('li');
  const name=document.createElement('span');name.className='file-name';
  name.textContent=(index+1)+'. '+file.name;
  const size=document.createElement('span');size.className='file-size';size.textContent=(file.size/1048576).toFixed(1)+' МБ';
  li.append(name,size);
  for(const [text,title,to] of [['↑','Поднять выше',index-1],['↓','Опустить ниже',index+1]]){
   const button=document.createElement('button');button.className='small';button.type='button';
   button.textContent=text;button.title=title;button.setAttribute('aria-label',title+' '+file.name);
   button.disabled=busy||to<0||to>=selectedFiles.length;
   button.addEventListener('click',()=>{
    const copy=selectedFiles.slice();copy.splice(index,1);copy.splice(to,0,file);
    selectedFiles=copy;renderFiles();
   });
   li.append(button);
  }
  const remove=document.createElement('button');
  remove.className='small';remove.type='button';remove.textContent='×';
  remove.title='Убрать';remove.setAttribute('aria-label','Убрать '+file.name);
  remove.disabled=busy;
  remove.addEventListener('click',()=>{
   selectedFiles=selectedFiles.filter((_,i)=>i!==index);renderFiles();
  });
  li.append(remove);fileList.append(li);
 });
 sync();
}
function showEvent(){
 const slot=event();
 selectedFiles=[];fileInput.value='';modeBox.value='append';renderFiles();
 commitLink.hidden=true;
 if(!slot){hintBox.textContent='';publishedBox.textContent='Выбери событие.';status('Выбери сцену и файлы.');return;}
 hintBox.textContent=slot.connected?'Сцена уже есть в игре. Новые изображения появятся после публикации и обновления игры.':
  'Место зарезервировано. Файлы можно опубликовать, но сам игровой экран ещё предстоит написать.';
 const arr=remoteManifest?.[slot.key];
 const info=remoteManifest===null?null:(Array.isArray(arr)?arr.length:0);
 publishedBox.textContent=info===null?'Точное количество опубликованных файлов проверим перед отправкой.':
  'В GitHub сейчас: '+info+' файлов из '+slot.maxFiles+'. Можно добавить файлы, не удаляя старые.';
 status('Добавь файлы для выбранной сцены.');
}
async function api(method,path,token,data){
 const response=await fetch(API+path,{
  method,cache:'no-store',
  headers:{
   'Accept':'application/vnd.github+json',
   'X-GitHub-Api-Version':'2022-11-28',
   ...(token?{'Authorization':'Bearer '+token}:{}),
   ...(data!==undefined?{'Content-Type':'application/json'}:{})
  },
  ...(data!==undefined?{body:JSON.stringify(data)}:{})
 });
 if(!response.ok){
  if(response.status===401||response.status===403)throw Error('GitHub не разрешил публикацию. Проверь токен и право Contents: Read and write для Plegyer/Text.');
  if(response.status===409||response.status===422)throw Error('Ветка GitHub изменилась либо GitHub не принял файл. Повтори попытку, другие изменения сохранены.');
  throw Error('GitHub ответил: '+response.status+'. '+(response.status===404?'Проверь доступ к репозиторию.':'Попробуй позже.'));
 }
 return response.json();
}
async function currentManifest(token=''){
 const data=await api('GET','contents/'+MANIFEST_PATH+'?ref='+encodeURIComponent(BRANCH),token);
 return parseManifest(decodeContent(data.content));
}
async function getHead(token){
 const result=await api('GET','git/ref/heads/'+BRANCH,token);
 const sha=result?.object?.sha;
 if(!/^[a-f0-9]{40}$/.test(sha))throw Error('Не удалось прочитать текущую версию игры.');
 return sha;
}
async function upload(){
 const slot=event();
 if(!slot||busy)return;
 try{validateFiles(selectedFiles,slot,{existingCount:countPublished(slot),mode:modeBox.value});}
 catch(err){status(err.message,'error');return;}
 const token=tokenBox.value.trim();
 if(!token){status('Добавь разрешение GitHub для публикации.','error');return;}
 busy=true;sync();renderFiles();
 commitLink.hidden=true;
 try{
  status('Проверяю GitHub и текущие файлы…');
  const head=await getHead(token);
  const manifest=await currentManifest(token);
  const oldCount=Array.isArray(manifest[slot.key])?manifest[slot.key].length:0;
  if(modeBox.value==='replace'&&oldCount>0&&!confirm('Заменить список из '+oldCount+
    ' опубликованных файлов '+selectedFiles.length+' новыми? Остальные сцены не изменятся.')){
   status('Публикация отменена. Файлы не отправлялись.');return;
  }
  // Always use the fresh GitHub manifest, not the potentially stale counter on the page.
  const {mediaEntries,manifest:nextManifest,nextPaths}=planPublication(manifest,slot,selectedFiles,crypto.randomUUID(),modeBox.value);
  const secondHead=await getHead(token);
  if(secondHead!==head)throw Error('Проект изменился во время подготовки. Нажми «Опубликовать» ещё раз.');
  const entries=[];
  for(let i=0;i<mediaEntries.length;i++){
   const item=mediaEntries[i];
   status('Загружаю файл '+(i+1)+' из '+mediaEntries.length+': '+item.file.name);
   const b64=await encodeFile(item.file);
   const blob=await api('POST','git/blobs',token,{content:b64,encoding:'base64'});
   if(!/^[a-f0-9]{40}$/.test(blob.sha))throw Error('GitHub не подтвердил приём файла.');
   entries.push({path:item.path,mode:'100644',type:'blob',sha:blob.sha});
  }
  status('Подключаю изображения к событию и сохраняю игру…');
  const manifestBlob=await api('POST','git/blobs',token,{content:toBase64Text(nextManifest),encoding:'base64'});
  entries.push({path:MANIFEST_PATH,mode:'100644',type:'blob',sha:manifestBlob.sha});
  const oldCommit=await api('GET','git/commits/'+head,token);
  const nextTree=await api('POST','git/trees',token,{base_tree:oldCommit.tree.sha,tree:entries});
  const nextCommit=await api('POST','git/commits',token,{
   message:'Publish SUSLIK 2 media: '+slot.id,tree:nextTree.sha,parents:[head]
  });
  if((await getHead(token))!==head)throw Error('Другой разработчик обновил игру. Попробуй публикацию повторно.');
  await api('PATCH','git/refs/heads/'+BRANCH,token,{sha:nextCommit.sha,force:false});
  remoteManifest=manifest;
  remoteManifest[slot.key]=nextPaths;
  publishedBox.textContent='В GitHub теперь: '+nextPaths.length+' файлов из '+slot.maxFiles+'.';
  commitLink.href='https://github.com/'+OWNER_REPO+'/commit/'+nextCommit.sha;
  commitLink.hidden=false;
  status('✅ Добавлено новых файлов: '+mediaEntries.length+'. Всего для события: '+nextPaths.length+'. Ранее опубликованные материалы не удалены.','ok');
  selectedFiles=[];fileInput.value='';renderFiles();
 }catch(error){
  status('Не опубликовано: '+String(error?.message||error)+'. Загруженные промежуточные данные не меняют игру.','error');
 }finally{busy=false;sync();renderFiles();}
}
eventBox.addEventListener('change',showEvent);
tokenBox.addEventListener('input',sync);
clearToken.addEventListener('click',()=>{tokenBox.value='';sync();status('Токен очищен.');});
modeBox.addEventListener('change',()=>{sync();status(modeBox.value==='append'?'Добавляем к уже опубликованным.':'Заменяем список файлов события.');});
function addFiles(chosen){
 const slot=event();
 if(!slot||busy||!chosen.length)return;
 try{
  validateFiles(selectedFiles.concat(chosen),slot,{existingCount:countPublished(slot),mode:modeBox.value});
  selectedFiles.push(...chosen);renderFiles();status('Файлы выбраны. Можно публиковать.');
 }catch(e){status(e.message,'error');}
}
fileInput.addEventListener('change',()=>{
 addFiles(Array.from(fileInput.files||[]));
 fileInput.value='';
});
dropZone.addEventListener('dragover',e=>{
 if(busy||!event())return;
 e.preventDefault();e.dataTransfer.dropEffect='copy';dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave',e=>{
 if(!dropZone.contains(e.relatedTarget))dropZone.classList.remove('drag-over');
});
dropZone.addEventListener('drop',e=>{
 e.preventDefault();dropZone.classList.remove('drag-over');
 addFiles(Array.from(e.dataTransfer?.files||[]));
});
document.addEventListener('dragover',e=>{if(e.dataTransfer?.types?.includes('Files'))e.preventDefault();});
document.addEventListener('drop',e=>{if(e.dataTransfer?.types?.includes('Files'))e.preventDefault();});
publishBtn.addEventListener('click',upload);
async function start(){
 try{
  // Read the catalog locally so anonymous GitHub API failures do not hide every scene.
  const response=await fetch('./slots.json',{cache:'no-store'});
  if(!response.ok)throw Error('Не удалось загрузить список событий ('+response.status+').');
  const data=await response.json();
  if(!Array.isArray(data.events)||!data.events.length)throw Error('Каталог событий пуст.');
  events=data.events.map(validateEvent);
  modeBox.value='append';
  eventBox.replaceChildren();
  const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Выбери событие…';eventBox.append(placeholder);
  for(const slot of events){
   const option=document.createElement('option');option.value=slot.id;option.textContent=slot.title;
   eventBox.append(option);
  }
  publishedBox.textContent='Выбери событие.';
  status('Выбери сцену и файлы.');
  sync();
  // Catalogue and file selection work independently of GitHub availability/rate limits.
  try{
   remoteManifest=await currentManifest();
   const slot=event();
   if(slot){
    const count=remoteManifest[slot.key]?.length||0;
    publishedBox.textContent='В GitHub сейчас: '+count+' файлов из '+slot.maxFiles+'. Можно добавить новые.';
    sync();
   }
  }catch(e){
   remoteManifest=null;
   if(event())publishedBox.textContent='Текущий список GitHub будет проверен перед публикацией.';
  }
 }catch(e){
  status('Не удалось загрузить каталог событий. Обнови страницу. '+e.message,'error');
  events=[];eventBox.replaceChildren();
  const option=document.createElement('option');option.value='';option.textContent='Каталог недоступен';eventBox.append(option);
  sync();
 }
}
start();

