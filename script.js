const routes = ['home','contact','faq','solo','couple','group','prewedding','event','wedding'];

const HOME_CARD_IMAGES = {
  solo:       { prefix: 'images/portrait_', max: 6, scanLimit: 12 },
  couple:     { prefix: 'images/couple_', max: 8, scanLimit: 12 },
  group:      { prefix: 'images/group_', max: 4, scanLimit: 8 },
  prewedding: { prefix: 'images/wedding_', max: 8, scanLimit: 12 },
  event:      { prefix: 'images/event_', max: 6, scanLimit: 10 },
  wedding:    { prefix: 'images/weddingday_', max: 6, scanLimit: 10 }
};

const navLinksContainer = document.getElementById('nav-links');
const homeCardGrid = document.getElementById('home-card-grid');
const homeFeatureGrid = document.getElementById('home-feature-grid');
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
let revealObserver = null;

function imageExists(src){
  return new Promise(resolve => {
    if(!src){
      resolve(false);
      return;
    }
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function resolveCardImages(route){
  const config = HOME_CARD_IMAGES[route];
  if(!config){
    return [];
  }

  if(Array.isArray(config)){
    const results = await Promise.all(config.map(src => imageExists(src).then(ok => ok ? src : null)));
    return results.filter(Boolean);
  }

  const {
    prefix,
    extension = '.jpg',
    start = 1,
    max = 6,
    scanLimit = start + 10,
    pad = 2,
    maxMisses = 2
  } = config;

  const images = [];
  let misses = 0;
  let index = start;
  const upperBound = Math.max(scanLimit, start + max + maxMisses);

  while(images.length < max && index <= upperBound && misses <= maxMisses){
    const padded = String(index).padStart(pad, '0');
    const candidate = `${prefix}${padded}${extension}`;
    const exists = await imageExists(candidate);
    if(exists){
      images.push(candidate);
      misses = 0;
    } else {
      misses += 1;
    }
    index += 1;
  }

  return images;
}

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
  const scrollCue = document.getElementById('scroll-guide-text');
  if(scrollCue && data.home.scrollCue){
    scrollCue.textContent = data.home.scrollCue;
  }
  const sectionEyebrow = document.getElementById('home-section-eyebrow');
  if(sectionEyebrow && data.home.sectionIntro){
    sectionEyebrow.textContent = data.home.sectionIntro.eyebrow;
  }
  const sectionHeading = document.getElementById('home-section-heading');
  if(sectionHeading && data.home.sectionIntro){
    sectionHeading.textContent = data.home.sectionIntro.heading;
  }
  const sectionDescription = document.getElementById('home-section-description');
  if(sectionDescription && data.home.sectionIntro){
    sectionDescription.textContent = data.home.sectionIntro.description;
  }
  const planGuideDesc = document.getElementById('plan-guide-description');
  if(planGuideDesc && data.home.planGuideDescription){
    planGuideDesc.textContent = data.home.planGuideDescription;
  }
  const planGuideEyebrow = document.getElementById('plan-guide-eyebrow');
  if(planGuideEyebrow && data.home.planGuideEyebrow){
    planGuideEyebrow.textContent = data.home.planGuideEyebrow;
  }
  const planGuideHeading = document.getElementById('plan-guide-heading');
  if(planGuideHeading && data.home.planGuideTitle){
    planGuideHeading.textContent = data.home.planGuideTitle;
  }
  const heroLabel = document.getElementById('hero-card-label');
  const heroTitle = document.getElementById('hero-card-title');
  const heroDesc = document.getElementById('hero-card-description');
  if(data.home.heroCard){
    if(heroLabel) heroLabel.textContent = data.home.heroCard.label;
    if(heroTitle) heroTitle.textContent = data.home.heroCard.title;
    if(heroDesc) heroDesc.textContent = data.home.heroCard.description;
  }
}

function updatePricingTexts(){
  const { pricing } = getLangData();
  const title = document.getElementById('pricing-title');
  if(title) title.textContent = pricing.title;
  const subtitle = document.getElementById('pricing-subtitle');
  if(subtitle && pricing.subtitle){
    subtitle.textContent = pricing.subtitle;
  }
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
  const emailBtn = document.getElementById('contact-email-btn');
  if(emailBtn && contact.ctaEmail){
    emailBtn.textContent = contact.ctaEmail;
  }
  const igBtn = document.getElementById('contact-ig-btn');
  if(igBtn && contact.ctaInstagram){
    igBtn.textContent = contact.ctaInstagram;
  }
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
  document.querySelectorAll('.js-book-trigger').forEach(btn => {
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
  data.home.cards.forEach((card, index) => {
    const a = document.createElement('a');
    a.href = `#${card.route}`;
    a.className = 'card reveal-on-scroll';
    a.classList.add(`delay-${(index % 4) + 1}`);
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
    initCardSlider(a, card.route);
  });
}

function buildHomeHighlights(){
  const data = getLangData();
  if(!homeFeatureGrid) return;
  const highlights = data.home.sectionIntro && Array.isArray(data.home.sectionIntro.features)
    ? data.home.sectionIntro.features
    : [];
  homeFeatureGrid.innerHTML = '';
  highlights.forEach((feature, index) => {
    const card = document.createElement('div');
    card.className = `feature-card reveal-on-scroll delay-${(index % 4) + 1}`;
    const title = document.createElement('h3');
    title.textContent = feature.title;
    const desc = document.createElement('p');
    desc.textContent = feature.desc;
    card.appendChild(title);
    card.appendChild(desc);
    homeFeatureGrid.appendChild(card);
  });
}

async function initCardSlider(cardAnchorEl, route, intervalMs = 3800){
  const imgWrap = cardAnchorEl.querySelector('.card-image');
  if(!imgWrap) return;

  const images = await resolveCardImages(route);
  if(!cardAnchorEl.isConnected || !images.length){
    if(imgWrap && !images.length){
      imgWrap.classList.add('card-image--empty');
    }
    return;
  }

  const slideA = document.createElement('div');
  slideA.className = 'card-slide is-active';
  slideA.style.backgroundImage = `url("${images[0]}")`;
  imgWrap.appendChild(slideA);

  if(images.length === 1){
    return;
  }

  const slideB = document.createElement('div');
  slideB.className = 'card-slide';
  imgWrap.appendChild(slideB);

  const dots = document.createElement('div');
  dots.className = 'card-dots';
  const dotEls = images.map((_, i) => {
    const d = document.createElement('span');
    d.className = 'card-dot' + (i === 0 ? ' is-active' : '');
    d.addEventListener('click', (e)=>{
      e.stopPropagation();
      goTo(i);
    });
    dots.appendChild(d);
    return d;
  });
  imgWrap.appendChild(dots);

  const prev = document.createElement('button');
  prev.className = 'card-nav prev';
  prev.setAttribute('aria-label','Previous slide');
  prev.textContent = '‹';
  const next = document.createElement('button');
  next.className = 'card-nav next';
  next.setAttribute('aria-label','Next slide');
  next.textContent = '›';
  prev.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr-1); });
  next.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); goTo(curr+1); });
  imgWrap.appendChild(prev);
  imgWrap.appendChild(next);

  let curr = 0;
  let usingA = true;
  let timer = null;

  const start = ()=>{
    stop();
    timer = setInterval(()=> goTo(curr + 1), intervalMs);
  };

  const stop = ()=>{
    if(timer){
      clearInterval(timer);
      timer = null;
    }
  };

  function goTo(idx){
    const nextIdx = (idx + images.length) % images.length;
    if(nextIdx === curr) return;

    const preload = new Image();
    preload.src = images[nextIdx];

    const incoming = usingA ? slideB : slideA;
    const outgoing = usingA ? slideA : slideB;

    incoming.style.backgroundImage = `url("${images[nextIdx]}")`;

    const handleLeaveEnd = (e)=>{
      if(e.propertyName !== 'opacity') return;
      outgoing.classList.remove('is-leaving');
      outgoing.removeEventListener('transitionend', handleLeaveEnd);
    };

    outgoing.addEventListener('transitionend', handleLeaveEnd);

    incoming.classList.add('is-active');
    outgoing.classList.add('is-leaving');
    requestAnimationFrame(()=>{
      outgoing.classList.remove('is-active');
    });

    usingA = !usingA;
    curr = nextIdx;

    dotEls.forEach((d, i)=> d.classList.toggle('is-active', i === curr));
  }

  let touchX = null;
  imgWrap.addEventListener('touchstart', (e)=>{
    touchX = e.touches[0].clientX;
    stop();
  }, { passive: true });
  imgWrap.addEventListener('touchend', (e)=>{
    if(touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 40){
      dx > 0 ? goTo(curr - 1) : goTo(curr + 1);
    }
    touchX = null;
    start();
  });

  imgWrap.addEventListener('mouseenter', stop);
  imgWrap.addEventListener('mouseleave', start);

  start();
}

