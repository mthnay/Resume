(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- LANGUAGE ---------------- */
  const getLang = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "tr") return q;
    try { const s = localStorage.getItem("lang"); if (s === "en" || s === "tr") return s; } catch {}
    return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
  };
  const LANG = getLang();
  const EN = LANG === "en";
  const t = (o, k) => (EN && o[k + "_en"]) || o[k];
  document.documentElement.lang = LANG;

  const UI = {
    tr: {
      "nav.about": "Profil", "nav.exp": "Deneyim", "nav.prj": "Projeler", "nav.skills": "Yetenekler", "nav.contact": "İletişim",
      "hero.kicker": "Portfolyo · Yazılım · Backend · AI", "hero.s1": "Yıl sektör deneyimi", "hero.s2": "Geliştirilen proje", "hero.s3": "Sertifika & lisans", "hero.scroll": "Kaydır",
      "about.text": "Gerçek dünyadaki sorunları koda dönüştüren bir yazılım geliştiriciyim. React ve Node.js ile uçtan uca web uygulamaları, Electron ile masaüstü araçlar ve <em>yerel çalışan yapay zeka</em> sistemleri geliştiriyorum; kendi dil modelimi sıfırdan eğitecek kadar işin derinine iniyorum.",
      "exp.title": "KARİYER", "prj.title": "PROJELER", "prj.sub": "Sahada karşılaştığım gerçek sorunlar için yazdığım yazılımlar. Ayrıntılar için bir projeye tıklayın.", "prj.all": "Tümü GitHub'da ↗",
      "skills.title": "YETENEKLER", "skills.certs": "Sertifikalar & Lisanslar",
      "contact.kicker": "Bir fikriniz ya da iş teklifiniz mi var?", "contact.l1": "BİRLİKTE", "contact.l2": "ÇALIŞALIM",
      "foot.p": "Portfolyo", "foot.top": "Başa dön ↑",
      "pm.learn": "Bu projede ne öğrendim?", "pm.stack": "Kullanılan teknolojiler",
      title: "Metehan Ay — Portfolyo · Yazılım · Backend · AI",
      more: "Devamını oku ↓", less: "Daha az ↑", details: "Detaylar →", github: "GitHub'da incele ↗", soon: "Geliştiriliyor · Eğitim sürüyor",
      close: "Kapat", cursorShot: "DETAY", cursorJob: "", endT: "DEVAMI<br>GELİYOR", endP: "Bir sonraki adım sizinle olabilir.",
      phrases: ["sistemleri kurarım.", "sorunları çözerim.", "süreçleri otomatikleştiririm.", "fikirleri yazılıma dönüştürürüm."],
      loader: ["<b>$</b> ssh metehan@portfolio", "  bağlanılıyor...", "<b>$</b> npm run build", "  ✓ deneyim yüklendi", "  ✓ 10 proje derlendi", "<b>$</b> ./start --cinematic"],
    },
    en: {
      "nav.about": "Profile", "nav.exp": "Experience", "nav.prj": "Projects", "nav.skills": "Skills", "nav.contact": "Contact",
      "hero.kicker": "Portfolio · Software · Backend · AI", "hero.s1": "Years in the industry", "hero.s2": "Projects built", "hero.s3": "Certificates & licenses", "hero.scroll": "Scroll",
      "about.text": "I'm a software developer who turns real-world problems into code. I build end-to-end web apps with React and Node.js, desktop tools with Electron and <em>locally running AI</em> systems — going deep enough to train my own language model from scratch.",
      "exp.title": "CAREER", "prj.title": "PROJECTS", "prj.sub": "Software I wrote for real problems I faced on the job. Click a project for details.", "prj.all": "All on GitHub ↗",
      "skills.title": "SKILLS", "skills.certs": "Certificates & Licenses",
      "contact.kicker": "Have an idea or a job offer?", "contact.l1": "LET'S WORK", "contact.l2": "TOGETHER",
      "foot.p": "Portfolio", "foot.top": "Back to top ↑",
      "pm.learn": "What I learned", "pm.stack": "Tech stack",
      title: "Metehan Ay — Portfolio · Software · Backend · AI",
      more: "Read more ↓", less: "Show less ↑", details: "Details →", github: "View on GitHub ↗", soon: "In development · Training in progress",
      close: "Close", cursorShot: "OPEN", cursorJob: "", endT: "MORE TO<br>COME", endP: "The next chapter could be with you.",
      phrases: ["build systems.", "solve problems.", "automate workflows.", "turn ideas into software."],
      loader: ["<b>$</b> ssh metehan@portfolio", "  connecting...", "<b>$</b> npm run build", "  ✓ experience loaded", "  ✓ 10 projects compiled", "<b>$</b> ./start --cinematic"],
    },
  }[LANG];

  if (EN) {
    document.title = UI.title;
    $$("[data-i18n]").forEach((el) => { const v = UI[el.dataset.i18n]; if (v) el.textContent = v; });
    $$("[data-i18n-html]").forEach((el) => { const v = UI[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
    $(".pm__close").setAttribute("aria-label", UI.close);
  }
  $$("#langBtn [data-l]").forEach((s) => s.classList.toggle("on", s.dataset.l === LANG));
  $("#langBtn").addEventListener("click", () => {
    const next = EN ? "tr" : "en";
    try { localStorage.setItem("lang", next); } catch {}
    const u = new URL(location.href); u.searchParams.delete("lang");
    sessionStorage.setItem("skipLoader", "1");
    location.href = u.pathname + u.search + location.hash;
  });

  /* ---------------- DATA ---------------- */
  const MARQUEE = ["Node.js", "React", "Python", "PostgreSQL", "Electron", "MongoDB", "LLM", "SwiftUI", "Active Directory"];

  const JOBS = [
    { date: "Mayıs 2023 — Ekim 2026", date_en: "May 2023 — Oct 2026", title: "Technical Service Manager", co: "Troy · Artı Bilgisayar — Apple Premium Partner",
      roles: ["Technical Service Manager", "iOS Technician & Customer Support", "Technical Services Logistics"],
      text: "Teknolojiye duyduğum ilgiyle başladığım bu yolculukta teknisyenlikten servis yöneticiliğine yükseldim. Servis operasyonunu yönetirken ekibimin işini kolaylaştıracak yazılımları da kendim geliştirdim.",
      text_en: "Driven by my passion for technology, I grew from technician to service manager. While running service operations, I also built the software my team needed to work faster." },
    { date: "Nisan 2020 — Eylül 2022", date_en: "Apr 2020 — Sep 2022", title: "IT Specialist", co: "MGC Legal",
      roles: ["IT Specialist", "IT Support Assistant"],
      text: "Bilgi işlem destek asistanı olarak başladığım işte kısa sürede tüm süreçleri öğrenip geliştirerek bilgi işlem uzmanı olarak görevimi sürdürdüm.",
      text_en: "I started as an IT support assistant, quickly learned and improved every process, and went on to work as the company's IT specialist." },
    { date: "Temmuz 2022", date_en: "Jul 2022", title: "IT Support Intern", co: "İzmir Büyükşehir Belediyesi", co_en: "İzmir Metropolitan Municipality",
      roles: ["IT Support Intern"],
      text: "Üniversite son sınıfta dönem sonu eğitimi kapsamında kurumsal ölçekte bilgi işlem stajımı tamamladım.",
      text_en: "Completed my final-year IT internship in an enterprise-scale public institution." },
    { date: "2021 — 2025", title: "Eğitim", title_en: "Education", co: "Anadolu Ü. · Afyon Kocatepe Ü.", co_en: "Anadolu Univ. · Afyon Kocatepe Univ.",
      roles: ["Yönetim Bilişim Sistemleri (Lisans)", "Bilgisayar Programcılığı (Önlisans)"], roles_en: ["Management Information Systems (B.Sc.)", "Computer Programming (Associate)"],
      text: "Önlisansta yazılımın temellerini, lisansta ise teknolojinin iş süreçleriyle nasıl birleştiğini öğrendim.",
      text_en: "My associate degree taught me the fundamentals of software; my bachelor's taught me how technology meets business processes." },
  ];

  // video: true → shots/<repo>.mp4 kartta ve detayda otomatik oynar
  const P = [
    { repo: "MarthenAI", name: "Marthen AI", tag: "Yerel Yapay Zeka Asistanı", tag_en: "Local AI Assistant", c: "#8b7bff", video: false,
      desc: "En büyük ve en tutkulu projem: tamamen bilgisayarda, internete ihtiyaç duymadan çalışan kişisel yapay zeka asistanım. .gguf modelleri gömülü llama.cpp ile Apple GPU (Metal) üzerinde çalıştırıyorum; Ollama gibi bir aracıya gerek yok. “Hey Marty” diye uyandırılabiliyor, sesli komut alıyor ve kendi Türkçe sesiyle konuşuyor. Takvim, Anımsatıcılar, Mesajlar, Notlar, Müzik ve e-posta ile entegre çalışıyor; kalıcı hafızası, ruh hali ve proaktif önerileri var. LM Studio tarzı Workspace’inde model yönetimi, kod editörü ve terminal bulunuyor; Marthen dosya oluşturup düzenleyebiliyor, komut çalıştırıp çıktısına göre kendi hatasını düzeltebiliyor. Kendi .pkg kurulum paketini ve güncelleme sistemini de yazdım; şu an 9.2 sürümünde.",
      desc_en: "My biggest and most passionate project: a personal AI assistant that runs entirely on my computer, with no internet required. It runs .gguf models with embedded llama.cpp on the Apple GPU (Metal) — no middleman like Ollama. It wakes up to “Hey Marty”, takes voice commands and speaks back in its own Turkish voice. It integrates with Calendar, Reminders, Messages, Notes, Music and email, and has persistent memory, moods and proactive suggestions. Its LM Studio–style Workspace includes model management, a code editor and a terminal; Marthen can create and edit files, run commands and fix its own mistakes based on the output. I also wrote its .pkg installer and update system — it's currently at version 9.2.",
      learn: ["Büyük dil modellerini bulut olmadan, Metal GPU üzerinde verimli çalıştırmayı", "Electron'da ana süreç ile arayüz arasındaki güvenli iletişimi ve Swift köprüleriyle macOS izinlerini yönetmeyi", "Bir yapay zekâya araç kullandırmayı: komut çalıştırıp sonucu okuyarak kendi hatasını düzelten bir ajan döngüsü kurmayı", "Gerçek bir ürün gibi sürümleme, .pkg kurulum paketi ve otomatik güncelleme dağıtmayı"],
      learn_en: ["Running large language models efficiently on the Metal GPU without any cloud", "Managing secure communication between Electron's main and renderer processes, and macOS permissions through Swift bridges", "Giving an AI tools: building an agent loop that runs commands, reads the output and fixes its own mistakes", "Shipping like a real product — versioning, a .pkg installer and automatic updates"],
      stack: ["Electron", "node-llama-cpp", "llama.cpp · Metal", "Swift", "PostgreSQL", "CodeMirror", "xterm.js", "TTS"],
      code: ['<span class="s">🎙  "Hey Marty"</span>', '<span class="k">marthen:</span> Buradayım.', '<span class="k">sen:</span> Yarın 10:00 toplantıyı ekle', '<span class="k">→ calendar.add</span>(<span class="s">"Toplantı"</span>, 10:00)', '<span class="o">✓ Takvime eklendi</span>', '<span class="o">● yerel model · Metal GPU · v9.2</span>'] },
    { repo: null, shot: "MarthenLLM", name: "Marthen LLM", tag: "Sıfırdan Dil Modeli", tag_en: "Language Model from Scratch", c: "#ff5ca8", video: false,
      desc: "Marthen’in beyni olacak Türkçe + İngilizce dil modelini hazır bir model kullanmadan, kendi MacBook’umda (M1 Pro, 16 GB) sıfırdan geliştiriyorum. ~1,9 GB metinden 32K’lık kendi BPE tokenizer’ımı eğittim (424M token); mimariyi RoPE, RMSNorm, SwiGLU, GQA ve KV-cache ile PyTorch’ta kendim yazdım. Marthen’e kişiliğini vermek için elle hazırladığım 1800’den fazla diyalog ve 954 araç kullanma örneği var; model sohbet sırasında saat, hesap makinesi, hava durumu, TDK sözlüğü, not defteri ve hatırlatıcı gibi araçları çağırabiliyor. Ön eğitim hâlâ sürüyor; sırada sohbet eğitimi, görme ve ses var.",
      desc_en: "I'm building Marthen's brain — a Turkish + English language model — from scratch on my own MacBook (M1 Pro, 16 GB), without using any pre-trained model. I trained my own 32K BPE tokenizer on ~1.9 GB of text (424M tokens) and wrote the architecture myself in PyTorch with RoPE, RMSNorm, SwiGLU, GQA and KV-cache. To give Marthen its personality I hand-crafted 1,800+ dialogues and 954 tool-use examples; during a chat the model can call tools like a clock, calculator, weather, the TDK dictionary, a notebook and reminders. Pre-training is still in progress; chat fine-tuning, vision and voice come next.",
      learn: ["Bir Transformer'ın her parçasını (dikkat, konum kodlama, normalizasyon) kitaptan değil koddan anlamayı", "Tokenizer eğitmeyi ve verinin model kalitesini nasıl belirlediğini", "16 GB RAM'li bir dizüstünde eğitimi sürdürmek için bellek, batch ve checkpoint yönetimini", "Bir modele kişilik ve araç kullanımı öğretmek için veri seti tasarlamayı"],
      learn_en: ["Understanding every part of a Transformer (attention, positional encoding, normalization) from code, not textbooks", "Training a tokenizer, and how data shapes model quality", "Managing memory, batch size and checkpoints to keep training running on a 16 GB laptop", "Designing datasets that teach a model personality and tool use"],
      stack: ["PyTorch", "Apple MPS", "CUDA", "BPE Tokenizer", "Transformer", "SFT", "Tool Calling"],
      code: ['<span class="k">python</span> -m train.pretrain --size small', '  step 8400/15000  loss <span class="s">3.12</span>', '  tokens/s <span class="s">1.8K</span> · MPS · bf16', '<span class="k">sen:</span> Sen kimsin?', '<span class="k">marthen:</span> Ben mükemmel değilim,', '  ama yaşadığım her şey gerçek.', '<span class="o">✓ checkpoint kaydedildi</span>'] },
    { repo: "osservices", name: "OS Services", tag: "Servis Yönetimi", tag_en: "Service Management", c: "#c8ff2e", video: false,
      desc: "Apple yetkili servisinde yaşadığım iş akışını uçtan uca dijitalleştirmek için geliştirdiğim servis yönetim platformu. Servis kabulden onarım teşhisine, parça ve depo yönetiminden teslimata kadar her adımı tek ekranda topladım; teknisyen performans takibi, rol tabanlı yetkilendirme, dijital imzalı servis formları, müşteri bildirimleri ve Gemini destekli yapay zeka önerileri ekledim. Electron ile masaüstü, Capacitor ile iOS sürümünü de çıkardım.",
      desc_en: "A service management platform I built to digitize, end to end, the workflow I lived every day at an Apple authorized service center. Every step — from intake and repair diagnosis to parts, warehouse and delivery — lives on a single screen, with technician performance tracking, role-based access control, digitally signed service forms, customer notifications and Gemini-powered AI suggestions. I also shipped a desktop version with Electron and an iOS version with Capacitor.",
      learn: ["Gerçek bir iş sürecini veri modeline dökmeyi: onarım, müşteri, envanter ve rol ilişkilerini tasarlamayı", "JWT ve rol tabanlı yetkilendirme ile çok mağazalı, çok kullanıcılı bir sistemi güvenli hale getirmeyi", "Tek bir React kod tabanından web, masaüstü ve iOS sürümleri çıkarmayı", "Yapay zekâyı süs olarak değil, teknisyene gerçek teşhis önerisi veren bir araç olarak kullanmayı"],
      learn_en: ["Translating a real business process into a data model — repairs, customers, inventory and roles", "Securing a multi-store, multi-user system with JWT and role-based access control", "Shipping web, desktop and iOS versions from a single React codebase", "Using AI not as decoration but as a tool that gives technicians real diagnostic suggestions"],
      stack: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Gemini AI", "Electron", "Capacitor"],
      code: ['<span class="k">repair</span>.create({', '  device: <span class="s">"iPhone 15 Pro"</span>,', '  status: <span class="s">"diagnosis"</span>,', '  technician: <span class="s">"auto-assign"</span>', '})', '<span class="o">✓ Servis kaydı #24081 oluşturuldu</span>', '<span class="o">✓ Gemini öneri: Ekran + Face ID testi</span>'] },
    { repo: "FTO", name: "Rakip Fiyat Takip", name_en: "Competitor Price Tracker", tag: "Otomasyon", tag_en: "Automation", c: "#2ee6ff", video: false,
      desc: "Apple yetkili satıcısı olarak rakiplerimizin fiyatlarını elle kontrol etmek yerine bu işi otomatiğe bağladım. Sistem MediaMarkt, Vatan, Teknosa ve Gürgençler’deki ürün fiyatlarını Playwright ile saatlik tarıyor, fiyat geçmişini saklıyor, kendi fiyatlarımızla karşılaştırıyor ve bir değişiklik olduğu anda Socket.io üzerinden anlık bildirim gönderiyor.",
      desc_en: "As an Apple authorized reseller, instead of checking competitors' prices by hand, I automated it. The system scrapes product prices from MediaMarkt, Vatan, Teknosa and Gürgençler hourly with Playwright, stores price history, compares them with our own prices and pushes a real-time notification via Socket.io the moment anything changes.",
      learn: ["Farklı yapıdaki sitelerden güvenilir veri çekmeyi ve site değiştiğinde kırılmayan scraper yazmayı", "node-cron ile zamanlanmış işler ve Socket.io ile gerçek zamanlı bildirim kurmayı", "Fiyat geçmişini verimli saklamak için MongoDB şema tasarımını", "Elle yapılan saatlerce işi tek bir panelde birkaç saniyeye indirmenin iş değerini"],
      learn_en: ["Reliably extracting data from very different websites, and writing scrapers that don't break when a site changes", "Scheduling jobs with node-cron and pushing real-time notifications with Socket.io", "Designing MongoDB schemas to store price history efficiently", "The business value of turning hours of manual work into a few seconds on one dashboard"],
      stack: ["MongoDB", "Express", "React", "Node.js", "Playwright", "node-cron", "Socket.io"],
      code: ['<span class="s"># cron: 0 * * * *</span>', '<span class="k">scan</span> mediamarkt vatan teknosa', '  MacBook Air M4   <span class="s">→</span> 42.999 ₺', '  iPhone 17        <span class="s">→</span> 64.499 ₺', '<span class="o">▲ Vatan fiyatı düşürdü: -1.500 ₺</span>', '<span class="o">⚡ Bildirim gönderildi</span>'] },
    { repo: "Jarvis", name: "JARVIS", tag: "Yapay Zeka", tag_en: "AI", c: "#ff4d6d", video: false,
      desc: "Kendi kişisel sesli asistanımı tarayıcıya taşıdığım proje. Mikrofonla konuşup sesli yanıt alabiliyorsunuz; zekâ kısmını Google Gemini sağlıyor. API anahtarını güvenlik için yalnızca sunucuda tutuyorum ve uygulamayı Render üzerinde yayına aldım.",
      desc_en: "A project where I brought my personal voice assistant to the browser. You talk through the microphone and get spoken answers; Google Gemini provides the intelligence. For security, the API key lives only on the server, and the app is deployed on Render.",
      learn: ["Tarayıcıda konuşma tanıma ve sesli yanıtla akıcı bir sesli arayüz kurmayı", "API anahtarlarını istemciye sızdırmadan sunucu tarafında bir proxy ile korumayı", "FastAPI ile hafif bir backend yazıp Render'a yayına almayı"],
      learn_en: ["Building a smooth voice interface in the browser with speech recognition and spoken replies", "Protecting API keys behind a server-side proxy so they never reach the client", "Writing a lightweight FastAPI backend and deploying it on Render"],
      stack: ["Python", "FastAPI", "Uvicorn", "Gemini", "LLM", "Web Speech"],
      code: ['<span class="s">🎙  dinleniyor...</span>', '<span class="k">sen:</span> Jarvis, bugün hava nasıl?', '<span class="k">jarvis:</span> İstanbul’da 21°C, güneşli.', '  Dışarı çıkmak için harika', '  bir gün efendim.', '<span class="o">● gemini · 412ms</span>'] },
    { repo: "OSS-Services-Helper", name: "OSS Helper", tag: "E-posta Otomasyonu", tag_en: "Email Automation", c: "#ffb02e", video: false,
      desc: "Servisteki en tekrarlı işlerden biri olan garanti dışı onarım teklifi e-postalarını hızlandırmak için yazdığım araç. Hasar türü, parça ve ücreti seçince müşteriye gidecek resmi bilgilendirme metni şablondan otomatik oluşuyor; ek dosyasıyla birlikte tek tıkla Brevo üzerinden gönderiliyor. Girişler JWT ile korunuyor ve masaüstünde Electron ile çalışıyor.",
      desc_en: "A tool I wrote to speed up one of the most repetitive tasks at the service center: out-of-warranty repair quote emails. Pick the damage type, part and price, and the official customer notice is generated from a template and sent with its attachment via Brevo in one click. Logins are protected with JWT, and it runs on the desktop with Electron.",
      learn: ["Tekrarlayan işleri tespit edip küçük ama etkili bir araçla otomatikleştirmeyi", "Şablon tabanlı, hatasız ve tutarlı resmi metin üretmeyi", "Transactional e-posta servisleriyle (Brevo) ek dosyalı güvenli gönderim yapmayı"],
      learn_en: ["Spotting repetitive work and automating it with a small but effective tool", "Generating consistent, error-free official text from templates", "Sending secure emails with attachments through a transactional email service (Brevo)"],
      stack: ["React", "Vite", "Node.js", "Express", "Brevo", "JWT", "Electron"],
      code: ['<span class="k">template</span>(<span class="s">"sıvı teması"</span>, {', '  part: <span class="s">"Logic Board"</span>,', '  cost: <span class="s">"18.450 TL"</span>,', '  serviceNo: <span class="s">"G2X9..."</span>', '})', '<span class="o">✉ Teklif e-postası gönderildi</span>'] },
    { repo: "TroyDemoSales", name: "Troy Demo Sales", tag: "Web Uygulaması", tag_en: "Web App", c: "#b18cff", video: false,
      desc: "Mağazamızdaki satılık demo cihazları müşterilere sergilemek ve talepleri toplamak için geliştirdiğim web uygulaması. Müşteriler cihazları kategoriye göre inceleyip talep oluşturabiliyor; yönetici panelinden cihazları, talepleri ve kullanıcıları yönetiyorum. Kimlik doğrulama ve veriler Firebase üzerinde, erişim kuralları Firestore ile tanımlı.",
      desc_en: "A web app I built to showcase our store's demo devices for sale and collect customer requests. Customers browse devices by category and submit requests; from the admin panel I manage devices, requests and users. Authentication and data live on Firebase, with access rules defined in Firestore.",
      learn: ["Next.js App Router ve TypeScript ile tip güvenli bir uygulama yapısı kurmayı", "Firebase Authentication ve Firestore güvenlik kurallarıyla sunucusuz bir backend tasarlamayı", "Müşteri ve yönetici rollerini aynı uygulamada ayırmayı"],
      learn_en: ["Structuring a type-safe app with the Next.js App Router and TypeScript", "Designing a serverless backend with Firebase Authentication and Firestore security rules", "Separating customer and admin roles within the same app"],
      stack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Framer Motion"],
      code: ['<span class="k">GET</span> /devices?cat=<span class="s">mac</span>', '  ▸ MacBook Pro 14"  <span class="s">demo</span>', '  ▸ iMac 24"         <span class="s">demo</span>', '<span class="k">POST</span> /requests', '<span class="o">✓ Talep alındı — admin bilgilendirildi</span>'] },
    { repo: "MonyeraCoffee", name: "Monyera Coffee", tag: "E-Ticaret", tag_en: "E-Commerce", c: "#ff8a3d", video: false,
      desc: "Bir kahve markası için sıfırdan kurduğum tam kapsamlı e-ticaret sitesi. Ürün, sepet, kupon ve yorum sistemlerinin yanında iyzico ile online ödeme, e-posta bildirimleri ve PDF fatura üretimi var. Yönetim panelinden sipariş, hazırlık, kargo, kampanya, fatura ve kullanıcı yönetimi gibi tüm operasyonu tek yerden yönetmek mümkün.",
      desc_en: "A full-featured e-commerce site I built from scratch for a coffee brand. Beyond products, cart, coupons and reviews, it has online payments with iyzico, email notifications and PDF invoice generation. The admin panel runs the whole operation from one place — orders, preparation, shipping, campaigns, invoices and users.",
      learn: ["Ödeme altyapısı (iyzico) entegre etmeyi ve sipariş akışını hatalara karşı sağlam kurmayı", "Kupon, stok ve sipariş durumları gibi e-ticaret iş kurallarını modellemeyi", "Sadece vitrin değil, işletmenin tüm operasyonunu yöneten bir yönetim paneli tasarlamayı"],
      learn_en: ["Integrating a payment gateway (iyzico) and making the order flow robust against failures", "Modeling e-commerce business rules like coupons, stock and order states", "Designing an admin panel that runs the entire business, not just the storefront"],
      stack: ["React", "Express", "MongoDB", "iyzico", "Nodemailer", "Framer Motion"],
      code: ['<span class="k">cart</span>.add(<span class="s">"Etiyopya Yirgacheffe"</span>)', '<span class="k">coupon</span>.apply(<span class="s">"MONYERA10"</span>)', '<span class="k">iyzico</span>.pay(<span class="s">"₺ 612,00"</span>)', '<span class="o">✓ Sipariş #1042 — fatura PDF hazır</span>'] },
    { repo: "Gazetelerde.com", name: "Gazetelerde.com", tag: "Haber Platformu", tag_en: "News Platform", c: "#2effa8", video: false,
      desc: "Farklı kaynaklardaki haberleri tek bir modern arayüzde toplayan haber platformu. Haberleri Cheerio ile otomatik olarak çekip kategorilere ayırıyorum; hikâye formatı, canlı akış, karanlık/aydınlık tema, üyelik ve yönetici paneliyle zenginleştirdim.",
      desc_en: "A news platform that brings stories from different sources into one modern interface. News is scraped automatically with Cheerio and sorted into categories, enriched with a stories format, a live feed, dark/light themes, memberships and an admin panel.",
      learn: ["Next.js API route'larıyla scraping ve kimlik doğrulamayı aynı projede yönetmeyi", "Çok kaynaklı veriyi temizleyip tek tip bir içerik modeline dönüştürmeyi", "Okuma deneyimini öne çıkaran, tema destekli modern bir arayüz tasarlamayı"],
      learn_en: ["Handling scraping and authentication together with Next.js API routes", "Cleaning multi-source data into a single, consistent content model", "Designing a modern, themeable interface that puts the reading experience first"],
      stack: ["Next.js", "React", "Cheerio", "Framer Motion"],
      code: ['<span class="k">scrape</span>(sources).<span class="k">then</span>(categorize)', '  gündem   <span class="s">128 haber</span>', '  ekonomi  <span class="s"> 64 haber</span>', '  spor     <span class="s"> 91 haber</span>', '<span class="o">● Canlı akış güncellendi</span>'] },
    { repo: "OBS", name: "Düğün Anıları", name_en: "Wedding Memories", tag: "Dosya Paylaşımı", tag_en: "File Sharing", c: "#ff6ad5", video: false, noShot: true,
      desc: "Bir düğün için hazırladığım, misafirlerin çektikleri fotoğraf ve videoları kolayca paylaşabildiği yükleme sitesi. Sürükle-bırak, önizleme ve dosya bazlı ilerleme çubukları var; dosyalar Google Apps Script köprüsü sayesinde sunucu kiralamadan ve misafirlerin Google hesabı gerekmeden doğrudan Google Drive klasörüne gidiyor.",
      desc_en: "An upload site I made for a wedding, where guests can easily share the photos and videos they took. It has drag-and-drop, previews and per-file progress bars; thanks to a Google Apps Script bridge, files go straight into a Google Drive folder — no server to rent and no Google account needed for guests.",
      learn: ["Sunucu kiralamadan, Google Apps Script'i ücretsiz bir backend olarak kullanmayı", "Büyük dosyaları parça parça yükleyip ilerlemeyi kullanıcıya göstermeyi", "Teknik bilgisi olmayan yüzlerce kişinin zorlanmadan kullanabileceği bir arayüz tasarlamayı"],
      learn_en: ["Using Google Apps Script as a free backend instead of renting a server", "Uploading large files in chunks and showing progress to the user", "Designing an interface that hundreds of non-technical guests can use effortlessly"],
      stack: ["HTML", "CSS", "JavaScript", "Apps Script", "Google Drive"],
      code: ['<span class="s">↑ IMG_2041.jpg</span>  ████████░░ 82%', '<span class="s">↑ VID_0193.mp4</span>  ██████████ ✓', '<span class="s">↑ IMG_2042.jpg</span>  ███░░░░░░░ 31%', '<span class="o">✓ Drive klasörüne yüklendi</span>'] },
  ];

  const SKILLS = [
    { t: "Yazılım", t_en: "Software", i: ["React · Next.js", "Node.js · Express", "MongoDB · PostgreSQL", "SwiftUI (iOS)", "Python", "Yapay Zeka (LLM)"], i_en: ["React · Next.js", "Node.js · Express", "MongoDB · PostgreSQL", "SwiftUI (iOS)", "Python", "AI (LLM)"] },
    { t: "IT & Altyapı", t_en: "IT & Infrastructure", i: ["Sunucu Kurulumu", "Active Directory", "Windows Güvenliği", "Ağ & Siber Güvenlik", "Bulut Hizmetleri", "CRM · Logo Tiger 3 ERP"], i_en: ["Server Setup", "Active Directory", "Windows Security", "Network & Cyber Security", "Cloud Services", "CRM · Logo Tiger 3 ERP"] },
    { t: "Operasyon", t_en: "Operations", i: ["Apple Yetkili Servis", "Teknik Destek & Çözüm", "Stok & Lojistik", "Süreç Otomasyonu", "MS Office", "Veri & Raporlama"], i_en: ["Apple Authorized Service", "Technical Support", "Inventory & Logistics", "Process Automation", "MS Office", "Data & Reporting"] },
  ];
  const CERTS = EN
    ? [["Apple ACST", "Support Technician"], ["Apple ACRT", "Repair Technician"], ["iOS Development with SwiftUI", "Mobile"], ["Advanced Python", "Automation"], ["Cyber Incident Detection & Response", "Security"], ["DoS / DDoS Protection", "Network Security"], ["Windows OS Security", "GPO"], ["MS Office", "Reporting"], ["PeP", "Fintech"], ["İHA-1 Drone Pilot License", "Drone"]]
    : [["Apple ACST", "Destek Teknisyeni"], ["Apple ACRT", "Onarım Teknisyeni"], ["SwiftUI ile iOS", "Mobil"], ["İleri Seviye Python", "Otomasyon"], ["Siber Olay Tespit & Müdahale", "Güvenlik"], ["DoS / DDoS Koruma", "Ağ Güvenliği"], ["Windows OS Güvenliği", "GPO"], ["MS Office", "Raporlama"], ["PeP", "Fintek"], ["İHA-1 Pilot Lisansı", "Drone"]];

  const shotOf = (p) => (p.noShot ? null : `shots/${p.shot || p.repo}`);

  /* ---------------- BUILD ---------------- */
  $("#marquee").innerHTML = Array(2).fill(MARQUEE.map((m) => `<span>${m}</span>`).join("")).join("");

  $("#expTrack").innerHTML = JOBS.map((j, i) => `
    <article class="job">
      <span class="job__num">${pad(i + 1)}</span>
      <span class="job__date">${t(j, "date")}</span>
      <h3>${t(j, "title")}</h3>
      <div class="job__co">${t(j, "co")}</div>
      <ul>${t(j, "roles").map((r) => `<li>${r}</li>`).join("")}</ul>
      <p>${t(j, "text")}</p>
    </article>`).join("") + `
    <article class="job job--end"><h3>${UI.endT}</h3><p>${UI.endP}</p></article>`;

  $("#prjStack").innerHTML = P.map((p, i) => `
    <article class="card" style="--c:${p.c}" data-i="${i}">
      <div class="card__info">
        <div class="card__top"><span><b>${pad(i + 1)}</b> / ${pad(P.length)}</span><span>${t(p, "tag")}</span></div>
        <h3>${t(p, "name")}</h3>
        <p class="card__desc">${t(p, "desc")}</p><button class="card__more" type="button">${UI.more}</button>
        <div class="card__stack" lang="en">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
        <div class="card__btns">
          <button class="card__go" type="button" data-open="${i}" data-magnetic>${UI.details}</button>
          ${p.repo ? `<a class="card__go card__go--ghost" href="https://github.com/mthnay/${p.repo}" target="_blank" rel="noopener" data-magnetic>GitHub ↗</a>` : `<span class="card__go card__go--soon">${UI.soon}</span>`}
        </div>
      </div>
      <div class="card__vis" data-open="${i}" data-cursor="${UI.cursorShot}">
        <span class="card__big">${pad(i + 1)}</span>
        <div class="win"><div class="win__bar"><i></i><i></i><i></i><span>~/${p.repo || "marthen-llm"}</span></div><pre>${p.code.join("\n")}</pre></div>
        ${shotOf(p) ? `<div class="shot"><div class="win__bar"><i></i><i></i><i></i><span>${t(p, "name")}</span></div>${p.video
          ? `<video src="${shotOf(p)}.mp4" poster="${shotOf(p)}.jpg?v=2" muted loop playsinline autoplay preload="metadata"></video>`
          : `<img src="${shotOf(p)}.jpg?v=2" alt="${t(p, "name")}">`}</div>` : ""}
      </div>
    </article>`).join("");

  $$(".card__more").forEach((btn) => btn.addEventListener("click", () => {
    const open = btn.previousElementSibling.classList.toggle("open");
    btn.textContent = open ? UI.less : UI.more;
    ScrollTrigger.refresh();
  }));

  // görsel/video varsa kod penceresinin yerine geçer
  $$(".shot img, .shot video").forEach((m) => {
    const vis = m.closest(".card__vis");
    const ok = () => vis.classList.add("has-shot");
    const isV = m.tagName === "VIDEO";
    if (!isV && m.complete && m.naturalWidth) ok();
    else m.addEventListener(isV ? "loadeddata" : "load", ok);
    m.addEventListener("error", () => m.closest(".shot")?.remove());
  });

  $("#skillsGrid").innerHTML = SKILLS.map((s, i) => `<div class="sk"><small>${pad(i + 1)}</small><h3>${t(s, "t")}</h3><ul>${t(s, "i").map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("");
  $("#certs").innerHTML = CERTS.map(([a, b]) => `<span class="cert">${a}<small>${b}</small></span>`).join("");

  /* ---------------- SPLIT ---------------- */
  $$("[data-split]").forEach((el) => {
    el.innerHTML = el.textContent.trim().split(" ")
      .map((w) => `<span class="char-wrap">${[...w].map((c) => `<span class="char">${c}</span>`).join("")}</span>`).join(" ");
  });
  $$("[data-reveal-words]").forEach((el) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType !== 3) return walk(n);
      const f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((x) => {
        if (!x.trim()) return f.append(x);
        const s = document.createElement("span"); s.className = "w"; s.textContent = x; f.append(s);
      });
      n.replaceWith(f);
    });
    walk(el);
  });

  /* ---------------- SMOOTH SCROLL ---------------- */
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: !reduce });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((x) => lenis.raf(x * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.6 });
  }));

  /* ---------------- PROJECT MODAL ---------------- */
  const pm = $("#pm");
  let lastFocus = null;
  // Pencere içindeki kaydırma olayları sayfanın yumuşak kaydırmasına ulaşmasın
  ["wheel", "touchstart", "touchmove"].forEach((ev) =>
    pm.addEventListener(ev, (e) => e.stopPropagation(), { passive: true }));
  const openModal = (i) => {
    const p = P[i];
    const src = shotOf(p);
    pm.style.setProperty("--c", p.c);
    $("#pmMedia").innerHTML = src
      ? (p.video
        ? `<video src="${src}.mp4" poster="${src}.jpg?v=2" muted loop playsinline autoplay controls></video>`
        : `<img src="${src}.jpg?v=2" alt="${t(p, "name")}">`)
      : `<pre>${p.code.join("\n")}</pre>`;
    $("#pmMedia").classList.toggle("is-code", !src);
    $("#pmMedia img")?.addEventListener("error", () => {
      $("#pmMedia").classList.add("is-code");
      $("#pmMedia").innerHTML = `<pre>${p.code.join("\n")}</pre>`;
    });
    $("#pmTop").innerHTML = `<span><b>${pad(i + 1)}</b> / ${pad(P.length)}</span><span>${t(p, "tag")}</span>`;
    $("#pmTitle").textContent = t(p, "name");
    $("#pmDesc").textContent = t(p, "desc");
    $("#pmLearn").innerHTML = t(p, "learn").map((x) => `<li>${x}</li>`).join("");
    $("#pmStack").innerHTML = p.stack.map((s) => `<span>${s}</span>`).join("");
    $("#pmActions").innerHTML = p.repo
      ? `<a class="card__go" href="https://github.com/mthnay/${p.repo}" target="_blank" rel="noopener">${UI.github}</a>`
      : `<span class="card__go card__go--soon">${UI.soon}</span>`;
    lastFocus = document.activeElement;
    pm.classList.add("is-open");
    pm.setAttribute("aria-hidden", "false");
    lenis.stop();
    $(".pm__box").scrollTop = 0;
    gsap.fromTo(".pm__bg", { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo(".pm__box", { y: 60, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
    $(".pm__close").focus();
  };
  const closeModal = () => {
    if (!pm.classList.contains("is-open")) return;
    gsap.to(".pm__box", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(".pm__bg", { opacity: 0, duration: 0.3, onComplete: () => {
      pm.classList.remove("is-open");
      pm.setAttribute("aria-hidden", "true");
      $("#pmMedia").innerHTML = "";
      lenis.start();
      lastFocus?.focus?.();
    } });
  };
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); return openModal(+o.dataset.open); }
    if (e.target.closest("[data-close]")) closeModal();
  });
  addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  /* ---------------- LOADER → INTRO ---------------- */
  const skipLoader = sessionStorage.getItem("skipLoader") === "1";
  sessionStorage.removeItem("skipLoader");

  const intro = gsap.timeline({ paused: true });
  intro
    .from(".hero__title .char", { yPercent: 115, rotate: 8, duration: 1.2, stagger: 0.06, ease: "expo.out" })
    .from(".hero__kicker, .hero__term, .hero__meta > div, .hero__scroll", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.8")
    .from(".nav", { yPercent: -100, opacity: 0, duration: 0.8, ease: "power3.out" }, "<")
    .from(".hero__bg", { opacity: 0, scale: 1.15, duration: 2, ease: "power3.out" }, "<")
    .add(() => { $$(".hero__meta b").forEach(countUp); typeLoop(); }, "<");

  if (skipLoader) {
    $("#loader").style.display = "none";
    document.body.classList.remove("loading");
    lenis.start();
    intro.play();
  } else {
    let li = 0;
    const termTimer = setInterval(() => {
      if (li >= UI.loader.length) return clearInterval(termTimer);
      $("#loaderTerm").innerHTML += UI.loader[li++] + "\n";
    }, 260);
    const counter = { v: 0 };
    gsap.timeline()
      .to(counter, { v: 100, duration: reduce ? 0.2 : 2, ease: "power2.inOut", onUpdate: () => {
        $("#loaderNum").textContent = Math.round(counter.v);
        $("#loaderBar").style.width = counter.v + "%";
      } })
      .to("#wipe", { scaleY: 1, duration: 0.6, ease: "power4.inOut" })
      .set("#loader", { display: "none" })
      .to("#wipe", { scaleY: 0, transformOrigin: "top", duration: 0.7, ease: "power4.inOut" })
      .add(() => { document.body.classList.remove("loading"); lenis.start(); intro.play(); }, "-=0.35");
  }

  function countUp(el) {
    const o = { v: 0 }, to = +el.dataset.count, suf = el.dataset.suffix || "";
    gsap.to(o, { v: to, duration: 1.8, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(o.v) + suf) });
  }

  function typeLoop() {
    const el = $("#typed"); let p = 0, c = 0, del = false;
    (function tick() {
      const w = UI.phrases[p];
      el.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; p = (p + 1) % UI.phrases.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 60);
    })();
  }

  /* ---------------- SCROLL ANIMATIONS ---------------- */
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  gsap.to(".hero__title", { yPercent: 35, scale: 0.88, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__bg", { yPercent: 40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__grid", { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  const mq = gsap.to("#marquee", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
  const skewTo = gsap.quickTo("#marquee", "skewX", { duration: 0.4 });
  lenis.on("scroll", ({ velocity }) => {
    const v = gsap.utils.clamp(-20, 20, velocity);
    skewTo(-v * 0.6);
    mq.timeScale(1 + Math.abs(v) * 0.25 * (v < 0 ? -1 : 1));
  });

  gsap.to(".about__text .w", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".about__text", start: "top 80%", end: "bottom 45%", scrub: true } });

  $$(".big").forEach((el) => gsap.from($$(".char", el), { yPercent: 120, rotate: 6, stagger: 0.035, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
  $$(".label").forEach((l) => gsap.from(l, { x: -30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: l, start: "top 90%" } }));

  const mm = gsap.matchMedia();
  mm.add("(min-width: 761px)", () => {
    const track = $("#expTrack");
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".exp", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
    gsap.from(".job", { y: 120, rotate: (i) => (i % 2 ? 4 : -4), opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".exp__wrap", start: "top 90%" } });
  });

  const cards = $$(".card");
  mm.add("(min-width: 901px)", () => {
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, { scale: 0.9, opacity: 0.35, filter: "blur(2px)", ease: "none",
        scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 90px", scrub: true } });
    });
  });
  cards.forEach((card) => {
    gsap.from($$(".win, .shot", card), { y: 80, rotate: 6, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 75%" } });
    ScrollTrigger.create({ trigger: card, start: "top 55%", end: "bottom 55%",
      onToggle: (s) => s.isActive && document.documentElement.style.setProperty("--acc", card.style.getPropertyValue("--c")) });
  });
  ScrollTrigger.create({ trigger: "#projects", start: "top 55%", end: "bottom 55%",
    onLeave: () => document.documentElement.style.setProperty("--acc", "#c8ff2e"),
    onLeaveBack: () => document.documentElement.style.setProperty("--acc", "#c8ff2e") });

  gsap.from(".sk", { y: 80, opacity: 0, rotateX: -20, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".skills__grid", start: "top 85%" } });
  gsap.from(".cert", { scale: 0.6, opacity: 0, stagger: 0.04, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".certs", start: "top 85%" } });

  gsap.from(".contact__title .char", { yPercent: 120, stagger: 0.04, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".contact", start: "top 60%" } });
  gsap.from(".contact__links a", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: ".contact__links", start: "top 90%" } });

  ["about", "experience", "projects", "skills"].forEach((id) => ScrollTrigger.create({
    trigger: "#" + id, start: "top 50%", end: "bottom 50%",
    onToggle: (s) => s.isActive && $$(".nav__links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id)),
  }));

  /* ---------------- CURSOR / MAGNETIC ---------------- */
  if (matchMedia("(hover: hover)").matches) {
    const cur = $("#cursor"), lab = $("#cursorLabel");
    const xTo = gsap.quickTo(cur, "x", { duration: 0.25, ease: "power3" });
    const yTo = gsap.quickTo(cur, "y", { duration: 0.25, ease: "power3" });
    addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-cursor]");
      const show = !!el && !pm.classList.contains("is-open");
      cur.classList.toggle("is-big", show);
      lab.textContent = show ? el.dataset.cursor : "";
    });
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" }));
    });
    $$(".card__vis").forEach((v) => {
      v.addEventListener("pointermove", (e) => {
        const w = v.classList.contains("has-shot") ? $(".shot", v) : $(".win", v);
        const r = v.getBoundingClientRect();
        gsap.to(w, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 16, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 16, rotate: 0, transformPerspective: 900, duration: 0.5 });
      });
      v.addEventListener("pointerleave", () => gsap.to($$(".win, .shot", v), { rotateX: 0, rotateY: 0, rotate: -3, duration: 0.8, ease: "elastic.out(1,0.5)" }));
    });
  }

  addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
