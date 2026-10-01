import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const map=JSON.parse(readFileSync('content/school-satyr-v12-track-map.fixture.json','utf8'));

test('C5-123/C5-124/C5-125 use only C1D-97 School gameplay identities',()=>{
  const relevant=Object.fromEntries(map.tracks.filter((x:any)=>x.minorHookRelevant).map((x:any)=>[x.trackId,x]));
  assert.deepEqual(
    {
      management:[relevant['school.track.literacy_and_numbers'].careerFact,relevant['school.track.literacy_and_numbers'].reactionEvent],
      rhetoric:[relevant['school.track.rhetoric_and_social'].careerFact,relevant['school.track.rhetoric_and_social'].reactionEvent],
      boundaries:[relevant['school.track.body_confidence'].careerFact,relevant['school.track.body_confidence'].reactionEvent]
    },
    {
      management:['school-management-ready','satyr-maid.school.management'],
      rhetoric:['school-rhetoric-ready','satyr-maid.school.rhetoric'],
      boundaries:['school-boundaries-ready','satyr-maid.school.boundaries']
    }
  );
  assert.equal(map.localMinorHookPolicy.threshold,3);
  assert.equal(map.localMinorHookPolicy.scope,'satyr-maid-only');
});
