const routes = ['home','pricing','contact','faq','solo','couple','group','prewedding','event','wedding'];

const HOME_CARD_IMAGES = {
  solo:      ['images/portrait_01.jpg','images/portrait_02.jpg','images/portrait_03.jpg'],
  couple:    ['images/couple_01.jpg','images/couple_02.jpg','images/couple_03.jpg'],
  group:     ['images/group_01.jpg','images/group_02.jpg','images/group_03.jpg'],
  prewedding:['images/wedding_01.jpg','images/wedding_02.jpg','images/wedding_03.jpg'],
  event:     ['images/event_01.jpg','images/event_02.jpg','images/event_03.jpg'],
  wedding:   ['images/weddingday_01.jpg','images/weddingday_02.jpg','images/weddingday_03.jpg'],
};

const navLinksContainer = document.getElementById('nav-links');
const homeCardGrid = document.getElementById('home-card-grid');
const mainContent = document.getElementById('main-content');
const toastEl = document.getElementById('toast');
const skipLink = document.getElementById('skip-link');
const navbarBrand = document.getElementById('navbar-brand');
const languageSelector = document.getElementById('language-selector');
const languageButton = document.getElementById('language-button');
const languageMenu = document.getElementById('language-menu');
const footerEl = document.getElementById('site-footer');
const backTopButton = document.getElementById('backTop');

const DEFAULT_LANG = 'zh';
let currentLang = DEFAULT_LANG;
let languageMenuOpen = false;
let defaultToastMessage = '';

function getLangData(){
  return I18N[currentLang] || I18N[DEFAULT_LANG];
}

function formatCurrency(value){
  const data = getLangData();
  const locale = (data.currency && data.currency.locale) || 'zh-TW';
  const prefix = (data.currency && data.currency.prefix) || 'NT$';
  return `${prefix}${Number(value).toLocaleString(locale)}`;
}

function mapLanguageCode(code){
  if(!code) return null;
  const normalized = code.toLowerCase();
  if(normalized.startsWith('en')) return 'en';
  if(normalized.startsWith('ja')) return 'ja';
  if(normalized.startsWith('ko')) return 'ko';
  if(normalized.startsWith('zh')) return 'zh';
  return null;
}

function detectInitialLanguage(){
  try {
    const stored = localStorage.getItem('preferredLanguage');
    if(stored && I18N[stored]) return stored;
  } catch(e){}
  const candidates = navigator.languages || [navigator.language || navigator.userLanguage];
  for(const lang of candidates){
    const mapped = mapLanguageCode(lang);
    if(mapped && I18N[mapped]) return mapped;
  }
  return DEFAULT_LANG;
}

function renderLanguageButton(){
  if(!languageButton) return;
  const data = getLangData();
  languageButton.innerHTML = `Language <span class="language-current">${data.languageName}</span>`;
  languageButton.setAttribute('aria-label', `Select language. Current: ${data.languageName}`);
}

function renderLanguageMenu(){
  if(!languageMenu) return;
  languageMenu.innerHTML = '';
  LANG_OPTIONS.forEach(opt => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.lang = opt.code;
    btn.textContent = opt.label;
    btn.setAttribute('role','option');
    const isActive = opt.code === currentLang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    li.appendChild(btn);
    languageMenu.appendChild(li);
  });
  languageMenu.hidden = !languageMenuOpen;
}

function openLanguageMenu(){
  languageMenuOpen = true;
  if(languageButton) languageButton.setAttribute('aria-expanded','true');
  renderLanguageMenu();
  const activeBtn = languageMenu ? languageMenu.querySelector('button.is-active') : null;
  if(activeBtn) activeBtn.focus();
}

function closeLanguageMenu(){
  languageMenuOpen = false;
  if(languageButton) languageButton.setAttribute('aria-expanded','false');
  renderLanguageMenu();
}

function toggleLanguageMenu(force){
  const shouldOpen = typeof force === 'boolean' ? force : !languageMenuOpen;
  if(shouldOpen){
    openLanguageMenu();
  } else {
    closeLanguageMenu();
  }
}

