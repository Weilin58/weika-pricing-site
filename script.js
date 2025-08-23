// =========================
// 0) 資料驅動 CONFIG（價格/文案集中管理）
// =========================
const CONFIG = {
  pricing: [
    { route:'solo',   name:'個人寫真', price:2000, hours:'1~1.5hr', desc:'適合個人形象、紀念日或日常紀錄。' },
    { route:'couple', name:'雙人寫真', price:3500, hours:'1~1.5hr', desc:'適合情侶、閨蜜、親子或好友。' },
    { route:'group',  name:'3–6人團體', price:5000, hours:'1~1.5hr', desc:'適合家庭、朋友團體。' },
  ],
  pages: {
    home:  { title:'衛卡攝影影像工作室｜首頁', desc:'捕捉生活中的每一個光影故事。專業、有溫度的影像紀錄。' },
    pricing:{ title:'服務報價｜衛卡攝影影像工作室', desc:'個人寫真、雙人寫真、團體寫真與客製化專案之費用說明。' },
    policy: { title:'規則與內容｜衛卡攝影影像工作室', desc:'交付內容、預約與改期、保存與授權等條款說明。' },
    solo:   { title:'個人寫真｜衛卡攝影影像工作室', desc:'自然互動、氣質寫真，打造你的專屬形象。' },
    couple: { title:'雙人寫真｜衛卡攝影影像工作室', desc:'以互動畫面記錄兩人默契與情感的流動。' },
    group:  { title:'3–6 人團體｜衛卡攝影影像工作室', desc:'朋友、家庭、團隊合照，愉快而自然的群像時刻。' },
    prewedding:{ title:'婚紗攝影｜衛卡攝影影像工作室', desc:'以光影與場景述說兩人的篇章，可全案客製。' },
    event:  { title:'活動紀錄｜衛卡攝影影像工作室', desc:'商業活動、講座、展演與派對，完整保存重點瞬間。' },
    wedding:{ title:'婚禮紀錄｜衛卡攝影影像工作室', desc:'以紀實視角捕捉儀式與宴客的每個感動片刻。' },
  }
};
const routes = ['home','pricing','policy','solo','couple','group','prewedding','event','wedding'];
const NAV = [
  { route:'home', text:'主頁' },
  { route:'pricing', text:'服務報價' },
  { route:'policy', text:'規則與內容' },
  { url:'https://weikaphoto.myportfolio.com/', text:'查看作品集', external:true }
];
const HOME_CARDS = [
  { route:'solo', title:'個人寫真', desc:'留下屬於自己的獨一無二。' },
  { route:'couple', title:'雙人寫真', desc:'捕捉你們之間的甜蜜互動。' },
  { route:'group', title:'團體寫真', desc:'留下充滿歡笑的共同回憶。' },
  { route:'prewedding', title:'婚紗攝影', desc:'規劃您們的夢想婚紗照。' },
  { route:'event', title:'活動紀錄', desc:'以細膩視角記錄最自然與感動的畫面。' },
  { route:'wedding', title:'婚禮紀錄', desc:'用鏡頭紀錄婚禮中的真情流露，留下屬於你們最珍貴的一天。' },
];

// 工具：台幣格式
const nt = n => `NT$${Number(n).toLocaleString('zh-TW')}`;

// DOM
const navLinksContainer = document.getElementById('nav-links');
const homeCardGrid = document.getElementById('home-card-grid');
const mainContent = document.getElementById('main-content');
const yearEl = document.getElementById('year');
const toastEl = document.getElementById('toast');
yearEl.textContent = new Date().getFullYear();

// 產生導覽列
function buildNav(){
  navLinksContainer.innerHTML = '';
  NAV.forEach(item => {
    const li = document.createElement('li');

    if (item.external) {
      // 🔗 外部連結（另開新視窗）
      li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
    } else {
      // 📌 內部路由（SPA 用 #route）
      li.innerHTML = `<a href="#${item.route}" role="menuitem">${item.text}</a>`;
    }

    navLinksContainer.appendChild(li);
  });
}

// 首頁卡片
function buildHomeCards(){
  if(!homeCardGrid) return;
  homeCardGrid.innerHTML = '';
  HOME_CARDS.forEach(card => {
    const a = document.createElement('a');
    a.href = `#${card.route}`;
    a.className = 'card';
    a.setAttribute('role','button');
    a.setAttribute('tabindex','0');
    a.setAttribute('aria-label', card.title);
    a.setAttribute('data-route', card.route); // ✅ 讓外層卡片帶 data-route
    a.innerHTML = `
      <div class="card-image"></div>
      <div class="card-content">
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
        <span class="card-link">了解更多</span>
      </div>`;
    a.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); a.click(); } });
    homeCardGrid.appendChild(a);
  });
}

