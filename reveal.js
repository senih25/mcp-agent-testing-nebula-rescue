/* Real before/after pages and evidence from local test execution. */
(function(){
 'use strict';
 const data=window.NebulaEvidence;
 const $=id=>document.getElementById(id);
 if(!data){
  $('mission-passed').textContent='—';
  $('overall-status').textContent='EVIDENCE UNAVAILABLE';
  return;
 }
 $('mission-passed').textContent=String(data.browser.passed);
 $('browser-result').textContent=data.browser.passed+' / '+data.browser.total;
 $('browser-stamp').textContent=data.browser.failed+' failed · Guarded browser';
 $('overall-status').textContent=data.browser.status==='PASS'?'VERIFIED '+data.browser.passed+'/'+data.browser.total:'FAILED CHECKS';
 $('assertion-total').textContent=data.browser.total+' EXECUTED ASSERTIONS';
 const defects=$('defect-list');
 for(const item of data.baseline.defects){
  const card=document.createElement('article');card.className='defect-card';
  const id=document.createElement('div');id.className='defect-index';id.textContent=item.id+' / CONFIRMED FAILURE';
  const title=document.createElement('h3');title.textContent=item.title;
  const before=document.createElement('p');before.textContent=item.before;
  const rootCause=document.createElement('p');rootCause.textContent='CAUSE — '+item.cause;
  const fix=document.createElement('div');fix.className='remedy';fix.textContent='REPAIR — '+item.repair;
  card.append(id,title,before,rootCause,fix);defects.append(card);
 }
 const assertions=$('assertion-list');
 for(const result of data.browser.results){
  const row=document.createElement('div');row.className='assertion'+(result.ok?'':' fail');
  const id=document.createElement('span');id.className='number';id.textContent=result.id;
  const name=document.createElement('span');name.className='label';name.textContent=result.name;
  const status=document.createElement('span');status.className='status';status.textContent=result.ok?'PASS':'FAIL';
  row.title=result.detail;row.append(id,name,status);assertions.append(row);
 }
 const footnote=document.createElement('p');footnote.className='proof-footnote';
 footnote.textContent='TEST TRANSPARENCY — '+data.notes.join(' ');
 $('stage-evidence').querySelector('.proof-content').append(footnote);
 // Guard against an embedded museum being replaced by its presentation page.
 // A single recovery attempt is permitted; repeated mismatches remain visible failures.
 const embeddedChecks = [];
 for(const [selector,relativeURL] of [
  ['#stage-after iframe','./museum.html'],
  ['#stage-compare .compare-cell:first-child iframe','./before.html'],
  ['#stage-compare .compare-cell:last-child iframe','./museum.html']
 ]){
  const frame=document.querySelector(selector);
  if(!frame)continue;
  const expected=new URL(relativeURL,location.href);
  let recoveryAttempts=0;
  function verifyDestination(){
   let loaded='';
   try{loaded=frame.contentWindow?.location.href||'';}
   catch(error){frame.dataset.routeStatus='inaccessible';return;}
   if(!loaded||loaded==='about:blank'){frame.dataset.routeStatus='loading';return;}
   const actual=new URL(loaded);
   if(actual.origin===expected.origin&&actual.pathname===expected.pathname){
    frame.dataset.routeStatus=recoveryAttempts?'recovered':'verified';return;
   }
   if(recoveryAttempts===0){
    recoveryAttempts=1;
    frame.dataset.routeStatus='recovering';
    frame.src=expected.href;
    return;
   }
   frame.dataset.routeStatus='failed';
   const badge=frame.closest('.stage-panel')?.querySelector('.stage-pill');
   if(badge){badge.textContent='EMBEDDED PAGE ERROR';badge.classList.remove('success');badge.classList.add('fail');}
  }
  frame.addEventListener('load',verifyDestination);
  embeddedChecks.push(verifyDestination);
  verifyDestination();
 }
 function select(stage){
  const allowed=['before','after','evidence','compare'];
  if(!allowed.includes(stage))stage='before';
  for(const btn of document.querySelectorAll('[data-stage]')){
   const active=btn.dataset.stage===stage;
   btn.classList.toggle('active',active);
   btn.setAttribute('aria-pressed',String(active));
  }
  for(const name of allowed){
   const target=$('stage-'+name);
   target.hidden=name!==stage;
   target.classList.toggle('active',name===stage);
  }
  window.scrollTo({top:0,behavior:'instant'});
 }
 for(const btn of document.querySelectorAll('[data-stage]')){
  btn.addEventListener('click',()=>select(btn.dataset.stage));
 }
 const requested=new URLSearchParams(window.location.search).get('stage')||'before';
 select(requested);
})();
