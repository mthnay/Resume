(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- DATA ---------------- */
  const MARQUEE = ["Active Directory", "React", "Node.js", "Python", "SwiftUI", "MongoDB", "Yapay Zeka", "Siber Güvenlik", "Electron"];

  const JOBS = [
    { date: "Mayıs 2023 — Ekim 2026", title: "Technical Service Manager", co: "Troy · Artı Bilgisayar — Apple Premium Partner",
      roles: ["Technical Service Manager", "iOS Technician & Customer Support", "Technical Services Logistics"],
      text: "Teknolojiye duyduğum ilgiyle başladığım bu yolculukta teknisyenlikten servis yöneticiliğine yükseldim. Servis operasyonunu yönetirken ekibimin işini kolaylaştıracak yazılımları da kendim geliştirdim." },
    { date: "Nisan 2020 — Eylül 2022", title: "IT Specialist", co: "MGC Legal",
      roles: ["IT Specialist", "IT Support Assistant"],
      text: "Bilgi işlem destek asistanı olarak başladığım işte kısa sürede tüm süreçleri öğrenip geliştirerek bilgi işlem uzmanı olarak görevimi sürdürdüm." },
    { date: "Temmuz 2022", title: "IT Support Intern", co: "İzmir Büyükşehir Belediyesi",
      roles: ["IT Support Intern"],
      text: "Üniversite son sınıfta dönem sonu eğitimi kapsamında kurumsal ölçekte bilgi işlem stajımı tamamladım." },
    { date: "2021 — 2025", title: "Eğitim", co: "Anadolu Ü. · Afyon Kocatepe Ü.",
      roles: ["Yönetim Bilişim Sistemleri (Lisans)", "Bilgisayar Programcılığı (Önlisans)"],
      text: "Önlisansta yazılımın temellerini, lisansta ise teknolojinin iş süreçleriyle nasıl birleştiğini öğrendim." },
  ];

  const P = [
    { repo: "MarthenAI", name: "Marthen AI", tag: "Yerel Yapay Zeka Asistanı", c: "#8b7bff",
      desc: "En büyük ve en tutkulu projem: tamamen bilgisayarda, internete ihtiyaç duymadan çalışan kişisel yapay zeka asistanım. .gguf modelleri gömülü llama.cpp ile Apple GPU (Metal) üzerinde çalıştırıyorum; Ollama gibi bir aracıya gerek yok. “Hey Marty” diye uyandırılabiliyor, sesli komut alıyor ve kendi Türkçe sesiyle konuşuyor. Takvim, Anımsatıcılar, Mesajlar, Notlar, Müzik ve e-posta ile entegre çalışıyor; kalıcı hafızası, ruh hali ve proaktif önerileri var. LM Studio tarzı Workspace’inde model yönetimi, kod editörü ve terminal bulunuyor; Marthen dosya oluşturup düzenleyebiliyor, komut çalıştırıp çıktısına göre kendi hatasını düzeltebiliyor. Kendi .pkg kurulum paketini ve güncelleme sistemini de yazdım; şu an 9.2 sürümünde.",
      stack: ["Electron", "node-llama-cpp", "llama.cpp · Metal", "Swift", "PostgreSQL", "CodeMirror", "xterm.js", "TTS"],
      code: ['<span class="s">🎙  "Hey Marty"</span>', '<span class="k">marthen:</span> Buradayım.', '<span class="k">sen:</span> Yarın 10:00 toplantıyı ekle', '<span class="k">→ calendar.add</span>(<span class="s">"Toplantı"</span>, 10:00)', '<span class="o">✓ Takvime eklendi</span>', '<span class="o">● yerel model · Metal GPU · v9.2</span>'] },
    { repo: null, name: "Marthen LLM", tag: "Sıfırdan Dil Modeli", c: "#ff5ca8",
      desc: "Marthen’in beyni olacak Türkçe + İngilizce dil modelini hazır bir model kullanmadan, kendi MacBook’umda (M1 Pro, 16 GB) sıfırdan geliştiriyorum. ~1,9 GB metinden 32K’lık kendi BPE tokenizer’ımı eğittim (424M token); mimariyi RoPE, RMSNorm, SwiGLU, GQA ve KV-cache ile PyTorch’ta kendim yazdım. Marthen’e kişiliğini vermek için elle hazırladığım 1800’den fazla diyalog ve 954 araç kullanma örneği var; model sohbet sırasında saat, hesap makinesi, hava durumu, TDK sözlüğü, not defteri ve hatırlatıcı gibi araçları çağırabiliyor. Ön eğitim hâlâ sürüyor; sırada sohbet eğitimi, görme ve ses var.",
      stack: ["PyTorch", "Apple MPS", "CUDA", "BPE Tokenizer", "Transformer", "SFT", "Tool Calling"],
      code: ['<span class="k">python</span> -m train.pretrain --size small', '  step 8400/15000  loss <span class="s">3.12</span>', '  tokens/s <span class="s">1.8K</span> · MPS · bf16', '<span class="k">sen:</span> Sen kimsin?', '<span class="k">marthen:</span> Ben mükemmel değilim,', '  ama yaşadığım her şey gerçek.', '<span class="o">✓ checkpoint kaydedildi</span>'] },
    { repo: "osservices", name: "OS Services", tag: "Servis Yönetimi", c: "#c8ff2e",
      desc: "Apple yetkili servisinde yaşadığım iş akışını uçtan uca dijitalleştirmek için geliştirdiğim servis yönetim platformu. Servis kabulden onarım teşhisine, parça ve depo yönetiminden teslimata kadar her adımı tek ekranda topladım; teknisyen performans takibi, rol tabanlı yetkilendirme, dijital imzalı servis formları, müşteri bildirimleri ve Gemini destekli yapay zeka önerileri ekledim. Electron ile masaüstü, Capacitor ile iOS sürümünü de çıkardım.",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Gemini AI", "Electron", "Capacitor"],
      code: ['<span class="k">repair</span>.create({', '  device: <span class="s">"iPhone 15 Pro"</span>,', '  status: <span class="s">"diagnosis"</span>,', '  technician: <span class="s">"auto-assign"</span>', '})', '<span class="o">✓ Servis kaydı #24081 oluşturuldu</span>', '<span class="o">✓ Gemini öneri: Ekran + Face ID testi</span>'] },
    { repo: "FTO", name: "Rakip Fiyat Takip", tag: "Otomasyon", c: "#2ee6ff",
      desc: "Apple yetkili satıcısı olarak rakiplerimizin fiyatlarını elle kontrol etmek yerine bu işi otomatiğe bağladım. Sistem MediaMarkt, Vatan, Teknosa ve Gürgençler’deki ürün fiyatlarını Playwright ile saatlik tarıyor, fiyat geçmişini saklıyor, kendi fiyatlarımızla karşılaştırıyor ve bir değişiklik olduğu anda Socket.io üzerinden anlık bildirim gönderiyor.",
      stack: ["MongoDB", "Express", "React", "Node.js", "Playwright", "node-cron", "Socket.io"],
      code: ['<span class="s"># cron: 0 * * * *</span>', '<span class="k">scan</span> mediamarkt vatan teknosa', '  MacBook Air M4   <span class="s">→</span> 42.999 ₺', '  iPhone 17        <span class="s">→</span> 64.499 ₺', '<span class="o">▲ Vatan fiyatı düşürdü: -1.500 ₺</span>', '<span class="o">⚡ Bildirim gönderildi</span>'] },
    { repo: "Jarvis", name: "JARVIS", tag: "Yapay Zeka", c: "#ff4d6d",
      desc: "Kendi kişisel sesli asistanımı tarayıcıya taşıdığım proje. Mikrofonla konuşup sesli yanıt alabiliyorsunuz; zekâ kısmını Google Gemini sağlıyor. API anahtarını güvenlik için yalnızca sunucuda tutuyorum ve uygulamayı Render üzerinde yayına aldım.",
      stack: ["Python", "FastAPI", "Uvicorn", "Gemini", "LLM", "Web Speech"],
      code: ['<span class="s">🎙  dinleniyor...</span>', '<span class="k">sen:</span> Jarvis, bugün hava nasıl?', '<span class="k">jarvis:</span> İstanbul’da 21°C, güneşli.', '  Dışarı çıkmak için harika', '  bir gün efendim.', '<span class="o">● gemini · 412ms</span>'] },
    { repo: "OSS-Services-Helper", name: "OSS Helper", tag: "E-posta Otomasyonu", c: "#ffb02e",
      desc: "Servisteki en tekrarlı işlerden biri olan garanti dışı onarım teklifi e-postalarını hızlandırmak için yazdığım araç. Hasar türü, parça ve ücreti seçince müşteriye gidecek resmi bilgilendirme metni şablondan otomatik oluşuyor; ek dosyasıyla birlikte tek tıkla Brevo üzerinden gönderiliyor. Girişler JWT ile korunuyor ve masaüstünde Electron ile çalışıyor.",
      stack: ["React", "Vite", "Node.js", "Express", "Brevo", "JWT", "Electron"],
      code: ['<span class="k">template</span>(<span class="s">"sıvı teması"</span>, {', '  part: <span class="s">"Logic Board"</span>,', '  cost: <span class="s">"18.450 TL"</span>,', '  serviceNo: <span class="s">"G2X9..."</span>', '})', '<span class="o">✉ Teklif e-postası gönderildi</span>'] },
    { repo: "TroyDemoSales", name: "Troy Demo Sales", tag: "Web Uygulaması", c: "#b18cff",
      desc: "Mağazamızdaki satılık demo cihazları müşterilere sergilemek ve talepleri toplamak için geliştirdiğim web uygulaması. Müşteriler cihazları kategoriye göre inceleyip talep oluşturabiliyor; yönetici panelinden cihazları, talepleri ve kullanıcıları yönetiyorum. Kimlik doğrulama ve veriler Firebase üzerinde, erişim kuralları Firestore ile tanımlı.",
      stack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Framer Motion"],
      code: ['<span class="k">GET</span> /devices?cat=<span class="s">mac</span>', '  ▸ MacBook Pro 14"  <span class="s">demo</span>', '  ▸ iMac 24"         <span class="s">demo</span>', '<span class="k">POST</span> /requests', '<span class="o">✓ Talep alındı — admin bilgilendirildi</span>'] },
    { repo: "MonyeraCoffee", name: "Monyera Coffee", tag: "E-Ticaret", c: "#ff8a3d",
      desc: "Bir kahve markası için sıfırdan kurduğum tam kapsamlı e-ticaret sitesi. Ürün, sepet, kupon ve yorum sistemlerinin yanında iyzico ile online ödeme, e-posta bildirimleri ve PDF fatura üretimi var. Yönetim panelinden sipariş, hazırlık, kargo, kampanya, fatura ve kullanıcı yönetimi gibi tüm operasyonu tek yerden yönetmek mümkün.",
      stack: ["React", "Express", "MongoDB", "iyzico", "Nodemailer", "Framer Motion"],
      code: ['<span class="k">cart</span>.add(<span class="s">"Etiyopya Yirgacheffe"</span>)', '<span class="k">coupon</span>.apply(<span class="s">"MONYERA10"</span>)', '<span class="k">iyzico</span>.pay(<span class="s">"₺ 612,00"</span>)', '<span class="o">✓ Sipariş #1042 — fatura PDF hazır</span>'] },
    { repo: "Gazetelerde.com", name: "Gazetelerde.com", tag: "Haber Platformu", c: "#2effa8",
      desc: "Farklı kaynaklardaki haberleri tek bir modern arayüzde toplayan haber platformu. Haberleri Cheerio ile otomatik olarak çekip kategorilere ayırıyorum; hikâye formatı, canlı akış, karanlık/aydınlık tema, üyelik ve yönetici paneliyle zenginleştirdim.",
      stack: ["Next.js", "React", "Cheerio", "Framer Motion"],
      code: ['<span class="k">scrape</span>(sources).<span class="k">then</span>(categorize)', '  gündem   <span class="s">128 haber</span>', '  ekonomi  <span class="s"> 64 haber</span>', '  spor     <span class="s"> 91 haber</span>', '<span class="o">● Canlı akış güncellendi</span>'] },
    { repo: "OBS", name: "Düğün Anıları", tag: "Dosya Paylaşımı", c: "#ff6ad5",
      desc: "Bir düğün için hazırladığım, misafirlerin çektikleri fotoğraf ve videoları kolayca paylaşabildiği yükleme sitesi. Sürükle-bırak, önizleme ve dosya bazlı ilerleme çubukları var; dosyalar Google Apps Script köprüsü sayesinde sunucu kiralamadan ve misafirlerin Google hesabı gerekmeden doğrudan Google Drive klasörüne gidiyor.",
      stack: ["HTML", "CSS", "JavaScript", "Apps Script", "Google Drive"],
      code: ['<span class="s">↑ IMG_2041.jpg</span>  ████████░░ 82%', '<span class="s">↑ VID_0193.mp4</span>  ██████████ ✓', '<span class="s">↑ IMG_2042.jpg</span>  ███░░░░░░░ 31%', '<span class="o">✓ Drive klasörüne yüklendi</span>'] },
  ];

  const SKILLS = [
    { t: "IT & Altyapı", i: ["Sunucu Kurulumu", "Active Directory", "Windows Güvenliği", "Ağ & Siber Güvenlik", "Bulut Hizmetleri", "CRM · Logo Tiger 3 ERP"] },
    { t: "Yazılım", i: ["React · Next.js", "Node.js · Express", "MongoDB · PostgreSQL", "SwiftUI (iOS)", "Python", "Yapay Zeka (LLM)"] },
    { t: "Operasyon", i: ["Apple Yetkili Servis", "Teknik Destek & Çözüm", "Stok & Lojistik", "Süreç Otomasyonu", "MS Office", "Veri & Raporlama"] },
  ];
  const CERTS = [["Apple ACST", "Destek Teknisyeni"], ["Apple ACRT", "Onarım Teknisyeni"], ["SwiftUI ile iOS", "Mobil"], ["İleri Seviye Python", "Otomasyon"], ["Siber Olay Tespit & Müdahale", "Güvenlik"], ["DoS / DDoS Koruma", "Ağ Güvenliği"], ["Windows OS Güvenliği", "GPO"], ["MS Office", "Raporlama"], ["PeP", "Fintek"], ["İHA-1 Pilot Lisansı", "Drone"]];

  /* ---------------- BUILD ---------------- */
  $("#marquee").innerHTML = Array(2).fill(MARQUEE.map((m) => `<span>${m}</span>`).join("")).join("");

  $("#expTrack").innerHTML = JOBS.map((j, i) => `
    <article class="job" data-cursor="${pad(i + 1)}">
      <span class="job__num">${pad(i + 1)}</span>
      <span class="job__date">${j.date}</span>
      <h3>${j.title}</h3>
      <div class="job__co">${j.co}</div>
      <ul>${j.roles.map((r) => `<li>${r}</li>`).join("")}</ul>
      <p>${j.text}</p>
    </article>`).join("") + `
    <article class="job job--end"><h3>DEVAMI<br>GELİYOR</h3><p>Bir sonraki adım sizinle olabilir.</p></article>`;

  $("#prjStack").innerHTML = P.map((p, i) => `
    <article class="card" style="--c:${p.c}">
      <div class="card__info">
        <div class="card__top"><span><b>${pad(i + 1)}</b> / ${pad(P.length)}</span><span>${p.tag}</span></div>
        <h3>${p.name}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__stack" lang="en">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
        ${p.repo ? `<a class="card__go" href="https://github.com/mthnay/${p.repo}" target="_blank" rel="noopener" data-magnetic>GitHub'da incele ↗</a>` : `<span class="card__go card__go--soon">Geliştiriliyor · Eğitim sürüyor</span>`}
      </div>
      <div class="card__vis" data-cursor="KOD">
        <span class="card__big">${pad(i + 1)}</span>
        <div class="win"><div class="win__bar"><i></i><i></i><i></i><span>~/${p.repo || "marthen-llm"}</span></div><pre>${p.code.join("\n")}</pre></div>
        <div class="shot"><div class="win__bar"><i></i><i></i><i></i><span>${p.name}</span></div><img src="shots/${p.repo || "MarthenLLM"}.jpg" alt="${p.name} ana ekranı"></div>
      </div>
    </article>`).join("");

  // screenshot varsa kod penceresinin yerine geçer
  $$(".shot img").forEach((img) => {
    const vis = img.closest(".card__vis");
    const ok = () => vis.classList.add("has-shot");
    if (img.complete && img.naturalWidth) ok();
    else img.addEventListener("load", ok);
    img.addEventListener("error", () => img.closest(".shot").remove());
  });

  $("#skillsGrid").innerHTML = SKILLS.map((s, i) => `<div class="sk"><small>${pad(i + 1)}</small><h3>${s.t}</h3><ul>${s.i.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("");
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
      n.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) return f.append(t);
        const s = document.createElement("span"); s.className = "w"; s.textContent = t; f.append(s);
      });
      n.replaceWith(f);
    });
    walk(el);
  });

  /* ---------------- SMOOTH SCROLL ---------------- */
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: !reduce });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const t = document.getElementById(a.getAttribute("href").slice(1));
    if (!t) return;
    e.preventDefault();
    lenis.scrollTo(t, { duration: 1.6 });
  }));

  /* ---------------- LOADER → INTRO ---------------- */
  const lines = ["<b>$</b> ssh metehan@portfolio", "  bağlanılıyor...", "<b>$</b> npm run build", "  ✓ deneyim yüklendi", "  ✓ 10 proje derlendi", "<b>$</b> ./start --cinematic"];
  let li = 0;
  const termTimer = setInterval(() => {
    if (li >= lines.length) return clearInterval(termTimer);
    $("#loaderTerm").innerHTML += lines[li++] + "\n";
  }, 260);

  const intro = gsap.timeline({ paused: true });
  intro
    .from(".hero__title .char", { yPercent: 115, rotate: 8, duration: 1.2, stagger: 0.06, ease: "expo.out" })
    .from(".hero__kicker, .hero__term, .hero__meta > div, .hero__scroll", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.8")
    .from(".nav", { yPercent: -100, opacity: 0, duration: 0.8, ease: "power3.out" }, "<")
    .add(() => { $$(".hero__meta b").forEach(countUp); typeLoop(); }, "<");

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

  function countUp(el) {
    const o = { v: 0 }, to = +el.dataset.count, suf = el.dataset.suffix || "";
    gsap.to(o, { v: to, duration: 1.8, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(o.v) + suf) });
  }

  // hero terminal typing
  const PHRASES = ["sistemleri kurarım.", "sorunları çözerim.", "süreçleri otomatikleştiririm.", "fikirleri yazılıma dönüştürürüm."];
  function typeLoop() {
    const el = $("#typed"); let p = 0, c = 0, del = false;
    (function tick() {
      const w = PHRASES[p];
      el.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; p = (p + 1) % PHRASES.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 60);
    })();
  }

  /* ---------------- SCROLL ANIMATIONS ---------------- */
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  gsap.to(".hero__title", { yPercent: 35, scale: 0.88, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__grid", { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // marquee + velocity skew
  const mq = gsap.to("#marquee", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
  const skewTo = gsap.quickTo("#marquee", "skewX", { duration: 0.4 });
  lenis.on("scroll", ({ velocity }) => {
    const v = gsap.utils.clamp(-20, 20, velocity);
    skewTo(-v * 0.6);
    mq.timeScale(1 + Math.abs(v) * 0.25 * (v < 0 ? -1 : 1));
  });

  // about words
  gsap.to(".about__text .w", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".about__text", start: "top 80%", end: "bottom 45%", scrub: true } });
  gsap.from(".facts > div", { y: 40, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".facts", start: "top 85%" } });

  // big titles
  $$(".big").forEach((t) => gsap.from($$(".char", t), { yPercent: 120, rotate: 6, stagger: 0.035, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 85%" } }));
  $$(".label").forEach((l) => gsap.from(l, { x: -30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: l, start: "top 90%" } }));

  // experience: pinned horizontal
  const mm = gsap.matchMedia();
  mm.add("(min-width: 761px)", () => {
    const track = $("#expTrack");
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".exp", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
    gsap.from(".job", { y: 120, rotate: (i) => (i % 2 ? 4 : -4), opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".exp__wrap", start: "top 90%" } });
  });

  // projects: stacked cards shrink as next arrives + accent follows active card
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

  // skills
  gsap.from(".sk", { y: 80, opacity: 0, rotateX: -20, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".skills__grid", start: "top 85%" } });
  gsap.from(".cert", { scale: 0.6, opacity: 0, stagger: 0.04, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".certs", start: "top 85%" } });

  // contact
  gsap.from(".contact__title .char", { yPercent: 120, stagger: 0.04, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".contact", start: "top 60%" } });
  gsap.from(".contact__links a", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: ".contact__links", start: "top 90%" } });

  // nav active
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
      const t = e.target.closest("[data-cursor]");
      cur.classList.toggle("is-big", !!t);
      lab.textContent = t ? t.dataset.cursor : "";
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
