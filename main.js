/* عرض أي خطأ جافاسكربت أعلى الشاشة (للتشخيص على الجوال). احذف هذا الجزء عند الإطلاق */
window.addEventListener('error',function(e){
 var b=document.getElementById('errBanner');
 if(!b){b=document.createElement('div');b.id='errBanner';b.style.cssText='position:fixed;top:0;left:0;right:0;z-index:9999;background:#7f1d1d;color:#fff;font:12px monospace;padding:8px;direction:ltr;white-space:pre-wrap';document.body.appendChild(b)}
 b.textContent+=e.message+' (line '+e.lineno+')\n';
});

/* ========== config.js ==========
   الإعدادات: رقم الواتساب، الباقات والأسعار، صفحات القائمة. أغلب التعديلات البسيطة هنا.
*/

/* رقم واتساب التغذية (بدون + أو مسافات) */
const WA_NUMBER = '249124673541';

/* رصيد ابتدائي للحساب الجديد (للتجربة فقط). اجعله 0 عند الإطلاق الحقيقي */
const START_BALANCE = 2500;


const PACKS=[
 {n:'110 جواهر',c:100,i:'fa-gem'},{n:'231 جوهرة',c:200,i:'fa-gem'},{n:'583 جوهرة',c:500,i:'fa-gem',tag:'الأكثر طلباً'},
 {n:'1188 جوهرة',c:1000,i:'fa-gem'},{n:'عضوية أسبوعية',c:220,i:'fa-calendar-week'},{n:'عضوية شهرية',c:950,i:'fa-crown'}
];

const PAGES=[['home','الرئيسية','fa-house'],['orders','طلباتي','fa-receipt'],['profile','حسابي','fa-user'],['help','الدعم','fa-headset'],['terms','الشروط','fa-shield-halved']];

/* ========== utils.js ==========
   أدوات مساعدة وحالة الموقع (المستخدمون، المستخدم الحالي، الباقة المختارة) وحفظ البيانات.
*/

const $=id=>document.getElementById(id);

const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};

const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

let users=get('pl_users',{}), me=get('pl_me',null), sel=PACKS[0], mode='l', busy=false;


// المستخدم الحالي + حفظ البيانات
const U=()=>users[me], save=()=>set('pl_users',users);


// رسالة صغيرة تظهر أعلى الشاشة
function toast(t){const x=$('toast');x.textContent=t;x.style.display='block';setTimeout(()=>x.style.display='none',2200)}

/* ========== auth.js ==========
   تسجيل الدخول وإنشاء الحساب والخروج، وتوليد المعرّف.
*/

// التبديل بين تبويب الدخول وتبويب حساب جديد
function authTab(m){mode=m;$('tabL').classList.toggle('on',m=='l');$('tabR').classList.toggle('on',m=='r');
 $('fgName').style.display=$('fgPass2').style.display=m=='r'?'block':'none';
 $('aBtn').innerHTML=m=='l'?'<i class="fa-solid fa-right-to-bracket"></i> دخول':'<i class="fa-solid fa-user-plus"></i> إنشاء الحساب';$('aErr').textContent=''}

// تشفير كلمة المرور (SHA-256) قبل حفظها
async function hash(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return btoa(unescape(encodeURIComponent(s)))}}

// زر الدخول/إنشاء الحساب: يفحص البيانات ثم يدخل
async function submitAuth(){
 const mail=$('aMail').value.trim().toLowerCase(),pass=$('aPass').value,e=$('aErr');e.textContent='';
 if(!/^\S+@\S+\.\S+$/.test(mail))return e.textContent='أدخل بريداً إلكترونياً صحيحاً.';
 if(pass.length<6)return e.textContent='كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
 const h=await hash(pass);
 if(mode=='r'){
  const name=$('aName').value.trim();
  if(name.length<3)return e.textContent='اسم المستخدم 3 أحرف على الأقل.';
  if(pass!==$('aPass2').value)return e.textContent='كلمتا المرور غير متطابقتين.';
  if(users[mail])return e.textContent='هذا البريد مسجل مسبقاً، سجّل الدخول.';
  users[mail]={name,h,bal:START_BALANCE,pid:'',orders:[],uid:genUid()};
 }else{
  if(!users[mail]||users[mail].h!==h)return e.textContent='البريد أو كلمة المرور غير صحيحة.';
 }
 set('pl_users',users);me=mail;set('pl_me',me);enter();
}

// تسجيل الخروج والرجوع لصفحة الدخول
function logout(){me=null;set('pl_me',null);$('app').style.display='none';$('auth').style.display='grid';$('aPass').value=''}

