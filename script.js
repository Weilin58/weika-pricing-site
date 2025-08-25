// =========================
// 0) 資料驅動 CONFIG（價格/文案集中管理）
// =========================
const CONFIG = {
  pricing: [
    { route:'solo',   name:'個人寫真',   price:2000, hours:'1~1.5hr', desc:'適合個人形象、紀念日或日常紀錄。' },
    { route:'couple', name:'雙人寫真',   price:3500, hours:'1~1.5hr', desc:'適合情侶、閨蜜、親子或好友。' },
    { route:'group',  name:'3–6人團體', price:5000, hours:'1~1.5hr', desc:'適合家庭、朋友團體。' },
  ],
  pages: {
    home:      { title:'衛卡攝影影像工作室｜首頁', desc:'捕捉生活中的每一個光影故事。專業、有溫度的影像紀錄。' },
    pricing:   { title:'服務報價｜衛卡攝影影像工作室', desc:'個人寫真、雙人寫真、團體寫真與客製化專案之費用說明。' },
    contact:   { title:'聯絡我們｜衛卡攝影影像工作室', desc:'Instagram、Email、電話等聯絡方式。' },
    faq:       { title:'常見問題 Q&A｜衛卡攝影影像工作室', desc:'拍攝前準備、改期、地點、預約與服務內容等常見問答。' },
    solo:      { title:'個人寫真｜衛卡攝影影像工作室', desc:'自然互動、氣質寫真，打造你的專屬形象。' },
    couple:    { title:'雙人寫真｜衛卡攝影影像工作室', desc:'以互動畫面記錄兩人默契與情感的流動。' },
    group:     { title:'3–6 人團體｜衛卡攝影影像工作室', desc:'朋友、家庭、團隊合照，愉快而自然的群像時刻。' },
    prewedding:{ title:'婚紗攝影｜衛卡攝影影像工作室', desc:'以光影與場景述說兩人的篇章，可全案客製。' },
    event:     { title:'活動紀錄｜衛卡攝影影像工作室', desc:'商業活動、講座、展演與派對，完整保存重點瞬間。' },
    wedding:   { title:'婚禮紀錄｜衛卡攝影影像工作室', desc:'以紀實視角捕捉儀式與宴客的每個感動片刻。' },
  }
};
const routes = ['home','pricing','contact','faq','solo','couple','group','prewedding','event','wedding'];

const NAV = [
  { route:'home', text:'主頁' },
  { route:'pricing', text:'服務報價' },
  { route:'faq', text:'常見QA' },
  { route:'contact', text:'預約檔期' },
  { url:'https://weikaphoto.myportfolio.com/', text:'查看作品集', external:true }
];

const HOME_CARDS = [
  { route:'solo', title:'個人寫真', desc:'紀錄屬於自己的獨特時刻。' },
  { route:'couple', title:'雙人寫真', desc:'捕捉您們之間的甜蜜互動。' },
  { route:'group', title:'團體寫真', desc:'留下充滿歡笑的共同回憶。' },
  { route:'prewedding', title:'婚紗攝影', desc:'規劃您們的夢想婚紗照。' },
  { route:'event', title:'活動紀錄', desc:'專業的動態與靜態活動紀錄。' },
  { route:'wedding', title:'婚禮紀錄', desc:'紀實生命中最重要的一天。' },
];

/* === 新增：每個首頁卡片對應的輪播圖片清單 === */
const HOME_CARD_IMAGES = {
  solo:      ['images/portrait_01.jpg','images/portrait_02.jpg','images/portrait_03.jpg'],
  couple:    ['images/couple_01.jpg','images/couple_02.jpg','images/couple_03.jpg'],
  group:     ['images/group_01.jpg','images/group_02.jpg','images/group_03.jpg'],
  prewedding:['images/wedding_01.jpg','images/wedding_02.jpg','images/wedding_03.jpg'],
  event:     ['images/event_01.jpg','images/event_02.jpg','images/event_03.jpg'],
  wedding:   ['images/weddingday_01.jpg','images/weddingday_02.jpg','images/weddingday_03.jpg'],
};

// 工具：台幣格式
const nt = n => `NT$${Number(n).toLocaleString('zh-TW')}`;

