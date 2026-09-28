import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const id='activity/forest/route/old-boundary';
const src='assets/presentation/forest-route-old-boundary-v3.svg';
const altKey='presentation.activity.forest.route.old-boundary.alt';
const captionKey='presentation.activity.forest.route.old-boundary.caption';

test('old-boundary route has one safe project-owned static slot',()=>{
 const slot=presentation.slots?.[id];
 assert.ok(slot?.static,id);
 assert.equal(slot.static.kind,'image');
 assert.equal(slot.static.src,src);
 assert.equal(slot.static.altKey,altKey);
 assert.ok(existsSync(src),src);
 assert.ok(localization[altKey]?.ru?.trim());
 assert.ok(localization[altKey]?.en?.trim());
 assert.ok(localization[captionKey]?.ru?.trim());
 assert.ok(localization[captionKey]?.en?.trim());
});

test('old-boundary source stays semantically narrow and locale-neutral',()=>{
 const svg=readFileSync(src,'utf8');
 const text=[svg,slotText(),localization[altKey].ru,localization[altKey].en,localization[captionKey].ru,localization[captionKey].en].join('\n');
 assert.doesNotMatch(text,/\b(?:hunter|token|key|gate|gateway|arch|barrier|challenge|reward|success|failure|result|magic)\b/i);
 assert.doesNotMatch(text,/(?:охотник|токен|жетон|ключ|ворот|арка|барьер|испытани|награ|успех|провал|результат|маг)/i);
 assert.doesNotMatch(id,/(?:^|\/)(?:ru|en)(?:\/|$)/i);
 assert.doesNotMatch(src,/(?:^|\/)(?:ru|en)(?:\/|[-_.])/i);
});

test('old-boundary build output preserves source bytes when build has run',()=>{
 const dist='dist/'+src;
 if(existsSync(dist))assert.deepEqual(readFileSync(dist),readFileSync(src),dist);
});

function slotText(){
 return JSON.stringify(presentation.slots?.[id]??{});
}