// 報價（資料驅動）
function buildPricing(){
  const sec = document.getElementById('pricing-table');
  if(!sec) return;
  sec.innerHTML = CONFIG.pricing.map(p => `
    <div class="pricing-card" role="button" tabindex="0" data-link="#${p.route}">
      <h3>${p.name}</h3>
      <div class="price">${nt(p.price)} <small>/ ${p.hours}</small></div>
      <p>${p.desc}</p>
    </div>
  `).join('');
  // 鍵盤啟動
  sec.querySelectorAll('[role="button"]').forEach(el=>{
    el.addEventListener('click', ()=> location.hash = el.dataset.link);
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); el.click(); } });
  });

  // 子頁方案卡（solo/couple/group）
  CONFIG.pricing.forEach(p => {
    const el = document.getElementById(`${p.route}-plan`);
    if(el){
      el.innerHTML = `
        <h3>方案價格</h3>
        <div class="price">${nt(p.price)} <small>/ ${p.hours}</small></div>
        <p>${p.desc}</p>
      `;
    }
  });
}

// 導覽 active 狀態
function updateNavActiveState(activeRoute) {
  document.querySelectorAll('#nav-links a').forEach(link => {
    if (link.getAttribute('href') === `#${activeRoute}`) {
      link.classList.add('active'); link.setAttribute('aria-current','page');
    } else {
      link.classList.remove('active'); link.removeAttribute('aria-current');
    }
  });
}

// Toast
function toast(msg='找不到頁面，已帶你回主頁'){
  if(!toastEl) return;
  toastEl.textContent=msg; toastEl.style.opacity='1';
  setTimeout(()=> toastEl.style.opacity='0', 1500);
}

// Meta 同步
function applyRouteMeta(route){
  const meta = CONFIG.pages[route] || CONFIG.pages.home;
  document.title = meta.title;
  const m = document.querySelector('meta[name="description"]');
  if(m) m.setAttribute('content', meta.desc);
}

// 路由處理
const allRoutes = routes.slice();
let currentActiveSection = null;
function getRouteFromHash(){
  return (location.hash || '#home').replace('#','');
}
function showRoute(route){
  if(!allRoutes.includes(route)){
    toast(); route='home'; location.hash = '#home';
  }
  const target = document.querySelector(`.page-section[data-route="${route}"]`);
  if(!target || target===currentActiveSection) { applyRouteMeta(route); updateNavActiveState(route); return; }

  // 隱藏舊頁
  if(currentActiveSection){
    currentActiveSection.classList.add('is-leaving');
    currentActiveSection.classList.remove('is-active');
    setTimeout(()=> currentActiveSection.classList.remove('is-leaving'),
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-speed')));
  }
  // 顯示新頁
  target.classList.add('is-active');
  currentActiveSection = target;

  // 導覽、Meta、焦點（避免自動捲動感）
  updateNavActiveState(route);
  applyRouteMeta(route);
  const h1 = target.querySelector('h1');
  if(h1){ h1.focus({ preventScroll:true }); }

  // 記錄路由
  try{ sessionStorage.setItem('lastVisitedRoute', route); }catch(e){}
}

function handleRouteChange(){
  let hash = getRouteFromHash();
  if(!allRoutes.includes(hash)) hash='home';
  showRoute(hash);
}

// Query 支援：?route=pricing & ?print=1
function applyQueryOptions(){
  const u = new URL(location.href);
  const r = u.searchParams.get('route');
  if(r && allRoutes.includes(r)){ location.hash = `#${r}`; }
  if(u.searchParams.get('print')==='1'){ setTimeout(()=> window.print(), 400); }
}

// 手機選單
function setupMobileMenu(){
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', ()=>{
    const open = !navLinksContainer.classList.contains('is-open');
    navLinksContainer.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // 點擊連結、按 ESC、外點收合
  navLinksContainer.addEventListener('click', (e)=>{ if(e.target.tagName==='A'){
    navLinksContainer.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }});
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){
    navLinksContainer.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }});
  document.addEventListener('click', (e)=>{
    if(!navLinksContainer.contains(e.target) && !document.getElementById('nav-toggle').contains(e.target)){
      navLinksContainer.classList.remove('is-open');
      document.getElementById('nav-toggle').classList.remove('is-open');
      document.getElementById('nav-toggle').setAttribute('aria-expanded','false');
    }
  });
}

// 回頂按鈕
function setupBackTop(){
  const btn = document.getElementById('backTop');
  if(!btn) return;
  const onScroll = () => { btn.classList.toggle('show', window.scrollY > 200); };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  btn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
}

// 初始化
function init(){
  buildNav();
  buildHomeCards();
  buildPricing();
  setupMobileMenu();
  setupBackTop();

  // 若無 hash，嘗試用 sessionStorage 記憶的頁
  const lastVisited = sessionStorage.getItem('lastVisitedRoute');
  if(!location.hash && lastVisited && routes.includes(lastVisited)){
    location.hash = `#${lastVisited}`;
  }

  // 初始路由 + 查詢參數
  applyQueryOptions();
  handleRouteChange();

  // 監聽變化
  window.addEventListener('hashchange', handleRouteChange);
}

document.addEventListener('DOMContentLoaded', init);