// DOM
const navLinksContainer = document.getElementById('nav-links');
const homeCardGrid = document.getElementById('home-card-grid');
const mainContent = document.getElementById('main-content');
const yearEl = document.getElementById('year');
const toastEl = document.getElementById('toast');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 產生導覽列（保留外部作品集）
function buildNav(){
  navLinksContainer.innerHTML = '';
  NAV.forEach(item => {
    const li = document.createElement('li');
    if (item.external) {
      li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
    } else {
      li.innerHTML = `<a href="#${item.route}" role="menuitem">${item.text}</a>`;
    }
    navLinksContainer.appendChild(li);
  });
}

// 首頁卡片（按鈕文案：查看方案）
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
    a.setAttribute('data-route', card.route);
    a.innerHTML = `
      <div class="card-image"></div>
      <div class="card-content">
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
        <span class="card-link">查看方案</span>
      </div>`;
    a.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); a.click(); } });
    homeCardGrid.appendChild(a);

    /* 新增：為這張卡片啟用輪播 */
    initCardSlider(a, HOME_CARD_IMAGES[card.route] || []);
  });
}

/* === 新增：初始化單張卡片輪播 === */
function initCardSlider(cardAnchorEl, images, intervalMs = 3800){
  const imgWrap = cardAnchorEl.querySelector('.card-image');
  if (!imgWrap || !images || images.length === 0) return;

  const slideA = document.createElement('div'); slideA.className = 'card-slide is-active';
  const slideB = document.createElement('div'); slideB.className = 'card-slide';
  imgWrap.appendChild(slideA); imgWrap.appendChild(slideB);

  // 指示點
  const dots = document.createElement('div'); dots.className = 'card-dots';
  const dotEls = images.map((_,i)=> {
    const d = document.createElement('span'); d.className='card-dot'+(i===0?' is-active':'');
    d.addEventListener('click', (e)=>{ e.stopPropagation(); goTo(i); });
    dots.appendChild(d); return d;
  });
  imgWrap.appendChild(dots);

  // 左右切換（桌機）
  const prev = document.createElement('button'); prev.className='card-nav prev'; prev.setAttribute('aria-label','上一張'); prev.textContent='‹';
  const next = document.createElement('button'); next.className='card-nav next'; next.setAttribute('aria-label','下一張'); next.textContent='›';
  prev.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr-1); });
  next.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr+1); });
  imgWrap.appendChild(prev); imgWrap.appendChild(next);

  // 初始狀態
  let curr = 0, usingA = true, timer = null;
  slideA.style.backgroundImage = `url("${images[0]}")`;

  // 自動輪播
  const start = ()=> { stop(); timer = setInterval(()=> goTo(curr+1), intervalMs); };
  const stop  = ()=> { if (timer) { clearInterval(timer); timer = null; } };

  // 切換
  function goTo(idx){
    const nextIdx = (idx + images.length) % images.length;
    const preload = new Image(); preload.src = images[nextIdx]; // 預先載入避免閃爍

    const show = usingA ? slideB : slideA;
    show.style.backgroundImage = `url("${images[nextIdx]}")`;

    slideA.classList.toggle('is-active', !usingA);
    slideB.classList.toggle('is-active', usingA);
    usingA = !usingA;
    curr = nextIdx;

    dotEls.forEach((d,i)=> d.classList.toggle('is-active', i===curr));
  }

  // 觸控滑動（手機）
  let touchX = null;
  imgWrap.addEventListener('touchstart', (e)=>{ touchX = e.touches[0].clientX; stop(); }, {passive:true});
  imgWrap.addEventListener('touchend', (e)=>{
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { dx > 0 ? goTo(curr-1) : goTo(curr+1); }
    touchX = null; start();
  });

  // 滑鼠移入暫停、移出繼續
  imgWrap.addEventListener('mouseenter', stop);
  imgWrap.addEventListener('mouseleave', start);

  start();
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

  // 子頁方案卡（prewedding/event/wedding）：顯示「客製報價」
  ['prewedding','event','wedding'].forEach(route=>{
    const el = document.getElementById(`${route}-plan`);
    if (el) {
      el.innerHTML = `
        <h3>方案價格</h3>
        <div class="price">客製報價</div>
        <p>依需求提供專案估價，歡迎與我討論。</p>
      `;
    }
  });
}

