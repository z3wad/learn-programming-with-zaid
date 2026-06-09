

document.addEventListener
("contextmenu", e =>{
  e.preventDefault();
  alert("right click n disabled");
})
document.addEventListener("keydown",
  e=>{
    if(e.key === "F12")
    {
      e.preventDefault();
      alert("F12 disabled")
    }
  }
)
const QUESTIONS = [
  {q:'Which data type is best for storing a whole number in C#?', opts:['double','string','int','bool'], ans:2, exp:'int stores whole numbers like 1, -5, 100.'},
  {q:'What is the correct statement to print text to the console in C#?', opts:['print("Hello")','Console.WriteLine("Hello")','echo("Hello")','System.out.println("Hello")'], ans:1, exp:'C# uses Console.WriteLine() to print text with a newline.'},
  {q:'What is the result of: int x = 10 / 3; in C#?', opts:['3.33','3','4','Runtime error'], ans:1, exp:'Dividing int by int returns int; the decimal is truncated: 10/3 = 3.'},
  {q:'Which is a valid for loop in C#?', opts:['for i in range(5):','for (int i=0; i<5; i++)','loop i from 1 to 5','repeat 5 times'], ans:1, exp:'Syntax: for (initializer; condition; iterator) { ... }'},
  {q:'What does OOP stand for?', opts:['Only One Program','Object Oriented Programming','Output Of Process','Online Open Platform'], ans:1, exp:'OOP = Object-Oriented Programming — a programming paradigm using objects.'},
  {q:'Which keyword defines a class in C#?', opts:['object','define','class','type'], ans:2, exp:'We write: class MyClass { } to define a class.'},
  {q:'Which type stores only true or false?', opts:['int','char','string','bool'], ans:3, exp:'bool (Boolean) has only two values: true or false.'},
  {q:'What is try/catch used for?', opts:['Repeating code','Handling errors and exceptions','Defining methods','Creating objects'], ans:1, exp:'try/catch catches exceptions and prevents the program from crashing.'},
  {q:'What is the value of "Hello".Length in C#?', opts:['6','5','4','Error'], ans:1, exp:'"Hello" has 5 characters, so Length = 5.'},
  {q:'How do you define a dynamic list in C#?', opts:['int[] list = new int[5]','List<int> list = new()','dynamic list = []','ArrayList list[]'], ans:1, exp:'List<T> is a dynamic collection that grows automatically — the most commonly used.'}
];

const RESOURCES = [
  {icon:'',type:'website',title:'Microsoft Docs — C#',tag:'Official',desc:'Official Microsoft documentation for all C# topics in depth.',link:'https://learn.microsoft.com/dotnet/csharp/'},
  {icon:'',type:'website',title:'W3Schools C#',tag:'Beginner',desc:'Simple explanations with interactive examples, perfect for beginners.',link:'https://www.w3schools.com/cs/'},
  {icon:'',type:'website',title:'.NET Fiddle',tag:'Interactive',desc:'Run C# code directly in your browser — no installation needed.',link:'https://dotnetfiddle.net/'},
  {icon:'',type:'video',title:'Programming with Mosh',tag:'YouTube',desc:'Comprehensive C# course with clear, well-structured English explanations.',link:'https://www.youtube.com/c/programmingwithmosh'},
  {icon:'',type:'video',title:'IAmTimCorey on YouTube',tag:'YouTube',desc:'Advanced C# lessons and best practices from a professional developer.',link:'https://www.youtube.com/c/IAmTimCorey'},
  {icon:'',type:'book',title:'C# in Depth — Jon Skeet',tag:'Advanced',desc:'One of the best books for learning C# deeply from beginner to advanced.'},
  {icon:'',type:'book',title:'Head First C#',tag:'Beginner',desc:'A fun, interactive book — the perfect first read for C# beginners.'},
  {icon:'',type:'tool',title:'Visual Studio Community',tag:'IDE',desc:'Free IDE from Microsoft — the most powerful environment for C#.',link:'https://visualstudio.microsoft.com/'},
  {icon:'',type:'tool',title:'VS Code + C# Extension',tag:'IDE',desc:'Lightweight editor with a C# extension for fast development.',link:'https://code.visualstudio.com/'},
  {icon:'',type:'website',title:'LeetCode',tag:'Practice',desc:'Programming challenges in C# to sharpen your problem-solving skills.',link:'https://leetcode.com/'},
  {icon:'',type:'website',title:'Exercism — C# Track',tag:'Practice',desc:'C# exercises with community code review to improve your skills.',link:'https://exercism.org/tracks/csharp'},
  {icon:'',type:'video',title:'Nick Chapsas on YouTube',tag:'YouTube',desc:'Modern C# features and .NET ecosystem explained by an expert.',link:'https://www.youtube.com/@nickchapsas'},
];

