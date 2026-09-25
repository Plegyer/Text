import {readFileSync,existsSync,readdirSync} from 'node:fs';import {execFileSync} from 'node:child_process';
import {packSchema,type Condition} from '../src/core/schema.ts';
import {loadCatalog} from '../src/core/content.ts';
import {applyPresentation,presentationSchema} from '../src/core/presentation.ts';
const id=process.argv[2];if(!/^DS-00[1-7]$/.test(id??''))throw new Error('Укажите задание DS-001 … DS-007.');
const contract=JSON.parse(readFileSync(`docs/contracts/${id}.json`,'utf8'));
const allowed=new Set([contract.file,contract.test,contract.report]);
const base=process.argv[3]??contract.base??'m1-foundation';
const git=(...args:string[])=>execFileSync('git',args,{encoding:'utf8'}).trim();
const changed=[...git('diff','--name-only',base).split('\n'),...git('ls-files','--others','--exclude-standard').split('\n')].filter(Boolean);
for(const path of changed)if(!allowed.has(path))throw new Error(`Изменение вне задания: ${path}`);
for(const path of allowed)if(!existsSync(path))throw new Error(`Нет результата: ${path}`);
if(contract.kind==='presentation'){
  const patch=presentationSchema.parse(JSON.parse(readFileSync(contract.file,'utf8')));
  if(!same(Object.keys(patch.texts),contract.textKeys)||Object.keys(patch.media).length)throw new Error('Изменены границы постановок.');
  if(new Set(Object.values(patch.texts)).size!==contract.textKeys.length)throw new Error('Повтор постановки.');
  for(const t of Object.values(patch.texts))if(t.length<120||t.length>450)throw new Error('Длина постановки вне 120–450.');
  const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
  const catalog=loadCatalog(json('content/definitions.json'),readdirSync('content/packs').filter(f=>f.endsWith('.json')).map(f=>json(`content/packs/${f}`)));
  applyPresentation(catalog,patch);
  console.log(`${id}: восемь допустимых постановок; механика не меняется. Теперь npm run check и редакторская проверка.`);
  process.exit(0);
}
const p=packSchema.parse(JSON.parse(readFileSync(contract.file,'utf8')));
function same(a:string[],b:string[]){return JSON.stringify([...a].sort())===JSON.stringify([...b].sort());}
if(p.id!==contract.pack||p.events.length!==contract.eventCount||p.media.length)throw new Error('Нарушен состав пакета.');
if(!same(p.reads,contract.reads)||!same(p.writes,contract.writes))throw new Error('Изменены права флагов.');
if(!same(p.events.map(e=>String(e.variants.length)),contract.variantCounts.map(String)))throw new Error('Неверное число постановок.');
function inspect(c:Condition){
  if(c.kind==='metric'&&!contract.metrics.includes(c.key))throw new Error(`Чтение метрики вне задания: ${c.key}`);
  if(c.kind==='visits'&&!contract.triggers.includes(c.action))throw new Error('Чужой счётчик посещений.');
  if(c.kind==='item'||c.kind==='unlock')throw new Error('Предметы/наследие вне задания.');
  if(c.kind==='flag'&&!p.reads.includes(c.key))throw new Error('Чужой флаг.');
  if(c.kind==='all'||c.kind==='any')c.conditions.forEach(inspect);if(c.kind==='not')inspect(c.condition);
}
const texts=new Set<string>();let totalBudget=0;
if(contract.requiredSeasons&&!same(p.events.flatMap(e=>e.conditions.filter(c=>c.kind==='season').map(c=>c.value)),contract.requiredSeasons))throw new Error('Неверные сезоны.');
for(const e of p.events){
  if(e.priority!==contract.priority||e.maxShows>contract.maxShows||e.trigger.some(t=>!contract.triggers.includes(t)))throw new Error(`Триггер/частота/приоритет вне задания: ${e.id}`);
  if(e.maxShows>1&&(e.cooldownDays<(contract.minCooldown??14)||e.variantCooldownDays<(contract.minVariantCooldown??56)))throw new Error(`Недостаточный cooldown ${e.id}`);
  if(id==='DS-002'&&!e.conditions.some(c=>c.kind==='season'&&c.value==='winter'))throw new Error('Нет обязательной зимы.');
  e.conditions.forEach(inspect);
  for(const v of e.variants){
    v.conditions.forEach(inspect);if(v.media.some(m=>!contract.media.includes(m)))throw new Error('Медиа вне задания.');
    const text=v.text.trim().toLowerCase();if(texts.has(text))throw new Error('Повтор текста');texts.add(text);
  }
  let eventBudget=0;
  for(const c of e.choices){
    c.conditions.forEach(inspect);const sums:Record<string,number>={};
    for(const effect of c.effects){
      if(effect.kind==='flag'){if(!p.writes.includes(effect.key))throw new Error('Чужая запись.');}
      else if(effect.kind==='metric'){
        if(!(contract.effectMetrics??contract.metrics).includes(effect.key))throw new Error('Чужая метрика.');
        sums[effect.key]=(sums[effect.key]??0)+Math.abs(effect.delta);
        if(sums[effect.key]>contract.maxMetricDelta)throw new Error('Превышена награда/штраф.');
      }else throw new Error('Предметы и жильё нельзя менять в этом пакете.');
    }
    eventBudget=Math.max(eventBudget,Object.values(sums).reduce((a,b)=>a+b,0));
  }
  totalBudget+=eventBudget;
}
if(contract.maxTotalDelta!==undefined&&totalBudget>contract.maxTotalDelta)throw new Error('Превышен общий бюджет пакета.');
console.log(`${id}: границы, состав и бюджет соблюдены. Теперь npm run check и редакторская проверка.`);
