import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const pairs=[
  {
    altKey:'media.stage.room.alt',
    captionKey:'media.stage.room.caption',
    expected:{
      ru:'Сцена дешёвой общей комнаты для ночлега.',
      en:'Cheap shared-room lodging scene.'
    }
  },
  {
    altKey:'media.base.town.alt',
    captionKey:'media.base.town.caption',
    expected:{
      ru:'Условная иллюстрация фэнтезийного города.',
      en:'A stylized illustration of the fantasy town.'
    }
  }
] as const;

test('v29 generic media captions are bilingual and preserve accepted alt semantics',()=>{
  for(const pair of pairs){
    assert.deepEqual(localization[pair.altKey],pair.expected,pair.altKey);
    assert.deepEqual(localization[pair.captionKey],pair.expected,pair.captionKey);
    assert.deepEqual(localization[pair.captionKey],localization[pair.altKey],pair.captionKey+' parity');
  }
});
