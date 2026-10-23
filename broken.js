/* Deliberately seeded defects — synthetic failure demo only. */
(function () {
  'use strict';
  const data=window.NebulaData, $=id=>document.getElementById(id);
  let available=data.initialSeats;
  function render() {
    const q=$('search-input').value.trim();
    // DEFECT F01: case-sensitive name-only match; query "crystal" incorrectly returns no result.
    const selected=data.exhibits.filter(item=>item.name.includes(q));
    const grid=$('exhibit-grid');grid.replaceChildren();
    for(const e of selected){
      const c=document.createElement('article');c.className='old-card';
      const eyebrow=document.createElement('span');eyebrow.className='tiny';eyebrow.textContent=e.zone.toUpperCase();
      const title=document.createElement('h3');title.textContent=e.name;
      const p=document.createElement('p');p.textContent=e.summary;
      c.append(eyebrow,title,p);grid.append(c);
    }
    $('result-count').textContent=selected.length+' exhibits';
    $('search-status').textContent=selected.length?('Found '+selected.length+' exhibits'):'No exhibits match. Try another query.';
  }
  $('search-input').addEventListener('input',render);
  $('reserve-button').addEventListener('click',()=>{
    const qty=Number($('guest-count').value);
    // DEFECT F02: seats increase rather than decrease on a confirmed reservation.
    available+=qty;
    $('seats-left').textContent=String(available);
    $('booking-status').textContent='Reservation recorded for '+qty+' guests.';
  });
  // DEFECT F04: a guide listener targets a missing element, so the actual button is inert.
  document.querySelector('#audio-guide-launch')?.addEventListener('click',()=>{
    $('guide-status').textContent='Guide is on.';
    $('guide-button').setAttribute('aria-pressed','true');
  });
  // DEFECT F03 lives in before.css: fixed minimum 1120px layout width.
  render();
  window.NebulaBroken={getAvailable:()=>available};
})();