/* ─── NAVIGATION ─── */
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === page));
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});

  if (page === 'home')      initHome();
  if (page === 'topics')    renderTopics('all');
  if (page === 'progress')  renderProgress();
  if (page === 'resources') renderResources();
  if (page === 'contact')   initContact();
  if (page === 'quiz')      { if (!quizStarted) initQuiz(); }
}

/* ─── PAGE: HOME ─── */
let homeInited = false;
function initHome() {
  if (homeInited) return; homeInited = true;
  animCount('cnt1', 12); animCount('cnt2', 10); animCount('cnt3', 12);
  const code = `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] marks = {85, 92, 78, 96, 88};

        double avg = marks.Average();
        int top    = marks.Max();

        Console.WriteLine(
          $"Average: {avg:F1}"
        );
        Console.WriteLine(
          $"Top score: {top}"
        );
    }
}`;
  let i = 0; const el = document.getElementById('typingEl');
  (function type(){ if(i<code.length){ el.textContent+=code[i++]; setTimeout(type,28); } })();

  const grid = document.getElementById('homeTopicGrid');
  TOPICS.slice(0,6).forEach(t => {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.cssText = 'text-align:center;cursor:pointer;padding:1.2rem';
    div.innerHTML = `<span style="font-size:2rem;display:block;margin-bottom:.5rem">${t.icon}</span>
      <h4 style="font-size:.9rem;margin-bottom:.4rem">${t.title}</h4>
      <span class="badge badge-${t.lvl}">${t.lvl==='b'?'Beginner':t.lvl==='m'?'Intermediate':'Advanced'}</span>`;
    div.onclick = () => { navigate('topics'); setTimeout(()=>showDetail(t.id),350); };
    grid.appendChild(div);
  });
}
function animCount(id, target) {
  let c=0; const step=Math.max(1,Math.ceil(target/50));
  const iv=setInterval(()=>{ c=Math.min(c+step,target); document.getElementById(id).textContent=c+(target>=100?'+':''); if(c>=target)clearInterval(iv); },30);
}

