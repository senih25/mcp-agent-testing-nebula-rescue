/* Entirely invented geography, exhibitions, visitor data, prices and seat inventory. */
(function (g) {
  'use strict';
  const exhibits = [
    {id:'aether',name:'Aether Bloom',zone:'Light',kind:'LIVING LIGHT',summary:'Walk through a garden grown from starlight and impossible color.',tags:['bioluminescent','garden','aurora'],color:'mint',number:'01'},
    {id:'crystal',name:'Crystal Nursery',zone:'Cosmic',kind:'NEW WORLDS',summary:'Witness a newborn planet unfold within a crystalline nebula.',tags:['nebula','crystal','planet'],color:'violet',number:'02'},
    {id:'ion',name:'The Ion Tide',zone:'Light',kind:'ENERGY IN MOTION',summary:'Ride the luminous tides of a theoretical electric ocean.',tags:['electric','ocean','ion'],color:'cyan',number:'03'},
    {id:'echoes',name:'Atlas of Echoes',zone:'Sound',kind:'SPACE / SOUND',summary:'Hear signals from a universe that only exists in imagination.',tags:['signal','music','acoustic'],color:'gold',number:'04'},
    {id:'velvet',name:'Velvet Eclipse',zone:'Cosmic',kind:'SHADOW THEATRE',summary:'Enter the quiet geometry of a never-observed eclipse.',tags:['eclipse','shadow','moon'],color:'rose',number:'05'},
    {id:'archive',name:'Luminous Archive',zone:'History',kind:'FUTURE / MEMORY',summary:'Discover imaginary relics from a civilization yet to be born.',tags:['memory','future','artifact'],color:'blue',number:'06'}
  ];
  const publicData = {name:'NEBULA — Museum of Tomorrow',exhibits,initialSeats:18,unitPrice:28,currency:'CR',maxGuests:6};
  g.NebulaData = Object.freeze(publicData);
  if (typeof module === 'object' && module.exports) module.exports = publicData;
})(typeof window === 'undefined' ? globalThis : window);
