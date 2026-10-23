/* NEBULA restoration: UI state and event handlers, with no network or storage. */
(function () {
  'use strict';
  const data=window.NebulaData, logic=window.NebulaLogic;
  const $=id=>document.getElementById(id);
  const state={query:'',zone:'All',seats:data.initialSeats,feedOnline:true,guide:false,detail:null,reservations:0};
  function el(tag,cls,text){
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(text!==undefined)node.textContent=text;
    return node;
  }
  function renderExhibits(){
    const grid=$('exhibit-grid'),error=$('feed-error');
    grid.replaceChildren();
    error.hidden=state.feedOnline;
    grid.hidden=!state.feedOnline;
    if(!state.feedOnline){
      $('search-status').textContent='EXHIBIT SIGNAL LOST · RECOVERY AVAILABLE';
      closeDetail();
      return;
    }
    const result=logic.search(data.exhibits,state.query,state.zone);
    if(!result.ok){
      $('search-status').textContent=result.message;
      closeDetail();return;
    }
    $('search-status').textContent=result.message;
    if(result.items.length===0){
      const nothing=el('div','empty-state');
      const h=el('h3',null,'Nothing in this orbit.');
      const p=el('p',null,'Try another search or select All worlds.');
      nothing.append(h,p);grid.append(nothing);
      closeDetail();return;
    }
    for(const item of result.items){
      const card=el('article','exhibit-card');
      card.dataset.exhibit=item.id;
      const scene=el('div','card-scene '+item.color);
      scene.setAttribute('aria-hidden','true');
      const top=el('div','card-topline');
      top.append(el('span',null,item.kind),el('span',null,'NM // '+item.number));
      const glow=el('div','scene-glow'),planet=el('div','scene-planet'),ring=el('div','scene-orbit');
      const cross=el('span','scene-cross','✦');
      scene.append(top,glow,planet,ring,cross);
      const body=el('div','card-body');
      const meta=el('div','card-meta');
      meta.append(el('span',null,item.zone.toUpperCase()+' ZONE'),el('span',null,item.number+'/06'));
      const title=el('h3',null,item.name),description=el('p',null,item.summary);
      const foot=el('div','card-foot');
      const tag=el('span',null,'DISCOVER EXHIBIT');
      const button=el('button',null,'↗');button.type='button';
      button.setAttribute('aria-label','Explore '+item.name);
      button.dataset.exhibitButton=item.id;
      button.addEventListener('click',()=>showDetail(item,button));
      foot.append(tag,button);
      body.append(meta,title,description,foot);
      card.append(scene,body);grid.append(card);
    }
    if(state.detail && !result.items.some(e=>e.id===state.detail))closeDetail();
  }
  function showDetail(item,opener){
    $('detail-zone').textContent=item.zone.toUpperCase()+' ZONE / IMMERSIVE EXPERIENCE';
    $('detail-title').textContent=item.name;
    $('detail-copy').textContent=item.summary+' This exhibit is a fictional artistic concept; no real astronomy or live visitor service is provided.';
    $('exhibit-detail').hidden=false;
    state.detail=item.id;
    $('close-detail').dataset.returnTo=item.id;
    $('exhibit-detail').scrollIntoView({block:'nearest',behavior:'auto'});
    $('close-detail').focus({preventScroll:true});
  }
  function closeDetail(){
    $('exhibit-detail').hidden=true;state.detail=null;
  }
  function renderBooking(){
    $('seats-left').textContent=String(state.seats);
    const quote=logic.quote($('guest-count').value,data.unitPrice,data.maxGuests);
    $('quote-total').textContent=quote===null?'—':String(quote)+' CR';
  }
  function book(){
    const result=logic.reserve(state.seats,$('guest-count').value,data.unitPrice,data.maxGuests);
    const output=$('booking-status');
    output.className=result.ok?'success':'error';
    if(!result.ok){output.textContent=result.message;renderBooking();return;}
    state.seats=result.availableAfter;
    state.reservations+=1;
    output.textContent=result.message+' '+result.totalCredits+' fictional credits. No payment processed.';
    renderBooking();
  }
  function resetBooking(){
    state.seats=data.initialSeats;state.reservations=0;
    $('guest-count').value='2';
    $('booking-status').className='';
    $('booking-status').textContent='Demo seats restored. No reservation is active.';
    renderBooking();
  }
  function renderGuide(){
    $('guide-toggle').setAttribute('aria-pressed',String(state.guide));
    $('guide-toggle-text').textContent=state.guide?'Disable guide captions':'Enable guide captions';
    $('guide-caption').hidden=!state.guide;
  }
  function setFeedOnline(online){
    state.feedOnline=online===true;
    renderExhibits();
  }
  function bind(){
    $('search-input').addEventListener('input',e=>{
      state.query=e.target.value;renderExhibits();
    });
    for(const button of document.querySelectorAll('[data-zone]')){
      button.addEventListener('click',()=>{
        state.zone=button.dataset.zone;
        for(const b of document.querySelectorAll('[data-zone]')){
          const chosen=b.dataset.zone===state.zone;
          b.setAttribute('aria-pressed',String(chosen));
          b.classList.toggle('active',chosen);
        }
        renderExhibits();
      });
    }
    $('guide-toggle').addEventListener('click',()=>{
      state.guide=!state.guide;renderGuide();
    });
    $('simulate-outage').addEventListener('click',()=>setFeedOnline(false));
    $('restore-feed').addEventListener('click',()=>setFeedOnline(true));
    $('close-detail').addEventListener('click',()=>{
      const returnTo=$('close-detail').dataset.returnTo;
      closeDetail();
      const origin=[...document.querySelectorAll('[data-exhibit-button]')].find(e=>e.dataset.exhibitButton===returnTo);
      if(origin)origin.focus({preventScroll:true});
    });
    $('guest-count').addEventListener('input',renderBooking);
    $('reserve-button').addEventListener('click',book);
    $('reset-booking').addEventListener('click',resetBooking);
    $('run-tests').addEventListener('click',()=>{
      const report=window.NebulaChecks.runAll();
      const summary=$('test-summary'),list=$('test-list');
      summary.className='proof-summary '+(report.failed===0?'passed':'failed');
      summary.replaceChildren(el('span','proof-indicator'),
        document.createTextNode(report.passed+' / '+report.total+' actual browser assertions passed · '+report.failed+' failed'));
      list.replaceChildren();
      for(const test of report.results){
        const row=el('div','test-result'+(test.ok?'':' fail'));
        const id=el('span','test-id',test.id);
        const name=el('span','test-name',test.name);
        const status=el('span','test-status',test.ok?'PASS':'FAIL');
        row.title=test.detail;row.append(id,name,status);list.append(row);
      }
      window.lastNebulaReport=report;
    });
  }
  window.NebulaApp=Object.freeze({
    getState:()=>({...state}),
    setFeedOnline,
    resetBooking,
    searchState:()=>({query:state.query,zone:state.zone,count:document.querySelectorAll('.exhibit-card').length}),
    getControls:()=>({guide:$('guide-toggle'),booking:$('reserve-button'),outage:$('simulate-outage')})
  });
  bind();renderExhibits();renderBooking();renderGuide();
})();
