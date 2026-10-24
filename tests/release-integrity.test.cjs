'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const file=name=>fs.readFileSync(path.join(root,name),'utf8');
const present=name=>fs.statSync(path.join(root,name)).isFile();
test('GitHub Pages root is the full before/after presentation',()=>{
 assert.match(file('index.html'),/OPERATION NEBULA RESCUE/);
 assert.match(file('index.html'),/data-stage="after"/);
 assert.match(file('index.html'),/data-stage="compare"/);
});
test('museum is an independent page with real application script',()=>{
 assert.match(file('museum.html'),/museum-app\.js/);
 assert.match(file('museum.html'),/Museum of Tomorrow/);
});
test('both presentation routes embed the packaged museum path',()=>{
 for(const page of ['index.html','reveal.html']){
  assert.equal((file(page).match(/src="\.\/museum\.html"/g)||[]).length,2);
  assert.ok(!/src="\.\/index\.html"/.test(file(page)));
 }
});
test('frame guard checks both AFTER and COMPARE destinations',()=>{
 const code=file('reveal.js');
 assert.equal((code.match(/'\.\/museum\.html'/g)||[]).length,2);
 assert.match(code,/frame\.dataset\.routeStatus='failed'/);
 assert.match(code,/recoveryAttempts/);
});
test('museum comparison navigation cannot recurse inside an iframe',()=>{
 assert.match(file('museum.html'),/target="_top"/);
 assert.match(file('museum.html'),/href="\.\/reveal\.html\?stage=compare"/);
});
test('BEFORE prototype is preserved as deliberately defective',()=>{
 assert.match(file('broken.js'),/item\.name\.includes\(q\)/);
 assert.match(file('broken.js'),/available\s*\+=\s*qty/);
 assert.match(file('before.css'),/min-width:1120px/);
});
test('all page script, stylesheet and iframe dependencies resolve under repo prefix',()=>{
 const origin='https://example.test/mcp-agent-testing-nebula-rescue/';
 for(const page of ['index.html','reveal.html','museum.html','before.html']){
  const html=file(page);
  const refs=[...html.matchAll(/<(?:script|iframe|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)].map(x=>x[1]).filter(x=>x.startsWith('./'));
  assert.ok(refs.length>0,page+' should load its assets');
  for(const ref of refs){
   const url=new URL(ref,origin+page);
   assert.equal(url.origin,'https://example.test',page+' external dependency');
   assert.ok(url.pathname.startsWith('/mcp-agent-testing-nebula-rescue/'),'Link escaped project prefix');
   const rel=url.pathname.replace('/mcp-agent-testing-nebula-rescue/','');
   assert.ok(present(rel),page+' missing asset '+rel);
  }
 }
});
test('no executable PowerShell, terminal helper or server source is in release',()=>{
 for(const name of ['server.cjs','restart-own-server.ps1','window-snapshot.ps1','position-nebula-right.ps1','prepare-public-release.cjs']){
  assert.ok(!fs.existsSync(path.join(root,name)),name+' must not be public');
 }
});
test('browser runtime has no third-party scripts or remote fonts',()=>{
 for(const name of ['museum.html','reveal.html','index.html','before.html','museum.css','reveal.css','before.css']){
  assert.ok(!/<script\b[^>]*src="https?:\/\//i.test(file(name)));
  assert.ok(!/@import\s+url\(\s*['"]?https?:/i.test(file(name)));
 }
});
test('page explicitly says synthetic demo and no payment',()=>{
 assert.match(file('museum.html'),/SYNTHETIC DEMO/);
 assert.match(file('museum.html'),/DEMO ONLY — NO PAYMENT/);
 assert.match(file('index.html'),/SYNTHETIC SITE/);
});
test('repaired museum has keyboard and motion accommodations',()=>{
 assert.match(file('museum.css'),/:focus-visible/);
 assert.match(file('museum.css'),/prefers-reduced-motion/);
 assert.match(file('museum.html'),/aria-pressed/);
});
test('source scripts compile as JavaScript',()=>{
 for(const name of ['broken.js','museum-data.js','logic.js','museum-app.js','museum-tests.js','reveal.js','evidence-data.js']){
  assert.doesNotThrow(()=>new vm.Script(file(name),{filename:name}));
 }
});
test('historical failing 28 of 29 assertions remains disclosed',()=>{
 assert.match(file('evidence-data.js'),/28\/29/);
 assert.match(file('docs/TESTING.md'),/28\/29/);
});
test('native Node test evidence exists',()=>{
 assert.ok(present('evidence/unit-tap.log'));
 assert.match(file('evidence/unit-tap.log'),/pass\s+16/);
});
test('Jekyll bypass exists for a static Pages source',()=>{
 assert.ok(present('.nojekyll'));
});
test('no deployed media or video content is included',()=>{
 const ext=/\.(mp4|mov|avi|wav|mp3|webm)$/i;
 function scan(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);const s=fs.lstatSync(p);if(s.isDirectory())scan(p);else assert.ok(!ext.test(name),'Media file not approved: '+name);}}
 scan(root);
});
