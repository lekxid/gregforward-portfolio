import {readFileSync,existsSync,statSync,mkdirSync,cpSync} from 'node:fs';
import assert from 'node:assert/strict';
const pages=['index.html',...['azure','network','backend','delivery'].map(x=>`projects/${x}.html`)];
for(const file of pages){
 const html=readFileSync(file,'utf8');
 assert.match(html,/<html lang="en">/);assert.match(html,/<meta name="viewport"/);assert.match(html,/<title>[^<]+<\/title>/);
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${file}: one primary heading`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:)/.test(url)) continue;
  let [target,id]=url.split('#');target=target.replace(/^\//,'')|| (url.startsWith('/')?'index.html':file);
  if(target.endsWith('/'))target+='index.html';
  assert.ok(existsSync(target),`${file}: missing ${target}`);
  if(id)assert.ok(readFileSync(target,'utf8').includes(`id="${id}"`),`${file}: missing anchor ${url}`);
 }
}
assert.ok(readFileSync('resume.pdf').subarray(0,5).equals(Buffer.from('%PDF-')));
assert.ok(statSync('assets/profile.webp').size<200000,'optimized portrait budget');
assert.ok(statSync('assets/app.js').size<15000,'JavaScript budget');
assert.ok(statSync('assets/style.css').size<25000,'stylesheet budget');
assert.ok(!readFileSync('index.html','utf8').includes('Live Cloud Infrastructure Online'));
if(process.argv.includes('--build')){
 mkdirSync('dist',{recursive:true});
 for(const path of ['index.html','assets','projects','resume.pdf','CNAME','robots.txt','sitemap.xml','.nojekyll'])cpSync(path,`dist/${path}`,{recursive:true});
}
console.log(`Validated ${pages.length} pages, local links, resume, metadata and asset budgets.`);
