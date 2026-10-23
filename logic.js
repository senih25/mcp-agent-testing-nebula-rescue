/* NEBULA pure domain logic: dependency-free and independently testable. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (root) root.NebulaLogic = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? null : window, function () {
  'use strict';
  const zones = Object.freeze(['All','Cosmic','Light','Sound','History']);
  function normalized(value) {
    return value.normalize('NFKD').toLocaleLowerCase('en-US').replace(/[\u0300-\u036f]/g,'').trim();
  }
  function search(exhibits, query, zone) {
    if (!Array.isArray(exhibits) || exhibits.some(e=>!e || typeof e.name!=='string' ||
      typeof e.zone!=='string' || !Array.isArray(e.tags))) {
      return {ok:false,code:'FEED_UNAVAILABLE',items:[],message:'The exhibit feed is temporarily unavailable.'};
    }
    if (typeof query!=='string' || query.length>120 || !zones.includes(zone)) {
      return {ok:false,code:'INVALID_FILTER',items:[],message:'Please enter a shorter search query or choose a valid zone.'};
    }
    const term=normalized(query);
    const found=exhibits.filter(e => {
      if(zone!=='All' && e.zone!==zone)return false;
      const haystack=normalized([e.name,e.zone,e.kind,e.summary,...e.tags].join(' '));
      return !term || haystack.includes(term);
    });
    return {ok:true,code:'OK',items:found,count:found.length,message:found.length ?
      found.length+' fictional exhibit'+(found.length===1?'':'s')+' found' :
      'No matches. Try another word or choose All zones.'};
  }
  function reserve(available, rawGuests, unitPrice, maxGuests) {
    const maximum=Number.isInteger(maxGuests)&&maxGuests>0?maxGuests:6;
    if (!Number.isSafeInteger(available)||available<0 ||
      !Number.isSafeInteger(unitPrice)||unitPrice<0) {
      return {ok:false,code:'INVALID_INVENTORY',message:'Reservation inventory is unavailable.'};
    }
    const validType=typeof rawGuests==='string'||typeof rawGuests==='number';
    if (!validType||String(rawGuests).trim()==='') {
      return {ok:false,code:'INVALID_GUESTS',message:'Enter a whole number of guests.'};
    }
    const guests=Number(rawGuests);
    if (!Number.isSafeInteger(guests)||guests<1||guests>maximum) {
      return {ok:false,code:'INVALID_GUESTS',message:'Choose 1 to '+maximum+' guests.'};
    }
    if (guests>available) return {ok:false,code:'INSUFFICIENT_SEATS',
      message:'Not enough demo seats. '+available+' remain.'};
    return {ok:true,code:'RESERVED',guests,availableBefore:available,
      availableAfter:available-guests,totalCredits:guests*unitPrice,
      message:'Demo reservation confirmed for '+guests+' guest'+(guests===1?'':'s')+'.'};
  }
  function quote(rawGuests,unitPrice,maxGuests) {
    const count=Number(rawGuests);
    if (typeof rawGuests==='string'&&rawGuests.trim()==='') return null;
    return Number.isSafeInteger(count)&&count>=1&&count<=(maxGuests||6)?count*unitPrice:null;
  }
  return Object.freeze({zones,search,reserve,quote});
});