// توليد معرّف فريد من 8 أرقام لكل مستخدم (Paylit ID)
function genUid(){
 const used=new Set(Object.values(users).map(x=>x.uid));let id;
 do{id=String(Math.floor(10000000+Math.random()*90000000))}while(used.has(id));
 return id;
}

// نسخ معرّف المستخدم
function copyUid(){
 const t=U().uid;
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('تم نسخ المعرّف')).catch(()=>toast(t));
}

/* ========== nav.js ==========
   التنقل بين الصفحات وإظهار الموقع بعد الدخول.
*/

// بناء قائمة التنقل (من القائمة PAGES في config.js)
function buildNav(){
 $('navTop').innerHTML=PAGES.map(p=>`<a data-p="${p[0]}">${p[1]}</a>`).join('');
 $('navBot').innerHTML=PAGES.map(p=>`<a data-p="${p[0]}"><i class="fa-solid ${p[2]}"></i>${p[1]}</a>`).join('');
}

// الانتقال لصفحة (home/orders/profile/help/terms)
function go(p){
 document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id=='p-'+p));
 document.querySelectorAll('nav a,.bottom a').forEach(a=>a.classList.toggle('on',a.dataset.p==p));
 try{ if(me&&users[me]){ if(p=='orders')renderOrders(); if(p=='profile')renderProfile(); } }catch(e){ console.error(e) }
 window.scrollTo(0,0);
}

// أي ضغطة على رابط فيه data-p داخل القائمة تنقلك للصفحة (تعمل حتى لو لم تُبنَ القائمة بالجافاسكربت)
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('nav a[data-p], .bottom a[data-p]');
 if(a){ e.preventDefault(); go(a.dataset.p); }
});

// عرض الموقع بعد الدخول وتحميل بيانات المستخدم
function enter(){
 if(!U().uid){U().uid=genUid();save()}
 $('auth').style.display='none';$('app').style.display='block';
 $('hi').textContent=U().name;$('pid').value='';renderPacks();refresh();go('home');
}


/* ========== store.js ==========
   صفحة الرئيسية: الباقات، تنفيذ الشحن، نافذة الحالة.
*/

// رسم بطاقات الباقات (من PACKS في config.js)
function renderPacks(){
 $('pk').innerHTML=PACKS.map((p,i)=>`<div class="pc ${p===sel?'sel':''}" onclick="pick(${i})">${p.tag?`<span class="tag">${p.tag}</span>`:''}<i class="fa-solid ${p.i}"></i><div class="t">${p.n}</div><div class="p"><span class="coin">P</span>${p.c}</div></div>`).join('');
}

// اختيار باقة
function pick(i){sel=PACKS[i];renderPacks();refresh()}

// تحديث الرصيد وملخص الطلب وآخر العمليات
function refresh(){
 const u=U();$('bal').textContent=u.bal.toLocaleString('en');
 $('sName').textContent=sel.n;$('sCost').textContent=sel.c+' نقطة';
 const after=u.bal-sel.c;$('sAfter').textContent=after<0?'رصيد غير كافٍ':after+' نقطة';
 $('sAfter').style.color=after<0?'var(--rd)':'#fff';
 if(!$('pid').value&&u.pid)$('pid').value=u.pid;
 $('recent').innerHTML=list(u.orders.slice(0,4));
}

// رسم قائمة الطلبات (تستخدم في الرئيسية وصفحة طلباتي)
function list(a){
 if(!a.length)return '<div class="empty"><i class="fa-regular fa-folder-open"></i>لا توجد طلبات بعد. اختر باقة وابدأ أول شحن.</div>';
 return a.map(o=>`<div class="row"><div><b>${o.n}</b><small>ID ${o.pid} · ${o.id} · ${o.d}</small></div><span class="st ${o.ok?'ok':'no'}">${o.ok?'ناجح':'فاشل'}</span></div>`).join('');
}

// عرض نافذة الحالة (جاري/نجاح/فشل) وفاتورة الطلب
function showM(t,title,msg,rc){
 $('mi').className='mi '+t;$('mi').innerHTML={l:'<i class="fa-solid fa-spinner fa-spin"></i>',s:'<i class="fa-solid fa-circle-check"></i>',e:'<i class="fa-solid fa-circle-xmark"></i>'}[t];
 $('mt').textContent=title;$('mm').textContent=msg;$('mb').style.display=t=='l'?'none':'block';
 $('rc').style.display=rc?'block':'none';if(rc){$('rP').textContent=rc.pid;$('rN').textContent=rc.n;$('rC').textContent=rc.c+' نقطة';$('rO').textContent=rc.id}
 $('ov').style.display='flex';
}

// إغلاق نافذة الحالة
function closeM(){$('ov').style.display='none'}

