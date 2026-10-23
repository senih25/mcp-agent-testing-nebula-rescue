'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const logic = require('../logic.js');
const data = require('../museum-data.js');
test('lowercase exhibit search repairs the seeded failure',()=> {
 const r=logic.search(data.exhibits,'crystal','All');
 assert.equal(r.ok,true);assert.equal(r.count,1);assert.equal(r.items[0].id,'crystal');
});
test('search ignores surrounding whitespace and case',()=>{
 assert.equal(logic.search(data.exhibits,' CRYSTAL ','All').items[0].id,'crystal');
});
test('searches synthetic metadata and tags',()=>{
 assert.equal(logic.search(data.exhibits,'aurora','All').items[0].id,'aether');
});
test('category filter selects only matching exhibits',()=>{
 const r=logic.search(data.exhibits,'','Cosmic');
 assert.equal(r.count,2);assert.ok(r.items.every(x=>x.zone==='Cosmic'));
});
test('combined query and category works',()=>{
 assert.equal(logic.search(data.exhibits,'eclipse','Light').count,0);
});
test('no results returns a useful message',()=>{
 const r=logic.search(data.exhibits,'unfindable','All');
 assert.equal(r.ok,true);assert.equal(r.count,0);assert.match(r.message,/No matches/);
});
test('invalid and unavailable feed data fail safely',()=>{
 assert.equal(logic.search(null,'','All').code,'FEED_UNAVAILABLE');
 assert.equal(logic.search([null],'','All').code,'FEED_UNAVAILABLE');
});
test('bad search input and zone are rejected',()=>{
 assert.equal(logic.search(data.exhibits,42,'All').code,'INVALID_FILTER');
 assert.equal(logic.search(data.exhibits,'','invalid').code,'INVALID_FILTER');
 assert.equal(logic.search(data.exhibits,'x'.repeat(121),'All').code,'INVALID_FILTER');
});
test('reservation subtracts availability and reports total',()=>{
 const r=logic.reserve(18,2,28,6);
 assert.equal(r.ok,true);assert.equal(r.availableAfter,16);assert.equal(r.totalCredits,56);
});
test('successive reservations preserve the seat invariant',()=>{
 let seats=18;
 for(const qty of [2,3,1]){
  const r=logic.reserve(seats,qty,28,6);
  assert.equal(r.ok,true);assert.equal(r.availableAfter,seats-qty);seats=r.availableAfter;
 }
 assert.equal(seats,12);
});
test('blank and malformed quantities are rejected',()=>{
 for(const count of ['',NaN,undefined,{},'banana']){
  assert.equal(logic.reserve(18,count,28,6).ok,false);
 }
});
test('fractional, negative and excessive quantities are rejected',()=>{
 for(const count of [0,1.5,-2,7,100]){
  assert.equal(logic.reserve(18,count,28,6).code,'INVALID_GUESTS');
 }
});
test('insufficient capacity refuses reservation',()=>{
 assert.equal(logic.reserve(1,2,28,6).code,'INSUFFICIENT_SEATS');
});
test('malformed inventories refuse reservation',()=>{
 for(const seats of [-1,1.5,Infinity])assert.equal(logic.reserve(seats,1,28,6).code,'INVALID_INVENTORY');
});
test('quote rejects invalid guests and calculates fictional credits',()=>{
 assert.equal(logic.quote('invalid',28,6),null);
 assert.equal(logic.quote('',28,6),null);
 assert.equal(logic.quote('3',28,6),84);
});
test('fixture has unique names, IDs and only synthetic categories',()=>{
 assert.equal(data.exhibits.length,6);
 assert.equal(new Set(data.exhibits.map(e=>e.id)).size,6);
 assert.equal(new Set(data.exhibits.map(e=>e.name)).size,6);
 assert.ok(data.exhibits.every(e=>logic.zones.includes(e.zone)));
});
