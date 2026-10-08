import test from 'node:test';
import assert from 'node:assert/strict';
import {routeDay,optionsInGap,keepActivity,timetable} from '../dist/timeline.js';
import {emptyRules,setRule,selected} from '../dist/domain.js';
const date='2026-10-08';
const a=(id,start,end,roomId='r1')=>({id,date,start,end,roomId,blockId:'b1'});
test('free time uses interval union, not sum, and includes the full event day',()=>{
 const all=[a('a','09:00','09:40'),a('b','09:20','10:00','r2'),a('c','10:10','10:30'),a('other','08:30','11:00')];let rules=emptyRules();for(const id of ['a','b','c'])rules=setRule(rules,'activities',id,true);
 const result=routeDay(all,rules,date);assert.equal(result.freeMinutes,70);assert.deepEqual(result.segments.filter(s=>s.kind==='free').map(s=>[s.start,s.end]),[[510,540],[600,610],[630,660]]);assert.equal(result.segments.filter(s=>s.kind==='conflict').length,1);assert.equal(result.changes,0);
});
test('unknown chosen times prevent a false promise of free time',()=>{
 let rules=setRule(emptyRules(),'activities','unknown',true);const r=routeDay([a('a','09:00','10:00'),a('unknown',null,null)],rules,date);assert.equal(r.unknown.length,1);assert.equal(r.segments.length,0);
});
test('gap options must fit entirely, adjacent starts and ends are allowed',()=>{
 const all=[a('fit','10:10','10:30'),a('too-long','10:00','10:30'),a('later','10:30','10:50'),a('unknown',null,null)];assert.deepEqual(optionsInGap(all,date,610,630).map(a=>a.id),['fit']);
});
test('keep only excludes direct overlaps, not a connected but non-overlapping choice',()=>{
 const all=[a('a','09:00','09:20'),a('b','09:10','09:40'),a('c','09:30','10:00')];const rules=setRule(emptyRules(),'blocks','b1',true),result=keepActivity(all,rules,'a');assert.equal(selected(all[0],result),true);assert.equal(selected(all[1],result),false);assert.equal(selected(all[2],result),true);assert.equal(selected(all[1],rules),true);
});
test('timetable handles variable lengths and a missing time without inventing a slot',()=>{
 const grid=timetable([a('a','09:00','09:45'),a('b','09:10','09:30'),a('x',null,null)]);assert.deepEqual(grid.times,['09:00','09:10','09:30','09:45']);assert.equal(grid.items[0].end,3);assert.equal(grid.unknown.length,1);
});
