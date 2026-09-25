import {readFileSync,readdirSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {freshSave,dispatch,eligible,rent,type Command} from '../src/core/engine.ts';
import type {Save,Stat} from '../src/core/schema.ts';
export const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
export const rawPacks=readdirSync('content/packs').filter(f=>f.endsWith('.json')).sort().map(f=>JSON.parse(readFileSync('content/packs/'+f,'utf8')));
export const catalog=loadCatalog(definitions,rawPacks);
export function created(){
 let s=freshSave();
 const allocation:Partial<Record<Stat,number>>={charm:3,dexterity:2,reason:2,manners:2,grooming:1};
 for(const [stat,count] of Object.entries(allocation) as [Stat,number][])for(let i=0;i<count;i++)s=dispatch(s,{type:'allocate',stat,delta:1},catalog);
 s=dispatch(s,{type:'finishCreation'},catalog);
 // Legacy demo-only compatibility values. They are not target progression stats and are not part of creation.
 s.run.metrics.perception=3;s.run.metrics.organization=3;s.run.metrics.composure=2;
 return s;
}
export function started(){return act(created(),'arrival');}
export function act(s:Save,id:string,recipe?:'gentle'|'bold'){
 if(id==='rest')return dispatch(s,{type:'sleep',payment:s.run.metrics.money>=rent(s)?'money':'outside'},catalog);
 if(!s.run.pending&&s.run.metrics.energy===0&&id!=='arrival')s=act(s,'rest');
 s=dispatch(s,{type:'action',id,recipe},catalog);let steps=0;
 while(s.run.pending){if(++steps>10)throw new Error('Scene loop');const e=catalog.events.find(e=>e.id===s.run.pending!.eventId)!;const c=e.choices.find(c=>eligible(c.conditions,s))!;s=dispatch(s,{type:'choice',id:c.id},catalog);}
 return s;
}
export function sequence(s:Save,commands:Command[]){for(const c of commands)s=dispatch(s,c,catalog);return s;}