function setupLanguageSelector(){
  if(!languageSelector || !languageButton || !languageMenu) return;
  languageMenu.hidden = true;
  renderLanguageButton();
  renderLanguageMenu();

  languageButton.addEventListener('click', (e)=>{
    e.stopPropagation();
    toggleLanguageMenu();
  });
  languageButton.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      toggleLanguageMenu(true);
    }
  });

  languageMenu.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-lang]');
    if(!btn) return;
    const lang = btn.dataset.lang;
    setLanguage(lang);
    closeLanguageMenu();
    languageButton.focus();
  });

  languageMenu.addEventListener('keydown', (e)=>{
    const buttons = Array.from(languageMenu.querySelectorAll('button[data-lang]'));
    const currentIndex = buttons.indexOf(document.activeElement);
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      const next = buttons[(currentIndex + 1) % buttons.length];
      if(next) next.focus();
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      const prev = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
      if(prev) prev.focus();
    } else if(e.key === 'Escape'){
      e.preventDefault();
      closeLanguageMenu();
      languageButton.focus();
    }
  });

  document.addEventListener('click', (e)=>{
    if(!languageMenuOpen) return;
    if(languageSelector && !languageSelector.contains(e.target)){
      closeLanguageMenu();
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && languageMenuOpen){
      closeLanguageMenu();
      languageButton.focus();
    }
  });
}

function updateSkipLink(){
  if(skipLink) skipLink.textContent = getLangData().skipLink;
}

function updateNavbarBrand(){
  if(!navbarBrand) return;
  const data = getLangData();
  navbarBrand.textContent = data.navBrand;
  navbarBrand.setAttribute('aria-label', data.navBrandAria || data.navBrand);
}

function updateHomeTexts(){
  const data = getLangData();
  const homeTitle = document.getElementById('home-title');
  if(homeTitle) homeTitle.textContent = data.home.title;
  const homeSubtitle = document.getElementById('home-subtitle');
  if(homeSubtitle) homeSubtitle.textContent = data.home.subtitle;
}

function updatePricingTexts(){
  const { pricing } = getLangData();
  const title = document.getElementById('pricing-title');
  if(title) title.textContent = pricing.title;
  const heading = document.getElementById('pricing-more-heading');
  if(heading) heading.textContent = pricing.moreHeading;
  const desc = document.getElementById('pricing-more-description');
  if(desc) desc.innerHTML = pricing.moreDescription;
}

function updateContactTexts(){
  const { contact } = getLangData();
  const title = document.getElementById('contact-title');
  if(title) title.textContent = contact.title;
  const subtitle = document.getElementById('contact-subtitle');
  if(subtitle) subtitle.textContent = contact.subtitle;
  const desc = document.getElementById('contact-description');
  if(desc) desc.textContent = contact.description;
}

function updateFaqTitle(){
  const { faq } = getLangData();
  const faqTitle = document.getElementById('faq-title');
  if(faqTitle) faqTitle.textContent = faq.title;
}

function updateSectionTitles(){
  const { sections } = getLangData();
  Object.keys(sections).forEach(route => {
    const el = document.getElementById(`${route}-title`);
    if(el) el.textContent = sections[route].title;
  });
}

function updateNotes(){
  const { pricing } = getLangData();
  const pre = document.getElementById('prewedding-note');
  if(pre) pre.textContent = pricing.customPlans.prewedding || '';
  const eventNote = document.getElementById('event-note');
  if(eventNote) eventNote.textContent = pricing.customPlans.event || '';
  const weddingNote = document.getElementById('wedding-note');
  if(weddingNote) weddingNote.textContent = pricing.customPlans.wedding || '';
}

function updateBackToHomeLinks(){
  const data = getLangData();
  document.querySelectorAll('.back-to-home').forEach(link => {
    link.textContent = data.buttons.backToHome;
  });
}

function updateBookButtons(){
  const data = getLangData();
  document.querySelectorAll('.page-section .btn').forEach(btn => {
    btn.textContent = data.buttons.bookNow;
  });
}

function updateFooter(){
  if(!footerEl) return;
  const data = getLangData();
  const year = new Date().getFullYear();
  footerEl.innerHTML = data.footer.replace('{{year}}', `<span class="footer-year">${year}</span>`);
}

function updateBackTop(){
  if(!backTopButton) return;
  const { backTop } = getLangData();
  backTopButton.setAttribute('aria-label', backTop.label);
  backTopButton.setAttribute('title', backTop.title);
}

function updateStaticText(){
  document.documentElement.lang = currentLang === 'zh' ? 'zh-TW' : currentLang;
  updateSkipLink();
  updateNavbarBrand();
  updateHomeTexts();
  updatePricingTexts();
  updateContactTexts();
  updateFaqTitle();
  updateSectionTitles();
  updateNotes();
  updateBackToHomeLinks();
  updateBookButtons();
  updateFooter();
  updateBackTop();
}

function buildNav(){
  const data = getLangData();
  if(!navLinksContainer) return;
  navLinksContainer.innerHTML = '';
  data.nav.forEach(item => {
    const li = document.createElement('li');
    if(item.external){
      li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
    } else {
      li.innerHTML = `<a href="#${item.route}" role="menuitem">${item.text}</a>`;
    }
    navLinksContainer.appendChild(li);
  });
}

