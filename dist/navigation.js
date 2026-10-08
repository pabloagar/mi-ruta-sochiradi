// Browser history contains presentation state only, never route rules.
export function installNavigation({read,apply}){
 let restoring=false;const pending=new WeakMap();
 const comparable=s=>JSON.stringify({...s,scroll:0,scrolls:{},focus:null,grid:null});
 const replace=()=>{const u=read();history.replaceState({congressUI:u,modalDepth:u.dialog?(history.state?.modalDepth||1):0},'');};
 history.scrollRestoration='manual';replace();
 document.addEventListener('click',e=>{
  if(restoring||e.target.closest('#closeDetail'))return;
  const button=e.target.closest('button,summary');if(!button)return;
  const before=read();replace();pending.set(e,before);
 },true);
 document.addEventListener('click',e=>{const before=pending.get(e);if(!before||restoring)return;const after=read();if(comparable(before)!==comparable(after)){const modalDepth=after.dialog?(before.dialog?(history.state?.modalDepth||1)+1:1):0;history.pushState({congressUI:after,modalDepth},'');}});
 window.addEventListener('popstate',e=>{if(!e.state?.congressUI)return;restoring=true;apply(e.state.congressUI);queueMicrotask(()=>restoring=false);});
 return {replace,close(){if(history.state?.congressUI?.dialog){history.go(-(history.state.modalDepth||1));}else{const s=read();s.dialog=null;apply(s);replace();}}};
}