// تنفيذ الشحن: فحص الـ ID والرصيد ثم الخصم وتسجيل الطلب. اربط API المورد هنا
function order(){
 if(busy)return;const u=U(),pid=$('pid').value.trim(),e=$('oErr');e.textContent='';
 if(!/^\d{6,12}$/.test(pid))return e.textContent='Player ID يجب أن يكون أرقاماً فقط (6 إلى 12 رقم).';
 if(u.bal<sel.c)return showM('e','رصيدك غير كافٍ',`تحتاج ${sel.c} نقطة وعندك ${u.bal}. غذِّ رصيدك ثم أعد المحاولة.`);
 busy=true;showM('l','جاري تنفيذ الطلب','لا تغلق الصفحة حتى يكتمل الشحن.');
 setTimeout(()=>{
  /* هنا اربط الـ API الحقيقي للمورد، وعدّل ok حسب ردّه */
  const ok=true,id='#PL-'+Math.floor(100000+Math.random()*900000);
  const o={id,pid,n:sel.n,c:sel.c,ok,d:new Date().toLocaleDateString('ar-EG')};
  if(ok)u.bal-=sel.c;u.orders.unshift(o);u.pid=pid;save();busy=false;refresh();
  ok?showM('s','تم الشحن بنجاح','تم إرسال الباقة إلى حساب اللاعب.',o):showM('e','فشل الطلب','لم يتم خصم أي نقاط. حاول مجدداً.');
 },1600);
}


/* ========== pages.js ==========
   باقي الصفحات: طلباتي، حسابي، الدعم، تغذية الرصيد.
*/

// عرض كل الطلبات بصفحة طلباتي
function renderOrders(){$('allOrders').innerHTML=list(U().orders)}

// تعبئة صفحة حسابي (إحصائيات + بيانات)
function renderProfile(){
 const u=U(),ok=u.orders.filter(o=>o.ok);
 $('pUid').textContent=u.uid;$('stBal').textContent=u.bal;$('stCnt').textContent=ok.length;$('stSpent').textContent=ok.reduce((s,o)=>s+o.c,0);
 $('pName').value=u.name;$('pMail').value=me;$('pPid').value=u.pid||'';
}

// حفظ الاسم والـ Player ID
function saveProfile(){
 const n=$('pName').value.trim(),p=$('pPid').value.trim();
 if(n.length<3)return toast('اسم المستخدم 3 أحرف على الأقل');
 if(p&&!/^\d{6,12}$/.test(p))return toast('Player ID غير صحيح');
 const u=U();u.name=n;u.pid=p;save();$('hi').textContent=n;toast('تم حفظ التغييرات');
}

// تغيير كلمة المرور
async function changePass(){
 const u=U(),e=$('cErr');e.textContent='';
 if(await hash($('cOld').value)!==u.h)return e.textContent='كلمة المرور الحالية غير صحيحة.';
 if($('cNew').value.length<6)return e.textContent='الجديدة يجب أن تكون 6 أحرف على الأقل.';
 u.h=await hash($('cNew').value);save();$('cOld').value=$('cNew').value='';toast('تم تحديث كلمة المرور');
}

// إرسال رسالة الدعم عبر واتساب
function sendSupport(){
 if($('sSub').value.trim().length<3||$('sMsg').value.trim().length<10)return toast('اكتب الموضوع ورسالة واضحة');
 const u=U(),t=`الدعم - ${$('sSub').value.trim()}\nالمعرّف: ${u.uid}\nالاسم: ${u.name}\n\n${$('sMsg').value.trim()}`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`,'_blank');
 $('sSub').value=$('sMsg').value='';
}

// فتح نافذة تغذية الرصيد (واتساب)
function topUp(){
 const u=U(),msg=`مرحباً، أريد تغذية رصيدي في Paylit.\nالمعرّف (ID): ${u.uid}\nالاسم: ${u.name}`;
 $('tUid').textContent=u.uid;
 $('waLink').href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
 $('tov').style.display='flex';
}

// إغلاق نافذة التغذية
function closeT(){$('tov').style.display='none'}

// نسخ رقم الواتساب
function copyWa(){
 const t='+'+WA_NUMBER;
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('تم نسخ الرقم')).catch(()=>toast(t));
}


/* ========== main.js ==========
   نقطة البداية: تشغيل الموقع. يجب أن يبقى آخر ملف يُحمّل.
*/

function init(){
 $('auth').addEventListener('keydown',function(e){if(e.key==='Enter')submitAuth()});
 buildNav();
 if(me&&users[me])enter();
}
// يشتغل بعد تحميل الصفحة حتى لو وضعت السكربت في <head>
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
