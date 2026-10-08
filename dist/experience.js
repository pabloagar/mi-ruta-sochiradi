import {normalize,sortActivities,isLive,selected} from './domain.js';
export const speakerKey=name=>normalize(name).replace(/\b(dr|dra|enf|tm|prof)\.?(?=\s|$)\s*/g,'').replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
export const displayTitle=a=>a.title.replace(/coffee\s*break/gi,'Coffee Break');
export const isPause=a=>a.type==='break'||/^(almuerzo|coffee\s*break|pausa caf[eé])\b/i.test(a.title);
export const speakerNames=value=>String(value??'').split(/\s+(?:&|y)\s+|,\s*(?=(?:Dr|Dra|Enf)\.)/).map(x=>x.trim()).filter(Boolean);
export function upcoming(activities,rules,clock){
 const future=activities.filter(a=>a.start&&(a.date>clock.date||a.date===clock.date&&a.start>clock.time)).sort(sortActivities),first=future[0]??null;
 const starts=first?future.filter(a=>a.date===first.date&&a.start===first.start):[];
 return {first,starts,nextChosen:future.find(a=>selected(a,rules))??null,live:activities.filter(a=>isLive(a,clock)),ended:activities.length>0&&!first&&!activities.some(a=>isLive(a,clock))&&clock.date>=activities.map(a=>a.date).sort().at(-1)};
}
