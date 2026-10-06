import {dispatch,energyMax} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function setBound(s:Save,day=10){
  s.run.calendar.elapsedDays=day;
  s.run.day=day;
  s.run.secretDebt={
    status:'bound',acceptedDay:0,trapDay:10,boundDay:10,resolvedDay:null,
    debt:20000,hiddenShifts:0,grantApplied:true,lastLenderAttemptDay:null
  };
  return s;
}

let s=setBound(started());
console.log('START',JSON.stringify({
  day:s.run.day,
  energyCurrent:s.run.dayState.energyCurrent,
  energyMax:energyMax(s),
  strongMetaSnapshot:s.run.strongMetaSnapshot,
  strongMetaRuntime:s.run.strongMetaRuntime,
  next:s.run.dayState.nextDayModifiers
}));
s=dispatch(s,{type:'endDay'},catalog);
console.log('AFTER_END_DAY',JSON.stringify({pending:s.run.pending,next:s.run.dayState.nextDayModifiers,night:s.run.flow.night}));
s=dispatch(s,{type:'choice',id:'continue'},catalog);
console.log('AFTER_FORCED_CHOICE',JSON.stringify({
  energyMax:energyMax(s),
  next:s.run.dayState.nextDayModifiers,
  strongMetaSnapshot:s.run.strongMetaSnapshot,
  strongMetaRuntime:s.run.strongMetaRuntime,
  night:s.run.flow.night
}));
const street=catalog.definitions.lodgings.find(x=>x.id==='lodging.street');
console.log('STREET_DEF',JSON.stringify(street));
s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
console.log('AFTER_STREET',JSON.stringify({
  day:s.run.day,
  energyCurrent:s.run.dayState.energyCurrent,
  energyMax:energyMax(s),
  pending:s.run.pending,
  next:s.run.dayState.nextDayModifiers,
  strongMetaSnapshot:s.run.strongMetaSnapshot,
  strongMetaRuntime:s.run.strongMetaRuntime,
  night:s.run.flow.night
}));
