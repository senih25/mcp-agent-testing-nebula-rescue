/* Real in-browser regression checks. Failures are surfaced, never suppressed. */
(function () {
'use strict';
const data=window.NebulaData,logic=window.NebulaLogic;
const $=id=>document.getElementById(id);
const tests=[
['T01','Lowercase exhibit search',()=>logic.search(data.exhibits,'crystal','All').items.some(x=>x.id==='crystal')],
['T02','Mixed-case normalized search',()=>logic.search(data.exhibits,'  cRYsTal  ','All').items[0]?.id==='crystal'],
['T03','Tag search finds a world',()=>logic.search(data.exhibits,'aurora','All').items[0]?.id==='aether'],
['T04','Category filter isolates cosmic',()=>{const r=logic.search(data.exhibits,'','Cosmic');return r.count===2&&r.items.every(e=>e.zone==='Cosmic');}],
['T05','Combined search and category',()=>logic.search(data.exhibits,'eclipse','Light').count===0],
['T06','No-match state is safe',()=>{const r=logic.search(data.exhibits,'nonexistent-planet','All');return r.ok&&r.count===0&&!!r.message;}],
['T07','Invalid search value rejected',()=>logic.search(data.exhibits,42,'All').code==='INVALID_FILTER'],
['T08','Invalid zone rejected',()=>logic.search(data.exhibits,'','Other').code==='INVALID_FILTER'],
['T09','Missing feed is a safe error',()=>logic.search(null,'','All').code==='FEED_UNAVAILABLE'],
['T10','Reservation subtracts two seats',()=>{const r=logic.reserve(18,2,28,6);return r.ok&&r.availableAfter===16;}],
['T11','Reservation arithmetic is exact',()=>{const r=logic.reserve(18,2,28,6);return r.totalCredits===56&&r.availableBefore===18;}],
['T12','Repeated reservations consistent',()=>{const r=logic.reserve(18,2,28,6);const s=logic.reserve(r.availableAfter,3,28,6);return s.ok&&s.availableAfter===13;}],
['T13','Blank guest count rejected',()=>logic.reserve(18,'',28,6).code==='INVALID_GUESTS'],
['T14','Fractional guest count rejected',()=>logic.reserve(18,'1.5',28,6).code==='INVALID_GUESTS'],
['T15','Negative guest count rejected',()=>logic.reserve(18,-2,28,6).code==='INVALID_GUESTS'],
['T16','Maximum guest count enforced',()=>logic.reserve(18,7,28,6).code==='INVALID_GUESTS'],
['T17','Excess reservation rejected',()=>logic.reserve(1,2,28,6).code==='INSUFFICIENT_SEATS'],
['T18','Invalid inventory rejected',()=>logic.reserve(-1,2,28,6).code==='INVALID_INVENTORY'],
['T19','Invalid quote is not calculated',()=>logic.quote('banana',28,6)===null],
['T20','Guide toggle updates UI state',()=>{
 const b=$('guide-toggle'),before=b.getAttribute('aria-pressed');
 b.click();const after=b.getAttribute('aria-pressed');
 const consistent=$('guide-caption').hidden===(after==='false');
 b.click();return before!==after&&b.getAttribute('aria-pressed')===before&&consistent;
}],
['T21','Outage and recovery path work',()=>{
 const app=window.NebulaApp,original=app.getState().feedOnline;
 app.setFeedOnline(false);
 const visible=!$('feed-error').hidden&&$('exhibit-grid').hidden&&!!$('restore-feed');
 $('restore-feed').click();const recovered=$('feed-error').hidden&&!$('exhibit-grid').hidden;
 if(!original)app.setFeedOnline(false);
 return visible&&recovered;
}],
['T22','Exhibit details open and close',()=>{
 const first=document.querySelector('[data-exhibit-button]');
 if(!first)return false;
 const y=scrollY;first.click();const opened=!$('exhibit-detail').hidden;
 $('close-detail').click();const closed=$('exhibit-detail').hidden;
 scrollTo({top:y,behavior:'instant'});return opened&&closed;
}],
['T23','Document fits viewport',()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2],
['T24','Controls have accessible names',()=>[...document.querySelectorAll('button,input')].every(el=>
 Boolean((el.getAttribute('aria-label')||el.closest('label')?.textContent||
   (el.id&&document.querySelector('label[for="'+el.id+'"]')?.textContent)||
   el.textContent||el.getAttribute('placeholder')||'').trim()))],
['T25','No third-party resources linked',()=>[...document.querySelectorAll('[src],[href]')].every(e=>
 !/^(https?:)?\/\//i.test(e.getAttribute('src')||e.getAttribute('href')||''))],
['T26','Active motion preference is respected',()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const animated=document.querySelector('.starfield.s2');
 const duration=parseFloat(getComputedStyle(animated).animationDuration);
 return Number.isFinite(duration)&&(!reduced||duration<=0.01);
}],
['T27','Synthetic disclosure visible',()=>document.querySelector('.demo-chip')?.textContent.includes('SYNTHETIC')&&document.querySelector('.disclaimer')?.textContent.includes('NO PAYMENT')],
['T28','Search input interacts with UI',()=>{
 const input=$('search-input'),prior=input.value;
 input.value='crystal';input.dispatchEvent(new Event('input',{bubbles:true}));
 const filtered=[...document.querySelectorAll('.exhibit-card')].some(e=>e.dataset.exhibit==='crystal') &&
 document.querySelectorAll('.exhibit-card').length===1;
 input.value=prior;input.dispatchEvent(new Event('input',{bubbles:true}));return filtered;
}],
['T29','Booking control updates inventory',()=>{
 window.NebulaApp.resetBooking();
 const input=$('guest-count'),prior=input.value;
 const before=Number($('seats-left').textContent);
 input.value='2';$('reserve-button').click();
 const worked=Number($('seats-left').textContent)===before-2;
 window.NebulaApp.resetBooking();
 input.value=prior;input.dispatchEvent(new Event('input',{bubbles:true}));
 return worked&&before===data.initialSeats;
}]
];
function runAll(){
 const results=tests.map(([id,name,fn])=>{
  try{const ok=fn()===true;return{id,name,ok,status:ok?'PASS':'FAIL',detail:ok?'Assertion satisfied':'Assertion returned false'};}
  catch(err){return{id,name,ok:false,status:'FAIL',detail:String(err?.message||err)};}
 });
 const passed=results.filter(r=>r.ok).length;
 return {suite:'NEBULA restored website — browser regression',ranAt:new Date().toISOString(),
 total:results.length,passed,failed:results.length-passed,status:passed===results.length?'PASS':'FAIL',results};
}
window.NebulaChecks=Object.freeze({runAll});
})();