function buildPricing(){
  const { pricing } = getLangData();
  const sec = document.getElementById('pricing-table');
  if(sec){
    sec.innerHTML = pricing.plans.map((p, index) => `
      <div class="pricing-card reveal-on-scroll delay-${(index % 4) + 1}" role="button" tabindex="0" data-link="#${p.route}">
        <h3>${p.name}</h3>
        <div class="price">${formatCurrency(p.price)} <small>/ ${p.hours}</small></div>
        <p>${p.desc}</p>
      </div>
    `).join('');
    sec.querySelectorAll('[role="button"]').forEach(el=>{
      el.addEventListener('click', ()=> location.hash = el.dataset.link);
      el.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); el.click(); } });
    });
  }

  pricing.plans.forEach(p => {
    const el = document.getElementById(`${p.route}-plan`);
    if(el){
      el.innerHTML = `
        <h3>${pricing.planCardHeading}</h3>
        <div class="price">${formatCurrency(p.price)} <small>/ ${p.hours}</small></div>
        <p>${p.desc}</p>
      `;
      el.classList.add('reveal-on-scroll');
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
      el.classList.add('reveal-on-scroll');
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
    details.className = 'qa-item reveal-on-scroll';
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
      if(policyNode){
        policyNode.classList.add('reveal-on-scroll');
        plan.insertAdjacentElement('afterend', policyNode);
      }
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
      policyNode.classList.add('reveal-on-scroll');
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
  setupRevealObserver();
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
  const setMenuState = (open) => {
    navLinksContainer.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-menu-open', open);
    if(open){
      navLinksContainer.scrollTop = 0;
    }
  };
  navToggle.addEventListener('click', ()=>{
    const open = !navLinksContainer.classList.contains('is-open');
    setMenuState(open);
  });
  navLinksContainer.addEventListener('click', (e)=>{ if(e.target.tagName==='A'){
    setMenuState(false);
  }});
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){
    setMenuState(false);
  }});
  document.addEventListener('click', (e)=>{
    if(!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)){
      setMenuState(false);
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

function setupHeroCardTilt(){
  const heroCard = document.getElementById('hero-card');
  if(!heroCard) return;
  const maxRotation = 14;
  const update = (x, y, rect) => {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;
    heroCard.style.setProperty('--hero-card-rotate-x', `${rotateX.toFixed(2)}deg`);
    heroCard.style.setProperty('--hero-card-rotate-y', `${rotateY.toFixed(2)}deg`);
    heroCard.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    heroCard.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  heroCard.addEventListener('pointermove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    update(event.clientX - rect.left, event.clientY - rect.top, rect);
  });

  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.setProperty('--hero-card-rotate-x', '0deg');
    heroCard.style.setProperty('--hero-card-rotate-y', '0deg');
    heroCard.style.setProperty('--mouse-x', '50%');
    heroCard.style.setProperty('--mouse-y', '50%');
  });
}

function setupRevealObserver(){
  if(revealObserver){
    revealObserver.disconnect();
  }
  const targets = document.querySelectorAll('.reveal-on-scroll');
  if(!targets.length) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -10% 0px'
  });

  targets.forEach(target => {
    if(target.classList.contains('is-visible')){
      return;
    }
    revealObserver.observe(target);
  });
}

function applyLanguageContent(){
  defaultToastMessage = getLangData().toastNotFound;
  buildNav();
  buildHomeCards();
  buildHomeHighlights();
  buildPricing();
  buildFAQ();
  attachPolicyBlocks();
  updateStaticText();
  renderLanguageButton();
  renderLanguageMenu();
  applyRouteMeta(getRouteFromHash());
  setupRevealObserver();
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
  setupHeroCardTilt();

  const lastVisited = sessionStorage.getItem('lastVisitedRoute');
  if(!location.hash && lastVisited && routes.includes(lastVisited)){
    location.hash = `#${lastVisited}`;
  }
  applyQueryOptions();
  handleRouteChange();
  window.addEventListener('hashchange', handleRouteChange);
}

document.addEventListener('DOMContentLoaded', init);