/* ====== 條款區塊（維持原本注入規則） ====== */
const DEFAULT_POLICY_HTML = `
  <section class="policy-block" aria-label="方案內容" style="margin-top: var(--spacing-4);">
    <h3>方案內容</h3>
    <h4>成品內容</h4>
    <ul>
      <li><strong>專業調色：</strong> 提供 30–60 張風格調色電子檔。</li>
      <li><strong>精緻修圖：</strong> 自選 10 張進行深度精修（膚質、身形、細節調整）。</li>
    </ul>
    <h4>成品交付</h4>
    <ul>
      <li><strong>雲端交付：</strong> 透過 Google Drive 提供下載，檔案保留 30 日。</li>
      <li><strong>加購 USB：</strong> 可加價 NT$300 選購 USB 隨身碟。</li>
    </ul>
    <h4>預約與費用</h4>
    <ul>
      <li><strong>訂金：</strong> 確認預約收取總報價 50% 訂金。</li>
      <li><strong>交通費：</strong> 每公里 NT$7；若計算未滿 NT$100 則不收取。</li>
      <li><strong>額外費用：</strong> 攝影棚租借、妝髮造型等費用，實報實銷。</li>
      <li><strong>毛片：</strong> 原則不提供；如需加購，全數 NT$2,000。</li>
    </ul>
  </section>
`;

const POLICY_PREWEDDING_HTML = `
  <section class="policy-block" aria-label="婚紗攝影方案內容" style="margin-top: var(--spacing-4);">
    <h3>方案內容</h3>
    <h4>成品內容（專案訂製）</h4>
    <ul>
      <li><strong>精修張數：</strong> 依方案客製（建議至少20張），提供風格統一之精修。</li>
      <li><strong>相本／成冊：</strong> 可加購 10×10 或 12×12 相本、裱框與謝卡套組。</li>
      <li><strong>拍攝配置：</strong> 禮服件數、造型次數、外景點數、棚租等皆可彈性調整。</li>
    </ul>
    <h4>成品交付（專案訂製）</h4>
    <ul>
      <li><strong>雲端交付：</strong> 精修與風格調色檔案提供雲端下載（保留 30 日）。</li>
      <li><strong>實體交付：</strong> 相本／相框依客製品項製作，交期視廠商作業而定（約 21–45 天）。</li>
      <li><strong>媒體備份：</strong> 可加購 USB／行動硬碟備份。</li>
    </ul>
    <h4>預約與費用</h4>
    <ul>
      <li><strong>訂金：</strong> 確認檔期後收取總額 50% 訂金；餘款於成品驗收前結清。</li>
      <li><strong>交通／場租：</strong> 外縣市交通與場地費用另計；如需包車另報價。</li>
      <li><strong>毛片：</strong> 原則不提供；如需加購全數毛片，均收轉檔與整理費用 NT$2,000。</li>
    </ul>
  </section>
`;

const POLICY_EVENT_HTML = `
  <section class="policy-block" aria-label="活動紀錄方案內容" style="margin-top: var(--spacing-4);">
    <h3>方案內容</h3>
    <h4>成品內容（專案訂製）</h4>
    <ul>
      <li><strong>重點花絮：</strong> 講者特寫、互動合照、攤位／展演、觀眾反應等主題化精選。</li>
      <li><strong>合照規劃：</strong> 可依需求製作貴賓合影清單與流程引導，提升現場效率。</li>
    </ul>
    <h4>成品交付（專案訂製）</h4>
    <ul>
      <li><strong>快修精選：</strong> 依方案提供 10–20 張於 24–72 小時交付，供行銷曝光。</li>
      <li><strong>完整交件：</strong> 全數調色成品，約 7–14 天交付雲端。</li>
    </ul>
    <h4>預約與費用</h4>
    <ul>
      <li><strong>訂金：</strong> 確認檔期後收取 50% 訂金；活動超時依每小時計價。</li>
      <li><strong>交通／加班：</strong> 交通與停車費另計；夜間或跨縣市請先告知以利安排。</li>
      <li><strong>毛片：</strong> 不提供毛片；如需加購，依場次與容量另報價。</li>
    </ul>
  </section>
`;

