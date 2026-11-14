const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const net=require('node:net');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
let child,base,cookie,temp;
async function freePort(){return await new Promise((resolve,reject)=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p))});s.on('error',reject)})}
before(async()=>{const port=await freePort();temp=fs.mkdtempSync(path.join(os.tmpdir(),'savetrack-v25-test-'));base=`http://127.0.0.1:${port}`;child=spawn(process.execPath,[path.join(__dirname,'server.js')],{cwd:__dirname,env:{...process.env,PORT:String(port),APP_ORIGIN:base,DATA_DIR:temp,NODE_ENV:'test'},stdio:'ignore'});let ready=false;for(let i=0;i<60;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}if(!ready)throw new Error('SaveTrack test server did not start')});
after(()=>{if(child&&!child.killed)child.kill('SIGTERM');if(temp)fs.rmSync(temp,{recursive:true,force:true})});
test('register, upload cloud snapshot, reject stale revision and restore latest snapshot',async()=>{
 const reg=await fetch(base+'/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'cloud-test@example.com',password:'StrongPassword123'})});assert.equal(reg.status,201);cookie=reg.headers.get('set-cookie').split(';')[0];
 const empty=await fetch(base+'/api/sync',{headers:{Cookie:cookie}});assert.equal(empty.status,200);assert.deepEqual(await empty.json(),{exists:false,data:null,revision:0});
 const doc={version:6,goals:[{id:'goal-1',name:'Emergency fund',target:1000}],moneyEntries:[]};
 const put=await fetch(base+'/api/sync',{method:'PUT',headers:{Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify({revision:0,data:doc})});assert.equal(put.status,200);assert.equal((await put.json()).revision,1);
 const stale=await fetch(base+'/api/sync',{method:'PUT',headers:{Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify({revision:0,data:doc})});assert.equal(stale.status,409);
 const restored=await fetch(base+'/api/sync',{headers:{Cookie:cookie}});const saved=await restored.json();assert.equal(saved.revision,1);assert.equal(saved.data.goals[0].name,'Emergency fund');
});



test('manual-only mode has no payment-provider or wallet transaction endpoints',async()=>{const health=await fetch(base+'/api/health');const h=await health.json();assert.equal(h.version,'28.0.0');assert.equal(h.entryMode,'manual-only');assert.equal(h.externalTransactionTracking,false);for(const path of ['/api/payments/initialize','/api/payments/history','/api/payments/verify','/api/contacts']){const r=await fetch(base+path);assert.equal(r.status,404)}});
