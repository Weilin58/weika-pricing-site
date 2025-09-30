const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '繁體中文' }
];

const I18N = {
  zh: {
    navBrand: '衛卡攝影影像工作室',
    navBrandAria: '衛卡攝影影像工作室首頁',
    skipLink: '跳到主要內容',
    toastNotFound: '找不到頁面，已帶你回主頁',
    languageName: '繁體中文',
    currency: { prefix: 'NT$', locale: 'zh-TW' },
    buttons: {
      viewPlan: '查看方案',
      bookNow: '預約檔期',
      backToHome: '回到主頁'
    },
    nav: [
      { route: 'home', text: '主頁' },
      { route: 'pricing', text: '服務報價' },
      { route: 'faq', text: '常見 QA' },
      { route: 'contact', text: '預約檔期' },
      { url: 'https://weikaphoto.myportfolio.com/', text: '查看作品集', external: true }
    ],
    home: {
      title: '衛卡攝影影像工作室',
      subtitle: '捕捉生活中的每一個光影故事。專業、有溫度的影像紀錄。',
      cards: [
        { route: 'solo', title: '個人寫真', desc: '紀錄屬於自己的獨特時刻。' },
        { route: 'couple', title: '雙人寫真', desc: '捕捉您們之間的甜蜜互動。' },
        { route: 'group', title: '團體寫真', desc: '留下充滿歡笑的共同回憶。' },
        { route: 'prewedding', title: '婚紗攝影', desc: '規劃您們的夢想婚紗照。' },
        { route: 'event', title: '活動紀錄', desc: '專業的動態與靜態活動紀錄。' },
        { route: 'wedding', title: '婚禮紀錄', desc: '紀實生命中最重要的一天。' }
      ]
    },
    pricing: {
      title: '服務報價',
      moreHeading: '更多方案',
      moreDescription: '婚紗攝影、活動及婚禮紀錄，將根據您的需求提供客製化報價，歡迎 <a href="#contact">查看聯絡方式</a>。',
      planCardHeading: '方案價格',
      customPrice: '客製報價',
      customDescription: '依需求提供專案估價，歡迎與我討論。',
      plans: [
        { route: 'solo', name: '個人寫真', price: 2400, hours: '1~1.5 小時', desc: '適合個人形象、紀念日或日常紀錄。' },
        { route: 'couple', name: '雙人寫真', price: 3500, hours: '1~1.5 小時', desc: '適合情侶、閨蜜、親子或好友。' },
        { route: 'group', name: '3–6 人團體', price: 5000, hours: '1~1.5 小時', desc: '適合家庭、朋友團體。' }
      ],
      customPlans: {
        prewedding: '依拍攝時數、地點、禮服等需求客製報價，歡迎洽詢。',
        event: '商業活動、講座、展演與派對，依規模 / 時數 / 流程提供精準報價。',
        wedding: '單 / 雙儀式、宴客、迎娶等皆可彈性安排，完整保存動人時刻。'
      }
    },
    contact: {
      title: '聯絡我們',
      subtitle: '聯絡方式',
      description: 'Instagram：@weika_58 ｜ Email：weikaphotography@gmail.com ｜ Phone：0926-189-353'
    },
    faq: {
      title: '常見問題（Q&A）',
      items: [
        { question: 'Q1：拍攝前需要化妝或髮型設計嗎？', answer: 'A：可以自行準備妝髮，也能額外安排專業造型師協助（將另行收費），讓整體風格更完整。' },
        { question: 'Q2：如果我不太會擺姿勢，攝影師會引導嗎？', answer: 'A：完全不用擔心！我會在現場一步步引導，幫助你放鬆心情，展現最自然的狀態。' },
        { question: 'Q3：拍攝地點可以自己選嗎？還是由攝影師建議？', answer: 'A：地點可以由你自由決定，如果暫時沒有想法，我也會根據你的需求與風格提供合適建議，一起討論最適合的拍攝場景。' },
        { question: 'Q4：如果遇到下雨，戶外拍攝怎麼辦？', answer: 'A：若天氣不佳，可以提前改期，或更換至室內棚拍 / 咖啡廳等場所。我們會事先討論替代方案，確保拍攝順利。' },
        { question: 'Q5：需要自己準備服裝嗎？', answer: 'A：建議以自備為主，這樣能展現最符合你個人風格的樣貌；若需要搭配建議，也可以和我討論。' },
        { question: 'Q6：寵物可以一起入鏡嗎？', answer: 'A：非常歡迎！只要事先告知，我會幫忙規劃拍攝方式，讓畫面更有溫度。' },
        { question: 'Q7：想拍攝學士服照（畢業照），怎麼收費？', answer: 'A：依照人數選擇對應方案即可，與個人或雙人寫真方案相同。' },
        { question: 'Q8：最晚需要多久以前預約？', answer: 'A：由於行程及檔期有限，建議至少提前 1 個月完成預約。若是婚紗拍攝，考量到相本與小卡製作，建議至少 3 個月前預約，以保留檔期。' },
        { question: 'Q9：活動紀錄及婚禮紀錄，會有雙攝影師嗎？', answer: 'A：當活動或婚禮規模較大時，可以適度安排雙攝影師共同拍攝，報價也會依需求調整。' },
        { question: 'Q10：請問有錄影服務嗎？', answer: 'A：目前僅提供平面攝影，尚未提供動態錄影服務。' }
      ]
    },
    sections: {
      solo: { title: '個人寫真' },
      couple: { title: '雙人寫真' },
      group: { title: '3–6 人團體' },
      prewedding: { title: '婚紗攝影' },
      event: { title: '活動紀錄' },
      wedding: { title: '婚禮紀錄' }
    },
    footer: '© {{year}} 衛卡攝影影像工作室 · Instagram @weika_58',
    backTop: { label: '回到頂端', title: '回到頂端' },
    meta: {
      home: { title: '衛卡攝影影像工作室｜首頁', desc: '捕捉生活中的每一個光影故事。專業、有溫度的影像紀錄。' },
      pricing: { title: '服務報價｜衛卡攝影影像工作室', desc: '個人寫真、雙人寫真、團體寫真與客製化專案之費用說明。' },
      contact: { title: '聯絡我們｜衛卡攝影影像工作室', desc: 'Instagram、Email、電話等聯絡方式。' },
      faq: { title: '常見問題 Q&A｜衛卡攝影影像工作室', desc: '拍攝前準備、改期、地點、預約與服務內容等常見問答。' },
      solo: { title: '個人寫真｜衛卡攝影影像工作室', desc: '自然互動、氣質寫真，打造你的專屬形象。' },
      couple: { title: '雙人寫真｜衛卡攝影影像工作室', desc: '以互動畫面記錄兩人默契與情感的流動。' },
      group: { title: '3–6 人團體｜衛卡攝影影像工作室', desc: '朋友、家庭、團隊合照，愉快而自然的群像時刻。' },
      prewedding: { title: '婚紗攝影｜衛卡攝影影像工作室', desc: '以光影與場景述說兩人的篇章，可全案客製。' },
      event: { title: '活動紀錄｜衛卡攝影影像工作室', desc: '商業活動、講座、展演與派對，完整保存重點瞬間。' },
      wedding: { title: '婚禮紀錄｜衛卡攝影影像工作室', desc: '以紀實視角捕捉儀式與宴客的每個感動片刻。' }
    },
    policies: {
      default: `
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
            <li><strong>買斷不公開：</strong> 若您不希望本次作品用於作品集／網站／社群展示，可加購 NT$2,000；此為不公開展示之授權，非著作財產權讓與，攝影師仍保留著作人格權與合理存檔權。</li>
            <li><strong>訂金：</strong> 確認預約收取總報價 50% 訂金。</li>
            <li><strong>交通費：</strong> 每公里 NT$7；若計算未滿 NT$100 則不收取。</li>
            <li><strong>額外費用：</strong> 攝影棚租借、妝髮造型等費用，實報實銷。</li>
            <li><strong>毛片：</strong> 原則不提供；如需加購，全數 NT$2,000。</li>
          </ul>
        </section>
      `,
      prewedding: `
        <section class="policy-block" aria-label="婚紗攝影方案內容" style="margin-top: var(--spacing-4);">
          <h3>方案內容</h3>
          <h4>成品內容（專案訂製）</h4>
          <ul>
            <li><strong>精修張數：</strong> 依方案客製（建議至少 20 張），提供風格統一之精修。</li>
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
            <li><strong>買斷不公開：</strong> 若您不希望本次作品用於作品集／網站／社群展示，可加購 NT$2,000；此為不公開展示之授權，非著作財產權讓與，攝影師仍保留著作人格權與合理存檔權。</li>
            <li><strong>訂金：</strong> 確認檔期後收取總額 50% 訂金；餘款於成品驗收前結清。</li>
            <li><strong>交通／場租：</strong> 外縣市交通與場地費用另計；如需包車另報價。</li>
            <li><strong>毛片：</strong> 原則不提供；如需加購全數毛片，均收轉檔與整理費用 NT$2,000。</li>
          </ul>
        </section>
      `,
      event: `
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
            <li><strong>買斷不公開：</strong> 若您不希望本次作品用於作品集／網站／社群展示，可加購 NT$2,000；此為不公開展示之授權，非著作財產權讓與，攝影師仍保留著作人格權與合理存檔權。</li>
            <li><strong>訂金：</strong> 確認檔期後收取 50% 訂金；活動超時依每小時計價。</li>
            <li><strong>交通／加班：</strong> 交通與停車費另計；夜間或跨縣市請先告知以利安排。</li>
            <li><strong>毛片：</strong> 不提供毛片；如需加購，依場次與容量另報價。</li>
          </ul>
        </section>
      `,
      wedding: `
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
            <li><strong>買斷不公開：</strong> 若您不希望本次作品用於作品集／網站／社群展示，可加購 NT$2,000；此為不公開展示之授權，非著作財產權讓與，攝影師仍保留著作人格權與合理存檔權。</li>
            <li><strong>訂金：</strong> 確認檔期後收取 50% 訂金；餘款於交件前結清。</li>
            <li><strong>交通／住宿：</strong> 跨縣市或清晨日出檔期，交通與住宿費另計。</li>
            <li><strong>毛片：</strong> 原則不提供；如需加購全數毛片，收轉檔與整理費用 NT$2,000。</li>
          </ul>
        </section>
      `
    }
  },
  en: {
    navBrand: 'Weika Photography Studio',
    navBrandAria: 'Weika Photography Studio home',
    skipLink: 'Skip to main content',
    toastNotFound: 'We could not find that page. You have been taken back to home.',
    languageName: 'English',
    currency: { prefix: 'NT$', locale: 'en-US' },
    buttons: {
      viewPlan: 'View plan',
      bookNow: 'Book a session',
      backToHome: 'Back to home'
    },
    nav: [
      { route: 'home', text: 'Home' },
      { route: 'pricing', text: 'Pricing' },
      { route: 'faq', text: 'FAQ' },
      { route: 'contact', text: 'Contact' },
      { url: 'https://weikaphoto.myportfolio.com/', text: 'View portfolio', external: true }
    ],
    home: {
      title: 'Weika Photography Studio',
      subtitle: 'Capturing every chapter of your story with warm, professional imagery.',
      cards: [
        { route: 'solo', title: 'Solo Portraits', desc: 'Celebrate your unique personality.' },
        { route: 'couple', title: 'Couple Portraits', desc: 'Freeze the sweet moments between you two.' },
        { route: 'group', title: 'Group Portraits', desc: 'Preserve memories filled with laughter.' },
        { route: 'prewedding', title: 'Pre-wedding', desc: 'Design the dream shoot that matches your love story.' },
        { route: 'event', title: 'Event Coverage', desc: 'Professional coverage for talks, launches, and more.' },
        { route: 'wedding', title: 'Wedding Day', desc: 'Document every heartfelt moment of the big day.' }
      ]
    },
    pricing: {
      title: 'Pricing',
      moreHeading: 'More services',
      moreDescription: 'Pre-wedding, event, and wedding coverage are fully customized. <a href="#contact">Get in touch for a quote</a>.',
      planCardHeading: 'Plan details',
      customPrice: 'Custom quote',
      customDescription: 'Let’s discuss the scope together for an exact proposal.',
      plans: [
        { route: 'solo', name: 'Solo Portraits', price: 2400, hours: '1–1.5 hours', desc: 'Ideal for personal branding, milestones, or lifestyle portraits.' },
        { route: 'couple', name: 'Couple Portraits', price: 3500, hours: '1–1.5 hours', desc: 'Great for couples, best friends, parents and kids, or siblings.' },
        { route: 'group', name: 'Group Portraits (3–6 ppl)', price: 5000, hours: '1–1.5 hours', desc: 'Perfect for families, teams, and friend groups.' }
      ],
      customPlans: {
        prewedding: 'Tailored by shooting hours, locations, outfits, and styling preferences.',
        event: 'Quotes are based on schedule, duration, and the scale of your event.',
        wedding: 'Flexible coverage for ceremonies, receptions, and tea ceremonies to preserve every moment.'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'How to reach me',
      description: 'Instagram: @weika_58 ｜ Email: weikaphotography@gmail.com ｜ Phone: +886-926-189-353'
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { question: 'Q1. Do I need to arrange makeup or hairstyling?', answer: 'A1. You can handle styling yourself, or I can book a professional artist for you (additional fee) to complete the look.' },
        { question: 'Q2. I do not know how to pose—will you guide me?', answer: 'A2. Absolutely. I will guide you step by step so you can feel relaxed and look natural.' },
        { question: 'Q3. Can I choose the shooting location myself?', answer: 'A3. Yes! You can choose the location, and if you need ideas I will recommend places that match the vibe you want.' },
        { question: 'Q4. What if it rains on the day of the shoot?', answer: 'A4. We can reschedule or move to an indoor studio or café. We will plan the backup together.' },
        { question: 'Q5. Do I need to prepare outfits?', answer: 'A5. Bringing your own outfits helps showcase your personal style. I am also happy to suggest styling ideas.' },
        { question: 'Q6. Can I include my pet?', answer: 'A6. Of course! Let me know in advance so I can plan the setup and pacing for everyone’s comfort.' },
        { question: 'Q7. How do you charge for graduation portrait sessions?', answer: 'A7. Choose the plan based on the number of people. Pricing follows the solo or duo portrait packages.' },
        { question: 'Q8. How far in advance should I book?', answer: 'A8. Please reserve at least one month ahead. For pre-wedding projects, three months is recommended for album production time.' },
        { question: 'Q9. Do you offer two photographers for events or weddings?', answer: 'A9. A second photographer can be arranged for larger events, and the quote will be adjusted accordingly.' },
        { question: 'Q10. Do you provide videography?', answer: 'A10. I currently focus on photography only and do not provide videography services.' }
      ]
    },
    sections: {
      solo: { title: 'Solo Portraits' },
      couple: { title: 'Couple Portraits' },
      group: { title: 'Group Portraits' },
      prewedding: { title: 'Pre-wedding' },
      event: { title: 'Event Coverage' },
      wedding: { title: 'Wedding Day' }
    },
    footer: '© {{year}} Weika Photography Studio · Instagram @weika_58',
    backTop: { label: 'Back to top', title: 'Back to top' },
    meta: {
      home: { title: 'Weika Photography Studio | Home', desc: 'Warm, professional photography for portraits, weddings, and events in Taiwan.' },
      pricing: { title: 'Pricing | Weika Photography Studio', desc: 'Rates for portraits plus bespoke quotes for weddings and events.' },
      contact: { title: 'Contact | Weika Photography Studio', desc: 'Reach Weika on Instagram, email, or phone to plan your shoot.' },
      faq: { title: 'FAQ | Weika Photography Studio', desc: 'Answers about preparation, booking, locations, and coverage.' },
      solo: { title: 'Solo Portraits | Weika Photography Studio', desc: 'Portrait sessions that highlight your personality and confidence.' },
      couple: { title: 'Couple Portraits | Weika Photography Studio', desc: 'Celebrate the chemistry between you with relaxed, guided posing.' },
      group: { title: 'Group Portraits | Weika Photography Studio', desc: 'Fun, vibrant portraits for families, friends, or teams.' },
      prewedding: { title: 'Pre-wedding | Weika Photography Studio', desc: 'Tailor-made pre-wedding photography that narrates your love story.' },
      event: { title: 'Event Coverage | Weika Photography Studio', desc: 'Professional coverage for corporate events, talks, and celebrations.' },
      wedding: { title: 'Wedding Day | Weika Photography Studio', desc: 'Story-driven photography for ceremonies, receptions, and every highlight.' }
    },
    policies: {
      default: `
        <section class="policy-block" aria-label="Plan inclusions" style="margin-top: var(--spacing-4);">
          <h3>What is included</h3>
          <h4>Deliverables</h4>
          <ul>
            <li><strong>Professional color grading:</strong> 30–60 edited JPEGs with the studio look.</li>
            <li><strong>Retouching:</strong> Select 10 favourites for detailed retouching (skin, body shape, fine adjustments).</li>
          </ul>
          <h4>Delivery</h4>
          <ul>
            <li><strong>Cloud delivery:</strong> Download via Google Drive, files remain for 30 days.</li>
            <li><strong>USB add-on:</strong> Add NT$300 for a USB drive.</li>
          </ul>
          <h4>Booking & fees</h4>
          <ul>
            <li><strong>Buyout privacy option:</strong> Add NT$2,000 if you prefer the images to stay private (no portfolio or social sharing). Copyright and archival rights remain with the photographer.</li>
            <li><strong>Deposit:</strong> 50% of the total is due to secure the session.</li>
            <li><strong>Travel:</strong> NT$7 per kilometre; waived if under NT$100.</li>
            <li><strong>Additional costs:</strong> Studio rental, makeup, and styling are charged at cost.</li>
            <li><strong>RAW files:</strong> Not included by default; add NT$2,000 for the full set if needed.</li>
          </ul>
        </section>
      `,
      prewedding: `
        <section class="policy-block" aria-label="Pre-wedding inclusions" style="margin-top: var(--spacing-4);">
          <h3>What is included</h3>
          <h4>Custom deliverables</h4>
          <ul>
            <li><strong>Retouched images:</strong> Tailored to your plan (recommended 20+ images) with consistent styling.</li>
            <li><strong>Albums & prints:</strong> Optional 10×10 or 12×12 albums, frames, and thank-you cards.</li>
            <li><strong>Shoot setup:</strong> Flexible outfit counts, makeup looks, locations, and studio rentals.</li>
          </ul>
          <h4>Delivery</h4>
          <ul>
            <li><strong>Cloud delivery:</strong> Edited and retouched files via cloud download (available for 30 days).</li>
            <li><strong>Physical delivery:</strong> Albums and frames follow the vendor’s lead time (about 21–45 days).</li>
            <li><strong>Backup:</strong> USB or portable drive backups available as add-ons.</li>
          </ul>
          <h4>Booking & fees</h4>
          <ul>
            <li><strong>Buyout privacy option:</strong> Add NT$2,000 to keep the images private from portfolio use.</li>
            <li><strong>Deposit:</strong> 50% upon confirming the date; balance due before final delivery.</li>
            <li><strong>Travel & venue:</strong> Additional fees for travel outside the city or venue rentals; chauffeured transport can be quoted.</li>
            <li><strong>RAW files:</strong> Full RAW set available for NT$2,000 if requested.</li>
          </ul>
        </section>
      `,
      event: `
        <section class="policy-block" aria-label="Event coverage inclusions" style="margin-top: var(--spacing-4);">
          <h3>What is included</h3>
          <h4>Custom deliverables</h4>
          <ul>
            <li><strong>Highlights:</strong> Keynote speakers, audience reactions, booth details, and group photos captured with storytelling in mind.</li>
            <li><strong>Group planning:</strong> Guest photo lists and flow planning to keep the event running smoothly.</li>
          </ul>
          <h4>Delivery</h4>
          <ul>
            <li><strong>Quick selects:</strong> 10–20 highlight images delivered within 24–72 hours for marketing.</li>
            <li><strong>Full gallery:</strong> Complete edited set delivered within 7–14 days.</li>
          </ul>
          <h4>Booking & fees</h4>
          <ul>
            <li><strong>Buyout privacy option:</strong> Add NT$2,000 to keep the gallery private.</li>
            <li><strong>Deposit:</strong> 50% to secure the date; overtime is billed hourly.</li>
            <li><strong>Travel & overtime:</strong> Travel, parking, and late-night surcharges are quoted separately; please brief me in advance.</li>
            <li><strong>RAW files:</strong> Not provided by default; pricing depends on event length and storage needs.</li>
          </ul>
        </section>
      `,
      wedding: `
        <section class="policy-block" aria-label="Wedding coverage inclusions" style="margin-top: var(--spacing-4);">
          <h3>What is included</h3>
          <h4>Custom deliverables</h4>
          <ul>
            <li><strong>Full-day / half-day:</strong> Complete coverage of tea ceremonies, vows, and receptions. A second photographer can be arranged.</li>
            <li><strong>Group lists:</strong> Provide family or VIP group shot lists in advance for smooth coordination.</li>
          </ul>
          <h4>Delivery</h4>
          <ul>
            <li><strong>Quick selects:</strong> 10–20 highlights delivered within 48–72 hours for announcements.</li>
            <li><strong>Full gallery:</strong> Complete edited set delivered within 21–45 days.</li>
            <li><strong>Backup:</strong> USB or portable drive add-ons available; cloud gallery remains for 30 days.</li>
          </ul>
          <h4>Booking & fees</h4>
          <ul>
            <li><strong>Buyout privacy option:</strong> Add NT$2,000 to keep the story private.</li>
            <li><strong>Deposit:</strong> 50% to confirm; balance due before delivery.</li>
            <li><strong>Travel & lodging:</strong> Additional fees for out-of-town or sunrise schedules.</li>
            <li><strong>RAW files:</strong> Full RAW set available for NT$2,000.</li>
          </ul>
        </section>
      `
    }
  },
  ja: {
    navBrand: 'WEIKAフォトスタジオ',
    navBrandAria: 'WEIKAフォトスタジオ ホーム',
    skipLink: 'メインコンテンツへ移動',
    toastNotFound: 'ページが見つからなかったため、ホームへ戻りました。',
    languageName: '日本語',
    currency: { prefix: 'NT$', locale: 'ja-JP' },
    buttons: {
      viewPlan: 'プランを見る',
      bookNow: '予約する',
      backToHome: 'ホームに戻る'
    },
    nav: [
      { route: 'home', text: 'ホーム' },
      { route: 'pricing', text: '料金' },
      { route: 'faq', text: 'よくある質問' },
      { route: 'contact', text: 'お問い合わせ' },
      { url: 'https://weikaphoto.myportfolio.com/', text: '作品を見る', external: true }
    ],
    home: {
      title: 'WEIKAフォトスタジオ',
      subtitle: '物語のひとコマひとコマを、あたたかく丁寧な写真で残します。',
      cards: [
        { route: 'solo', title: 'ソロポートレート', desc: '自分らしさを美しく残すプラン。' },
        { route: 'couple', title: 'カップルフォト', desc: 'ふたりの距離感や空気感をそのままに。' },
        { route: 'group', title: 'グループフォト', desc: '家族や友人との楽しい瞬間を共有。' },
        { route: 'prewedding', title: '前撮り・フォトウェディング', desc: '理想のロケーションで叶えるウェディングフォト。' },
        { route: 'event', title: 'イベント撮影', desc: '講演会・展示会・パーティーなどをプロが撮影。' },
        { route: 'wedding', title: '結婚式当日撮影', desc: '大切な1日をストーリーとして記録します。' }
      ]
    },
    pricing: {
      title: '料金プラン',
      moreHeading: 'その他のサービス',
      moreDescription: '前撮り・イベント・結婚式の撮影は完全オーダーメイドです。<a href="#contact">お問い合わせはこちら</a>。',
      planCardHeading: 'プラン詳細',
      customPrice: 'お見積もり',
      customDescription: '内容に合わせてヒアリング後にお見積もりいたします。',
      plans: [
        { route: 'solo', name: 'ソロポートレート', price: 2400, hours: '約1〜1.5時間', desc: 'プロフィール、記念日、ライフスタイル撮影におすすめ。' },
        { route: 'couple', name: 'カップルフォト', price: 3500, hours: '約1〜1.5時間', desc: 'カップル、親友、親子、兄弟姉妹に。' },
        { route: 'group', name: 'グループフォト（3〜6名）', price: 5000, hours: '約1〜1.5時間', desc: '家族写真やチーム撮影に最適。' }
      ],
      customPlans: {
        prewedding: '撮影時間、衣装、ヘアメイク、ロケーションなどを組み合わせてご提案します。',
        event: 'イベントの規模・スケジュール・必要カットに合わせてお見積もりいたします。',
        wedding: '挙式、披露宴、二次会など、ご希望のタイムラインに合わせて柔軟に対応します。'
      }
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: '連絡先',
      description: 'Instagram：@weika_58 ｜ Email：weikaphotography@gmail.com ｜ Phone：+886-926-189-353'
    },
    faq: {
      title: 'よくある質問',
      items: [
        { question: 'Q1. ヘアメイクは必要ですか？', answer: 'A1. セルフでも大丈夫ですし、有料でプロのヘアメイクを手配することも可能です。' },
        { question: 'Q2. ポーズが苦手なのですが大丈夫でしょうか？', answer: 'A2. ご安心ください。撮影中は一つ一つ丁寧にポーズをご案内します。' },
        { question: 'Q3. 撮影場所は自分で決められますか？', answer: 'A3. ご希望の場所で撮影できます。イメージが固まっていない場合は、雰囲気に合うスポットをご提案します。' },
        { question: 'Q4. 撮影当日が雨の場合はどうなりますか？', answer: 'A4. 日程変更やスタジオ・カフェなど屋内撮影への変更が可能です。事前に代替案をご用意します。' },
        { question: 'Q5. 衣装は用意したほうがいいですか？', answer: 'A5. お手持ちの衣装があると個性を表現しやすいです。コーディネートのご相談も歓迎です。' },
        { question: 'Q6. ペットとの撮影はできますか？', answer: 'A6. もちろん可能です。事前にお知らせいただければ、撮影プランに合わせて進行を調整します。' },
        { question: 'Q7. 卒業写真の料金はどうなりますか？', answer: 'A7. 人数に合わせてプランをお選びください。ソロ・ペアプランと同じ料金体系です。' },
        { question: 'Q8. いつまでに予約すればいいですか？', answer: 'A8. スケジュール確保のため、少なくとも1か月前のご予約をおすすめします。前撮りはアルバム制作の時間も考慮し、3か月前のご予約が理想です。' },
        { question: 'Q9. イベントや結婚式ではカメラマンを増やせますか？', answer: 'A9. 規模に応じてセカンドカメラマンを手配できます。追加費用はご相談ください。' },
        { question: 'Q10. 動画撮影にも対応していますか？', answer: 'A10. 現在はスチール撮影のみで、動画サービスは行っておりません。' }
      ]
    },
    sections: {
      solo: { title: 'ソロポートレート' },
      couple: { title: 'カップルフォト' },
      group: { title: 'グループフォト' },
      prewedding: { title: '前撮り・フォトウェディング' },
      event: { title: 'イベント撮影' },
      wedding: { title: '結婚式当日撮影' }
    },
    footer: '© {{year}} WEIKAフォトスタジオ · Instagram @weika_58',
    backTop: { label: 'ページトップへ', title: 'ページトップへ' },
    meta: {
      home: { title: 'WEIKAフォトスタジオ｜ホーム', desc: '台湾を拠点に、ポートレート・ウェディング・イベントを温かく撮影します。' },
      pricing: { title: '料金プラン｜WEIKAフォトスタジオ', desc: 'ポートレート料金と、ウェディングやイベントのカスタムお見積もり。' },
      contact: { title: 'お問い合わせ｜WEIKAフォトスタジオ', desc: 'Instagram・メール・電話でお気軽にご連絡ください。' },
      faq: { title: 'よくある質問｜WEIKAフォトスタジオ', desc: '準備・予約・ロケーション・撮影内容に関するQ&A。' },
      solo: { title: 'ソロポートレート｜WEIKAフォトスタジオ', desc: 'あなたらしさを引き出すポートレート撮影。' },
      couple: { title: 'カップルフォト｜WEIKAフォトスタジオ', desc: '自然な表情と距離感を大切にした撮影。' },
      group: { title: 'グループフォト｜WEIKAフォトスタジオ', desc: '家族や友人との楽しい時間を彩る写真。' },
      prewedding: { title: '前撮り・フォトウェディング｜WEIKAフォトスタジオ', desc: 'おふたりの物語に合わせた特別なウェディングフォト。' },
      event: { title: 'イベント撮影｜WEIKAフォトスタジオ', desc: '企業イベント、講演、展示会などの記録撮影。' },
      wedding: { title: '結婚式当日撮影｜WEIKAフォトスタジオ', desc: '挙式から披露宴まで感動の瞬間を逃さず記録。' }
    },
    policies: {
      default: `
        <section class="policy-block" aria-label="プラン内容" style="margin-top: var(--spacing-4);">
          <h3>プラン内容</h3>
          <h4>納品物</h4>
          <ul>
            <li><strong>カラー調整：</strong> スタジオテイストで仕上げた30〜60枚のデータ。</li>
            <li><strong>レタッチ：</strong> お好きな10枚を選び、肌・ライン・細部まで丁寧に修整します。</li>
          </ul>
          <h4>納品方法</h4>
          <ul>
            <li><strong>オンライン納品：</strong> Google Driveにて30日間ダウンロード可能。</li>
            <li><strong>USB追加：</strong> NT$300でUSBメモリをご用意できます。</li>
          </ul>
          <h4>予約・料金について</h4>
          <ul>
            <li><strong>非公開オプション：</strong> 作品集・SNSへの掲載を希望されない場合はNT$2,000で非公開対応が可能です（著作権は撮影者に帰属します）。</li>
            <li><strong>予約金：</strong> ご予約確定時に合計金額の50%をお預かりします。</li>
            <li><strong>交通費：</strong> 1kmあたりNT$7（NT$100未満の場合は無料）。</li>
            <li><strong>追加費用：</strong> スタジオレンタル、ヘアメイクなどは実費でご請求いたします。</li>
            <li><strong>RAWデータ：</strong> 通常は含まれません。ご希望の場合は一式NT$2,000でご提供します。</li>
          </ul>
        </section>
      `,
      prewedding: `
        <section class="policy-block" aria-label="前撮りプラン内容" style="margin-top: var(--spacing-4);">
          <h3>プラン内容</h3>
          <h4>カスタム納品</h4>
          <ul>
            <li><strong>レタッチ枚数：</strong> ご希望に合わせて（目安20枚以上）統一感のある仕上がりに整えます。</li>
            <li><strong>アルバム・プリント：</strong> 10×10／12×12アルバム、額装、サンクスカードなどをご用意できます。</li>
            <li><strong>撮影構成：</strong> 衣装数、ヘアメイク回数、ロケーション、スタジオ手配など柔軟に調整します。</li>
          </ul>
          <h4>納品方法</h4>
          <ul>
            <li><strong>オンライン納品：</strong> レタッチ済みデータをクラウドで共有（30日間ダウンロード可能）。</li>
            <li><strong>物理納品：</strong> アルバムや額装は制作会社の納期に準じます（約21〜45日）。</li>
            <li><strong>バックアップ：</strong> USBやポータブルHDDの追加納品も承ります。</li>
          </ul>
          <h4>予約・料金について</h4>
          <ul>
            <li><strong>非公開オプション：</strong> 作品公開を避けたい場合はNT$2,000で対応可能です。</li>
            <li><strong>予約金：</strong> 日程確定後に総額の50%をお支払いいただき、残金は納品前にお支払いください。</li>
            <li><strong>交通・会場費：</strong> 遠方移動や会場レンタルが必要な場合は別途お見積もりとなります。送迎手配もご相談ください。</li>
            <li><strong>RAWデータ：</strong> ご希望の場合は全データをNT$2,000でお渡しします。</li>
          </ul>
        </section>
      `,
      event: `
        <section class="policy-block" aria-label="イベント撮影プラン内容" style="margin-top: var(--spacing-4);">
          <h3>プラン内容</h3>
          <h4>カスタム納品</h4>
          <ul>
            <li><strong>ハイライト：</strong> 登壇者、参加者の表情、ブースや展示の様子などをストーリー仕立てで撮影します。</li>
            <li><strong>集合写真の進行：</strong> 名簿作成や誘導など、スムーズな進行をサポートします。</li>
          </ul>
          <h4>納品方法</h4>
          <ul>
            <li><strong>速報納品：</strong> 24〜72時間以内に10〜20枚をお届けし、広報にご活用いただけます。</li>
            <li><strong>全データ：</strong> 7〜14日以内に調整済みデータを一括納品します。</li>
          </ul>
          <h4>予約・料金について</h4>
          <ul>
            <li><strong>非公開オプション：</strong> ギャラリーを非公開にする場合はNT$2,000を追加で頂戴します。</li>
            <li><strong>予約金：</strong> 50%を事前にお支払いいただき、延長が発生した場合は時間単位で加算されます。</li>
            <li><strong>交通・延長費：</strong> 交通費や駐車場代、深夜帯の追加料金などは内容に応じてお見積もりします。事前に詳細をお知らせください。</li>
            <li><strong>RAWデータ：</strong> 通常は含まれません。イベントの規模により別途お見積もりします。</li>
          </ul>
        </section>
      `,
      wedding: `
        <section class="policy-block" aria-label="結婚式撮影プラン内容" style="margin-top: var(--spacing-4);">
          <h3>プラン内容</h3>
          <h4>カスタム納品</h4>
          <ul>
            <li><strong>終日／半日撮影：</strong> お支度、挙式、披露宴まで一日を通して撮影します。セカンドカメラマンの手配も可能です。</li>
            <li><strong>ショットリスト：</strong> 親族・ご友人との集合写真リストをご共有いただき、スムーズにご案内します。</li>
          </ul>
          <h4>納品方法</h4>
          <ul>
            <li><strong>速報納品：</strong> 挙式後48〜72時間以内に10〜20枚をお届けし、告知やお礼にご利用いただけます。</li>
            <li><strong>全データ：</strong> 21〜45日ほどで調整済みデータを納品します。</li>
            <li><strong>バックアップ：</strong> USBやポータブルHDDでの納品も可能。クラウドは30日間ダウンロード可能です。</li>
          </ul>
          <h4>予約・料金について</h4>
          <ul>
            <li><strong>非公開オプション：</strong> 作品公開を控えたい場合はNT$2,000で対応いたします。</li>
            <li><strong>予約金：</strong> ご成約時に50%をお預かりし、残金は納品前にお支払いください。</li>
            <li><strong>交通・宿泊：</strong> 遠方や早朝撮影が必要な場合は、交通費・宿泊費を別途申し受けます。</li>
            <li><strong>RAWデータ：</strong> 全データはNT$2,000でご提供可能です。</li>
          </ul>
        </section>
      `
    }
  },
  ko: {
    navBrand: 'WEIKA 사진 스튜디오',
    navBrandAria: 'WEIKA 사진 스튜디오 홈',
    skipLink: '본문으로 바로가기',
    toastNotFound: '요청한 페이지를 찾을 수 없어 홈으로 이동했습니다.',
    languageName: '한국어',
    currency: { prefix: 'NT$', locale: 'ko-KR' },
    buttons: {
      viewPlan: '플랜 보기',
      bookNow: '예약 문의',
      backToHome: '홈으로 돌아가기'
    },
    nav: [
      { route: 'home', text: '홈' },
      { route: 'pricing', text: '가격' },
      { route: 'faq', text: 'FAQ' },
      { route: 'contact', text: '문의하기' },
      { url: 'https://weikaphoto.myportfolio.com/', text: '포트폴리오 보기', external: true }
    ],
    home: {
      title: 'WEIKA 사진 스튜디오',
      subtitle: '따뜻하고 전문적인 촬영으로 당신의 순간을 이야기로 남깁니다.',
      cards: [
        { route: 'solo', title: '개인 프로필', desc: '나만의 매력을 담는 포트레이트.' },
        { route: 'couple', title: '커플 촬영', desc: '둘만의 분위기와 애정을 자연스럽게 담아요.' },
        { route: 'group', title: '그룹 촬영', desc: '가족과 친구의 즐거운 시간을 기록합니다.' },
        { route: 'prewedding', title: '스튜디오/스냅 웨딩', desc: '러브스토리에 맞춘 프리웨딩 촬영.' },
        { route: 'event', title: '행사 스냅', desc: '강연, 전시, 파티 등 이벤트 전문 촬영.' },
        { route: 'wedding', title: '본식 스냅', desc: '하루의 감동을 빠짐없이 담아드립니다.' }
      ]
    },
    pricing: {
      title: '가격 안내',
      moreHeading: '맞춤형 서비스',
      moreDescription: '프리웨딩, 행사, 본식 스냅은 맞춤 견적으로 진행됩니다. <a href="#contact">문의하기</a>.',
      planCardHeading: '포함 내용',
      customPrice: '맞춤 견적',
      customDescription: '상세한 상담 후 필요에 맞춰 견적을 드립니다.',
      plans: [
        { route: 'solo', name: '개인 프로필', price: 2400, hours: '약 1~1.5시간', desc: '개인 브랜딩, 기념일, 라이프스타일 촬영에 적합합니다.' },
        { route: 'couple', name: '커플 촬영', price: 3500, hours: '약 1~1.5시간', desc: '커플, 친구, 부모와 자녀, 형제자매 촬영에 추천합니다.' },
        { route: 'group', name: '그룹 촬영 (3~6인)', price: 5000, hours: '약 1~1.5시간', desc: '가족, 팀, 친구들과 함께하는 촬영에 좋아요.' }
      ],
      customPlans: {
        prewedding: '촬영 시간, 의상, 헤어·메이크업, 장소 등에 따라 맞춤 구성해 드립니다.',
        event: '행사의 규모, 일정, 촬영 범위를 고려해 견적을 제안합니다.',
        wedding: '본식 일정에 맞춰 유연하게 촬영하며, 예식과 연출 순간을 모두 담아드립니다.'
      }
    },
    contact: {
      title: '문의하기',
      subtitle: '연락처',
      description: 'Instagram: @weika_58 ｜ Email: weikaphotography@gmail.com ｜ Phone: +886-926-189-353'
    },
    faq: {
      title: '자주 묻는 질문',
      items: [
        { question: 'Q1. 헤어/메이크업을 준비해야 하나요?', answer: 'A1. 직접 준비하셔도 좋고, 원하시면 추가 비용으로 전문 아티스트를 소개해 드릴 수 있습니다.' },
        { question: 'Q2. 포즈가 서툴러도 괜찮을까요?', answer: 'A2. 걱정하지 마세요. 촬영 내내 자연스럽게 포즈를 안내해 드립니다.' },
        { question: 'Q3. 촬영 장소는 제가 정할 수 있나요?', answer: 'A3. 네, 가능합니다. 원하는 분위기를 말씀해 주시면 어울리는 장소도 추천해 드립니다.' },
        { question: 'Q4. 촬영 날 비가 오면 어떻게 되나요?', answer: 'A4. 일정을 조정하거나 스튜디오, 카페 등 실내 장소로 변경할 수 있습니다. 미리 대안을 준비해 두겠습니다.' },
        { question: 'Q5. 의상은 직접 준비해야 하나요?', answer: 'A5. 직접 준비하시면 개성을 표현하기 좋습니다. 스타일링 상담도 도와드립니다.' },
        { question: 'Q6. 반려동물과 함께 촬영할 수 있나요?', answer: 'A6. 물론입니다! 미리 알려주시면 모두가 편안한 촬영을 위해 동선을 준비하겠습니다.' },
        { question: 'Q7. 졸업 사진은 어떻게 계산되나요?', answer: 'A7. 인원수에 맞는 플랜을 선택해 주세요. 개인/커플 플랜과 동일한 체계입니다.' },
        { question: 'Q8. 예약은 얼마나 미리 해야 하나요?', answer: 'A8. 최소 한 달 전에 예약하시는 것을 권장합니다. 프리웨딩은 앨범 제작 기간을 고려해 세 달 전에 예약해 주세요.' },
        { question: 'Q9. 행사나 웨딩에 서브 촬영가를 추가할 수 있나요?', answer: 'A9. 행사 규모에 따라 추가 촬영가를 배치할 수 있으며, 견적이 조정됩니다.' },
        { question: 'Q10. 영상 촬영도 가능합니까?', answer: 'A10. 현재는 사진 촬영만 진행하며 영상 서비스는 제공하지 않습니다.' }
      ]
    },
    sections: {
      solo: { title: '개인 프로필' },
      couple: { title: '커플 촬영' },
      group: { title: '그룹 촬영' },
      prewedding: { title: '스튜디오/스냅 웨딩' },
      event: { title: '행사 스냅' },
      wedding: { title: '본식 스냅' }
    },
    footer: '© {{year}} WEIKA 사진 스튜디오 · Instagram @weika_58',
    backTop: { label: '맨 위로', title: '맨 위로' },
    meta: {
      home: { title: 'WEIKA 사진 스튜디오 | 홈', desc: '대만을 기반으로 한 따뜻하고 전문적인 인물, 웨딩, 이벤트 촬영.' },
      pricing: { title: '가격 안내 | WEIKA 사진 스튜디오', desc: '포트레이트 요금과 맞춤 웨딩·이벤트 견적 안내.' },
      contact: { title: '문의하기 | WEIKA 사진 스튜디오', desc: 'Instagram, 이메일, 전화로 상담을 예약하세요.' },
      faq: { title: '자주 묻는 질문 | WEIKA 사진 스튜디오', desc: '준비 과정, 예약, 장소, 촬영 내용에 대한 답변.' },
      solo: { title: '개인 프로필 | WEIKA 사진 스튜디오', desc: '자신감과 개성을 담는 포트레이트 세션.' },
      couple: { title: '커플 촬영 | WEIKA 사진 스튜디오', desc: '두 사람의 케미를 자연스럽게 이끌어내는 촬영.' },
      group: { title: '그룹 촬영 | WEIKA 사진 스튜디오', desc: '가족과 친구, 팀을 위한 즐거운 단체 촬영.' },
      prewedding: { title: '스튜디오/스냅 웨딩 | WEIKA 사진 스튜디오', desc: '러브스토리를 담은 맞춤형 프리웨딩 촬영.' },
      event: { title: '행사 스냅 | WEIKA 사진 스튜디오', desc: '기업 행사, 강연, 전시 등 다양한 이벤트 촬영.' },
      wedding: { title: '본식 스냅 | WEIKA 사진 스튜디오', desc: '예식과 연출 순간을 스토리텔링 방식으로 담습니다.' }
    },
    policies: {
      default: `
        <section class="policy-block" aria-label="포함 사항" style="margin-top: var(--spacing-4);">
          <h3>포함 사항</h3>
          <h4>납품 파일</h4>
          <ul>
            <li><strong>컬러 보정:</strong> 스튜디오 톤으로 보정한 JPEG 30~60장.</li>
            <li><strong>정밀 보정:</strong> 선호컷 10장을 선택해 피부, 라인, 디테일까지 섬세하게 보정합니다.</li>
          </ul>
          <h4>납품 방법</h4>
          <ul>
            <li><strong>클라우드 전달:</strong> Google Drive 링크로 30일 동안 다운로드 가능합니다.</li>
            <li><strong>USB 추가:</strong> NT$300으로 USB 메모리를 추가할 수 있습니다.</li>
          </ul>
          <h4>예약 및 비용</h4>
          <ul>
            <li><strong>비공개 옵션:</strong> 작업물을 포트폴리오나 SNS에 사용하지 않길 원하시면 NT$2,000으로 비공개 옵션을 선택할 수 있습니다. 저작권은 촬영자에게 귀속됩니다.</li>
            <li><strong>계약금:</strong> 총 금액의 50%를 예약 보증금으로 받고 있습니다.</li>
            <li><strong>교통비:</strong> 1km당 NT$7 (NT$100 미만은 면제).</li>
            <li><strong>추가 비용:</strong> 스튜디오 대관, 헤어·메이크업 등은 실비로 청구됩니다.</li>
            <li><strong>RAW 파일:</strong> 기본 제공되지 않으며, 필요 시 전량 NT$2,000에 제공합니다.</li>
          </ul>
        </section>
      `,
      prewedding: `
        <section class="policy-block" aria-label="프리웨딩 포함 사항" style="margin-top: var(--spacing-4);">
          <h3>포함 사항</h3>
          <h4>맞춤 납품</h4>
          <ul>
            <li><strong>보정 컷:</strong> 최소 20컷 이상 권장, 플랜에 맞춰 통일감 있게 보정합니다.</li>
            <li><strong>앨범·인화:</strong> 10×10 / 12×12 앨범, 액자, 감사 카드 등을 옵션으로 제작합니다.</li>
            <li><strong>촬영 구성:</strong> 의상 수, 헤어·메이크업 횟수, 장소, 스튜디오 대관 등을 유연하게 조정합니다.</li>
          </ul>
          <h4>납품 방법</h4>
          <ul>
            <li><strong>클라우드 전달:</strong> 보정본과 컬러 보정본을 30일 동안 다운로드할 수 있습니다.</li>
            <li><strong>실물 납품:</strong> 앨범과 액자는 제작사 일정에 따라 약 21~45일이 소요됩니다.</li>
            <li><strong>백업:</strong> USB 또는 외장하드 추가 납품이 가능합니다.</li>
          </ul>
          <h4>예약 및 비용</h4>
          <ul>
            <li><strong>비공개 옵션:</strong> 작업물을 비공개로 유지하고 싶다면 NT$2,000이 추가됩니다.</li>
            <li><strong>계약금:</strong> 일정 확정 시 총액의 50%를 선입금 받고, 잔액은 최종 납품 전에 정산합니다.</li>
            <li><strong>교통·장소 비용:</strong> 타지역 이동이나 장소 대관이 필요한 경우 별도 비용이 발생하며, 차량 대절도 상담 가능합니다.</li>
            <li><strong>RAW 파일:</strong> 전량 RAW 파일은 NT$2,000에 제공됩니다.</li>
          </ul>
        </section>
      `,
      event: `
        <section class="policy-block" aria-label="행사 스냅 포함 사항" style="margin-top: var(--spacing-4);">
          <h3>포함 사항</h3>
          <h4>맞춤 납품</h4>
          <ul>
            <li><strong>하이라이트 컷:</strong> 연사, 관객 반응, 부스 디테일, 단체 사진 등을 스토리텔링 방식으로 담습니다.</li>
            <li><strong>동선 관리:</strong> 단체 촬영 리스트와 진행 동선을 함께 계획하여 현장 진행을 돕습니다.</li>
          </ul>
          <h4>납품 방법</h4>
          <ul>
            <li><strong>스피드 납품:</strong> 24~72시간 이내에 10~20컷을 전달하여 홍보에 활용할 수 있습니다.</li>
            <li><strong>전체 납품:</strong> 7~14일 이내에 컬러 보정본 전체를 전달합니다.</li>
          </ul>
          <h4>예약 및 비용</h4>
          <ul>
            <li><strong>비공개 옵션:</strong> 갤러리를 비공개로 유지하려면 NT$2,000이 추가됩니다.</li>
            <li><strong>계약금:</strong> 일정을 확정하기 위해 총액의 50%를 선입금으로 받고, 초과 시간은 시간당 비용이 추가됩니다.</li>
            <li><strong>교통·연장 요금:</strong> 교통비, 주차비, 심야 촬영 추가 요금은 별도 안내드리며 사전에 공유해 주세요.</li>
            <li><strong>RAW 파일:</strong> 기본 제공되지 않으며, 행사 규모와 용량에 따라 별도 견적을 드립니다.</li>
          </ul>
        </section>
      `,
      wedding: `
        <section class="policy-block" aria-label="본식 스냅 포함 사항" style="margin-top: var(--spacing-4);">
          <h3>포함 사항</h3>
          <h4>맞춤 납품</h4>
          <ul>
            <li><strong>종일/반일 촬영:</strong> 본식, 예식, 피로연 등 하루 일정 전체를 기록합니다. 추가 촬영가 배치도 가능합니다.</li>
            <li><strong>단체 사진 리스트:</strong> 가족과 지인 단체 사진 리스트를 미리 받아 원활하게 진행합니다.</li>
          </ul>
          <h4>납품 방법</h4>
          <ul>
            <li><strong>스피드 납품:</strong> 본식 후 48~72시간 내에 10~20컷을 전달하여 공지나 SNS에 활용할 수 있습니다.</li>
            <li><strong>전체 납품:</strong> 21~45일 이내에 전체 보정본을 전달합니다.</li>
            <li><strong>백업:</strong> USB/외장하드 추가 납품 가능, 클라우드 링크는 30일간 유지됩니다.</li>
          </ul>
          <h4>예약 및 비용</h4>
          <ul>
            <li><strong>비공개 옵션:</strong> 이야기를 비공개로 유지하려면 NT$2,000이 추가됩니다.</li>
            <li><strong>계약금:</strong> 총액의 50%를 계약금으로 받고, 잔금은 납품 전에 정산합니다.</li>
            <li><strong>교통·숙박:</strong> 타지역이나 이른 시간대 촬영 시 교통비와 숙박비가 추가될 수 있습니다.</li>
            <li><strong>RAW 파일:</strong> 전체 RAW 파일은 NT$2,000에 제공됩니다.</li>
          </ul>
        </section>
      `
    }
  }
};