function buildHomeCards(){
  const data = getLangData();
  if(!homeCardGrid) return;
  homeCardGrid.innerHTML = '';
  data.home.cards.forEach(card => {
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
        <span class="card-link">${data.buttons.viewPlan}</span>
      </div>`;
    a.addEventListener('keydown', (e)=>{
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); a.click(); }
    });
    homeCardGrid.appendChild(a);
    initCardSlider(a, HOME_CARD_IMAGES[card.route] || []);
  });
}

function initCardSlider(cardAnchorEl, images, intervalMs = 3800){
  const imgWrap = cardAnchorEl.querySelector('.card-image');
  if (!imgWrap || !images || images.length === 0) return;

  const slideA = document.createElement('div'); slideA.className = 'card-slide is-active';
  const slideB = document.createElement('div'); slideB.className = 'card-slide';
  imgWrap.appendChild(slideA); imgWrap.appendChild(slideB);

  const dots = document.createElement('div'); dots.className = 'card-dots';
  const dotEls = images.map((_,i)=> {
    const d = document.createElement('span'); d.className='card-dot'+(i===0?' is-active':'');
    d.addEventListener('click', (e)=>{ e.stopPropagation(); goTo(i); });
    dots.appendChild(d); return d;
  });
  imgWrap.appendChild(dots);

  const prev = document.createElement('button'); prev.className='card-nav prev'; prev.setAttribute('aria-label','Previous slide'); prev.textContent='‹';
  const next = document.createElement('button'); next.className='card-nav next'; next.setAttribute('aria-label','Next slide'); next.textContent='›';
  prev.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr-1); });
  next.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr+1); });
  imgWrap.appendChild(prev); imgWrap.appendChild(next);

  let curr = 0, usingA = true, timer = null;
  slideA.style.backgroundImage = `url("${images[0]}")`;

  const start = ()=> { stop(); timer = setInterval(()=> goTo(curr+1), intervalMs); };
  const stop  = ()=> { if (timer) { clearInterval(timer); timer = null; } };

  function goTo(idx){
    const nextIdx = (idx + images.length) % images.length;
    const preload = new Image(); preload.src = images[nextIdx];

    const show = usingA ? slideB : slideA;
    show.style.backgroundImage = `url("${images[nextIdx]}")`;

    slideA.classList.toggle('is-active', !usingA);
    slideB.classList.toggle('is-active', usingA);
    usingA = !usingA;
    curr = nextIdx;

    dotEls.forEach((d,i)=> d.classList.toggle('is-active', i===curr));
  }

  let touchX = null;
  imgWrap.addEventListener('touchstart', (e)=>{ touchX = e.touches[0].clientX; stop(); }, {passive:true});
  imgWrap.addEventListener('touchend', (e)=>{
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { dx > 0 ? goTo(curr-1) : goTo(curr+1); }
    touchX = null; start();
  });

  imgWrap.addEventListener('mouseenter', stop);
  imgWrap.addEventListener('mouseleave', start);

  start();
}

function buildPricing(){
  const { pricing } = getLangData();
  const sec = document.getElementById('pricing-table');
  if(!sec) return;
  sec.innerHTML = pricing.plans.map(p => `
    <div class="pricing-card" role="button" tabindex="0" data-link="#${p.route}">
      <h3>${p.name}</h3>
      <div class="price">${formatCurrency(p.price)} <small>/ ${p.hours}</small></div>
      <p>${p.desc}</p>
    </div>
  `).join('');
  sec.querySelectorAll('[role="button"]').forEach(el=>{
    el.addEventListener('click', ()=> location.hash = el.dataset.link);
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); el.click(); } });
  });

  pricing.plans.forEach(p => {
    const el = document.getElementById(`${p.route}-plan`);
    if(el){
      el.innerHTML = `
        <h3>${pricing.planCardHeading}</h3>
        <div class="price">${formatCurrency(p.price)} <small>/ ${p.hours}</small></div>
        <p>${p.desc}</p>
      `;
    }
  });

  ['prewedding','event','wedding'].forEach(route=>{
    const el = document.getElementById(`${route}-plan`);
    if (el) {
      el.innerHTML = `
        <h3>${pricing.planCardHeading}</h3>
        <div class="price">${pricing.customPrice}</div>
        <p>${pricing.customDescription}</p>
      `;
    }
  });
}

function buildFAQ(){
  const { faq } = getLangData();
  const list = document.getElementById('faq-list');
  if(!list) return;
  list.innerHTML = '';
  faq.items.forEach(item => {
    const details = document.createElement('details');
    details.className = 'qa-item';
    const summary = document.createElement('summary');
    summary.textContent = item.question;
    const p = document.createElement('p');
    p.textContent = item.answer;
    details.appendChild(summary);
    details.appendChild(p);
    list.appendChild(details);
  });
}

function attachPolicyBlocks(){
  document.querySelectorAll('.policy-block').forEach(node => node.remove());
  const policies = getLangData().policies || {};

  ['solo','couple','group'].forEach(route=>{
    const plan = document.getElementById(`${route}-plan`);
    if (plan && policies.default) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = policies.default.trim();
      const policyNode = wrapper.firstElementChild;
      if(policyNode) plan.insertAdjacentElement('afterend', policyNode);
    }
  });

  const special = { prewedding: policies.prewedding, event: policies.event, wedding: policies.wedding };
  Object.entries(special).forEach(([route, html])=>{
    if(!html) return;
    const sectionEl = document.querySelector(`.page-section[data-route="${route}"]`);
    if (sectionEl) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();
      const policyNode = wrapper.firstElementChild;
      if(!policyNode) return;
      const actions = sectionEl.querySelector('.section-actions');
      if (actions) {
        actions.insertAdjacentElement('beforebegin', policyNode);
      } else {
        sectionEl.insertAdjacentElement('beforeend', policyNode);
      }
    }
  });
}

function toast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg || defaultToastMessage;
  toastEl.style.opacity = '1';
  setTimeout(()=> toastEl.style.opacity='0', 1500);
}

function applyRouteMeta(route){
  const meta = (getLangData().meta && getLangData().meta[route]) || getLangData().meta.home;
  document.title = meta.title;
  const m = document.querySelector('meta[name="description"]');
  if(m) m.setAttribute('content', meta.desc);
}

function updateNavActiveState(activeRoute) {
  document.querySelectorAll('#nav-links a').forEach(link => {
    if (link.getAttribute('href') === `#${activeRoute}`) {
      link.classList.add('active'); link.setAttribute('aria-current','page');
    } else {
      link.classList.remove('active'); link.removeAttribute('aria-current');
    }
  });
}