/* ─── PAGE: TOPICS ─── */
let currentTopicFilter='all', currentTopicId=null;
function filterTopics(f, btn) {
  currentTopicFilter=f;
  document.querySelectorAll('#page-topics .fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTopics(f);
  closeDetail();
}
function renderTopics(f) {
  const list = f==='all' ? TOPICS : TOPICS.filter(t=>t.lvl===f);
  const body = document.getElementById('topicsBody');
  body.innerHTML = '';
  list.forEach(t => {
    const lbl = t.lvl==='b'?'Beginner':t.lvl==='m'?'Intermediate':'Advanced';
    const done = localStorage.getItem('done_'+t.id)==='1';
    body.innerHTML += `<tr>
      <td>${t.id}</td>
      <td>${t.icon} ${t.title}</td>
      <td><span class="badge badge-${t.lvl}">${lbl}</span></td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.desc}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="showDetail(${t.id})">View</button>
        ${done?'<span style="color:var(--green);font-size:.78rem;margin-left:.4rem">  Done</span>':''}
      </td></tr>`;
  });
}
function showDetail(id) {
  const t = TOPICS.find(x=>x.id===id); currentTopicId=id;
  document.getElementById('detailTitle').textContent = t.icon+' '+t.title;
  document.getElementById('detailDesc').textContent  = t.desc;
  document.getElementById('detailCode').textContent  = t.code;
  const p = document.getElementById('topicDetail');
  p.classList.add('open');
  setTimeout(()=>p.scrollIntoView({behavior:'smooth',block:'start'}),100);
}
function closeDetail() { document.getElementById('topicDetail').classList.remove('open'); }
function markTopicDone() {
  if(!currentTopicId) return;
  localStorage.setItem('done_'+currentTopicId,'1');
  renderTopics(currentTopicFilter);
  closeDetail();
}
/* ─── PAGE: PROGRESS ─── */
function renderProgress() {
  const done=TOPICS.filter(t=>localStorage.getItem('done_'+t.id)==='1').length;
  const pct=Math.round(done/TOPICS.length*100);
  const lastQuiz=localStorage.getItem('lastQuiz');

  document.getElementById('progSummary').innerHTML=`
    <div class="card" style="text-align:center"><span class="card-icon"></span><h3 style="font-size:1.8rem;font-weight:900;color:var(--green)">${done}</h3><p>Topics Completed</p></div>
    <div class="card" style="text-align:center"><span class="card-icon"></span><h3 style="font-size:1.8rem;font-weight:900;color:var(--primary)">${TOPICS.length-done}</h3><p>Topics Remaining</p></div>
    <div class="card" style="text-align:center"><span class="card-icon"></span><h3 style="font-size:1.8rem;font-weight:900;color:var(--yellow)">${lastQuiz!==null?lastQuiz+'/10':'—'}</h3><p>Last Quiz Score</p></div>
    <div class="card" style="text-align:center"><span class="card-icon"></span><h3 style="font-size:1.8rem;font-weight:900;color:var(--cyan)">${pct}%</h3><p>Total Achievement</p></div>`;

  document.getElementById('overallPct').textContent=pct+'%';
  setTimeout(()=>{ document.getElementById('overallBar').style.width=pct+'%'; },100);

  const lvls=[
    {k:'b',lbl:'Beginner',   icon:'',color:'var(--green)'},
    {k:'m',lbl:'Intermediate',icon:'',color:'var(--yellow)'},
    {k:'a',lbl:'Advanced',    icon:'',color:'var(--red)'}
  ];
  document.getElementById('levelBars').innerHTML=lvls.map(lv=>{
    const ts=TOPICS.filter(t=>t.lvl===lv.k), dn=ts.filter(t=>localStorage.getItem('done_'+t.id)==='1').length;
    const p=Math.round(dn/ts.length*100);
    return `<div class="prog-item">
      <span class="prog-item-icon">${lv.icon}</span>
      <div class="prog-item-info">
        <h4>${lv.lbl} (${dn}/${ts.length})</h4>
        <div class="prog-track" style="height:8px"><div class="prog-fill" style="width:${p}%;background:${lv.color}"></div></div>
      </div>
      <span class="prog-pct" style="color:${lv.color}">${p}%</span>
    </div>`;
  }).join('');

  const body=document.getElementById('progTableBody'); body.innerHTML='';
  TOPICS.forEach(t=>{
    const d=localStorage.getItem('done_'+t.id)==='1';
    const lbl=t.lvl==='b'?'Beginner':t.lvl==='m'?'Intermediate':'Advanced';
    body.innerHTML+=`<tr>
      <td>${t.icon} ${t.title}</td>
      <td><span class="badge badge-${t.lvl}">${lbl}</span></td>
      <td class="${d?'st-done':'st-no'}">${d?'✔ Completed':'○ Not studied'}</td>
      <td>${d
        ? `<button class="btn btn-sm" style="background:transparent;border:1px solid var(--red);color:var(--red);padding:.3rem .7rem" onclick="undone(${t.id})">Undo</button>`
        : `<button class="btn btn-green btn-sm" onclick="markDone(${t.id})">Done</button>`
      }</td></tr>`;
  });
}
function markDone(id){ localStorage.setItem('done_'+id,'1'); renderProgress(); }
function undone(id)  { localStorage.removeItem('done_'+id);  renderProgress(); }
function resetProg() {
  if(!confirm('Clear all progress data?')) return;
  TOPICS.forEach(t=>localStorage.removeItem('done_'+t.id));
  localStorage.removeItem('lastQuiz');
  renderProgress();
}

/* ─── PAGE: RESOURCES ─── */
let resFilter='all';
function filterRes(f,btn){ resFilter=f; document.querySelectorAll('#page-resources .fbtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderResources(); }
function renderResources(){
  const q=(document.getElementById('resSearch')?.value||'').trim();
  const list=RESOURCES.filter(r=>(resFilter==='all'||r.type===resFilter)&&(r.title.toLowerCase().includes(q.toLowerCase())||r.desc.toLowerCase().includes(q.toLowerCase())));
  const grid=document.getElementById('resGrid'); grid.innerHTML='';
  if(!list.length){ grid.innerHTML='<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2rem">No results found</p>'; return; }
  list.forEach(r=>{ grid.innerHTML+=`<div class="res-card">
    <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.8rem">
      <span style="font-size:1.8rem">${r.icon}</span>
      <div><span class="res-type">${r.type}</span><span class="res-tag">${r.tag}</span></div>
    </div>
    <h4 style="font-size:.95rem;margin-bottom:.4rem">${r.title}</h4>
    <p style="color:var(--muted);font-size:.85rem;margin-bottom:.8rem">${r.desc}</p>
    ${r.link?`<a href="${r.link}" target="_blank" class="btn btn-outline btn-sm">Visit →</a>`:''}
  </div>`; });
}

/* ─── PAGE: CONTACT ─── */
function initContact(){
  if(window.innerWidth<768) document.getElementById('contactGrid').style.gridTemplateColumns='1fr';
  const faqs=[
    {q:'Is this website completely free?',      a:'Yes, all content is 100% free.'},
    {q:'Do I need prior experience?',           a:'No, the content starts from absolute zero.'},
    {q:'How do I track my progress?',           a:'Go to the "My Progress" page to see your achievements.'},
    {q:'Are there certificates?',               a:'Yes, when you finish the quiz with a score of 8/10 or higher.'},
  ];
  const fl=document.getElementById('faqList'); fl.innerHTML='';
  faqs.forEach((f,i)=>{
    fl.innerHTML+=`<div class="faq-item">
      <button class="faq-btn" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.farrow').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
        ${f.q}<span class="farrow">▼</span>
      </button>
      <div class="faq-body">${f.a}</div>
    </div>`;
  });
}
function switchTab(t){
  document.getElementById('formContact').style.display  = t==='contact'  ?'block':'none';
  document.getElementById('formRegister').style.display = t==='register' ?'block':'none';
  document.getElementById('tabA').classList.toggle('active', t==='contact');
  document.getElementById('tabB').classList.toggle('active', t==='register');
}
function err(id,show){ document.getElementById(id).style.display=show?'block':'none'; }
function val(id){ return (document.getElementById(id)?.value||'').trim(); }
function isEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function submitContact(){
  let ok=true;
  if(!val('f_fname')){err('e_fname',true);ok=false;}else err('e_fname',false);
  if(!val('f_lname')){err('e_lname',true);ok=false;}else err('e_lname',false);
  if(!isEmail(val('f_email'))){err('e_email',true);ok=false;}else err('e_email',false);
  if(!val('f_subj')){err('e_subj',true);ok=false;}else err('e_subj',false);
  if(val('f_msg').length<10){err('e_msg',true);ok=false;}else err('e_msg',false);
  if(!document.getElementById('f_agree').checked){err('e_agree',true);ok=false;}else err('e_agree',false);
  if(ok){
    const b=document.getElementById('successBox');
    b.textContent=' Your message was sent successfully! We will reply soon.';
    b.style.display='block';
    ['f_fname','f_lname','f_email','f_subj','f_msg'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('f_agree').checked=false;
  }
}
function checkStrength(){
  const p=val('r_pass'); let s=0;
  if(p.length>=6)s++; if(p.length>=10)s++; if(/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^A-Za-z0-9]/.test(p))s++;
  const lbls=['','Weak','Fair','Good','Strong','Excellent'];
  const cols=['','var(--red)','var(--yellow)','var(--yellow)','var(--green)','var(--green)'];
  document.getElementById('strengthLbl').textContent=lbls[s]||'—';
  document.getElementById('strengthLbl').style.color=cols[s]||'';
  document.getElementById('strengthBar').style.width=(s*20)+'%';
  document.getElementById('strengthBar').style.background=cols[s]||'var(--red)';
}
function submitRegister(){
  let ok=true;
  if(!val('r_name')){err('re_name',true);ok=false;}else err('re_name',false);
  if(!isEmail(val('r_email'))){err('re_email',true);ok=false;}else err('re_email',false);
  if(val('r_pass').length<6){err('re_pass',true);ok=false;}else err('re_pass',false);
  if(val('r_pass')!==val('r_pass2')){err('re_pass2',true);ok=false;}else err('re_pass2',false);
  if(ok){
    const b=document.getElementById('successBox');
    b.textContent=' Your account was created successfully! Welcome to C# Academy.';
    b.style.display='block';
  }
}