const POLICY_WEDDING_HTML = `
  <section class="policy-block" aria-label="婚禮紀錄方案內容" style="margin-top: var(--spacing-4);">
    <h3>方案內容</h3>
    <h4>成品內容（專案訂製）</h4>
    <ul>
      <li><strong>全日／半日：</strong> 迎娶、儀式、宴客流程完整紀錄；可加購雙攝影配置。</li>
      <li><strong>合照清單：</strong> 可事先提供親友合影清單，現場依流程引導完成。</li>
    </ul>
    <h4>成品交付（專案訂製）</h4>
    <ul>
      <li><strong>快修精選：</strong> 10–20 張於婚禮後 48–72 小時交付，供社群公告。</li>
      <li><strong>完整交件：</strong> 全數調色成品於 21–45 天雲端交付。</li>
      <li><strong>媒體備份：</strong> 可加購 USB／行動硬碟備份；檔案雲端保留 30 日。</li>
    </ul>
    <h4>預約與費用</h4>
    <ul>
      <li><strong>訂金：</strong> 確認檔期後收取 50% 訂金；餘款於交件前結清。</li>
      <li><strong>交通／住宿：</strong> 跨縣市或清晨日出檔期，交通與住宿費另計。</li>
      <li><strong>毛片：</strong> 原則不提供；如需加購全數毛片，收轉檔與整理費用 NT$2,000。</li>
    </ul>
  </section>
`;

/* 將條款注入到各方案頁（保留現在「無 QA」的結構） */
function attachPolicyBlocks(){
  // 一般方案：solo/couple/group → 條款放在價格卡後方
  ['solo','couple','group'].forEach(route=>{
    const plan = document.getElementById(`${route}-plan`);
    if (plan) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = DEFAULT_POLICY_HTML;
      plan.insertAdjacentElement('afterend', wrapper.firstElementChild);
    }
  });

  // 專案訂製：prewedding / event / wedding
  // 需求：頁面下方要保留「預約檔期」按鈕；條款要在按鈕前面（確保按鈕永遠最下）
  const routeToHTML = { prewedding: POLICY_PREWEDDING_HTML, event: POLICY_EVENT_HTML, wedding: POLICY_WEDDING_HTML };
  Object.keys(routeToHTML).forEach(route=>{
    const sectionEl = document.querySelector(`.page-section[data-route="${route}"]`);
    if (sectionEl) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = routeToHTML[route];
      const policyNode = wrapper.firstElementChild;

      const actions = sectionEl.querySelector('.section-actions');
      if (actions) {
        actions.insertAdjacentElement('beforebegin', policyNode);
      } else {
        sectionEl.insertAdjacentElement('beforeend', policyNode);
      }
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
function getRouteFromHash(){ return (location.hash || '#home').replace('#',''); }
function showRoute(route){
  if(!allRoutes.includes(route)){
    toast(); route='home'; location.hash = '#home';
  }
  const target = document.querySelector(`.page-section[data-route="${route}"]`);
  if(!target || target===currentActiveSection) { applyRouteMeta(route); updateNavActiveState(route); return; }

  if(currentActiveSection){
    currentActiveSection.classList.add('is-leaving');
    currentActiveSection.classList.remove('is-active');
    setTimeout(()=> currentActiveSection.classList.remove('is-leaving'),
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-speed')));
  }
  target.classList.add('is-active');
  currentActiveSection = target;

  updateNavActiveState(route);
  applyRouteMeta(route);
  const h1 = target.querySelector('h1');
  if(h1){ h1.focus({ preventScroll:true }); }

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

  // 條款注入
  attachPolicyBlocks();

  const lastVisited = sessionStorage.getItem('lastVisitedRoute');
  if(!location.hash && lastVisited && routes.includes(lastVisited)){
    location.hash = `#${lastVisited}`;
  }
  applyQueryOptions();
  handleRouteChange();
  window.addEventListener('hashchange', handleRouteChange);
}

document.addEventListener('DOMContentLoaded', init);