function scrollToTop(){
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getRouteFromHash(){
  return (location.hash || '#home').replace('#','');
}

const allRoutes = routes.slice();
let currentActiveSection = null;

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
  if(h1){
    h1.focus({ preventScroll:true });
  }

  requestAnimationFrame(scrollToTop);

  try{ sessionStorage.setItem('lastVisitedRoute', route); }catch(e){}
}

function handleRouteChange(){
  let hash = getRouteFromHash();
  if(!allRoutes.includes(hash)) hash='home';
  showRoute(hash);
}

function applyQueryOptions(){
  const u = new URL(location.href);
  const r = u.searchParams.get('route');
  if(r && allRoutes.includes(r)){ location.hash = `#${r}`; }
  if(u.searchParams.get('print')==='1'){ setTimeout(()=> window.print(), 400); }
}

function setupMobileMenu(){
  const navToggle = document.getElementById('nav-toggle');
  if(!navToggle || !navLinksContainer) return;
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
    if(!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)){
      navLinksContainer.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded','false');
    }
  });
}

function setupBackTop(){
  if(!backTopButton) return;
  const onScroll = () => { backTopButton.classList.toggle('show', window.scrollY > 200); };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  backTopButton.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
}

function applyLanguageContent(){
  defaultToastMessage = getLangData().toastNotFound;
  buildNav();
  buildHomeCards();
  buildPricing();
  buildFAQ();
  attachPolicyBlocks();
  updateStaticText();
  renderLanguageButton();
  renderLanguageMenu();
  applyRouteMeta(getRouteFromHash());
}

function setLanguage(lang, { save = true } = {}){
  if(!I18N[lang]) lang = DEFAULT_LANG;
  currentLang = lang;
  if(save){
    try { localStorage.setItem('preferredLanguage', lang); } catch(e){}
  }
  closeLanguageMenu();
  applyLanguageContent();
  handleRouteChange();
}

function init(){
  setupLanguageSelector();
  setLanguage(detectInitialLanguage(), { save:false });
  setupMobileMenu();
  setupBackTop();

  const lastVisited = sessionStorage.getItem('lastVisitedRoute');
  if(!location.hash && lastVisited && routes.includes(lastVisited)){
    location.hash = `#${lastVisited}`;
  }
  applyQueryOptions();
  handleRouteChange();
  window.addEventListener('hashchange', handleRouteChange);
}

document.addEventListener('DOMContentLoaded', init);
