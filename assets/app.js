(function () {
  const root = document.getElementById("app");
  const page = document.body.dataset.page || "home";

  const storageKey = "happyend-demo-listings";
  const sessionKey = "happyend-demo-session";
  const accountsKey = "happyend-demo-accounts";
  const transactionsKey = "happyend-demo-transactions";
  const ageKey = "happyend-age-ok";
  const languageKey = "happyend-demo-language";
  const advInvoicesKey = "happyend-he-invoices";
  const advMutationsKey = "happyend-he-mutations";
  const advMessagesKey = "happyend-he-messages";
  const advReviewsKey = "happyend-he-reviews";
  const advNotiKey = "happyend-he-notifications";
  const advPhotosKey = "happyend-he-photos";
  const advListingKey = "happyend-he-listing";
  const visFavsKey = "happyend-vis-favs";
  const visMessagesKey = "happyend-vis-messages";
  const visSearchesKey = "happyend-vis-searches";

  function readJSON(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
  function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function visFavs() { return readJSON(visFavsKey, []); }
  function saveVisFavs(v) { writeJSON(visFavsKey, v); }
  function visMessages() { return readJSON(visMessagesKey, []); }
  function saveVisMessages(v) { writeJSON(visMessagesKey, v); }
  function visSearches() { return readJSON(visSearchesKey, []); }
  function saveVisSearches(v) { writeJSON(visSearchesKey, v); }
  function advInvoices() { return readJSON(advInvoicesKey, null) || seedInvoices(); }
  function saveInvoices(v) { writeJSON(advInvoicesKey, v); }
  function advMutations() { return readJSON(advMutationsKey, null) || seedMutations(); }
  function saveMutations(v) { writeJSON(advMutationsKey, v); }
  function advMessages() { return readJSON(advMessagesKey, null) || seedMessages(); }
  function saveMessages(v) { writeJSON(advMessagesKey, v); }
  function advReviews() { return readJSON(advReviewsKey, null) || seedReviews(); }
  function saveReviews(v) { writeJSON(advReviewsKey, v); }
  function advNotifications() { return readJSON(advNotiKey, null) || seedNotifications(); }
  function saveNotifications(v) { writeJSON(advNotiKey, v); }
  function advPhotos() { return readJSON(advPhotosKey, null) || ["portrait-1.jpg", "portrait-2.jpg"]; }
  function savePhotos(v) { writeJSON(advPhotosKey, v); }
  function advListing() { return readJSON(advListingKey, {}); }
  function saveListing(v) { writeJSON(advListingKey, v); }

  function seedInvoices() {
    const seed = [
      { id: "INV-2026-031", date: "2026-04-01", desc: "Premium vitrin · 30 gün", amount: 149, status: "Ödendi" },
      { id: "INV-2026-027", date: "2026-03-15", desc: "Üst sıra · 7 gün", amount: 99, status: "Ödendi" },
      { id: "INV-2026-022", date: "2026-03-02", desc: "100 HE Coin", amount: 89, status: "Ödendi" }
    ];
    writeJSON(advInvoicesKey, seed); return seed;
  }
  function seedMutations() {
    const seed = [
      { id: "M1", at: "2026-03-02", text: "Paket alımı INV-2026-022", delta: 100, sign: "+" },
      { id: "M2", at: "2026-03-12", text: "Üst sıra · Eskort 24s", delta: -19, sign: "-" },
      { id: "M3", at: "2026-03-20", text: "Mesaj kredisi", delta: -12, sign: "-" },
      { id: "M4", at: "2026-04-01", text: "Promosyon hediyesi", delta: 50, sign: "+" }
    ];
    writeJSON(advMutationsKey, seed); return seed;
  }
  function seedMessages() {
    const seed = [
      { id: "msg1", from: "Visitor demo", subject: "Müsait misiniz?", body: "Bu akşam Amsterdam'da müsait misiniz? Tarife bilgisini de paylaşır mısınız?", at: Date.now() - 60000, unread: true, replies: [] },
      { id: "msg2", from: "Support", subject: "Doğrulama tamamlandı", body: "Profil doğrulamanız onaylandı. İlanlarınız artık verifiye rozeti taşıyor.", at: Date.now() - 3600000, unread: false, replies: [] },
      { id: "msg3", from: "Visitor 91", subject: "Tarife ve konum", body: "Tarifeleriniz ve incall konumu hakkında bilgi alabilir miyim?", at: Date.now() - 86400000, unread: false, replies: [] }
    ];
    writeJSON(advMessagesKey, seed); return seed;
  }
  function seedReviews() {
    const seed = [
      { id: "rv1", user: "guestM", rating: 5, text: "Profesyonel iletişim, doğrulanmış profil. Tavsiye ederim.", at: Date.now() - 2 * 86400000, reply: "", flagged: false },
      { id: "rv2", user: "vis23", rating: 4, text: "Konum ve fiyat şeffaftı, randevuya uyumluydu.", at: Date.now() - 7 * 86400000, reply: "", flagged: false },
      { id: "rv3", user: "demo7", rating: 5, text: "Hızlı yanıt, düzgün hizmet.", at: Date.now() - 21 * 86400000, reply: "", flagged: false }
    ];
    writeJSON(advReviewsKey, seed); return seed;
  }
  function seedNotifications() {
    const seed = [
      { id: "n1", title: "İlan görüntülendi", text: "12 yeni görüntüleme", at: Date.now() - 7200000, read: false },
      { id: "n2", title: "Yeni yorum", text: "vis23 yorum bıraktı", at: Date.now() - 86400000, read: false },
      { id: "n3", title: "Promosyon", text: "Üst sıra paketiniz 24 saat içinde dolacak", at: Date.now() - 10800000, read: false },
      { id: "n4", title: "Sistem", text: "Doğrulama hala beklemede", at: Date.now() - 2 * 86400000, read: true }
    ];
    writeJSON(advNotiKey, seed); return seed;
  }

  function fmtDate(ms) {
    const d = new Date(ms);
    const pad = n => String(n).padStart(2, "0");
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
  }
  function fmtRel(ms) {
    const diff = Date.now() - ms;
    if (diff < 60000) return "az önce";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} dk önce`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} sa önce`;
    return `${Math.floor(diff / 86400000)} gün önce`;
  }

  const languages = [
    ["tr", "Türkçe"], ["en", "English"], ["nl", "Nederlands"], ["de", "Deutsch"],
    ["fr", "Français"], ["es", "Español"], ["it", "Italiano"], ["pt", "Português"],
    ["ru", "Русский"], ["ar", "العربية"]
  ];

  const copy = {
    tr: {
      support: "Destek", auctions: "Açık Artırmalar", account: "Giriş / Kayıt", search: "Ara",
      reset: "Sıfırla", available: "Müsaitler", postAd: "İlan Ver", results: "ilan bulundu",
      ageTitle: "18+ Yaş Doğrulaması", ageText: "Bu demo yalnızca yetişkin kullanıcılar içindir. Devam ederek 18 yaşından büyük olduğunuzu ve yerel yasalara uyacağınızı onaylarsınız.",
      continue: "Devam Et", exit: "Çıkış", details: "Detay", favorite: "Favori", request: "Randevu İste",
      wallet: "Cüzdan", credits: "HE Coin", pay: "Ödeme", login: "Giriş Yap", register: "Kayıt Ol",
      visitor: "Ziyaretçi", advertiser: "Reklam Veren", admin: "Admin", language: "Dil"
    },
    en: {
      support: "Support", auctions: "Auctions", account: "Sign in / Register", search: "Search",
      reset: "Reset", available: "Available", postAd: "Post Ad", results: "results found",
      ageTitle: "18+ Age Check", ageText: "This demo is for adult users only. By continuing, you confirm that you are over 18 and will follow local laws.",
      continue: "Continue", exit: "Exit", details: "Details", favorite: "Favorite", request: "Request Booking",
      wallet: "Wallet", credits: "HE Coins", pay: "Payment", login: "Sign In", register: "Register",
      visitor: "Visitor", advertiser: "Advertiser", admin: "Admin", language: "Language"
    },
    nl: {
      support: "Support", auctions: "Veilingen", account: "Inloggen / Registreren", search: "Zoeken",
      reset: "Reset", available: "Beschikbaar", postAd: "Advertentie plaatsen", results: "resultaten",
      ageTitle: "18+ Leeftijdscheck", ageText: "Deze demo is alleen voor volwassen gebruikers. Door te gaan bevestigt u dat u ouder bent dan 18 jaar.",
      continue: "Doorgaan", exit: "Afsluiten", details: "Details", favorite: "Favoriet", request: "Boeking aanvragen",
      wallet: "Wallet", credits: "HE Coins", pay: "Betaling", login: "Inloggen", register: "Registreren",
      visitor: "Bezoeker", advertiser: "Adverteerder", admin: "Admin", language: "Taal"
    },
    de: { support: "Support", auctions: "Auktionen", account: "Login / Registrieren", search: "Suchen", reset: "Zurücksetzen", available: "Verfügbar", postAd: "Anzeige", results: "Ergebnisse", ageTitle: "18+ Altersprüfung", ageText: "Diese Demo ist nur für Erwachsene.", continue: "Weiter", exit: "Beenden", details: "Details", favorite: "Favorit", request: "Buchung anfragen", wallet: "Wallet", credits: "HE Coins", pay: "Zahlung", login: "Login", register: "Registrieren", visitor: "Besucher", advertiser: "Anbieter", admin: "Admin", language: "Sprache" },
    fr: { support: "Support", auctions: "Enchères", account: "Connexion / Inscription", search: "Rechercher", reset: "Réinitialiser", available: "Disponible", postAd: "Publier", results: "résultats", ageTitle: "Vérification 18+", ageText: "Cette démo est réservée aux adultes.", continue: "Continuer", exit: "Quitter", details: "Détails", favorite: "Favori", request: "Demander", wallet: "Portefeuille", credits: "HE Coins", pay: "Paiement", login: "Connexion", register: "Inscription", visitor: "Visiteur", advertiser: "Annonceur", admin: "Admin", language: "Langue" },
    es: { support: "Soporte", auctions: "Subastas", account: "Entrar / Registro", search: "Buscar", reset: "Restablecer", available: "Disponible", postAd: "Publicar", results: "resultados", ageTitle: "Verificación 18+", ageText: "Esta demo es solo para adultos.", continue: "Continuar", exit: "Salir", details: "Detalles", favorite: "Favorito", request: "Solicitar", wallet: "Wallet", credits: "HE Coins", pay: "Pago", login: "Entrar", register: "Registro", visitor: "Visitante", advertiser: "Anunciante", admin: "Admin", language: "Idioma" },
    it: { support: "Supporto", auctions: "Aste", account: "Accedi / Registrati", search: "Cerca", reset: "Reset", available: "Disponibile", postAd: "Pubblica", results: "risultati", ageTitle: "Controllo 18+", ageText: "Questa demo è riservata agli adulti.", continue: "Continua", exit: "Esci", details: "Dettagli", favorite: "Preferito", request: "Richiedi", wallet: "Wallet", credits: "HE Coins", pay: "Pagamento", login: "Accedi", register: "Registrati", visitor: "Visitatore", advertiser: "Inserzionista", admin: "Admin", language: "Lingua" },
    pt: { support: "Suporte", auctions: "Leilões", account: "Entrar / Registrar", search: "Buscar", reset: "Limpar", available: "Disponível", postAd: "Anunciar", results: "resultados", ageTitle: "Verificação 18+", ageText: "Esta demo é apenas para adultos.", continue: "Continuar", exit: "Sair", details: "Detalhes", favorite: "Favorito", request: "Solicitar", wallet: "Carteira", credits: "HE Coins", pay: "Pagamento", login: "Entrar", register: "Registrar", visitor: "Visitante", advertiser: "Anunciante", admin: "Admin", language: "Idioma" },
    ru: { support: "Поддержка", auctions: "Аукционы", account: "Вход / Регистрация", search: "Поиск", reset: "Сброс", available: "Доступно", postAd: "Разместить", results: "результатов", ageTitle: "Проверка 18+", ageText: "Демо только для взрослых пользователей.", continue: "Продолжить", exit: "Выход", details: "Детали", favorite: "Избранное", request: "Запрос", wallet: "Кошелек", credits: "HE Coins", pay: "Оплата", login: "Вход", register: "Регистрация", visitor: "Гость", advertiser: "Рекламодатель", admin: "Админ", language: "Язык" },
    ar: { support: "الدعم", auctions: "المزادات", account: "دخول / تسجيل", search: "بحث", reset: "مسح", available: "متاح", postAd: "إعلان", results: "نتائج", ageTitle: "تحقق 18+", ageText: "هذا العرض للبالغين فقط.", continue: "متابعة", exit: "خروج", details: "تفاصيل", favorite: "مفضل", request: "طلب حجز", wallet: "المحفظة", credits: "HE Coins", pay: "الدفع", login: "دخول", register: "تسجيل", visitor: "زائر", advertiser: "معلن", admin: "مشرف", language: "اللغة" }
  };

  const seedListings = [
    { id: "luna", name: "Luna", age: 29, city: "Alkmaar", service: "Erotik Masaj", category: "Kadın", orientation: "Heteroseksüel", price: 180, coins: 18, rating: 4.9, available: true, featured: true, image: "portrait-1", about: "Sakin, güvenli ve özenli randevu deneyimi. Doğrulanmış profil, net fiyat bilgisi ve hızlı iletişim." },
    { id: "maya", name: "Maya", age: 27, city: "Amsterdam", service: "Eskort", category: "Kadın", orientation: "Biseksüel", price: 220, coins: 22, rating: 4.8, available: true, featured: true, image: "portrait-2", about: "Premium ilan, fotoğraf kontrolü ve müsaitlik takvimi aktif. Müşteri desteği ile onaylı demo profil." },
    { id: "noa", name: "Noa", age: 31, city: "Rotterdam", service: "Sanal Seks", category: "Non-Binary", orientation: "Queer", price: 140, coins: 14, rating: 4.7, available: false, featured: false, image: "portrait-3", about: "Mesajlaşma ve sanal randevu odaklı ilan. Yalnızca 18+ kullanıcılar için uygun, gizlilik öncelikli." },
    { id: "sofia", name: "Sofia", age: 25, city: "Den Haag", service: "Eskort", category: "Kadın", orientation: "Heteroseksüel", price: 240, coins: 24, rating: 4.9, available: true, featured: true, image: "portrait-2", about: "Dogrulanmis premium profil. Hotel visit, dinner date ve discreet booking taleplerine uygun." },
    { id: "eva", name: "Eva", age: 33, city: "Utrecht", service: "BDSM", category: "Kadın", orientation: "Biseksüel", price: 260, coins: 26, rating: 4.8, available: true, featured: false, image: "portrait-3", about: "BDSM ve roleplay odakli profesyonel ilan. Guvenli kelime, net sinirlar ve on gorusme akisi." },
    { id: "amelie", name: "Amelie", age: 28, city: "Amsterdam", service: "Erotik Masaj", category: "Kadın", orientation: "Heteroseksüel", price: 190, coins: 19, rating: 4.6, available: true, featured: false, image: "portrait-1", about: "Wellness hissi veren sakin masaj deneyimi. Sadece dogrulanmis uyelerden talep kabul eder." },
    { id: "lara", name: "Lara", age: 30, city: "Eindhoven", service: "Kırmızı Işıklar", category: "Trans Kadın", orientation: "Queer", price: 210, coins: 21, rating: 4.7, available: false, featured: true, image: "portrait-2", about: "Vitrin paketi aktif, konum ve saat bilgileri reklam veren panelinden yonetilir." },
    { id: "nina", name: "Nina", age: 24, city: "Groningen", service: "Eskort", category: "Kadın", orientation: "Biseksüel", price: 230, coins: 23, rating: 4.9, available: true, featured: false, image: "portrait-1", about: "Outcall ve incall secenekleri. Kibar iletisim, hizli cevap ve dogrulanmis fotograf rozeti." },
    { id: "alex", name: "Alex", age: 32, city: "Rotterdam", service: "Sanal Seks", category: "Erkek", orientation: "Biseksüel", price: 120, coins: 12, rating: 4.5, available: true, featured: false, image: "portrait-3", about: "Sanal randevu, chat ve video talep akislari icin uygun demo profil." },
    { id: "mila", name: "Mila", age: 26, city: "Alkmaar", service: "Erotik Masaj", category: "Kadın", orientation: "Heteroseksüel", price: 175, coins: 18, rating: 4.6, available: true, featured: false, image: "portrait-2", about: "Masaj salonu ve ozel randevu talepleri icin profesyonel ilan sayfasi." },
    { id: "jade", name: "Jade", age: 29, city: "Amsterdam", service: "BDSM", category: "Trans Kadın", orientation: "Queer", price: 280, coins: 28, rating: 4.9, available: true, featured: true, image: "portrait-1", about: "Premium BDSM ilanı. Paket, foto, review ve mesaj talepleri panelden takip edilir." },
    { id: "victoria", name: "Victoria", age: 35, city: "Den Haag", service: "Eskort", category: "Kadın", orientation: "Heteroseksüel", price: 300, coins: 30, rating: 5.0, available: true, featured: true, image: "portrait-3", about: "High-class dinner date ve travel companion talepleri icin vitrin profili." }
  ];

  const services = ["Tüm Hizmetler", "Sanal Seks", "Eskort", "Kırmızı Işıklar", "Erotik Masaj", "BDSM"];
  const cities = ["Tüm Konumlar", "Alkmaar", "Amsterdam", "Rotterdam", "Den Haag", "Utrecht"];
  const categories = ["Tümü", "Erkek", "Kadın", "Trans Erkek", "Trans Kadın", "Non-Binary"];
  const icons = { search: "⌕", close: "×", user: "♙", star: "★", pin: "⌖", card: "▣", bid: "⚒", support: "☎", save: "✓", edit: "✎", trash: "⌫" };

  const uiCopy = {
    tr: {
      promo: "1HappyEnd 2.0'ı şimdi deneyin!", searchPlaceholder: "Arama sorgunuzu buraya girin...", allCategories: "Tüm kategoriler", filters: "Filtreler",
      support: "Müşteri Hizmetleri", account: "Giriş yap | Kayıt olmak", navHome: "Ev", navWomen: "Kadınlar", navMen: "Erkekler", navCouples: "Çiftler", navTrans: "Trans kadınlar", navBusiness: "Seks işletmeleri", navTour: "Tür Tarifi", navVideos: "Videolar", webcam: "Webcam seks",
      categoryAll: "Tüm kategoriler", women: "Kadınlar", men: "Erkekler", couples: "Çiftler", transWomen: "Trans kadınlar", businesses: "Seks işletmeleri", virtualSex: "Sanal seks",
      quickLinks: "Hızlı bağlantılar", privateReception: "Özel resepsiyon", escort: "Eskort", eroticMassage: "Erotik masaj", redLights: "Kırmızı ışıklar", club: "Kulüp", massageSalon: "Masaj salonu",
      advancedSearch: "Gelişmiş arama", filterSub: "Profil, şehir, hizmet", searchInput: "İsim, şehir veya hizmet ara...", allDistances: "Tüm mesafeler", allServices: "Tüm hizmetler", allLocations: "Tüm konumlar",
      tenPhotos: "10+ foto olanları göster", withVideo: "Video olanları göster", withReviews: "Yorum olanları göster", verifiedPhotos: "Fotoğraf doğrulama", walletReady: "Cüzdan hazır", advertiserPackages: "Reklamveren paketleri", gdpr: "GDPR uyumlu",
      allAds: "Tüm ilanlar", newest: "En yeni", nearby: "Yakında", available: "Müsaitler", postAd: "İlan Ver", found: "ilan bulundu",
      trending: "Trend videolar", premiumVideo: "Premium profil video", newVerification: "Yeni doğrulama", advertiserPanel: "Reklamveren paneli", advertiserPanelText: "Fotoğraf, video, fiyat, müsaitlik ve vitrin paketi yükleme akışı hazır.", uploadContent: "İçerik yükle",
      visitor: "Ziyaretçi", advertiser: "Reklamveren", loginTitle: "1HappyEnd'e giriş yapın", loginCopy: "Zaten bir hesabınız var mı? O zaman doğrudan buradan giriş yapabilirsiniz.", demoHint: "Demo hesaplar: visitor / 123456, advertiser / 123456", email: "E-posta veya kullanıcı adı", password: "Şifre", remember: "Beni Hatırla", forgot: "Parolanızı mı unuttunuz?", loginButton: "Giriş yapmak",
      noAccount: "Henüz hesabınız yok mu?", visitorSignupTitle: "Ziyaretçi olarak kayıt olun", visitorSignupText: "Kayıtlı bir ziyaretçi olarak reklamverenlere mesaj gönderebilir, favori profilleri saklayabilir ve gelişmelerden haberdar olabilirsiniz.", advertiserSignupTitle: "Reklamveren olarak kaydolun", advertiserSignupText: "Profesyonel ilan oluşturun, fotoğraf/video içeriklerinizi yükleyin, vitrin paketlerini ve ödeme akışını panelden yönetin.", registerDone: "Kaydı tamamla", createAccount: "hesabı oluşturun", adultConfirm: "18 yaşından büyüğüm ve yasal şartları kabul ediyorum",
      loginOk: "Giriş başarılı. Yönlendiriliyorsunuz.", registerOk: "Kayıt başarılı. Hesabınız hazırlandı.", loginError: "E-posta/kullanıcı adı veya şifre hatalı.", existsError: "Bu kullanıcı adı zaten kayıtlı.", adultError: "18+ onayı zorunludur.",
      adminLoginTitle: "Yönetim paneli girişi", adminLoginCopy: "Bu alan yalnızca yetkili platform ekibi içindir ve normal sitede görünmez.", adminLoginButton: "Admin girişi", adminError: "Admin bilgileri eşleşmedi.",
      wallet: "Cüzdan", credits: "HE Coin", pay: "Ödeme", favorite: "Favori", request: "Randevu İste", reset: "Sıfırla", language: "Dil"
    },
    en: {
      promo: "Try 1HappyEnd 2.0 now!", searchPlaceholder: "Enter your search query here...", allCategories: "All categories", filters: "Filters",
      support: "Customer Service", account: "Sign in | Register", navHome: "Home", navWomen: "Women", navMen: "Men", navCouples: "Couples", navTrans: "Trans women", navBusiness: "Sex businesses", navTour: "Tour Guide", navVideos: "Videos", webcam: "Webcam sex",
      categoryAll: "All categories", women: "Women", men: "Men", couples: "Couples", transWomen: "Trans women", businesses: "Sex businesses", virtualSex: "Virtual sex",
      quickLinks: "Quick links", privateReception: "Private reception", escort: "Escort", eroticMassage: "Erotic massage", redLights: "Red lights", club: "Club", massageSalon: "Massage salon",
      advancedSearch: "Advanced search", filterSub: "Profile, city, service", searchInput: "Search name, city or service...", allDistances: "All distances", allServices: "All services", allLocations: "All locations",
      tenPhotos: "Show profiles with 10+ photos", withVideo: "Show profiles with video", withReviews: "Show profiles with reviews", verifiedPhotos: "Photo verification", walletReady: "Wallet ready", advertiserPackages: "Advertiser packages", gdpr: "GDPR focused",
      allAds: "All advertisements", newest: "Newest", nearby: "Nearby", available: "Available", postAd: "Post Ad", found: "results found",
      trending: "Trending videos", premiumVideo: "Premium profile video", newVerification: "New verification", advertiserPanel: "Advertiser panel", advertiserPanelText: "Photo, video, pricing, availability and featured-package upload flow is ready.", uploadContent: "Upload content",
      visitor: "Visitor", advertiser: "Advertiser", loginTitle: "Sign in to 1HappyEnd", loginCopy: "Already have an account? You can sign in directly here.", demoHint: "Demo accounts: visitor / 123456, advertiser / 123456", email: "Email or username", password: "Password", remember: "Remember me", forgot: "Forgot your password?", loginButton: "Sign in",
      noAccount: "No account yet?", visitorSignupTitle: "Register as a visitor", visitorSignupText: "As a registered visitor you can message advertisers, save favourite profiles and receive updates.", advertiserSignupTitle: "Register as an advertiser", advertiserSignupText: "Create professional listings, upload photo/video content, and manage featured packages and payments.", registerDone: "Complete registration", createAccount: "account", adultConfirm: "I am over 18 and accept the legal terms",
      loginOk: "Sign-in successful. Redirecting.", registerOk: "Registration successful. Your account is ready.", loginError: "Email/username or password is incorrect.", existsError: "This username already exists.", adultError: "18+ confirmation is required.",
      adminLoginTitle: "Admin panel sign-in", adminLoginCopy: "This area is only for the authorised platform team and is hidden from the public site.", adminLoginButton: "Admin sign-in", adminError: "Admin credentials did not match.",
      wallet: "Wallet", credits: "HE Coins", pay: "Payment", favorite: "Favorite", request: "Request Booking", reset: "Reset", language: "Language"
    }
  };
  ["nl", "de", "fr", "es", "it", "pt", "ru", "ar"].forEach(code => { uiCopy[code] = { ...uiCopy.en, language: (copy[code] && copy[code].language) || uiCopy.en.language }; });
  Object.assign(uiCopy.nl, {
    promo: "Probeer nu 1HappyEnd 2.0!", searchPlaceholder: "Vul hier je zoekopdracht in...", allCategories: "Alle categorieën", filters: "Filters", support: "Klantenservice", account: "Inloggen | Registreren",
    navHome: "Home", navWomen: "Vrouwen", navMen: "Mannen", navCouples: "Stellen", navTrans: "Trans vrouwen", navBusiness: "Seksbedrijven", navTour: "Tour Gids", navVideos: "Video's",
    advancedSearch: "Uitgebreid zoeken", filterSub: "Profiel, plaats, service", searchInput: "Zoek op naam, plaats of service...", allDistances: "Alle afstanden", allAds: "Alle advertenties", newest: "Nieuwste", nearby: "In de buurt", available: "Beschikbaar", postAd: "Advertentie plaatsen", found: "advertenties gevonden",
    loginTitle: "Inloggen bij 1HappyEnd", loginCopy: "Heb je al een account? Dan kun je hier direct inloggen.", demoHint: "Demo accounts: visitor / 123456, advertiser / 123456", email: "E-mail of gebruikersnaam", password: "Wachtwoord", remember: "Onthoud mij", forgot: "Wachtwoord vergeten?", loginButton: "Inloggen",
    noAccount: "Nog geen account?", visitorSignupTitle: "Registreren als bezoeker", advertiserSignupTitle: "Registreren als adverteerder", registerDone: "Registratie afronden", createAccount: "account aanmaken"
  });
  Object.assign(uiCopy.de, {
    promo: "Jetzt 1HappyEnd 2.0 testen!", searchPlaceholder: "Suchbegriff hier eingeben...", allCategories: "Alle Kategorien", filters: "Filter", support: "Kundenservice", account: "Einloggen | Registrieren",
    navHome: "Home", navWomen: "Frauen", navMen: "Männer", navCouples: "Paare", navTrans: "Trans Frauen", navBusiness: "Sexbetriebe", navTour: "Tour Guide", navVideos: "Videos",
    advancedSearch: "Erweiterte Suche", filterSub: "Profil, Stadt, Service", searchInput: "Name, Stadt oder Service suchen...", allDistances: "Alle Entfernungen", allAds: "Alle Anzeigen", newest: "Neueste", nearby: "In der Nähe", available: "Verfügbar", postAd: "Anzeige aufgeben", found: "Anzeigen gefunden",
    loginTitle: "Bei 1HappyEnd einloggen", loginCopy: "Haben Sie bereits ein Konto? Dann können Sie sich hier direkt einloggen.", email: "E-Mail oder Benutzername", password: "Passwort", remember: "Angemeldet bleiben", forgot: "Passwort vergessen?", loginButton: "Einloggen", noAccount: "Noch kein Konto?", visitorSignupTitle: "Als Besucher registrieren", advertiserSignupTitle: "Als Anbieter registrieren"
  });
  Object.assign(uiCopy.fr, {
    promo: "Essayez 1HappyEnd 2.0 maintenant !", searchPlaceholder: "Saisissez votre recherche ici...", allCategories: "Toutes les catégories", filters: "Filtres", support: "Service client", account: "Connexion | Inscription",
    navHome: "Accueil", navWomen: "Femmes", navMen: "Hommes", navCouples: "Couples", navTrans: "Femmes trans", navBusiness: "Établissements", navTour: "Guide", navVideos: "Vidéos",
    advancedSearch: "Recherche avancée", filterSub: "Profil, ville, service", searchInput: "Rechercher nom, ville ou service...", allAds: "Toutes les annonces", newest: "Nouveautés", nearby: "À proximité", available: "Disponible", postAd: "Publier", found: "annonces trouvées",
    loginTitle: "Connexion à 1HappyEnd", email: "E-mail ou identifiant", password: "Mot de passe", remember: "Se souvenir de moi", forgot: "Mot de passe oublié ?", loginButton: "Connexion", noAccount: "Pas encore de compte ?", visitorSignupTitle: "S'inscrire comme visiteur", advertiserSignupTitle: "S'inscrire comme annonceur"
  });
  Object.assign(uiCopy.es, {
    promo: "Prueba 1HappyEnd 2.0 ahora!", searchPlaceholder: "Escribe tu búsqueda aquí...", allCategories: "Todas las categorías", filters: "Filtros", support: "Atención al cliente", account: "Entrar | Registrarse",
    navHome: "Inicio", navWomen: "Mujeres", navMen: "Hombres", navCouples: "Parejas", navTrans: "Mujeres trans", navBusiness: "Negocios adultos", navTour: "Guía", navVideos: "Videos",
    advancedSearch: "Búsqueda avanzada", filterSub: "Perfil, ciudad, servicio", searchInput: "Buscar nombre, ciudad o servicio...", allAds: "Todos los anuncios", newest: "Nuevos", nearby: "Cerca", available: "Disponible", postAd: "Publicar anuncio", found: "anuncios encontrados",
    loginTitle: "Entrar en 1HappyEnd", email: "Email o usuario", password: "Contraseña", remember: "Recordarme", forgot: "Olvidaste tu contraseña?", loginButton: "Entrar", noAccount: "Aún no tienes cuenta?", visitorSignupTitle: "Registrarse como visitante", advertiserSignupTitle: "Registrarse como anunciante"
  });
  Object.assign(uiCopy.it, {
    promo: "Prova ora 1HappyEnd 2.0!", searchPlaceholder: "Inserisci qui la tua ricerca...", allCategories: "Tutte le categorie", filters: "Filtri", support: "Servizio clienti", account: "Accedi | Registrati",
    advancedSearch: "Ricerca avanzata", searchInput: "Cerca nome, città o servizio...", allAds: "Tutti gli annunci", newest: "Più recenti", nearby: "Vicino", available: "Disponibile", postAd: "Pubblica annuncio",
    loginTitle: "Accedi a 1HappyEnd", email: "Email o username", password: "Password", remember: "Ricordami", forgot: "Password dimenticata?", loginButton: "Accedi", noAccount: "Non hai un account?", visitorSignupTitle: "Registrati come visitatore", advertiserSignupTitle: "Registrati come inserzionista"
  });
  Object.assign(uiCopy.pt, {
    promo: "Experimente o 1HappyEnd 2.0 agora!", searchPlaceholder: "Digite sua pesquisa aqui...", allCategories: "Todas as categorias", filters: "Filtros", support: "Atendimento", account: "Entrar | Registrar",
    advancedSearch: "Pesquisa avançada", searchInput: "Buscar nome, cidade ou serviço...", allAds: "Todos os anúncios", newest: "Mais recentes", nearby: "Perto", available: "Disponível", postAd: "Publicar anúncio",
    loginTitle: "Entrar no 1HappyEnd", email: "Email ou usuário", password: "Senha", remember: "Lembrar-me", forgot: "Esqueceu a senha?", loginButton: "Entrar", noAccount: "Ainda não tem conta?", visitorSignupTitle: "Registrar como visitante", advertiserSignupTitle: "Registrar como anunciante"
  });
  Object.assign(uiCopy.ru, {
    promo: "Попробуйте 1HappyEnd 2.0!", searchPlaceholder: "Введите поисковый запрос...", allCategories: "Все категории", filters: "Фильтры", support: "Поддержка", account: "Вход | Регистрация",
    advancedSearch: "Расширенный поиск", searchInput: "Поиск по имени, городу или услуге...", allAds: "Все объявления", newest: "Новые", nearby: "Рядом", available: "Доступно", postAd: "Разместить",
    loginTitle: "Вход в 1HappyEnd", email: "Email или логин", password: "Пароль", remember: "Запомнить меня", forgot: "Забыли пароль?", loginButton: "Войти", noAccount: "Еще нет аккаунта?", visitorSignupTitle: "Регистрация посетителя", advertiserSignupTitle: "Регистрация рекламодателя"
  });
  Object.assign(uiCopy.ar, {
    promo: "جرّب 1HappyEnd 2.0 الآن!", searchPlaceholder: "اكتب عبارة البحث هنا...", allCategories: "كل الفئات", filters: "الفلاتر", support: "خدمة العملاء", account: "دخول | تسجيل",
    advancedSearch: "بحث متقدم", searchInput: "ابحث بالاسم أو المدينة أو الخدمة...", allAds: "كل الإعلانات", newest: "الأحدث", nearby: "بالقرب منك", available: "متاح", postAd: "نشر إعلان",
    loginTitle: "تسجيل الدخول إلى 1HappyEnd", email: "البريد أو اسم المستخدم", password: "كلمة المرور", remember: "تذكرني", forgot: "نسيت كلمة المرور؟", loginButton: "دخول", noAccount: "ليس لديك حساب؟", visitorSignupTitle: "تسجيل كزائر", advertiserSignupTitle: "تسجيل كمعلن"
  });

  const extraCopy = {
    tr: {
      footerGeneral: "Genel", footerAbout: "Hakkımızda", footerSafety: "Güvenlik ve bilgi", footerAds: "Reklam fırsatları", footerVerification: "Doğrulama politikası",
      footerService: "Hizmet", footerContact: "Bize Ulaşın", footerReport: "Suistimali bildir", footerLegal: "Yasal", footerPrivacy: "Gizlilik bildirimi", footerCookie: "Çerez Bildirimi", footerTerms: "Genel Hüküm ve Koşullar", footerRefund: "Geri ödeme politikası", footerCompany: "Şirket", footerQuick: "Hızlı bağlantılar", copyright: "© Telif Hakkı 2007 - 2026 | Her hakkı saklıdır | 1HappyEnd",
      walletGuestText: "Ziyaretçiler HE Coin satın alabilir, reklamverenler ilan paketi ve vitrin ödemesi hazırlayabilir.", accountSuffix: "hesabı", balanceLabel: "bakiye",
      verified: "Verified", premium: "Premium", online: "Online", busy: "Busy", or: "veya", photosLabel: "foto", reviewsLabel: "yorum", minuteAgo: "1 dakika önce", minutesAgo: "7 dakika önce", showNumber: "Toon nummer",
      noResults: "Aramanıza uygun ilan bulunamadı.", countryNetherlands: "Nederland", countryBelgium: "België", countryGermany: "Duitsland",
      starterText: "Hizmet almak isteyen üyeler için uygulama içi bakiye.", boostText: "Reklam verenler için öne çıkarma ve açık artırma kredisi.", paymentText: "Ödeme altyapısı Stripe, iDEAL ve kart tahsilatına hazır tasarlandı.", choosePackage: "Paketi Seç", thirtyDays: "30 gün", mockCheckout: "Mock checkout",
      advertiserFlow: "Reklamveren akışı", approvalTitle: "İlan onay süreci", approvalText: "Reklam veren kayıt olur, profilini tamamlar, doğrulama fotoğrafını yükler, paket seçer ve ilan admin onayından sonra yayına alınır.",
      safetyLayer: "Güvenlik katmanı", directoryTitle: "Directory, agency değil", directoryText: "Platform yalnızca ilan ve iletişim altyapısı sağlar. Şikayet, doğrulama ve ödeme kayıtları admin panelinde izlenebilir.",
      revenue: "Gelir modeli", revenueTitle: "Gelir modeli hazır", revenueText: "Vitrin, premium ilan, açık artırma, banner, HE Coin ve ödeme komisyonu modelleri demo akışına bağlandı.",
      auctionTitle: "Açık artırma ve vitrin sistemi", auctionText: "Reklam verenler vitrin sırası için teklif verebilir; ziyaretçiler doğrudan Euro, Dolar veya HE Coin ile talep oluşturabilir.", advertiserLogin: "Reklam Veren Girişi",
      safetyCenterTitle: "Güvenlik ve doğrulama merkezi", safetyCenterText: "Kimlik doğrulama, 18+ uyarısı, şikayet, ödeme logu ve hesap tipi ayrımı ilk sunumda hazır.", supportRequest: "Destek Talebi Oluştur",
      close: "Kapat", availableStatus: "Müsait", busyStatus: "Meşgul", paymentBoostTitle: "Reklam Veren Paketi", paymentStarterTitle: "HE Coin Paketi", paymentWalletTitle: "Cüzdan ve Ödeme",
      paymentIntro: "Bu ödeme akışı canlı tahsilata hazır mimariyi gösterir; canlıya geçerken Stripe, iDEAL, kart ve fatura entegrasyonu bağlanır.", accountLabel: "Hesap", guestLabel: "Misafir", currencyLabel: "Para birimi", packageLabel: "Paket", methodLabel: "Ödeme yöntemi", preparePayment: "Ödeme Sayfasına Hazırla",
      detailPaymentType: "Ödeme tipi", privacyLevel: "Gizlilik seviyesi", standardRequest: "Standart güvenli talep", premiumRequest: "Premium doğrulamalı talep", hourLabel: "saat",
      favAdded: "Favorilere eklendi.", supportQueued: "Destek talebi kuyruğa eklendi.", paymentQueued: "Ödeme akışı oluşturuldu. Canlıda ödeme sağlayıcıya yönlendirilir.", legalNeed: "Devam etmek için 18+ ve şartlar onaylarını işaretleyin.", pagePreparing: "Bu bilgilendirme sayfası içerik yönetimine bağlı olarak açılacak."
    },
    en: {
      footerGeneral: "General", footerAbout: "About us", footerSafety: "Safety and information", footerAds: "Advertising opportunities", footerVerification: "Verification policy",
      footerService: "Service", footerContact: "Contact us", footerReport: "Report abuse", footerLegal: "Legal", footerPrivacy: "Privacy notice", footerCookie: "Cookie notice", footerTerms: "Terms and conditions", footerRefund: "Refund policy", footerCompany: "Company", footerQuick: "Quick links", copyright: "© Copyright 2007 - 2026 | All rights reserved | 1HappyEnd",
      walletGuestText: "Visitors can buy HE Coins; advertisers can prepare listing packages and featured payments.", accountSuffix: "account", balanceLabel: "balance",
      verified: "Verified", premium: "Premium", online: "Online", busy: "Busy", or: "or", photosLabel: "photos", reviewsLabel: "reviews", minuteAgo: "1 minute ago", minutesAgo: "7 minutes ago", showNumber: "Show number",
      noResults: "No listings matched your search.", countryNetherlands: "Netherlands", countryBelgium: "Belgium", countryGermany: "Germany",
      starterText: "In-app balance for members who want to request services.", boostText: "Featured placement and auction credit for advertisers.", paymentText: "Payment structure is ready for Stripe, iDEAL and card collection.", choosePackage: "Choose package", thirtyDays: "30 days", mockCheckout: "Mock checkout",
      advertiserFlow: "Advertiser flow", approvalTitle: "Listing approval process", approvalText: "Advertisers register, complete their profile, upload verification media, choose a package, and go live after admin approval.",
      safetyLayer: "Safety layer", directoryTitle: "Directory, not an agency", directoryText: "The platform only provides listing and communication infrastructure. Reports, verification and payment logs can be monitored in the admin panel.",
      revenue: "Revenue", revenueTitle: "Revenue model ready", revenueText: "Featured listings, premium ads, auctions, banners, HE Coins and payment commission are connected in the demo flow.",
      auctionTitle: "Auction and featured system", auctionText: "Advertisers can bid for featured placement; visitors can create requests with Euro, Dollar or HE Coins.", advertiserLogin: "Advertiser sign in",
      safetyCenterTitle: "Safety and verification center", safetyCenterText: "Identity verification, 18+ notice, reports, payment logs and account-type separation are ready for the first presentation.", supportRequest: "Create support request",
      close: "Close", availableStatus: "Available", busyStatus: "Busy", paymentBoostTitle: "Advertiser Package", paymentStarterTitle: "HE Coin Package", paymentWalletTitle: "Wallet and Payment",
      paymentIntro: "This payment flow shows a live-ready architecture; Stripe, iDEAL, card and invoice integrations can be connected for production.", accountLabel: "Account", guestLabel: "Guest", currencyLabel: "Currency", packageLabel: "Package", methodLabel: "Payment method", preparePayment: "Prepare payment page",
      detailPaymentType: "Payment type", privacyLevel: "Privacy level", standardRequest: "Standard secure request", premiumRequest: "Premium verified request", hourLabel: "hour",
      favAdded: "Added to favourites.", supportQueued: "Support request added to the queue.", paymentQueued: "Payment flow created. In production, the user is redirected to the payment provider.", legalNeed: "Please confirm the 18+ and terms checks to continue.", pagePreparing: "This information page will open through the content management system."
    },
    nl: {
      footerGeneral: "Algemeen", footerAbout: "Over ons", footerSafety: "Veiligheid en informatie", footerAds: "Adverteermogelijkheden", footerVerification: "Verificatiebeleid",
      footerService: "Service", footerContact: "Neem contact op", footerReport: "Misbruik melden", footerLegal: "Juridisch", footerPrivacy: "Privacyverklaring", footerCookie: "Cookieverklaring", footerTerms: "Algemene voorwaarden", footerRefund: "Terugbetalingsbeleid", footerCompany: "Bedrijf", footerQuick: "Snelle links", copyright: "© Copyright 2007 - 2026 | Alle rechten voorbehouden | 1HappyEnd",
      walletGuestText: "Bezoekers kunnen HE Coins kopen; adverteerders kunnen advertentiepakketten en vitrinebetalingen voorbereiden.", accountSuffix: "account", balanceLabel: "saldo",
      verified: "Geverifieerd", premium: "Premium", online: "Online", busy: "Bezet", or: "of", photosLabel: "foto's", reviewsLabel: "reviews", minuteAgo: "1 minuut geleden", minutesAgo: "7 minuten geleden", showNumber: "Toon nummer",
      noResults: "Geen advertenties gevonden voor je zoekopdracht.", countryNetherlands: "Nederland", countryBelgium: "België", countryGermany: "Duitsland",
      starterText: "In-app saldo voor leden die diensten willen aanvragen.", boostText: "Vitrineplaatsing en veilingtegoed voor adverteerders.", paymentText: "Betaalstructuur is klaar voor Stripe, iDEAL en kaartbetalingen.", choosePackage: "Pakket kiezen", thirtyDays: "30 dagen", mockCheckout: "Demo checkout",
      advertiserFlow: "Adverteerdersflow", approvalTitle: "Goedkeuringsproces", approvalText: "Adverteerders registreren zich, vullen hun profiel aan, uploaden verificatiemedia, kiezen een pakket en gaan live na admin-goedkeuring.",
      safetyLayer: "Veiligheidslaag", directoryTitle: "Directory, geen bureau", directoryText: "Het platform levert alleen advertentie- en communicatie-infrastructuur. Meldingen, verificatie en betalingen zijn zichtbaar in het adminpaneel.",
      revenue: "Verdienmodel", revenueTitle: "Verdienmodel klaar", revenueText: "Vitrine, premium advertenties, veilingen, banners, HE Coins en betaalcommissie zijn gekoppeld aan de demo.",
      auctionTitle: "Veiling- en vitrinesysteem", auctionText: "Adverteerders kunnen bieden op vitrineposities; bezoekers kunnen aanvragen maken met Euro, Dollar of HE Coins.", advertiserLogin: "Adverteerder inloggen",
      safetyCenterTitle: "Veiligheids- en verificatiecentrum", safetyCenterText: "Identiteitscontrole, 18+ melding, klachten, betalingslog en accounttypes zijn klaar voor de eerste presentatie.", supportRequest: "Supportverzoek maken",
      close: "Sluiten", availableStatus: "Beschikbaar", busyStatus: "Bezet", paymentBoostTitle: "Adverteerderspakket", paymentStarterTitle: "HE Coin pakket", paymentWalletTitle: "Wallet en betaling",
      paymentIntro: "Deze betaalflow toont een live-klare structuur; Stripe, iDEAL, kaart- en factuurintegraties kunnen voor productie worden gekoppeld.", accountLabel: "Account", guestLabel: "Gast", currencyLabel: "Valuta", packageLabel: "Pakket", methodLabel: "Betaalmethode", preparePayment: "Betaalpagina voorbereiden",
      detailPaymentType: "Betaaltype", privacyLevel: "Privacyniveau", standardRequest: "Standaard veilige aanvraag", premiumRequest: "Premium geverifieerde aanvraag", hourLabel: "uur",
      favAdded: "Toegevoegd aan favorieten.", supportQueued: "Supportverzoek toegevoegd aan de wachtrij.", paymentQueued: "Betaalflow aangemaakt. In productie wordt de gebruiker doorgestuurd naar de betaalprovider.", legalNeed: "Bevestig 18+ en de voorwaarden om door te gaan.", pagePreparing: "Deze informatiepagina wordt via het contentbeheer geopend."
    }
  };
  ["de", "fr", "es", "it", "pt", "ru", "ar"].forEach(code => { extraCopy[code] = { ...extraCopy.en }; });

  const valueCopy = {
    tr: {
      "Tüm Hizmetler": "Tüm Hizmetler", "Sanal Seks": "Sanal Seks", "Eskort": "Eskort", "Kırmızı Işıklar": "Kırmızı Işıklar", "Erotik Masaj": "Erotik Masaj", "BDSM": "BDSM",
      "Tüm Konumlar": "Tüm Konumlar", "Tümü": "Tümü", "Erkek": "Erkek", "Kadın": "Kadın", "Trans Erkek": "Trans Erkek", "Trans Kadın": "Trans Kadın", "Non-Binary": "Non-Binary",
      "Heteroseksüel": "Heteroseksüel", "Biseksüel": "Biseksüel", "Queer": "Queer", "Doğrulanmış": "Doğrulanmış"
    },
    en: {
      "Tüm Hizmetler": "All services", "Sanal Seks": "Virtual sex", "Eskort": "Escort", "Kırmızı Işıklar": "Red lights", "Erotik Masaj": "Erotic massage", "BDSM": "BDSM",
      "Tüm Konumlar": "All locations", "Tümü": "All", "Erkek": "Men", "Kadın": "Women", "Trans Erkek": "Trans men", "Trans Kadın": "Trans women", "Non-Binary": "Non-binary",
      "Heteroseksüel": "Heterosexual", "Biseksüel": "Bisexual", "Queer": "Queer", "Doğrulanmış": "Verified"
    },
    nl: {
      "Tüm Hizmetler": "Alle diensten", "Sanal Seks": "Virtuele seks", "Eskort": "Escort", "Kırmızı Işıklar": "Raamprostitutie", "Erotik Masaj": "Erotische massage", "BDSM": "BDSM",
      "Tüm Konumlar": "Alle locaties", "Tümü": "Alle", "Erkek": "Mannen", "Kadın": "Vrouwen", "Trans Erkek": "Trans mannen", "Trans Kadın": "Trans vrouwen", "Non-Binary": "Non-binair",
      "Heteroseksüel": "Heteroseksueel", "Biseksüel": "Biseksueel", "Queer": "Queer", "Doğrulanmış": "Geverifieerd"
    },
    de: {
      "Tüm Hizmetler": "Alle Dienste", "Sanal Seks": "Virtueller Sex", "Eskort": "Escort", "Kırmızı Işıklar": "Rotlicht", "Erotik Masaj": "Erotische Massage", "BDSM": "BDSM",
      "Tüm Konumlar": "Alle Orte", "Tümü": "Alle", "Erkek": "Männer", "Kadın": "Frauen", "Trans Erkek": "Trans Männer", "Trans Kadın": "Trans Frauen", "Non-Binary": "Nicht-binär",
      "Heteroseksüel": "Heterosexuell", "Biseksüel": "Bisexuell", "Queer": "Queer", "Doğrulanmış": "Verifiziert"
    },
    fr: {
      "Tüm Hizmetler": "Tous les services", "Sanal Seks": "Sexe virtuel", "Eskort": "Escort", "Kırmızı Işıklar": "Quartier rouge", "Erotik Masaj": "Massage érotique", "BDSM": "BDSM",
      "Tüm Konumlar": "Toutes les villes", "Tümü": "Tous", "Erkek": "Hommes", "Kadın": "Femmes", "Trans Erkek": "Hommes trans", "Trans Kadın": "Femmes trans", "Non-Binary": "Non-binaire",
      "Heteroseksüel": "Hétérosexuel", "Biseksüel": "Bisexuel", "Queer": "Queer", "Doğrulanmış": "Vérifié"
    },
    es: {
      "Tüm Hizmetler": "Todos los servicios", "Sanal Seks": "Sexo virtual", "Eskort": "Escort", "Kırmızı Işıklar": "Barrio rojo", "Erotik Masaj": "Masaje erótico", "BDSM": "BDSM",
      "Tüm Konumlar": "Todas las ubicaciones", "Tümü": "Todo", "Erkek": "Hombres", "Kadın": "Mujeres", "Trans Erkek": "Hombres trans", "Trans Kadın": "Mujeres trans", "Non-Binary": "No binario",
      "Heteroseksüel": "Heterosexual", "Biseksüel": "Bisexual", "Queer": "Queer", "Doğrulanmış": "Verificado"
    },
    it: {
      "Tüm Hizmetler": "Tutti i servizi", "Sanal Seks": "Sesso virtuale", "Eskort": "Escort", "Kırmızı Işıklar": "Luci rosse", "Erotik Masaj": "Massaggio erotico", "BDSM": "BDSM",
      "Tüm Konumlar": "Tutte le località", "Tümü": "Tutti", "Erkek": "Uomini", "Kadın": "Donne", "Trans Erkek": "Uomini trans", "Trans Kadın": "Donne trans", "Non-Binary": "Non binario",
      "Heteroseksüel": "Eterosessuale", "Biseksüel": "Bisessuale", "Queer": "Queer", "Doğrulanmış": "Verificato"
    },
    pt: {
      "Tüm Hizmetler": "Todos os serviços", "Sanal Seks": "Sexo virtual", "Eskort": "Escort", "Kırmızı Işıklar": "Zona vermelha", "Erotik Masaj": "Massagem erótica", "BDSM": "BDSM",
      "Tüm Konumlar": "Todas as localizações", "Tümü": "Todos", "Erkek": "Homens", "Kadın": "Mulheres", "Trans Erkek": "Homens trans", "Trans Kadın": "Mulheres trans", "Non-Binary": "Não binário",
      "Heteroseksüel": "Heterossexual", "Biseksüel": "Bissexual", "Queer": "Queer", "Doğrulanmış": "Verificado"
    }
  };
  ["ru", "ar"].forEach(code => { valueCopy[code] = { ...valueCopy.en }; });

  function lang() { return localStorage.getItem(languageKey) || "tr"; }
  function t(key) { return (extraCopy[lang()] && extraCopy[lang()][key]) || (uiCopy[lang()] && uiCopy[lang()][key]) || (copy[lang()] && copy[lang()][key]) || extraCopy.tr[key] || uiCopy.tr[key] || copy.tr[key] || key; }
  function tv(value) { return (valueCopy[lang()] && valueCopy[lang()][value]) || (valueCopy.en && valueCopy.en[value]) || value; }

  function listings() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      localStorage.setItem(storageKey, JSON.stringify(seedListings));
      return seedListings.slice();
    }
    try {
      const saved = JSON.parse(raw);
      const ids = new Set(saved.map(item => item.id));
      const merged = saved.concat(seedListings.filter(item => !ids.has(item.id)));
      if (merged.length !== saved.length) localStorage.setItem(storageKey, JSON.stringify(merged));
      return merged;
    } catch (_) { return seedListings.slice(); }
  }

  function saveListings(items) { localStorage.setItem(storageKey, JSON.stringify(items)); }
  function transactions() { try { return JSON.parse(localStorage.getItem(transactionsKey) || "[]"); } catch (_) { return []; } }
  function saveTransactions(items) { localStorage.setItem(transactionsKey, JSON.stringify(items)); }

  function seedAccounts() {
    const raw = localStorage.getItem(accountsKey);
    if (raw) {
      try { return JSON.parse(raw); } catch (_) {}
    }
    const data = [
      { username: "visitor", password: "123456", role: "visitor", name: "Demo Ziyaretçi", email: "visitor@demo.local", wallet: 125, currency: "EUR", balance: 75 },
      { username: "advertiser", password: "123456", role: "advertiser", name: "Demo Reklam Veren", email: "advertiser@demo.local", wallet: 0, currency: "EUR", balance: 340 },
      { username: "admin", password: "123456", role: "admin", name: "Platform Admin", email: "admin@demo.local", wallet: 999, currency: "EUR", balance: 1250 }
    ];
    localStorage.setItem(accountsKey, JSON.stringify(data));
    return data;
  }

  function accounts() { return seedAccounts(); }
  function saveAccounts(items) { localStorage.setItem(accountsKey, JSON.stringify(items)); }
  function session() { try { return JSON.parse(localStorage.getItem(sessionKey) || "null"); } catch (_) { return null; } }
  function setSession(value) { value ? localStorage.setItem(sessionKey, JSON.stringify(value)) : localStorage.removeItem(sessionKey); }
  function currentAccount() { const s = session(); return s ? accounts().find(a => a.username === s.username && a.role === s.role) : null; }

  function basePrefix() {
    if (page === "login") return "../../";
    if (page === "account") return "../";
    if (page === "admin") return "../";
    if (page === "admin-login") return "../../";
    return "";
  }

  function languageSelect() {
    return `<label class="language-control" title="${t("language")}"><span>${t("language")}</span><select id="languageSelect" aria-label="${t("language")}">${languages.map(([code, label]) => `<option value="${code}" ${lang() === code ? "selected" : ""}>${label}</option>`).join("")}</select></label>`;
  }

  function header(active = "") {
    const prefix = basePrefix();
    const s = session();
    const publicSession = s && s.role !== "admin";
    const accountText = publicSession ? `${s.role === "advertiser" ? t("advertiser") : t("visitor")}: ${escapeHtml(s.username)}` : t("account");
    return `
      <header class="classic-header">
        <div class="classic-mainbar">
          <a class="classic-brand" href="${prefix}index.html" aria-label="1HappyEnd"><img src="${prefix}assets/brand/logo.png" alt="1HappyEnd"></a>
          <div class="classic-search">
            <input id="topSearchInput" placeholder="${t("searchPlaceholder")}">
            <select id="topCategorySelect">
              <option value="">${t("allCategories")}</option>
              <option value="Kadın">${t("women")}</option>
              <option value="Erkek">${t("men")}</option>
              <option value="Trans Kadın">${t("transWomen")}</option>
              <option value="Eskort">${t("escort")}</option>
              <option value="Erotik Masaj">${t("eroticMassage")}</option>
              <option value="Sanal Seks">${t("virtualSex")}</option>
              <option value="BDSM">BDSM</option>
            </select>
            <button type="button" id="topSearchBtn">${icons.search}</button>
            <a href="${prefix}zoeken/" id="topFilterToggle">${t("filters")}</a>
          </div>
          <nav class="classic-actions">
            <a href="${prefix}index.html#support" data-support>${icons.support} ${t("support")}</a>
            <a href="${publicSession ? `${prefix}account/` : `${prefix}account/login/`}">${icons.user} ${accountText}</a>
            ${languageSelect()}
          </nav>
        </div>
        <div class="classic-tabs"><nav>
          ${[
            [t("navHome"), ""],
            [t("navWomen"), "Kadın"],
            [t("navMen"), "Erkek"],
            [t("navCouples"), ""],
            [t("navTrans"), "Trans Kadın"],
            [t("navBusiness"), ""],
            [t("navTour"), ""],
            [t("navVideos"), "video"]
          ].map(([label, value], i) => `<a class="${i === 0 ? "active" : ""}" href="${prefix}index.html" ${value ? `data-nav-filter="${value}"` : ""}>${label}</a>`).join("")}
          <a class="webcam" href="#">▮ ${t("webcam")}</a>
        </nav></div>
      </header>
    `;
  }

  function footer() {
    return `
      <footer class="footer classic-footer">
        <div class="footer-grid">
          <section><h4>${t("footerGeneral")}</h4><a href="#">${t("footerAbout")}</a><a href="#">${t("footerSafety")}</a><a href="#">${t("footerAds")}</a><a href="#">${t("footerVerification")}</a></section>
          <section><h4>${t("footerService")}</h4><a href="#support">${t("footerContact")}</a><a href="#support">${t("support")}</a><a href="#">${t("footerReport")}</a></section>
          <section><h4>${t("footerLegal")}</h4><a href="#">${t("footerPrivacy")}</a><a href="#">${t("footerCookie")}</a><a href="#">${t("footerTerms")}</a><a href="#">${t("footerRefund")}</a></section>
          <section><h4>${t("footerCompany")}</h4><a href="#">HappyEnd Media BV</a><a href="#">Demo Business Center</a><a href="#">1017 AB, Amsterdam</a><a href="#">Tel: +31 20 000 0000</a></section>
          <section><h4>${t("footerQuick")}</h4><a href="#">${t("privateReception")}</a><a href="#">${t("escort")}</a><a href="#">${t("eroticMassage")}</a><a href="#">BDSM</a><a href="#">${t("navVideos")}</a></section>
        </div>
        <div class="footer-bottom">
          <span>${t("copyright")}</span>
          <div class="payments"><span class="payment">VISA</span><span class="payment">MC</span><span class="payment">iDEAL</span></div>
        </div>
      </footer>
    `;
  }

  function ageGate() {
    if (localStorage.getItem(ageKey) === "yes") return "";
    return `
      <div class="age-gate legal-gate" id="ageGate">
        <section class="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legalTitle">
            <button class="legal-close" type="button" aria-label="${t("close")}">×</button>
          <div class="legal-lang"><span class="flag-line"></span><select id="legalLanguage">${languages.map(([code, label]) => `<option value="${code}" ${lang() === code ? "selected" : ""}>${label}</option>`).join("")}</select></div>
          <div class="legal-head">
            <h2 id="legalTitle">Belangrijk voordat je begint!</h2>
            <p>1HappyEnd is uitsluitend toegankelijk voor personen van 18 jaar en ouder. Elke bezoeker dient akkoord te gaan met de algemene voorwaarden en het privacybeleid.</p>
          </div>
          <div class="legal-copy">
            <p>Wanneer je alle cookies accepteert, geef je toestemming voor het verzamelen en delen van persoonsgegevens en voor het gebruik van functionele, analytische, marketing- en personalisatiecookies. Analytische cookies gebruiken wij om inzicht te krijgen in hoe bezoekers onze website gebruiken.</p>
            <p>Marketingcookies kunnen worden ingezet om advertenties af te stemmen op je interesses. Voor functionele cookies verzamelen wij gegevens om onze website zo relevant mogelijk te maken voor iedere gebruiker.</p>
            <p>Door gebruik te maken van de website ga je akkoord met de Algemene voorwaarden en Privacybeleid. Je kunt zelf aangeven welke cookies je toestaat.</p>
          </div>
          <div class="legal-checks">
            <p>Voordat je verdergaat, willen we graag het volgende van je weten:</p>
            <label class="legal-switch"><input type="checkbox" id="ageConfirm"><span></span><strong>Ik verklaar 18 jaar of ouder te zijn</strong></label>
            <label class="legal-switch"><input type="checkbox" id="termsConfirm"><span></span><strong>Ik ben akkoord met de <a href="#">Algemene voorwaarden</a> en <a href="#">Privacy policy</a></strong></label>
          </div>
          <div class="legal-actions">
            <button class="legal-btn primary" type="button" data-age-ok>Alles Accepteren</button>
            <button class="legal-btn" type="button" data-essential-ok>Essentieel Accepteren</button>
            <button class="legal-btn" type="button" data-cookie-settings>Cookie instellingen</button>
          </div>
          <div class="legal-settings" id="cookieSettings">
            <label><input type="checkbox" checked disabled> Essentiële cookies</label>
            <label><input type="checkbox"> Analytische cookies</label>
            <label><input type="checkbox"> Marketing cookies</label>
            <label><input type="checkbox"> Personalisatie cookies</label>
          </div>
        </section>
      </div>
    `;
  }

  function accountStrip() {
    const a = currentAccount();
    if (!a || a.role === "admin") {
      return `<section class="wallet-strip"><div><strong>${t("walletReady")}</strong><span>${t("walletGuestText")}</span></div><a class="btn primary small" href="account/login/">${t("loginButton")}</a></section>`;
    }
    const roleLabel = a.role === "advertiser" ? t("advertiser") : t("visitor");
    return `<section class="wallet-strip"><div><strong>${roleLabel} ${t("accountSuffix")}</strong><span>${escapeHtml(a.name)} · ${t("credits")}: ${a.wallet} · ${a.currency} ${t("balanceLabel")}: ${a.balance}</span></div><button class="btn primary small" data-open-wallet>${t("wallet")}</button></section>`;
  }

  function renderCard(item) {
    const photos = item.photos || (item.featured ? 12 : 9);
    const reviews = item.reviews ?? (item.featured ? 1 : 0);
    const lastSeen = item.featured ? t("minuteAgo") : t("minutesAgo");
    const isFav = visFavs().includes(item.id);
    return `
      <article class="card">
        <div class="card-badges">
          <span class="badge verified">${t("verified")}</span>
          ${item.featured ? `<span class="badge premium">${icons.star} ${t("premium")}</span>` : ""}
        </div>
        <div class="card-media ${item.image || "portrait-1"}"></div>
        <div class="card-body">
          <div class="card-title-row"><h3>${escapeHtml(item.name)}</h3><span class="status">${item.available ? t("online") : t("busy")}</span></div>
          <p class="listing-lead">${escapeHtml(item.about)}</p>
          <span class="tag">${icons.star} ${escapeHtml(tv(item.service))}</span>
          <div class="price-row"><strong>€${item.price}</strong><span>${t("or")} ${item.coins || Math.round(item.price / 10)} HE Coin</span></div>
          <div class="meta"><span>${icons.pin} ${escapeHtml(item.city)}</span><span>${icons.card} ${item.age}</span><span>${escapeHtml(tv(item.category))}</span><span>${escapeHtml(tv(item.orientation))}</span></div>
          <div class="listing-signals"><span>${photos} ${t("photosLabel")}</span><span>${reviews} ${t("reviewsLabel")}</span><span>${lastSeen}</span></div>
          <div class="card-actions">
            <button class="btn primary small" data-show-number="${item.id}">${t("showNumber")}</button>
            <button class="btn ghost small" data-detail="${item.id}">Details</button>
            <button class="btn ghost small fav-btn${isFav ? " fav-active" : ""}" data-fav="${item.id}" title="${t("favorite")}">${isFav ? "♥" : "♡"}</button>
          </div>
        </div>
      </article>
    `;
  }

  function homePage() {
    const params = new URLSearchParams(location.search);
    const activeService = params.get("service") || "Tüm Hizmetler";
    root.innerHTML = `
      ${header(activeService)}
      <main class="shell">
        <section class="directory-promo">
          <strong>Probeer nu 1HappyEnd 2.0</strong>
          <span>Nieuwe filters, verified profielen, wallet payments en advertiser dashboard.</span>
          <a href="account/login/?role=advertiser">Adverteren</a>
        </section>
        <section class="commerce-overview">
          <article><span>Active listings</span><strong>12</strong><em>+4 premium</em></article>
          <article><span>Wallet volume</span><strong>€1.8k</strong><em>Mock checkout ready</em></article>
          <article><span>Advertisers</span><strong>38</strong><em>CMS + packages</em></article>
          <article><span>Approval queue</span><strong>6</strong><em>Moderation workflow</em></article>
        </section>
        <section class="market-hero compact-hero directory-summary">
          <div>
            <span class="eyebrow">Benelux marketplace</span>
            <h1>Alle advertenties</h1>
            <p>Doğrulanmış profiller, yakın konum filtresi, detaylı arama ve reklam veren paketleri.</p>
            <div class="hero-actions">
              <a class="btn primary" href="#listings">Bekijk advertenties</a>
              <a class="btn ghost" href="account/login/?role=advertiser">Plaats advertentie</a>
            </div>
            <div class="hero-trust">
              <span>18+ compliance</span>
              <span>Verified profiles</span>
              <span>Wallet ready</span>
              <span>10 languages</span>
            </div>
          </div>
          <div class="hero-metrics">
            <strong>3</strong><span>verified listings</span>
            <strong>10</strong><span>languages</span>
            <strong>3</strong><span>payment modes</span>
          </div>
        </section>
        ${accountStrip()}
        <section class="quality-strip compact-quality">
          <article><strong>Advertiser CMS</strong><span>Profil, vitrin, paket ve ödeme takibi</span></article>
          <article><strong>Visitor Wallet</strong><span>HE Coin, EUR ve USD seçenekleri</span></article>
          <article><strong>Trust Layer</strong><span>18+ uyarı, doğrulama ve şikayet akışı</span></article>
          <article><strong>Localization</strong><span>Popüler Avrupa dilleri hazır</span></article>
        </section>
        <section class="market-layout">
          <aside class="filters" id="filters" aria-label="İlan filtreleri">
            <div class="quick-links-box">
              <h3>${t("quickLinks")}</h3>
              <a href="#" data-quick-filter="Kadın">${t("women")}</a>
              <a href="#" data-quick-filter="Erkek">${t("men")}</a>
              <a href="#" data-quick-filter="Tümü">${t("couples")}</a>
              <a href="#" data-quick-filter="Trans Kadın">${t("transWomen")}</a>
              <a href="#" data-quick-filter="BDSM">BDSM</a>
              <a href="#" data-quick-filter="Sanal Seks">${t("virtualSex")}</a>
              <a href="#">${t("privateReception")}</a>
              <a href="#" data-quick-filter="Eskort">${t("escort")}</a>
              <a href="#" data-quick-filter="Erotik Masaj">${t("eroticMassage")}</a>
              <a href="#">${t("massageSalon")}</a>
            </div>
            <div class="advanced-filter-box">
            <div class="filter-title"><strong>${t("advancedSearch")}</strong><span>${t("filterSub")}</span></div>
            <input class="control" id="searchInput" placeholder="${t("searchInput")}" aria-label="${t("search")}">
            <select class="control" id="countrySelect"><option>${t("countryNetherlands")}</option><option>${t("countryBelgium")}</option><option>${t("countryGermany")}</option></select>
            <select class="control" id="distanceSelect"><option>${t("allDistances")}</option><option>&lt; 5 Km</option><option>&lt; 10 Km</option><option>&lt; 25 Km</option><option>&lt; 50 Km</option></select>
            <select class="control" id="serviceSelect">${services.map(s => `<option value="${escapeHtml(s)}" ${s === activeService ? "selected" : ""}>${escapeHtml(tv(s))}</option>`).join("")}</select>
            <select class="control" id="citySelect">${cities.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(tv(c))}</option>`).join("")}</select>
            <div class="chips" id="categoryChips">${categories.map((c, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-category="${c}">${escapeHtml(tv(c))}</button>`).join("")}</div>
            <div class="he-grid-2" style="gap:8px;margin-bottom:8px">
              <label class="he-label" style="font-size:12px">Min prijs (€)<input class="control" id="priceMin" type="number" min="0" placeholder="0" style="margin-top:4px"></label>
              <label class="he-label" style="font-size:12px">Max prijs (€)<input class="control" id="priceMax" type="number" min="0" placeholder="999" style="margin-top:4px"></label>
            </div>
            <div class="he-grid-2" style="gap:8px;margin-bottom:8px">
              <label class="he-label" style="font-size:12px">Min leeftijd<input class="control" id="ageMin" type="number" min="18" max="99" placeholder="18" style="margin-top:4px"></label>
              <label class="he-label" style="font-size:12px">Max leeftijd<input class="control" id="ageMax" type="number" min="18" max="99" placeholder="99" style="margin-top:4px"></label>
            </div>
            <div class="filter-toggles" id="qualityFilters">
              <button type="button" class="filter-check" id="photoFilter" aria-pressed="false">${t("tenPhotos")}</button>
              <button type="button" class="filter-check" id="videoFilter" aria-pressed="false">${t("withVideo")}</button>
              <button type="button" class="filter-check" id="reviewFilter" aria-pressed="false">${t("withReviews")}</button>
            </div>
            <div class="filter-buttons"><button class="btn primary" id="searchBtn">${icons.search} ${t("search")}</button><button class="btn ghost" id="resetBtn">${icons.close} ${t("reset")}</button><button class="btn ghost small" id="saveSearchBtn" title="Zoekopdracht opslaan">💾</button></div>
            <div class="trust-list"><span>${t("verifiedPhotos")}</span><span>${t("walletReady")}</span><span>${t("advertiserPackages")}</span><span>${t("gdpr")}</span></div>
            </div>
          </aside>
          <section class="market-content">
            <section class="section-head"><div><span class="eyebrow">${t("allAds")}</span><div class="count" id="resultCount"></div></div><div class="view-tools"><button class="btn small ghost" id="sortNewest">${t("newest")}</button><button class="btn small ghost" id="sortNearby">${t("nearby")}</button><button class="btn small ghost" id="onlyAvailable">${t("available")}</button><a class="btn small ghost" href="account/login/">${t("postAd")}</a></div></section>
            <section class="listings" id="listingGrid"></section>
          </section>
          <aside class="side-column">
            <section class="side-panel">
              <h3>${t("trending")}</h3>
              <article class="video-card"><div class="video-thumb portrait-2"><span>▶</span><em>04:26</em></div><strong>${t("premiumVideo")}</strong><small>Happy Studio · 1 dag geleden</small></article>
              <article class="video-card"><div class="video-thumb portrait-3"><span>▶</span><em>00:45</em></div><strong>${t("newVerification")}</strong><small>Demo Team · 7 uren geleden</small></article>
            </section>
            <section class="side-panel">
              <h3>${t("advertiserPanel")}</h3>
              <p>${t("advertiserPanelText")}</p>
              <a class="classic-outline side-cta" href="account/login/">${t("uploadContent")}</a>
            </section>
          </aside>
        </section>
        <section class="package-grid" id="payments">
          <article class="package-card"><span class="pill">${t("visitor")}</span><h3>HE Coin Starter</h3><p>${t("starterText")}</p><strong>100 HE · €89</strong><button class="btn primary small" data-package="starter">${t("choosePackage")}</button></article>
          <article class="package-card"><span class="pill">${t("advertiser")}</span><h3>Vitrin Boost</h3><p>${t("boostText")}</p><strong>${t("thirtyDays")} · €149</strong><button class="btn primary small" data-package="boost">${t("choosePackage")}</button></article>
          <article class="package-card"><span class="pill">Multi Currency</span><h3>EUR / USD / HE Coin</h3><p>${t("paymentText")}</p><strong>${t("mockCheckout")}</strong><button class="btn ghost small" data-open-wallet>${t("pay")}</button></article>
        </section>
        <section class="operations-grid">
          <article>
            <span class="eyebrow">${t("advertiserFlow")}</span>
            <h3>${t("approvalTitle")}</h3>
            <p>${t("approvalText")}</p>
          </article>
          <article>
            <span class="eyebrow">${t("safetyLayer")}</span>
            <h3>${t("directoryTitle")}</h3>
            <p>${t("directoryText")}</p>
          </article>
          <article>
            <span class="eyebrow">${t("revenue")}</span>
            <h3>${t("revenueTitle")}</h3>
            <p>${t("revenueText")}</p>
          </article>
        </section>
        <section class="promo-band">
          <article class="promo dark" id="auctions"><h2>${t("auctionTitle")}</h2><p>${t("auctionText")}</p><a class="btn primary" href="account/login/?role=advertiser">${t("advertiserLogin")}</a></article>
          <article class="promo" id="support"><h3>${t("safetyCenterTitle")}</h3><p>${t("safetyCenterText")}</p><button class="btn ghost" data-support>${t("supportRequest")}</button></article>
        </section>
      </main>
      ${footer()}${ageGate()}<div id="modalHost"></div>
    `;
    bindGlobal();
    bindHome();
  }

  function bindHome() {
    let state = { category: "Tümü", availableOnly: false, sort: "default" };
    const grid = document.getElementById("listingGrid");
    const count = document.getElementById("resultCount");
    const search = document.getElementById("searchInput");
    const service = document.getElementById("serviceSelect");
    const city = document.getElementById("citySelect");
    const photoFilter = document.getElementById("photoFilter");
    const videoFilter = document.getElementById("videoFilter");
    const reviewFilter = document.getElementById("reviewFilter");
    const filters = document.getElementById("filters");
    const topSearch = document.getElementById("topSearchInput");
    const topCategory = document.getElementById("topCategorySelect");
    const isService = value => services.includes(value);
    const isCategory = value => categories.includes(value);
    const isQualityOn = button => button?.getAttribute("aria-pressed") === "true";
    const setQuality = (button, value) => {
      if (!button) return;
      button.setAttribute("aria-pressed", value ? "true" : "false");
      button.classList.toggle("active", Boolean(value));
    };
    const openFilters = () => {
      filters?.classList.add("open");
      if (location.hash !== "#filters") history.replaceState(null, "", `${location.pathname}${location.search}#filters`);
      document.getElementById("filters")?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.innerWidth <= 900) search?.focus({ preventScroll: true });
    };
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      const pMin = Number(document.getElementById("priceMin")?.value) || 0;
      const pMax = Number(document.getElementById("priceMax")?.value) || 9999;
      const aMin = Number(document.getElementById("ageMin")?.value) || 18;
      const aMax = Number(document.getElementById("ageMax")?.value) || 99;
      let data = listings().filter(item => {
        const text = [item.name, item.city, item.service, item.category].join(" ").toLowerCase();
        const photos = item.photos || (item.featured ? 12 : 9);
        const reviews = item.reviews ?? (item.featured ? 1 : 0);
        const hasVideo = item.video ?? item.featured;
        return (!q || text.includes(q)) &&
          (service.value === "Tüm Hizmetler" || item.service === service.value) &&
          (city.value === "Tüm Konumlar" || item.city === city.value) &&
          (state.category === "Tümü" || item.category === state.category) &&
          (!state.availableOnly || item.available) &&
          (!isQualityOn(photoFilter) || photos >= 10) &&
          (!isQualityOn(videoFilter) || hasVideo) &&
          (!isQualityOn(reviewFilter) || reviews > 0) &&
          (item.price >= pMin && item.price <= pMax) &&
          (item.age >= aMin && item.age <= aMax);
      });
      if (state.sort === "newest") data = data.sort((a, b) => (b.featured === a.featured ? b.name.localeCompare(a.name) : Number(b.featured) - Number(a.featured)));
      if (state.sort === "nearby") data = data.sort((a, b) => a.city.localeCompare(b.city));
      count.textContent = `${data.length} ${t("found")}`;
      grid.innerHTML = data.length ? data.map(renderCard).join("") : `<div class="empty">${t("noResults")}</div>`;
    };
    search.addEventListener("input", apply);
    service.addEventListener("change", apply);
    city.addEventListener("change", apply);
    [photoFilter, videoFilter, reviewFilter].forEach(button => button.addEventListener("click", () => { setQuality(button, !isQualityOn(button)); apply(); }));
    document.getElementById("searchBtn").addEventListener("click", apply);
    document.getElementById("resetBtn").addEventListener("click", () => {
      search.value = "";
      if (topSearch) topSearch.value = "";
      if (topCategory) topCategory.value = "";
      service.value = "Tüm Hizmetler";
      city.value = "Tüm Konumlar";
      const pMin = document.getElementById("priceMin"); if (pMin) pMin.value = "";
      const pMax = document.getElementById("priceMax"); if (pMax) pMax.value = "";
      const aMin = document.getElementById("ageMin"); if (aMin) aMin.value = "";
      const aMax = document.getElementById("ageMax"); if (aMax) aMax.value = "";
      [photoFilter, videoFilter, reviewFilter].forEach(button => setQuality(button, false));
      state = { category: "Tümü", availableOnly: false, sort: "default" };
      document.querySelectorAll(".chip").forEach((b, i) => b.classList.toggle("active", i === 0));
      document.querySelectorAll(".view-tools .btn").forEach(btn => btn.classList.remove("primary"));
      apply();
    });
    document.getElementById("saveSearchBtn")?.addEventListener("click", () => {
      const s = session();
      if (!s) { toast("Log eerst in om zoekopdrachten op te slaan."); return; }
      const name = prompt("Naam voor deze zoekopdracht:") || "Zoekopdracht";
      const params = {
        q: search.value.trim(),
        service: service.value,
        city: city.value,
        category: state.category,
        pMin: document.getElementById("priceMin")?.value || "",
        pMax: document.getElementById("priceMax")?.value || "",
        aMin: document.getElementById("ageMin")?.value || "",
        aMax: document.getElementById("ageMax")?.value || "",
      };
      const searches = visSearches();
      searches.unshift({ id: `vs${Date.now()}`, name, params, at: Date.now() });
      saveVisSearches(searches);
      toast(`"${name}" opgeslagen.`);
    });
    document.getElementById("onlyAvailable").addEventListener("click", event => { state.availableOnly = !state.availableOnly; event.currentTarget.classList.toggle("primary", state.availableOnly); apply(); });
    document.getElementById("sortNewest").addEventListener("click", event => { state.sort = state.sort === "newest" ? "default" : "newest"; document.getElementById("sortNearby").classList.remove("primary"); event.currentTarget.classList.toggle("primary", state.sort === "newest"); apply(); });
    document.getElementById("sortNearby").addEventListener("click", event => { state.sort = state.sort === "nearby" ? "default" : "nearby"; document.getElementById("sortNewest").classList.remove("primary"); event.currentTarget.classList.toggle("primary", state.sort === "nearby"); apply(); });
    document.getElementById("categoryChips").addEventListener("click", event => { const btn = event.target.closest("[data-category]"); if (!btn) return; state.category = btn.dataset.category; document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b === btn)); apply(); });
    document.getElementById("topSearchBtn")?.addEventListener("click", () => { search.value = topSearch?.value || ""; openFilters(); apply(); });
    topSearch?.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      search.value = topSearch.value;
      openFilters();
      apply();
    });
    topCategory?.addEventListener("change", event => {
      const value = event.target.value;
      if (!value) {
        service.value = "Tüm Hizmetler";
        state.category = "Tümü";
      } else if (isService(value)) {
        service.value = value;
        state.category = "Tümü";
      } else if (isCategory(value)) {
        service.value = "Tüm Hizmetler";
        state.category = value;
      }
      document.querySelectorAll("#categoryChips .chip").forEach(btn => btn.classList.toggle("active", btn.dataset.category === state.category));
      openFilters();
      apply();
    });
    document.getElementById("topFilterToggle")?.addEventListener("click", event => {
      event.preventDefault();
      if (filters?.classList.contains("open") && window.innerWidth <= 820) {
        filters.classList.remove("open");
        return;
      }
      openFilters();
    });
    document.querySelector(".quick-links-box")?.addEventListener("click", event => {
      const link = event.target.closest("[data-quick-filter]");
      if (!link) return;
      event.preventDefault();
      const value = link.dataset.quickFilter;
      if (isService(value)) {
        service.value = value;
        state.category = "Tümü";
      } else {
        service.value = "Tüm Hizmetler";
        state.category = value;
      }
      document.querySelectorAll("#categoryChips .chip").forEach(btn => btn.classList.toggle("active", btn.dataset.category === state.category));
      apply();
    });
    document.querySelector(".classic-tabs")?.addEventListener("click", event => {
      const link = event.target.closest("[data-nav-filter]");
      if (!link) return;
      event.preventDefault();
      const value = link.dataset.navFilter;
      if (value === "video") {
        setQuality(videoFilter, true);
      } else if (isCategory(value)) {
        service.value = "Tüm Hizmetler";
        state.category = value;
        document.querySelectorAll("#categoryChips .chip").forEach(btn => btn.classList.toggle("active", btn.dataset.category === state.category));
      }
      openFilters();
      apply();
    });
    apply();
    if (location.hash === "#filters") openFilters();
  }

  function showDetail(id) {
    const item = listings().find(x => x.id === id);
    if (!item) return;
    const s = session();
    const messageSection = s && s.role !== "admin" ? `
      <div class="detail-message-box">
        <h3>Stuur een bericht</h3>
        <textarea id="detailMsgBody" placeholder="Schrijf je bericht hier..." rows="3" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;resize:vertical;font-size:14px"></textarea>
        <button class="btn primary small" style="margin-top:8px" data-send-msg="${item.id}">Verstuur bericht</button>
      </div>
    ` : s ? "" : `<p class="subtle" style="font-size:13px;margin-top:8px"><a href="account/login/">Inloggen</a> om een bericht te sturen.</p>`;
    document.getElementById("modalHost").innerHTML = `
      <div class="modal-backdrop" data-modal-close>
        <section class="dialog" onclick="event.stopPropagation()">
          <div class="card-media ${item.image}"></div>
          <div class="dialog-body">
            <div class="card-title-row"><h2>${escapeHtml(item.name)}</h2><span class="status">${item.available ? t("availableStatus") : t("busyStatus")}</span></div>
            <p class="subtle">${escapeHtml(item.about)}</p>
            <div class="meta"><span>${icons.pin} ${escapeHtml(item.city)}</span><span>${icons.star} ${item.rating}</span><span>€${item.price} / ${t("hourLabel")}</span><span>${item.coins || Math.round(item.price / 10)} HE Coin</span></div>
            <div class="checkout-box">
              <label>${t("detailPaymentType")}<select class="control" id="checkoutMethod"><option value="coins">HE Coin</option><option value="EUR">EUR</option><option value="USD">USD</option></select></label>
              <label>${t("privacyLevel")}<select class="control"><option>${t("standardRequest")}</option><option>${t("premiumRequest")}</option></select></label>
            </div>
            ${messageSection}
            <div class="dialog-actions"><button class="btn primary" data-booking="${item.id}">${t("request")}</button><button class="btn ghost" data-modal-close>${t("close")}</button></div>
          </div>
        </section>
      </div>
    `;
    document.querySelector(`[data-send-msg="${id}"]`)?.addEventListener("click", () => {
      const body = document.getElementById("detailMsgBody")?.value.trim();
      if (!body) { toast("Bericht is leeg."); return; }
      const s = session();
      const msgId = `vm${Date.now()}`;
      const msgs = visMessages();
      msgs.unshift({ id: msgId, to: item.id, toName: item.name, from: s.username, body, at: Date.now(), unread: false });
      saveVisMessages(msgs);
      const advMsgs = advMessages();
      advMsgs.unshift({ id: msgId, from: s.username, subject: `Bericht over ${item.name}`, body, at: Date.now(), unread: true, replies: [] });
      saveMessages(advMsgs);
      toast("Bericht verzonden.");
      document.getElementById("modalHost").innerHTML = "";
    });
    bindModalClose();
  }

  function bindModalClose() {
    document.querySelectorAll("[data-modal-close]").forEach(node => {
      node.addEventListener("click", event => {
        event.preventDefault();
        document.getElementById("modalHost").innerHTML = "";
      });
    });
  }

  function showWallet(packageId) {
    const a = currentAccount();
    const title = packageId === "boost" ? t("paymentBoostTitle") : packageId === "starter" ? t("paymentStarterTitle") : t("paymentWalletTitle");
    document.getElementById("modalHost").innerHTML = `
      <div class="modal-backdrop" data-modal-close>
        <section class="dialog" onclick="event.stopPropagation()">
          <div class="dialog-head"><h2>${title}</h2><p>${t("paymentIntro")}</p></div>
          <div class="dialog-body">
            <div class="wallet-summary"><span>${t("accountLabel")}</span><strong>${a ? escapeHtml(a.username) : t("guestLabel")}</strong><span>HE Coin</span><strong>${a ? a.wallet : 0}</strong><span>${t("currencyLabel")}</span><strong>EUR / USD</strong></div>
            <div class="checkout-box">
              <label>${t("packageLabel")}<select class="control" id="walletPackage"><option value="100">100 HE Coin - €89</option><option value="250">250 HE Coin - €199</option><option value="boost">${t("thirtyDays")} Vitrin - €149</option></select></label>
              <label>${t("methodLabel")}<select class="control" id="walletMethod"><option>Visa / Mastercard</option><option>iDEAL</option><option>SEPA</option><option>Crypto manuel onay</option></select></label>
            </div>
            <div class="dialog-actions"><button class="btn primary" data-pay-demo>${t("preparePayment")}</button><button class="btn ghost" data-modal-close>${t("close")}</button></div>
          </div>
        </section>
      </div>
    `;
    bindModalClose();
  }

  function loginPage() {
    const params = new URLSearchParams(location.search);
    const defaultRole = params.get("role") === "advertiser" ? "advertiser" : "visitor";
    root.innerHTML = `
      ${header()}
      <main class="classic-login-page">
        <section class="classic-login-card">
          <div class="account-tabs classic-hidden-tabs" id="roleTabs">
            <button class="chip ${defaultRole === "visitor" ? "active" : ""}" data-role="visitor">${t("visitor")}</button>
            <button class="chip ${defaultRole === "advertiser" ? "active" : ""}" data-role="advertiser">${t("advertiser")}</button>
          </div>
          <div class="account-tabs compact classic-hidden-tabs" id="modeTabs"><button class="chip active" data-mode="login">${t("login")}</button><button class="chip" data-mode="register">${t("register")}</button></div>
          <h1 id="accountTitle">${t("loginTitle")}</h1>
          <p class="classic-login-copy">${t("loginCopy")}</p>
          <p class="classic-demo-note" id="demoHint">${t("demoHint")}</p>
          <form class="classic-form" id="accountForm" action="#" onsubmit="return window.submitAccount(event)">
            <div class="classic-field register-only"><label>Ad Soyad / Firma</label><input id="fullName"></div>
            <div class="classic-field register-only"><label>E-posta</label><input id="email" type="email"></div>
            <div class="classic-field"><label>${t("email")}</label><input id="username" autocomplete="username" required></div>
            <div class="classic-field password-field"><label>${t("password")}</label><input id="password" type="password" autocomplete="current-password" required><span>◉</span></div>
            <label class="classic-check"><input type="checkbox"> <span>${t("remember")}</span></label>
            <label class="classic-check register-only"><input type="checkbox" id="adultConfirm"> <span>${t("adultConfirm")}</span></label>
            <div id="loginMessage"></div>
            <div class="classic-form-actions">
              <a href="#">${t("forgot")}</a>
              <button class="classic-submit" type="button" id="accountSubmit" onclick="return window.submitAccount(event)">${t("loginButton")}</button>
            </div>
          </form>
        </section>
        <aside class="classic-register-panel">
          <h2>${t("noAccount")}</h2>
          <div class="register-choice">
            <strong>${t("visitorSignupTitle")}</strong>
            <p>${t("visitorSignupText")}</p>
            <button class="classic-outline" type="button" data-pick-register="visitor">${t("visitorSignupTitle")}</button>
          </div>
          <div class="register-choice">
            <strong>${t("advertiserSignupTitle")}</strong>
            <p>${t("advertiserSignupText")}</p>
            <button class="classic-outline" type="button" data-pick-register="advertiser">${t("advertiserSignupTitle")}</button>
          </div>
        </aside>
      </main>
      ${footer()}
    `;
    bindGlobal();
    bindAccount(defaultRole);
  }

  function bindAccount(initialRole) {
    let role = initialRole;
    let mode = "login";
    const title = document.getElementById("accountTitle");
    const submit = document.getElementById("accountSubmit");
    const update = () => {
      const roleLabel = role === "advertiser" ? t("advertiser") : t("visitor");
      title.textContent = mode === "login" ? t("loginTitle") : `${roleLabel} ${t("createAccount")}`;
      submit.textContent = mode === "login" ? t("loginButton") : t("registerDone");
      document.querySelectorAll(".register-only").forEach(el => el.style.display = mode === "register" && role !== "admin" ? "" : "none");
    };
    document.getElementById("roleTabs").addEventListener("click", event => { const btn = event.target.closest("[data-role]"); if (!btn) return; role = btn.dataset.role; document.querySelectorAll("[data-role]").forEach(b => b.classList.toggle("active", b === btn)); update(); });
    document.getElementById("modeTabs").addEventListener("click", event => { const btn = event.target.closest("[data-mode]"); if (!btn) return; mode = btn.dataset.mode; document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("active", b === btn)); update(); });
    document.querySelectorAll("[data-pick-register]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(`[data-role="${btn.dataset.pickRegister}"]`).click();
        document.querySelector('[data-mode="register"]').click();
        document.querySelector(".classic-login-card").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    window.submitAccount = async function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const msg = document.getElementById("loginMessage");
      const data = accounts();
      if (mode === "register" && role !== "admin") {
        if (!document.getElementById("adultConfirm").checked) { msg.innerHTML = `<div class="alert">${t("adultError")}</div>`; return; }
        const email = document.getElementById("email").value.trim();
        const name = document.getElementById("fullName").value.trim() || username;
        if (data.some(a => a.username === username)) { msg.innerHTML = `<div class="alert">${t("existsError")}</div>`; return; }
        const r = await window.heSignupApi({ username, email, password, role, name });
        if (!r.ok) { msg.innerHTML = `<div class="alert">${r.error === "exists" ? t("existsError") : "Kayıt başarısız."}</div>`; return; }
        const account = { username, password, role, name, email, wallet: role === "visitor" ? 25 : 0, currency: "EUR", balance: role === "advertiser" ? 100 : 0, emailVerified: !!r.fallback };
        data.push(account); saveAccounts(data);
        if (r.fallback) {
          setSession({ username, role, at: Date.now(), needsSettingsConfirm: true });
          msg.innerHTML = `<div class="alert ok">${t("registerOk")}</div>`;
          setTimeout(() => { location.href = "../"; }, 700);
        } else {
          msg.innerHTML = `<div class="alert ok">Kayıt alındı. <b>${escapeHtml(email)}</b> adresine doğrulama bağlantısı gönderildi.${r.link ? ` <a href="${r.link}" target="_blank">Test linki</a>` : ""}</div>`;
        }
        return;
      }
      const r = await window.heLoginApi(username, password);
      if (r.fallback) {
        const found = data.find(a => (a.username === username || a.email === username) && a.password === password && a.role !== "admin");
        if (!found) { msg.innerHTML = `<div class="alert">${t("loginError")}</div>`; return; }
        setSession({ username: found.username, role: found.role, at: Date.now(), needsSettingsConfirm: false });
        msg.innerHTML = `<div class="alert ok">${t("loginOk")}</div>`;
        setTimeout(() => { location.href = "../"; }, 500);
        return;
      }
      if (r.error) {
        if (r.status === 403) { msg.innerHTML = `<div class="alert">E-postanızı önce doğrulayın.</div>`; return; }
        msg.innerHTML = `<div class="alert">${t("loginError")}</div>`; return;
      }
      if (r.requiresCode) {
        msg.innerHTML = `
          <div class="alert ok">E-postanıza 6 haneli giriş kodu gönderildi${r.devCode ? ` (test kodu: <b>${r.devCode}</b>)` : ""}.</div>
          <label>Giriş kodu</label>
          <input id="loginCodeInput" maxlength="6" inputmode="numeric" placeholder="6 haneli kod" style="letter-spacing:6px;text-align:center;font-size:18px">
          <button type="button" class="classic-submit" id="loginCodeSubmit">Kodu doğrula</button>
        `;
        document.getElementById("loginCodeSubmit").addEventListener("click", async () => {
          const code = document.getElementById("loginCodeInput").value.trim();
          const c = await window.heLoginCodeApi(username, code);
          if (c.error) { msg.insertAdjacentHTML("beforeend", `<div class="alert">${c.error === "expired" ? "Kod süresi dolmuş." : c.error === "wrong-code" ? "Kod hatalı." : "Doğrulama başarısız."}</div>`); return; }
          const acct = data.find(a => a.username === c.user.username || a.email === c.user.email);
          if (acct) { acct.emailVerified = true; saveAccounts(data); }
          setSession({ username: c.user.username, role: c.user.role, at: Date.now(), needsSettingsConfirm: false });
          location.href = "../";
        });
        return;
      }
      if (r.ok) {
        setSession({ username: r.user.username, role: r.user.role, at: Date.now(), needsSettingsConfirm: false });
        msg.innerHTML = `<div class="alert ok">${t("loginOk")}</div>`;
        setTimeout(() => { location.href = "../"; }, 500);
      }
      return false;
    };
    document.getElementById("accountForm").addEventListener("submit", window.submitAccount);
    update();
  }

  function adminLoginPage() {
    root.innerHTML = `
      <main class="classic-login-page admin-login-page">
        <section class="classic-login-card">
          <a class="admin-login-logo" href="../../index.html"><img src="../../assets/brand/logo.png" alt="1HappyEnd"></a>
          <h1>${t("adminLoginTitle")}</h1>
          <p class="classic-login-copy">${t("adminLoginCopy")}</p>
          <p class="classic-demo-note">Demo: admin / 123456</p>
          <form class="classic-form" id="adminLoginForm" action="#" onsubmit="return window.submitAdminLogin(event)">
            <div class="classic-field"><label>${t("email")}</label><input id="adminUsername" autocomplete="username" required></div>
            <div class="classic-field password-field"><label>${t("password")}</label><input id="adminPassword" type="password" autocomplete="current-password" required><span>◉</span></div>
            <div id="adminLoginMessage"></div>
            <div class="classic-form-actions">
              <a href="../../index.html">Siteye dön</a>
              <button class="classic-submit" type="submit">${t("adminLoginButton")}</button>
            </div>
          </form>
        </section>
      </main>
    `;
    window.submitAdminLogin = function (event) {
      event.preventDefault();
      const username = document.getElementById("adminUsername").value.trim();
      const password = document.getElementById("adminPassword").value;
      const found = accounts().find(a => (a.username === username || a.email === username) && a.password === password && a.role === "admin");
      const msg = document.getElementById("adminLoginMessage");
      if (!found) { msg.innerHTML = `<div class="alert">${t("adminError")}</div>`; return false; }
      setSession({ username: found.username, role: "admin", at: Date.now() });
      msg.innerHTML = `<div class="alert ok">${t("loginOk")}</div>`;
      setTimeout(() => { location.href = "../"; }, 500);
      return false;
    };
    document.getElementById("adminLoginForm").addEventListener("submit", window.submitAdminLogin);
  }

  function accountPage() {
    const a = currentAccount();
    if (!a || a.role === "admin") { location.href = "login/"; return; }
    const s = session();
    const isAdvertiser = a.role === "advertiser";
    if (isAdvertiser) { advertiserDashboard(a, s); return; }

    function renderVisitorPage(activeTab) {
      const favIds = visFavs();
      const favListings = listings().filter(x => favIds.includes(x.id));
      const myMessages = visMessages();
      const mySearches = visSearches();

      const favsHtml = favListings.length
        ? favListings.map(item => `
            <article class="settings-card" style="display:flex;gap:12px;align-items:center;padding:12px 16px">
              <div class="card-media ${item.image || "portrait-1"}" style="width:56px;height:56px;border-radius:8px;flex-shrink:0"></div>
              <div style="flex:1;min-width:0">
                <strong style="display:block">${escapeHtml(item.name)}</strong>
                <span style="font-size:13px;color:#666">${escapeHtml(tv(item.service))} · ${escapeHtml(item.city)} · €${item.price}</span>
              </div>
              <button class="btn ghost small" data-vis-unfav="${item.id}" title="Verwijderen">✕</button>
            </article>`).join("")
        : `<p style="color:#888;padding:16px 0">Nog geen favorieten opgeslagen. Klik op ♡ bij een profiel.</p>`;

      const msgsHtml = myMessages.length
        ? myMessages.map(m => `
            <article class="settings-card" style="padding:12px 16px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <strong>Aan: ${escapeHtml(m.toName || m.to)}</strong>
                <em style="font-size:12px;color:#888">${fmtRel(m.at)}</em>
              </div>
              <p style="margin:0;font-size:14px;color:#444">${escapeHtml(m.body)}</p>
              <button class="btn ghost small" data-vis-delmsg="${m.id}" style="margin-top:8px">Verwijderen</button>
            </article>`).join("")
        : `<p style="color:#888;padding:16px 0">Nog geen berichten verstuurd. Open een profiel en klik op "Details" om een bericht te sturen.</p>`;

      const searchesHtml = mySearches.length
        ? mySearches.map(sr => `
            <article class="settings-card" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px">
              <div>
                <strong style="display:block">${escapeHtml(sr.name)}</strong>
                <span style="font-size:12px;color:#888">${[sr.params.service !== "Tüm Hizmetler" && sr.params.service, sr.params.city !== "Tüm Konumlar" && sr.params.city, sr.params.q].filter(Boolean).join(" · ") || "Alle profielen"}</span>
              </div>
              <div style="display:flex;gap:8px">
                <a class="btn primary small" href="../?service=${encodeURIComponent(sr.params.service || "")}">Toepassen</a>
                <button class="btn ghost small" data-vis-delsearch="${sr.id}">✕</button>
              </div>
            </article>`).join("")
        : `<p style="color:#888;padding:16px 0">Nog geen zoekopdrachten opgeslagen. Gebruik de filters op de <a href="../">homepagina</a> en klik op 💾.</p>`;

      const tabs = [
        { key: "favs", label: `♥ Favorieten (${favIds.length})` },
        { key: "msgs", label: `✉ Berichten (${myMessages.length})` },
        { key: "searches", label: `🔍 Zoekopdrachten (${mySearches.length})` },
        { key: "settings", label: "⚙ Instellingen" }
      ];

      root.innerHTML = `
        ${accountVersionBanner()}
        ${header("account")}
        ${s && s.needsSettingsConfirm ? settingsConfirmModal(a) : ""}
        <main class="account-settings-shell">
          <aside class="account-settings-sidebar">
            ${tabs.map(tab => `<a class="${tab.key === activeTab ? "active" : ""}" href="#" data-vis-tab="${tab.key}">${tab.label}</a>`).join("")}
            <button id="memberLogout">Uitloggen</button>
          </aside>
          <section class="account-settings-main">
            ${activeTab === "favs" ? `<h1>Mijn favorieten</h1>${favsHtml}` : ""}
            ${activeTab === "msgs" ? `<h1>Mijn berichten</h1>${msgsHtml}` : ""}
            ${activeTab === "searches" ? `<h1>Opgeslagen zoekopdrachten</h1>${searchesHtml}` : ""}
            ${activeTab === "settings" ? `
              <h1>Instellingen</h1>
              <article class="settings-card">
                <h2>Bijnaam wijzigen</h2>
                <label>Nieuwe bijnaam</label>
                <input id="memberName" value="${escapeHtml(a.name || a.username)}">
                <button class="settings-save" data-demo-save>Wijzigen</button>
              </article>
              <article class="settings-card">
                <h2>Voorkeurstaal</h2>
                <select id="memberLanguage">
                  ${[["nl","Nederlands"],["tr","Türkçe"],["en","English"],["de","Deutsch"],["fr","Français"],["es","Español"]].map(([code,label]) => `<option value="${code}" ${lang() === code ? "selected" : ""}>${label}</option>`).join("")}
                </select>
                <button class="settings-save" id="langSaveBtn" style="margin-top:8px">Opslaan</button>
              </article>
              <article class="settings-card">
                <h2>Berichtenbox instellingen</h2>
                <label class="settings-toggle"><input type="checkbox" checked><span></span><b>Berichtenbox aan</b></label>
                <div class="settings-radios" style="margin-top:12px">
                  <p>E-mail ontvangen:</p>
                  <label><input type="radio" name="msgfreq" checked> Bij ieder nieuw bericht</label>
                  <label><input type="radio" name="msgfreq"> Maximaal 1 keer per dag</label>
                  <label><input type="radio" name="msgfreq"> Geen e-mail</label>
                </div>
                <button class="settings-save" data-demo-save style="margin-top:8px">Opslaan</button>
              </article>
              <article class="settings-card">
                <h2>E-mailadres wijzigen</h2>
                <label>Nieuw e-mailadres</label>
                <input id="memberEmail" type="email" value="${escapeHtml(a.email || "")}">
                <button class="settings-save" data-demo-save>Wijzigen</button>
              </article>
              <article class="settings-card">
                <h2>Wachtwoord wijzigen</h2>
                <label>Oud wachtwoord</label><input type="password" id="oldPw">
                <label>Nieuw wachtwoord</label><input type="password" id="newPw">
                <label>Herhaal nieuw wachtwoord</label><input type="password" id="newPw2">
                <button class="settings-save" id="changePwBtn">Wijzigen</button>
              </article>
              <article class="settings-card danger">
                <h2>Account verwijderen</h2>
                <p style="font-size:13px;color:#888">In de demo wordt dit gesimuleerd.</p>
                <a href="#" data-demo-save>Account verwijderen</a>
              </article>
            ` : ""}
          </section>
        </main>
        ${footer()}
      `;
      bindGlobal();

      document.querySelectorAll("[data-vis-tab]").forEach(el => {
        el.addEventListener("click", e => { e.preventDefault(); renderVisitorPage(el.dataset.visTab); });
      });
      document.getElementById("memberLogout")?.addEventListener("click", () => { setSession(null); location.href = "../index.html"; });

      document.querySelectorAll("[data-vis-unfav]").forEach(el => {
        el.addEventListener("click", () => {
          const favs = visFavs().filter(id => id !== el.dataset.visUnfav);
          saveVisFavs(favs);
          renderVisitorPage("favs");
        });
      });
      document.querySelectorAll("[data-vis-delmsg]").forEach(el => {
        el.addEventListener("click", () => { saveVisMessages(visMessages().filter(m => m.id !== el.dataset.VisDelmsg && m.id !== el.dataset.vissDelmsg)); renderVisitorPage("msgs"); });
      });
      document.querySelectorAll("[data-vis-delsearch]").forEach(el => {
        el.addEventListener("click", () => { saveVisSearches(visSearches().filter(s => s.id !== el.dataset.visDelsearch)); renderVisitorPage("searches"); });
      });
      document.getElementById("langSaveBtn")?.addEventListener("click", () => {
        const val = document.getElementById("memberLanguage")?.value;
        if (val) { localStorage.setItem(languageKey, val); location.reload(); }
      });
      document.getElementById("changePwBtn")?.addEventListener("click", () => {
        const old = document.getElementById("oldPw")?.value;
        const nw = document.getElementById("newPw")?.value;
        const nw2 = document.getElementById("newPw2")?.value;
        if (!old || !nw) { toast("Vul alle velden in."); return; }
        if (nw !== nw2) { toast("Wachtwoorden komen niet overeen."); return; }
        const list = accounts();
        const idx = list.findIndex(x => x.username === a.username && x.role === a.role);
        if (idx < 0 || list[idx].password !== old) { toast("Oud wachtwoord klopt niet."); return; }
        list[idx].password = nw;
        saveAccounts(list);
        toast("Wachtwoord gewijzigd.");
      });
      document.querySelectorAll("[data-demo-save]").forEach(el => el.addEventListener("click", e => {
        e.preventDefault();
        const list = accounts();
        const idx = list.findIndex(x => x.username === a.username && x.role === a.role);
        if (idx >= 0) {
          const name = document.getElementById("memberName")?.value;
          const email = document.getElementById("memberEmail")?.value;
          if (name) list[idx].name = name.trim();
          if (email) list[idx].email = email.trim();
          saveAccounts(list);
        }
        toast("Wijzigingen opgeslagen.");
      }));
      bindMemberDashboard();
    }

    const hash = (location.hash || "").replace(/^#/, "") || "favs";
    const validTabs = ["favs", "msgs", "searches", "settings"];
    renderVisitorPage(validTabs.includes(hash) ? hash : "favs");
  }

  function accountVersionBanner() {
    return `
      <div class="account-version-banner">
        <div class="account-version-inner">
          <span>Terug naar de oude website</span>
          <label><input type="checkbox"><i></i></label>
          <button type="button" data-demo-save>sluiten</button>
        </div>
      </div>
    `;
  }

  function settingsConfirmModal(account) {
    return `
      <div class="settings-confirm-backdrop" id="settingsConfirm">
        <section class="settings-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="settingsConfirmTitle">
          <header>
            <img src="../assets/brand/logo.png" alt="1HappyEnd">
            <span>NL</span>
          </header>
          <div class="settings-confirm-body">
            <h2 id="settingsConfirmTitle">Bevestig je instellingen</h2>
            <p>Je e-mailadres is bevestigd. Controleer nog één keer je 1HappyEnd instellingen zodat je account veilig en correct gebruikt kan worden.</p>
            <p>We gebruiken deze bevestiging voor 18+ toegang, privacykeuzes, meldingen en een betrouwbare communicatie tussen bezoekers en adverteerders.</p>
            <label class="settings-check"><input type="checkbox" id="confirmTerms"><span>Ik ga akkoord met de algemene voorwaarden en het privacybeleid van 1HappyEnd.</span></label>
            <label class="settings-check"><input type="checkbox" id="confirmResponsible"><span>Ik bevestig dat dit mijn eigen account is en dat ik het platform zorgvuldig gebruik.</span></label>
            <div id="settingsConfirmMsg"></div>
          </div>
          <footer>
            <button class="settings-secondary" type="button" data-settings-logout>Annuleren & uitloggen</button>
            <button class="settings-primary" type="button" data-settings-continue>Doorgaan</button>
          </footer>
          <small>© 2026 1HappyEnd Demo · ${escapeHtml(account.username)}</small>
        </section>
      </div>
    `;
  }

  function bindMemberDashboard() {
    document.querySelector(".member-menu")?.addEventListener("click", event => {
      const btn = event.target.closest("[data-member-tab]");
      if (!btn) return;
      document.querySelectorAll("[data-member-tab]").forEach(item => item.classList.toggle("active", item === btn));
      document.querySelectorAll(".member-tab").forEach(item => item.classList.toggle("active", item.id === `tab-${btn.dataset.memberTab}`));
    });
    document.getElementById("memberLogout")?.addEventListener("click", () => { setSession(null); location.href = "../index.html"; });
    document.querySelectorAll("[data-demo-save]").forEach(item => item.addEventListener("click", event => {
      event.preventDefault();
      const a = currentAccount();
      if (a && document.getElementById("memberName")) {
        const data = accounts();
        const idx = data.findIndex(account => account.username === a.username && account.role === a.role);
        if (idx >= 0) {
          data[idx] = {
            ...data[idx],
            name: document.getElementById("memberName")?.value.trim() || data[idx].name,
            email: document.getElementById("memberEmail")?.value.trim() || data[idx].email,
            listingTitle: document.getElementById("memberListingTitle")?.value.trim() || data[idx].listingTitle,
            service: document.getElementById("memberService")?.value || data[idx].service,
            city: document.getElementById("memberCity")?.value || data[idx].city,
            priceLabel: document.getElementById("memberPrice")?.value.trim() || data[idx].priceLabel,
            bio: document.getElementById("memberBio")?.value.trim() || data[idx].bio
          };
          saveAccounts(data);
        }
      }
      toast("Wijzigingen opgeslagen.");
    }));
    document.querySelector("[data-settings-logout]")?.addEventListener("click", () => { setSession(null); location.href = "../index.html"; });
    document.querySelector("[data-settings-continue]")?.addEventListener("click", () => {
      const terms = document.getElementById("confirmTerms");
      const responsible = document.getElementById("confirmResponsible");
      const msg = document.getElementById("settingsConfirmMsg");
      if (!terms?.checked || !responsible?.checked) {
        msg.innerHTML = `<div class="alert">Devam etmek için iki onayı da işaretleyin.</div>`;
        return;
      }
      const s = session();
      setSession({ ...s, needsSettingsConfirm: false, settingsConfirmedAt: Date.now() });
      document.getElementById("settingsConfirm")?.remove();
      toast("Ayarlar onaylandı. Üyelik paneliniz hazır.");
    });
    document.querySelector("[data-demo-upload]")?.addEventListener("click", () => toast("Dosya yükleme akışı demoda hazırlandı."));
    document.getElementById("memberProfileForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const a = currentAccount();
      if (!a) return;
      const data = accounts();
      const idx = data.findIndex(item => item.username === a.username && item.role === a.role);
      if (idx >= 0) {
        data[idx] = {
          ...data[idx],
          name: document.getElementById("memberName")?.value.trim() || data[idx].name,
          email: document.getElementById("memberEmail")?.value.trim() || data[idx].email,
          listingTitle: document.getElementById("memberListingTitle")?.value.trim() || data[idx].listingTitle,
          service: document.getElementById("memberService")?.value || data[idx].service,
          bio: document.getElementById("memberBio")?.value.trim() || data[idx].bio,
          city: document.getElementById("memberCity")?.value || data[idx].city,
          priceLabel: document.getElementById("memberPrice")?.value.trim() || data[idx].priceLabel
        };
        saveAccounts(data);
        toast("Üyelik bilgileri kaydedildi.");
      }
    });
  }

  const advNav = [
    { group: "", items: [["dashboard", "Dashboard", "M3 12 12 4l9 8v8a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z"]] },
    { group: "Beheer", items: [
      ["advertentie", "Advertentie", "M4 5h16v3H4zM4 11h16v3H4zM4 17h10v3H4z"],
      ["fotos", "Foto's", "M4 6h16v12H4zM8 13l3-3 3 3 3-4 2 3v3H6v-2z"],
      ["reviews", "Reviews", "M12 3l2.5 5.5 6 .6-4.5 4 1.4 5.9L12 16l-5.4 3 1.4-5.9-4.5-4 6-.6Z"],
      ["videos", "Video's", "M3 6h13v12H3zM17 9l4-2v10l-4-2z"]
    ]},
    { group: "Promotie", items: [
      ["promotie", "Promotie merkezi", "M4 13l5-5 4 4 7-7v6h-2V8.4l-5 5-4-4-3 3z"],
      ["omhoog", "Üst sıraya çık", "M12 4l6 6h-4v8h-4v-8H6z"],
      ["tegoed", "Kredi satın al", "M3 6h18v12H3zM3 10h18M7 15h4"],
      ["videopromotie", "Video promosyon", "M4 6h12v12H4zM18 9l3-2v10l-3-2z"]
    ]},
    { group: "Hesap", items: [
      ["instellingen", "Ayarlar", "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm9.4 4-2 1.2.2 2.4-2.2 1-1.6 1.8-2.4-.4L12 19.5l-1.4-1.5-2.4.4-1.6-1.8-2.2-1 .2-2.4L2.6 12l2-1.2-.2-2.4 2.2-1L8.2 5.6l2.4.4L12 4.5l1.4 1.5 2.4-.4 1.6 1.8 2.2 1-.2 2.4Z"],
      ["berichten", "Mesajlar", "M3 5h18v12H7l-4 4z"],
      ["meldingen", "Bildirimler", "M12 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6Zm-2 15a2 2 0 0 0 4 0Z"],
      ["facturen", "Faturalar", "M6 3h12v18l-3-2-3 2-3-2-3 2zM8 7h8M8 11h8M8 15h6"],
      ["mutaties", "Bakiye hareketleri", "M4 7h16v3H4zM4 14h16v3H4zM7 10v4M17 10v4"]
    ]}
  ];

  const advViews = ["dashboard","advertentie","fotos","reviews","videos","promotie","omhoog","tegoed","videopromotie","instellingen","berichten","meldingen","facturen","mutaties"];

  function currentAdvView() {
    const raw = (location.hash || "").replace(/^#!?/, "").trim();
    return advViews.includes(raw) ? raw : "advertentie";
  }

  function advSidebar(active) {
    const item = (key, label, d) => `<a href="#!${key}" class="he-side-link${key === active ? " active" : ""}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg><span>${label}</span></a>`;
    return advNav.map(group => `
      ${group.group ? `<div class="he-side-group">${group.group}</div>` : ""}
      <nav class="he-side-nav">${group.items.map(([k, l, d]) => item(k, l, d)).join("")}</nav>
    `).join("") + `<button class="he-side-logout" id="advLogout" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4h7v16h-7M14 12H3m0 0 4-4m-4 4 4 4"/></svg><span>Çıkış</span></button>`;
  }

  function advWizardTabs(step) {
    const labels = ["Advertentie", "Doğrulama", "Promosyon", "Akkoord"];
    return `
      <ol class="he-wizard-tabs">
        ${labels.map((label, i) => `
          <li class="${i + 1 === step ? "active" : i + 1 < step ? "done" : ""}">
            <span class="he-step-num">${i + 1}</span>
            <span class="he-step-label">${label}</span>
          </li>
        `).join("")}
      </ol>
    `;
  }

  function advWizardActions(step, total) {
    const prev = step > 1 ? `<a class="he-btn ghost" href="#!${["advertentie","fotos","promotie","akkoord"][step - 2] || "advertentie"}">Önceki adım</a>` : `<span></span>`;
    const next = step < total
      ? `<button type="submit" class="he-btn primary">Sonraki adım</button>`
      : `<button type="button" class="he-btn primary" data-he-akkoord>Akkoord ver</button>`;
    return `<footer class="he-wizard-actions">${prev}${next}</footer>`;
  }

  function advPanelAdvertentie(a) {
    const services = ["Eskort", "Erotik Masaj", "BDSM", "Sanal Seks", "Webcam", "Çift", "Vitrin"];
    const extras = [
      "El işi", "Oral", "Derin oral", "GFE", "İkili gangbang", "Tek gangbang", "Anal", "Rim", "Striptiz", "Domina",
      "Submissive", "Fetish", "Roleplay", "Toy", "Foot", "Couple show", "Karşılıklı oral", "Kaykay", "Lingerie", "Outcall",
      "Incall", "Otel ziyareti", "Akşam yemeği", "Travel companion", "Webcam show", "Photo set", "Video custom"
    ];
    const cities = ["Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Groningen", "Alkmaar", "Tilburg", "Almere", "Arnhem"];
    const days = [["Pzt", "mon"], ["Sal", "tue"], ["Çar", "wed"], ["Per", "thu"], ["Cum", "fri"], ["Cmt", "sat"], ["Paz", "sun"]];
    const times = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
    return `
      <form class="he-form" id="advAdvertentieForm">
        ${advWizardTabs(1)}
        <section class="he-card">
          <h2 class="he-title-red">İlan kategorisi</h2>
          <div class="he-tip">İlanınız aşağıda seçtiğiniz kategorilerde listelenir. En fazla 3 kategori önerilir.</div>
          <div class="he-checkgrid">
            ${services.map((svc, i) => `<label class="he-check"><input type="checkbox" name="advCategory" value="${escapeHtml(svc)}" ${i < 2 ? "checked" : ""}><span>${svc}</span></label>`).join("")}
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">İlan adı ve açıklama</h2>
          <label class="he-label">İlan adı <small>maksimum 25 karakter</small></label>
          <input class="he-input" id="advName" maxlength="25" value="${escapeHtml(a.listingTitle || "1HappyEnd Premium")}" placeholder="Örn. Luna Premium">
          <label class="he-label">İlan başlığı</label>
          <input class="he-input" id="advHeadline" maxlength="60" value="${escapeHtml(a.headline || "Doğrulanmış profil · 18+ uyumlu")}">
          <label class="he-label">Açıklama</label>
          <textarea class="he-textarea" id="advAbout" rows="6" placeholder="Profilinizi tanıtın...">${escapeHtml(a.bio || "Sakin, güvenli ve özenli randevu deneyimi. Doğrulanmış profil, net fiyat bilgisi ve hızlı iletişim.")}</textarea>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Çalışma saatleri</h2>
          <div class="he-hours">
            ${days.map(([label, key]) => `
              <div class="he-hours-row">
                <span class="he-hours-day">${label}</span>
                <select class="he-input" data-day="${key}-from">${times.map(t => `<option ${t === "10:00" ? "selected" : ""}>${t}</option>`).join("")}</select>
                <span class="he-hours-sep">—</span>
                <select class="he-input" data-day="${key}-to">${times.map(t => `<option ${t === "22:00" ? "selected" : ""}>${t}</option>`).join("")}</select>
                <label class="he-check inline"><input type="checkbox" data-day-allday="${key}"><span>24 saat</span></label>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Tarifeler</h2>
          <div class="he-prices">
            ${[["30 dk", 90], ["1 saat", 180], ["2 saat", 320], ["Gece", 900], ["Outcall ek", 50]].map(([label, value], i) => `
              <label class="he-price">
                <span>${label}</span>
                <div class="he-price-input"><em>€</em><input class="he-input" type="number" value="${value}" data-price="${i}"></div>
              </label>
            `).join("")}
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Ek hizmetler</h2>
          <div class="he-tip">Sunduğunuz ek hizmetleri seçin. İsterseniz her biri için ek ücret belirleyin.</div>
          <div class="he-extras">
            ${extras.map((ex, i) => `
              <div class="he-extra-row">
                <label class="he-check"><input type="checkbox" data-extra="${i}"><span>${ex}</span></label>
                <div class="he-extra-charge"><em>€</em><input class="he-input small" type="number" placeholder="Ek" data-extra-charge="${i}"></div>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">İletişim bilgileri</h2>
          <div class="he-grid-2">
            <label class="he-label">Ülke kodu
              <select class="he-input"><option>+31 (NL)</option><option>+32 (BE)</option><option>+49 (DE)</option><option>+90 (TR)</option></select>
            </label>
            <label class="he-label">Posta kodu
              <input class="he-input" placeholder="1012 AB">
            </label>
            <label class="he-label">Şehir
              <select class="he-input">${cities.map(c => `<option ${c === a.city ? "selected" : ""}>${c}</option>`).join("")}</select>
            </label>
            <label class="he-label">Adres notu (opsiyonel)
              <input class="he-input" placeholder="Sadece doğrulanmış üyelere gösterilir">
            </label>
          </div>
          <h3 class="he-subtitle">İletişim yöntemleri</h3>
          <div class="he-contact-row">
            ${[["Telefon", "phoneCall"], ["WhatsApp", "whatsapp"], ["Signal", "signal"], ["Telegram", "telegram"], ["SMS", "sms"], ["1HappyEnd mesajı", "heMessage"]].map(([label, key], i) => `
              <label class="he-toggle">
                <input type="checkbox" data-contact="${key}" ${i < 2 ? "checked" : ""}>
                <span class="he-toggle-track"></span>
                <span class="he-toggle-label">${label}</span>
              </label>
            `).join("")}
          </div>
          <h3 class="he-subtitle">E-posta bildirim sıklığı</h3>
          <div class="he-radios">
            <label><input type="radio" name="advFreq" checked> Her yeni mesajda</label>
            <label><input type="radio" name="advFreq"> Günde en fazla 1 kere</label>
            <label><input type="radio" name="advFreq"> Haftada en fazla 1 kere</label>
            <label><input type="radio" name="advFreq"> Hiç gönderme</label>
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Kişisel bilgiler</h2>
          <div class="he-grid-2">
            <fieldset class="he-fieldset">
              <legend>Cinsiyet</legend>
              ${["Kadın", "Erkek", "Çift", "Trans Kadın"].map((v, i) => `<label class="he-check inline"><input type="radio" name="advGender" ${i === 0 ? "checked" : ""}><span>${v}</span></label>`).join("")}
            </fieldset>
            <fieldset class="he-fieldset">
              <legend>Yönelim</legend>
              ${["Heteroseksüel", "Biseksüel", "Lezbiyen", "Queer"].map((v, i) => `<label class="he-check inline"><input type="radio" name="advOri" ${i === 0 ? "checked" : ""}><span>${v}</span></label>`).join("")}
            </fieldset>
            <label class="he-label">Doğum tarihi
              <div class="he-date">
                <select class="he-input">${Array.from({length:31},(_,i)=>`<option>${i+1}</option>`).join("")}</select>
                <select class="he-input">${["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"].map((m,i)=>`<option value="${i+1}">${m}</option>`).join("")}</select>
                <select class="he-input">${Array.from({length:60},(_,i)=>2007-i).map(y=>`<option>${y}</option>`).join("")}</select>
              </div>
            </label>
            <label class="he-label">Etnik köken
              <select class="he-input"><option>Avrupalı</option><option>Akdeniz</option><option>Latin</option><option>Asyalı</option><option>Afrikalı</option><option>Karışık</option></select>
            </label>
            <label class="he-label">Konuşulan diller
              <div class="he-langs">
                ${["NL","EN","DE","TR","ES","FR"].map((l,i) => `<label class="he-check inline"><input type="checkbox" ${i<2?"checked":""}><span>${l}</span></label>`).join("")}
              </div>
            </label>
            <label class="he-label">Vücut tipi
              <select class="he-input"><option>Atletik</option><option>İnce</option><option>Kıvrımlı</option><option>BBW</option><option>Kaslı</option></select>
            </label>
            <label class="he-label">Saç rengi
              <select class="he-input"><option>Sarı</option><option>Kahverengi</option><option>Siyah</option><option>Kızıl</option><option>Renkli</option></select>
            </label>
            <label class="he-label">Boy (cm)
              <input class="he-input" type="number" value="170">
            </label>
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Fotoğraflar</h2>
          <div class="he-tip">JPG/PNG, max 6 MB. En az 3 fotoğraf öneriyoruz. Yüz fotoğrafı verifiye rozeti getirir.</div>
          <div class="he-photo-grid">
            <button type="button" class="he-photo-add" data-demo-upload>
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              <span>Fotoğraf ekle</span>
            </button>
            <div class="he-photo-slot demo">portrait-1.jpg</div>
            <div class="he-photo-slot demo">portrait-2.jpg</div>
            <div class="he-photo-slot empty">Boş</div>
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">İlan önizlemesi</h2>
          <label class="he-label">Promosyon etiketi <small>maks 15 karakter</small></label>
          <input class="he-input" id="advPromoSticker" maxlength="15" placeholder="Yeni · Verified">
          <article class="he-preview-card">
            <div class="he-preview-photo">${escapeHtml((a.name || a.username || "L").charAt(0).toUpperCase())}</div>
            <div class="he-preview-body">
              <header>
                <strong id="advPrevName">${escapeHtml(a.listingTitle || "1HappyEnd Premium")}</strong>
                <span class="he-pill">Verified</span>
              </header>
              <p class="he-preview-meta">${escapeHtml(a.city || "Amsterdam")} · 28 yaş · Kadın</p>
              <p class="he-preview-text" id="advPrevText">${escapeHtml(a.bio || "Sakin, güvenli ve özenli randevu deneyimi.")}</p>
              <footer>
                <span>📷 4 foto</span><span>★ 4.8</span>
                <button type="button" class="he-btn ghost small">Hemen ara</button>
              </footer>
            </div>
          </article>
        </section>

        ${advWizardActions(1, 4)}
      </form>
    `;
  }

  function advPanelValidatie(a) {
    const countries = ["Hollanda", "Belçika", "Almanya", "Fransa", "İspanya", "İtalya", "Türkiye", "Polonya", "Romanya", "Bulgaristan"];
    return `
      <form class="he-form" id="advValidatieForm">
        ${advWizardTabs(2)}

        <section class="he-card">
          <h2 class="he-title-red">Numara doğrulama</h2>
          <p class="he-text">Telefonunuza gelecek SMS kodunu girerek numaranızı doğrulayın. Bu adım admin onayı için zorunludur.</p>
          <div class="he-grid-2">
            <label class="he-label">Ülke kodu
              <select class="he-input"><option>+31 (NL)</option><option>+32 (BE)</option><option>+49 (DE)</option><option>+90 (TR)</option></select>
            </label>
            <label class="he-label">Telefon numarası
              <input class="he-input" id="advPhone" placeholder="6 12 34 56 78">
            </label>
          </div>
          <button type="button" class="he-btn outline" data-demo-save>SMS kodu gönder</button>
          <label class="he-label">SMS kodu
            <input class="he-input" placeholder="6 haneli kod" maxlength="6">
          </label>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Kimlik & yaş doğrulama</h2>
          <p class="he-text">Aşağıdaki bilgilere göre size özel bir doğrulama listesi (kimlik, çalışma izni vb.) hazırlanır. Bu adımda mobil cihaz tavsiye edilir.</p>
          <div class="he-grid-2">
            <label class="he-label">Uyruk
              <select class="he-input">${countries.map(c => `<option>${c}</option>`).join("")}</select>
            </label>
            <label class="he-label">Doğum tarihi
              <div class="he-date">
                <select class="he-input">${Array.from({length:31},(_,i)=>`<option>${i+1}</option>`).join("")}</select>
                <select class="he-input">${["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"].map((m,i)=>`<option value="${i+1}">${m}</option>`).join("")}</select>
                <select class="he-input">${Array.from({length:80},(_,i)=>2007-i).map(y=>`<option>${y}</option>`).join("")}</select>
              </div>
            </label>
          </div>
          <ul class="he-checklist">
            <li><span class="he-dot"></span> 18+ yaş beyanı</li>
            <li><span class="he-dot"></span> Kimlik fotoğrafı (ön/arka)</li>
            <li><span class="he-dot"></span> Selfie + tarihli kâğıt</li>
            <li><span class="he-dot subtle"></span> Çalışma izni (gerekiyorsa)</li>
          </ul>
          <div class="he-photo-grid">
            <button type="button" class="he-photo-add" data-demo-upload>
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              <span>Kimlik yükle</span>
            </button>
            <button type="button" class="he-photo-add" data-demo-upload>
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              <span>Selfie yükle</span>
            </button>
          </div>
        </section>

        ${advWizardActions(2, 4)}
      </form>
    `;
  }

  function advPanelPromotie() {
    const packages = [
      { id: "top", title: "Üst sıraya çık", price: "€19", period: "24 saat", desc: "İlanınız 24 saat boyunca kategori sayfasının en üstünde sabitlenir.", badge: "Popüler" },
      { id: "premium", title: "Premium vitrin", price: "€149", period: "30 gün", desc: "Anasayfada vitrin kartı, premium rozet ve öncelikli arama.", badge: "Vitrin" },
      { id: "videopromo", title: "Video promosyon", price: "€59", period: "7 gün", desc: "Profil videonuz video promo akışında oynatılır.", badge: "Video" },
      { id: "credits", title: "Kredi paketi", price: "€89", period: "100 kredi", desc: "Üst sıraya çık ve mesaj kredilerinde kullanılabilir bakiye.", badge: "Bakiye" }
    ];
    return `
      <div class="he-form">
        ${advWizardTabs(3)}

        <section class="he-card">
          <h2 class="he-title-red">Promosyon paketi seç</h2>
          <p class="he-text">İlanınızın görünürlüğünü artırmak için bir paket seçin. Birden fazla paket sepete eklenebilir.</p>
          <div class="he-package-grid">
            ${packages.map(p => `
              <article class="he-package">
                <span class="he-pill">${p.badge}</span>
                <h3>${p.title}</h3>
                <strong>${p.price} <em>· ${p.period}</em></strong>
                <p>${p.desc}</p>
                <button type="button" class="he-btn outline" data-add-cart="${p.id}|${p.title}|${p.price}">Sepete ekle</button>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Sepet</h2>
          <div id="advCartList" class="he-cart">
            <div class="he-cart-empty">Sepetiniz boş.</div>
          </div>
          <div class="he-cart-total" id="advCartTotal">Toplam: €0</div>
        </section>

        <footer class="he-wizard-actions">
          <a class="he-btn ghost" href="#!fotos">Önceki adım</a>
          <a class="he-btn primary" href="#!akkoord">Sonraki adım</a>
        </footer>
      </div>
    `;
  }

  function advPanelAkkoord() {
    return `
      <div class="he-form">
        ${advWizardTabs(4)}

        <section class="he-card">
          <h2 class="he-title-red">Akkoord & ödeme</h2>
          <p class="he-text">Aşağıdaki sepeti onaylayarak paketleri etkinleştirin. Ödeme demo akışında simüle edilir; canlıda Stripe / iDEAL / kart sağlayıcıya yönlendirilir.</p>
          <div id="advCartListAkkoord" class="he-cart">
            <div class="he-cart-empty">Sepetiniz boş. <a href="#!promotie">Promosyon paketi seçin →</a></div>
          </div>
          <div class="he-cart-total" id="advCartTotalAkkoord">Toplam: €0</div>
        </section>

        <section class="he-card">
          <h2 class="he-title-red">Onaylar</h2>
          <label class="he-check"><input type="checkbox" id="advAkkoordTerms"><span>Genel hüküm ve koşulları okudum, kabul ediyorum.</span></label>
          <label class="he-check"><input type="checkbox" id="advAkkoordAge"><span>18+ yaşında olduğumu ve gerçek bilgilerimi girdiğimi beyan ediyorum.</span></label>
          <label class="he-check"><input type="checkbox" id="advAkkoordRefund"><span>Geri ödeme politikasını okudum.</span></label>
        </section>

        <footer class="he-wizard-actions">
          <a class="he-btn ghost" href="#!promotie">Önceki adım</a>
          <button type="button" class="he-btn primary" data-he-akkoord>Akkoord ver & ödemeye geç</button>
        </footer>
      </div>
    `;
  }

  function advPanelDashboard(a) {
    return `
      <div class="he-form">
        <section class="he-card he-hero">
          <div>
            <span class="he-eyebrow">1HappyEnd reklam veren paneli</span>
            <h1>Hoş geldin, ${escapeHtml(a.name || a.username)}</h1>
            <p class="he-text">İlanınızı, doğrulamanızı, promosyon paketlerinizi ve mesajlarınızı buradan yönetebilirsiniz.</p>
          </div>
          <a class="he-btn primary" href="#!advertentie">İlanı düzenle</a>
        </section>
        <div class="he-stats">
          <article><span>Bakiye</span><strong>€${a.balance || 100}</strong></article>
          <article><span>HE Coin</span><strong>${a.wallet || 0}</strong></article>
          <article><span>Profil durumu</span><strong>Concept · admin onayı</strong></article>
          <article><span>Bu ay görüntüleme</span><strong>1.284</strong></article>
          <article><span>Yeni mesaj</span><strong>3</strong></article>
          <article><span>Aktif paket</span><strong>Basis</strong></article>
        </div>
        <section class="he-card">
          <h2 class="he-title-red">Yayın hazırlığı kontrol listesi</h2>
          <ul class="he-checklist">
            <li><span class="he-dot done"></span> İlan formu dolduruldu <a href="#!advertentie">Düzenle</a></li>
            <li><span class="he-dot"></span> Numara doğrulama tamamlanmadı <a href="#!doğrulama" class="muted">Devam et</a></li>
            <li><span class="he-dot"></span> Promosyon paketi seçilmedi <a href="#!promotie">Paketleri gör</a></li>
            <li><span class="he-dot subtle"></span> Akkoord onayı bekliyor</li>
          </ul>
        </section>
      </div>
    `;
  }

  function advPanelFotos() {
    const photos = advPhotos();
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Fotoğraf yönetimi</h2>
          <p class="he-text">Profil galerinize 20 fotoğrafa kadar yükleyebilirsiniz. Yüz fotoğrafı içeren profillere verifiye rozeti uygulanır.</p>
          <input type="file" id="advPhotoInput" accept="image/*" multiple style="display:none">
          <div class="he-photo-grid">
            <button type="button" class="he-photo-add" id="advPhotoAdd"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span>Yeni fotoğraf</span></button>
            ${photos.map((p, i) => p.startsWith("data:")
              ? `<div class="he-photo-slot uploaded" style="background-image:url('${p}')"><button type="button" data-photo-remove="${i}" class="he-photo-x">×</button></div>`
              : `<div class="he-photo-slot demo">${escapeHtml(p)}<button type="button" data-photo-remove="${i}" class="he-photo-x">×</button></div>`).join("")}
          </div>
        </section>
      </div>
    `;
  }

  function advPanelReviews() {
    const reviews = advReviews();
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Yorumlar</h2>
          <p class="he-text">Üye yorumlarını burada görüntüler ve yanıtlayabilirsiniz. Şikayet varsa bayrak butonu ile destek hattına iletin.</p>
          <div class="he-reviews">
            ${reviews.length ? reviews.map(r => `
              <article class="he-review${r.flagged ? " flagged" : ""}" data-review-id="${r.id}">
                <header>
                  <strong>${escapeHtml(r.user)}</strong>
                  <span class="he-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
                  <em>${fmtRel(r.at)}</em>
                </header>
                <p>${escapeHtml(r.text)}</p>
                ${r.reply ? `<div class="he-review-reply"><strong>Yanıtınız:</strong> ${escapeHtml(r.reply)}</div>` : ""}
                <footer>
                  <button type="button" class="he-btn ghost small" data-review-reply="${r.id}">Yanıtla</button>
                  <button type="button" class="he-btn ghost small" data-review-flag="${r.id}">${r.flagged ? "Bayrak kaldır" : "Bayrakla"}</button>
                  <button type="button" class="he-btn ghost small" data-review-remove="${r.id}">Sil</button>
                </footer>
              </article>
            `).join("") : `<div class="he-cart-empty">Henüz yorum yok.</div>`}
          </div>
        </section>
      </div>
    `;
  }

  function advPanelVideos() {
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Videolar</h2>
          <p class="he-text">Premium ilan paketlerinde profil video oynatma akışı açıktır. Maksimum 60 saniye, 50 MB.</p>
          <div class="he-photo-grid">
            <button type="button" class="he-photo-add" data-demo-upload><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span>Video yükle</span></button>
            <div class="he-photo-slot demo">profil-intro.mp4</div>
          </div>
          <p class="he-text muted">Premium / Video promosyon paketi olmadan videolar liste sayfalarında oynatılmaz.</p>
        </section>
      </div>
    `;
  }

  function advPanelOmhoog() {
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Üst sıraya çık</h2>
          <p class="he-text">İlanınızı seçtiğiniz kategori listesinin en üstüne 24 saatliğine sabitleyin.</p>
          <div class="he-grid-2">
            <label class="he-label">Kategori
              <select class="he-input"><option>Eskort</option><option>Erotik Masaj</option><option>BDSM</option></select>
            </label>
            <label class="he-label">Süre
              <select class="he-input"><option>24 saat (€19)</option><option>3 gün (€49)</option><option>7 gün (€99)</option></select>
            </label>
          </div>
          <button type="button" class="he-btn primary" data-add-cart="omhoog|Üst sıra · 24 saat|€19">Sepete ekle</button>
        </section>
      </div>
    `;
  }

  function advPanelTegoed() {
    const packs = [["100 kredi", "€89"], ["250 kredi", "€199"], ["500 kredi", "€349"], ["1000 kredi", "€599"]];
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Kredi satın al</h2>
          <p class="he-text">Krediler üst sıraya çıkma, mesaj ve video promosyon adımlarında kullanılabilir.</p>
          <div class="he-package-grid">
            ${packs.map(([title, price]) => `
              <article class="he-package">
                <h3>${title}</h3>
                <strong>${price}</strong>
                <button type="button" class="he-btn outline" data-add-cart="kredi|${title}|${price}">Sepete ekle</button>
              </article>
            `).join("")}
          </div>
        </section>
      </div>
    `;
  }

  function advPanelVideoPromo() {
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Video promosyon</h2>
          <p class="he-text">Profil videonuz, anasayfada video promosyon akışında 7 gün boyunca oynatılır.</p>
          <div class="he-grid-2">
            <label class="he-label">Video seç
              <select class="he-input"><option>profil-intro.mp4</option></select>
            </label>
            <label class="he-label">Süre
              <select class="he-input"><option>7 gün (€59)</option><option>14 gün (€99)</option><option>30 gün (€179)</option></select>
            </label>
          </div>
          <button type="button" class="he-btn primary" data-add-cart="videopromo|Video promo · 7 gün|€59">Sepete ekle</button>
        </section>
      </div>
    `;
  }

  function advPanelInstellingen(a) {
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Hesap ayarları</h2>
          <label class="he-label">Görünen ad
            <input class="he-input" id="memberName" value="${escapeHtml(a.name || a.username)}">
          </label>
          <label class="he-label">E-posta
            <input class="he-input" id="memberEmail" type="email" value="${escapeHtml(a.email || "")}">
          </label>
          <label class="he-label">Tercih edilen dil
            <select class="he-input"><option>NL</option><option>TR</option><option>EN</option><option>DE</option></select>
          </label>
          <button type="button" class="he-btn primary" data-demo-save>Değişiklikleri kaydet</button>
        </section>
        <section class="he-card">
          <h2 class="he-title-red">Şifre</h2>
          <label class="he-label">Mevcut şifre <input class="he-input" type="password"></label>
          <label class="he-label">Yeni şifre <input class="he-input" type="password"></label>
          <label class="he-label">Yeni şifre (tekrar) <input class="he-input" type="password"></label>
          <button type="button" class="he-btn primary" data-demo-save>Şifreyi değiştir</button>
        </section>
        <section class="he-card danger">
          <h2 class="he-title-red">Hesabı sil</h2>
          <p class="he-text">Demo akışında hesap silme yalnızca akış olarak gösterilir.</p>
          <button type="button" class="he-btn outline" data-demo-save>Hesabımı sil</button>
        </section>
      </div>
    `;
  }

  function advPanelBerichten() {
    const msgs = advMessages();
    const totalUnread = msgs.filter(m => m.unread).length;
    return `
      <div class="he-form">
        <section class="he-card no-pad">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px 6px">
            <h2 class="he-title-red" style="margin:0">Mesajlar ${totalUnread ? `<span class="he-badge ok" style="background:#df2f45;color:#fff">${totalUnread} yeni</span>` : ""}</h2>
            <button type="button" class="he-btn ghost small" data-msg-mark-read>Tümünü okundu işaretle</button>
          </div>
          <div class="he-msg-list" id="advMsgList">
            ${msgs.length ? msgs.map(m => `
              <article class="he-msg ${m.unread ? "unread" : ""}" data-msg-id="${m.id}">
                <strong>${escapeHtml(m.from)}</strong>
                <span>${escapeHtml(m.subject)}</span>
                <em>${fmtRel(m.at)}</em>
                <div class="he-msg-body">
                  <p>${escapeHtml(m.body)}</p>
                  ${m.replies && m.replies.length ? `<ul class="he-msg-replies">${m.replies.map(r => `<li><strong>Siz:</strong> ${escapeHtml(r.text)} <em>${fmtRel(r.at)}</em></li>`).join("")}</ul>` : ""}
                  <div class="he-msg-actions">
                    <input type="text" class="he-input" data-msg-input="${m.id}" placeholder="Yanıt yazın...">
                    <button type="button" class="he-btn primary small" data-msg-reply="${m.id}">Gönder</button>
                    <button type="button" class="he-btn ghost small" data-msg-remove="${m.id}">Sil</button>
                  </div>
                </div>
              </article>
            `).join("") : `<div class="he-cart-empty" style="padding:24px">Henüz mesaj yok.</div>`}
          </div>
        </section>
      </div>
    `;
  }

  function advPanelMeldingen() {
    const items = advNotifications();
    return `
      <div class="he-form">
        <section class="he-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h2 class="he-title-red" style="margin:0">Bildirimler</h2>
            <div style="display:flex;gap:8px">
              <button type="button" class="he-btn ghost small" data-noti-read-all>Tümünü okundu işaretle</button>
              <button type="button" class="he-btn ghost small" data-noti-clear>Tümünü temizle</button>
            </div>
          </div>
          <ul class="he-noti">
            ${items.length ? items.map(n => `
              <li class="${n.read ? "" : "unread"}" data-noti-id="${n.id}">
                <strong>${escapeHtml(n.title)}</strong> · ${escapeHtml(n.text)} · ${fmtRel(n.at)}
                <button type="button" class="he-noti-x" data-noti-remove="${n.id}" title="Sil">×</button>
              </li>
            `).join("") : `<li class="he-cart-empty">Bildirim yok.</li>`}
          </ul>
        </section>
      </div>
    `;
  }

  function advPanelFacturen() {
    const inv = advInvoices();
    return `
      <div class="he-form">
        <section class="he-card">
          <h2 class="he-title-red">Faturalar</h2>
          <table class="he-table">
            <thead><tr><th>No</th><th>Tarih</th><th>Açıklama</th><th>Tutar</th><th>Durum</th><th></th></tr></thead>
            <tbody>
              ${inv.length ? inv.map(r => `<tr>
                <td>${escapeHtml(r.id)}</td>
                <td>${fmtDate(new Date(r.date).getTime())}</td>
                <td>${escapeHtml(r.desc)}</td>
                <td>€${Number(r.amount).toFixed(2).replace(".", ",")}</td>
                <td><span class="he-badge ok">${escapeHtml(r.status)}</span></td>
                <td><button type="button" class="he-link-btn" data-invoice-pdf="${escapeHtml(r.id)}">PDF indir</button></td>
              </tr>`).join("") : `<tr><td colspan="6" style="text-align:center;color:#888;padding:20px">Henüz faturanız yok. <a href="#!promotie" style="color:#df2f45;font-weight:700">Paket satın alın →</a></td></tr>`}
            </tbody>
          </table>
        </section>
      </div>
    `;
  }

  function advPanelMutaties() {
    const rows = advMutations();
    const balance = rows.reduce((sum, r) => sum + Number(r.delta || 0), 0);
    return `
      <div class="he-form">
        <section class="he-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h2 class="he-title-red" style="margin:0">Bakiye hareketleri</h2>
            <strong style="font-size:18px">Güncel bakiye: ${balance} kredi</strong>
          </div>
          <table class="he-table">
            <thead><tr><th>Hareket</th><th>Açıklama</th><th>Tarih</th></tr></thead>
            <tbody>
              ${rows.length ? rows.map(r => `<tr class="${r.sign === '+' ? 'pos' : 'neg'}">
                <td>${r.sign}${Math.abs(r.delta)} kredi</td>
                <td>${escapeHtml(r.text)}</td>
                <td>${fmtDate(new Date(r.at).getTime())}</td>
              </tr>`).join("") : `<tr><td colspan="3" style="text-align:center;color:#888;padding:20px">Hareket yok.</td></tr>`}
            </tbody>
          </table>
        </section>
      </div>
    `;
  }

  function generateInvoicePdf(invoiceId) {
    const inv = advInvoices().find(x => x.id === invoiceId);
    if (!inv) { toast("Fatura bulunamadı."); return; }
    const a = currentAccount() || {};
    const lib = window.jspdf || window.jsPDF;
    if (!lib) { toast("PDF kütüphanesi yükleniyor, lütfen tekrar deneyin."); return; }
    const { jsPDF } = lib;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    doc.setFillColor(223, 47, 69);
    doc.rect(0, 0, w, 80, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("1HappyEnd", 40, 50);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Reklam veren faturasi", 40, 68);
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`Fatura no: ${inv.id}`, 40, 120);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Tarih: ${inv.date}`, 40, 140);
    doc.text(`Musteri: ${(a.name || a.username || "Demo Reklam Veren").replace(/[^\x00-\x7F]/g, "?")}`, 40, 158);
    doc.text(`E-posta: ${(a.email || "advertiser@demo.local")}`, 40, 176);
    doc.line(40, 200, w - 40, 200);
    doc.setFont("helvetica", "bold");
    doc.text("Aciklama", 40, 220);
    doc.text("Tutar", w - 100, 220);
    doc.setFont("helvetica", "normal");
    doc.text(String(inv.desc).replace(/[^\x00-\x7F]/g, "?"), 40, 240);
    doc.text(`EUR ${Number(inv.amount).toFixed(2)}`, w - 100, 240);
    doc.line(40, 260, w - 40, 260);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Toplam:", w - 180, 285);
    doc.text(`EUR ${Number(inv.amount).toFixed(2)}`, w - 100, 285);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Durum: ${inv.status}`, 40, 285);
    doc.text("KDV demo amacli yansitilmamistir.", 40, 320);
    doc.text("1HappyEnd Media BV - 1017 AB Amsterdam - Tel: +31 20 000 0000", 40, 800);
    doc.save(`${inv.id}.pdf`);
    toast(`${inv.id}.pdf indirildi.`);
  }

  function advPanelByKey(view, a) {
    switch (view) {
      case "dashboard": return advPanelDashboard(a);
      case "advertentie": return advPanelAdvertentie(a);
      case "fotos": return advPanelFotos();
      case "reviews": return advPanelReviews();
      case "videos": return advPanelVideos();
      case "promotie": return advPanelPromotie();
      case "omhoog": return advPanelOmhoog();
      case "tegoed": return advPanelTegoed();
      case "videopromotie": return advPanelVideoPromo();
      case "instellingen": return advPanelInstellingen(a);
      case "berichten": return advPanelBerichten();
      case "meldingen": return advPanelMeldingen();
      case "facturen": return advPanelFacturen();
      case "mutaties": return advPanelMutaties();
      default: return advPanelAdvertentie(a);
    }
  }

  // virtual extra views
  function resolveExtraView(view) {
    if (view === "akkoord") return { panel: advPanelAkkoord(), active: "promotie" };
    if (view === "doğrulama" || view === "validatie") return { panel: advPanelValidatie(currentAccount()), active: "advertentie" };
    return null;
  }

  function advCart() {
    try { return JSON.parse(localStorage.getItem("happyend-he-cart") || "[]"); } catch { return []; }
  }
  function saveAdvCart(items) { localStorage.setItem("happyend-he-cart", JSON.stringify(items)); }
  function priceOf(label) { const m = String(label).match(/€\s*([\d.,]+)/); return m ? Number(m[1].replace(/[^\d.]/g, "")) : 0; }

  function renderAdvCart() {
    const items = advCart();
    const totalNum = items.reduce((sum, it) => sum + priceOf(it.price), 0);
    const total = `Toplam: €${totalNum.toFixed(0)}`;
    const html = items.length
      ? `<ul class="he-cart-items">${items.map((it, i) => `<li><strong>${escapeHtml(it.title)}</strong><span>${escapeHtml(it.price)}</span><button type="button" data-cart-remove="${i}">×</button></li>`).join("")}</ul>`
      : `<div class="he-cart-empty">Sepetiniz boş.</div>`;
    document.getElementById("advCartList") && (document.getElementById("advCartList").innerHTML = html);
    document.getElementById("advCartListAkkoord") && (document.getElementById("advCartListAkkoord").innerHTML = items.length ? html : `<div class="he-cart-empty">Sepetiniz boş. <a href="#!promotie">Promosyon paketi seçin →</a></div>`);
    document.getElementById("advCartTotal") && (document.getElementById("advCartTotal").textContent = total);
    document.getElementById("advCartTotalAkkoord") && (document.getElementById("advCartTotalAkkoord").textContent = total);
  }

  function advTopBar(a) {
    return `
      <div class="he-topbar">
        <div class="he-topbar-inner">
          <a class="he-brand" href="../">
            <img src="../assets/brand/logo.png" alt="1HappyEnd">
          </a>
          <div class="he-topbar-spacer"></div>
          <a class="he-top-link" href="#!berichten">Müşteri hizmetleri</a>
          <a class="he-top-link active" href="#!dashboard">Hesabım</a>
          <span class="he-balance" title="Bakiye">€${(a.balance || 100).toFixed(2).replace(".", ",")}</span>
          <a class="he-cart-btn" href="#!akkoord" id="advCartBtn">
            <svg viewBox="0 0 24 24"><path d="M3 5h2l3 11h11l2-8H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
            <span class="he-cart-count" id="advCartCount">0</span>
          </a>
          <select class="he-lang"><option>NL</option><option>TR</option><option>EN</option><option>DE</option></select>
          <button class="he-top-logout" id="advTopLogout" title="Çıkış"><svg viewBox="0 0 24 24"><path d="M10 4h7v16h-7M14 12H3m0 0 4-4m-4 4 4 4"/></svg></button>
        </div>
      </div>
    `;
  }

  function advertiserDashboard(a, s) {
    a = a || currentAccount();
    s = s || session();
    const view = currentAdvView();
    const extra = resolveExtraView((location.hash || "").replace(/^#!?/, "").trim());
    const activeForSidebar = extra ? extra.active : view;
    const panel = extra ? extra.panel : advPanelByKey(view, a);
    root.innerHTML = `
      ${advTopBar(a)}
      ${s && s.needsSettingsConfirm ? settingsConfirmModal(a) : ""}
      <main class="he-shell">
        <aside class="he-sidebar">${advSidebar(activeForSidebar)}</aside>
        <section class="he-main">${panel}</section>
      </main>
      ${footer()}
    `;
    bindGlobal();
    bindAdvertiserDashboard();
    renderAdvCart();
    document.getElementById("advCartCount") && (document.getElementById("advCartCount").textContent = String(advCart().length));
  }

  function nextInvoiceId() {
    const inv = advInvoices();
    const year = new Date().getFullYear();
    const nums = inv.map(i => Number((i.id.match(/-(\d+)$/) || [0, 0])[1])).filter(Boolean);
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `INV-${year}-${String(next).padStart(3, "0")}`;
  }

  function completeAkkoord() {
    const t = document.getElementById("advAkkoordTerms");
    const ag = document.getElementById("advAkkoordAge");
    const rf = document.getElementById("advAkkoordRefund");
    if (!t || !ag || !rf) { toast("Onay alanları yüklenmedi, sayfayı yenileyin."); return; }
    if (!t.checked || !ag.checked || !rf.checked) { toast("Devam etmek için tüm onayları işaretleyin."); return; }
    const items = advCart();
    if (!items.length) { toast("Sepet boş."); return; }
    const total = items.reduce((sum, it) => sum + priceOf(it.price), 0);
    const today = new Date().toISOString().slice(0, 10);
    const desc = items.map(it => it.title).join(" + ");
    const invId = nextInvoiceId();
    const inv = advInvoices();
    inv.unshift({ id: invId, date: today, desc, amount: total, status: "Ödendi" });
    saveInvoices(inv);
    const muts = advMutations();
    items.forEach(it => {
      const credit = it.id === "kredi" ? Number((it.title.match(/(\d+)\s*kredi/) || [0, 0])[1]) : 0;
      if (credit) muts.unshift({ id: `M${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, at: today, text: `${it.title} (${invId})`, delta: credit, sign: "+" });
    });
    muts.unshift({ id: `M${Date.now()}`, at: today, text: `Ödeme ${invId}`, delta: -total, sign: "-" });
    saveMutations(muts);
    const noti = advNotifications();
    noti.unshift({ id: `n${Date.now()}`, title: "Ödeme alındı", text: `${invId} faturası oluşturuldu (€${total}).`, at: Date.now(), read: false });
    saveNotifications(noti);
    const a = currentAccount();
    if (a) {
      const list = accounts();
      const idx = list.findIndex(x => x.username === a.username && x.role === a.role);
      if (idx >= 0) {
        list[idx].balance = Math.max(0, (list[idx].balance || 0) + Math.floor(total / 10));
        saveAccounts(list);
      }
    }
    recordTransaction("Advertiser akkoord", "card", `€${total.toFixed(0)}`);
    saveAdvCart([]);
    toast(`Akkoord onaylandı. ${invId} faturası oluşturuldu.`);
    location.hash = "#!facturen";
  }

  function bindAdvertiserDashboard() {
    document.getElementById("advLogout")?.addEventListener("click", () => { setSession(null); location.href = "../index.html"; });
    document.getElementById("advTopLogout")?.addEventListener("click", () => { setSession(null); location.href = "../index.html"; });

    // Photo upload
    const photoAdd = document.getElementById("advPhotoAdd");
    const photoInput = document.getElementById("advPhotoInput");
    photoAdd?.addEventListener("click", () => photoInput?.click());
    photoInput?.addEventListener("change", event => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;
      const photos = advPhotos();
      let pending = files.length;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          photos.push(reader.result);
          if (--pending === 0) {
            savePhotos(photos);
            toast(`${files.length} fotoğraf yüklendi.`);
            advertiserDashboard();
          }
        };
        reader.readAsDataURL(file);
      });
    });

    // Save listing form
    document.getElementById("advAdvertentieForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const data = {
        name: document.getElementById("advName")?.value || "",
        headline: document.getElementById("advHeadline")?.value || "",
        about: document.getElementById("advAbout")?.value || "",
        promoSticker: document.getElementById("advPromoSticker")?.value || "",
        categories: Array.from(document.querySelectorAll('input[name="advCategory"]:checked')).map(el => el.value),
        savedAt: Date.now()
      };
      saveListing(data);
      const a = currentAccount();
      if (a) {
        const list = accounts();
        const idx = list.findIndex(x => x.username === a.username && x.role === a.role);
        if (idx >= 0) {
          list[idx].listingTitle = data.name;
          list[idx].bio = data.about;
          saveAccounts(list);
        }
      }
      toast("İlan bilgileri kaydedildi.");
      location.hash = "#!doğrulama";
    });

    document.getElementById("advValidatieForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const phone = document.getElementById("advPhone")?.value.trim();
      if (phone) {
        const list = accounts();
        const cur = currentAccount();
        const idx = list.findIndex(x => x.username === cur?.username && x.role === cur?.role);
        if (idx >= 0) { list[idx].phone = phone; saveAccounts(list); }
      }
      const noti = advNotifications();
      noti.unshift({ id: `n${Date.now()}`, title: "Doğrulama", text: "Numara doğrulama tamamlandı.", at: Date.now(), read: false });
      saveNotifications(noti);
      toast("Doğrulama bilgileri kaydedildi.");
      location.hash = "#!promotie";
    });

    // Settings save (instellingen panel)
    document.querySelectorAll("[data-demo-save]").forEach(el => el.addEventListener("click", event => {
      event.preventDefault();
      const a = currentAccount();
      if (a) {
        const list = accounts();
        const idx = list.findIndex(x => x.username === a.username && x.role === a.role);
        if (idx >= 0) {
          const name = document.getElementById("memberName")?.value;
          const email = document.getElementById("memberEmail")?.value;
          if (name) list[idx].name = name.trim();
          if (email) list[idx].email = email.trim();
          saveAccounts(list);
        }
      }
      toast("Değişiklikler kaydedildi.");
    }));

    // Add to cart
    document.querySelectorAll("[data-add-cart]").forEach(el => el.addEventListener("click", () => {
      const [id, title, price] = el.dataset.addCart.split("|");
      const items = advCart();
      items.push({ id, title, price });
      saveAdvCart(items);
      renderAdvCart();
      const count = document.getElementById("advCartCount"); if (count) count.textContent = String(items.length);
      toast(`${title} sepete eklendi.`);
    }));

    // Delegated click handler for storage-backed actions
    if (!window.__advClickBound) {
      window.__advClickBound = true;
      document.body.addEventListener("click", event => {
        const rm = event.target.closest("[data-cart-remove]");
        const ak = event.target.closest("[data-he-akkoord]");
        const pdf = event.target.closest("[data-invoice-pdf]");
        const photoRm = event.target.closest("[data-photo-remove]");
        const msgReply = event.target.closest("[data-msg-reply]");
        const msgRemove = event.target.closest("[data-msg-remove]");
        const msgMarkRead = event.target.closest("[data-msg-mark-read]");
        const reviewReply = event.target.closest("[data-review-reply]");
        const reviewFlag = event.target.closest("[data-review-flag]");
        const reviewRemove = event.target.closest("[data-review-remove]");
        const notiReadAll = event.target.closest("[data-noti-read-all]");
        const notiClear = event.target.closest("[data-noti-clear]");
        const notiRemove = event.target.closest("[data-noti-remove]");
        if (rm) {
          const items = advCart();
          items.splice(Number(rm.dataset.cartRemove), 1);
          saveAdvCart(items);
          renderAdvCart();
          const count = document.getElementById("advCartCount"); if (count) count.textContent = String(items.length);
        }
        if (ak) completeAkkoord();
        if (pdf) generateInvoicePdf(pdf.dataset.invoicePdf);
        if (photoRm) {
          const photos = advPhotos();
          photos.splice(Number(photoRm.dataset.photoRemove), 1);
          savePhotos(photos);
          advertiserDashboard();
        }
        if (msgReply) {
          const id = msgReply.dataset.msgReply;
          const input = document.querySelector(`[data-msg-input="${id}"]`);
          const text = input?.value.trim();
          if (!text) { toast("Yanıt boş olamaz."); return; }
          const msgs = advMessages();
          const m = msgs.find(x => x.id === id);
          if (m) {
            m.replies = m.replies || [];
            m.replies.push({ text, at: Date.now() });
            m.unread = false;
            saveMessages(msgs);
            toast("Yanıt gönderildi.");
            advertiserDashboard();
          }
        }
        if (msgRemove) {
          const id = msgRemove.dataset.msgRemove;
          saveMessages(advMessages().filter(x => x.id !== id));
          toast("Mesaj silindi.");
          advertiserDashboard();
        }
        if (msgMarkRead) {
          const msgs = advMessages().map(m => ({ ...m, unread: false }));
          saveMessages(msgs);
          advertiserDashboard();
        }
        if (reviewReply) {
          const id = reviewReply.dataset.reviewReply;
          const text = prompt("Yanıtınızı yazın:");
          if (!text) return;
          const list = advReviews();
          const r = list.find(x => x.id === id);
          if (r) { r.reply = text; saveReviews(list); toast("Yorum yanıtlandı."); advertiserDashboard(); }
        }
        if (reviewFlag) {
          const id = reviewFlag.dataset.reviewFlag;
          const list = advReviews();
          const r = list.find(x => x.id === id);
          if (r) { r.flagged = !r.flagged; saveReviews(list); toast(r.flagged ? "Yorum bayraklandı." : "Bayrak kaldırıldı."); advertiserDashboard(); }
        }
        if (reviewRemove) {
          const id = reviewRemove.dataset.reviewRemove;
          saveReviews(advReviews().filter(x => x.id !== id));
          toast("Yorum silindi.");
          advertiserDashboard();
        }
        if (notiReadAll) {
          saveNotifications(advNotifications().map(n => ({ ...n, read: true })));
          advertiserDashboard();
        }
        if (notiClear) {
          if (confirm("Tüm bildirimleri silmek istediğinize emin misiniz?")) { saveNotifications([]); advertiserDashboard(); }
        }
        if (notiRemove) {
          const id = notiRemove.dataset.notiRemove;
          saveNotifications(advNotifications().filter(n => n.id !== id));
          advertiserDashboard();
        }
      });
    }

    if (!window.__advHashBound) {
      window.__advHashBound = true;
      window.addEventListener("hashchange", () => advertiserDashboard());
    }
  }

  function adminPage() {
    const s = session();
    if (!s || s.role !== "admin") { location.href = "login/"; return; }
    root.innerHTML = `
      ${header()}
      <main class="admin-shell">
        <aside class="side"><h2>Yönetim</h2><a class="active" href="#dashboard">${icons.card} Dashboard</a><a href="#listings">${icons.user} İlanlar</a><a href="#payments">${icons.card} Ödemeler</a><button id="logoutBtn">${icons.close} Çıkış</button></aside>
        <section class="admin-main">
          <div class="card-title-row"><div><h1>Admin Paneli</h1><p class="subtle">İlan, kullanıcı, cüzdan, paket ve ödeme logları demo yönetim ekranı.</p></div><a class="btn ghost small" href="../index.html">Siteyi Gör</a></div>
          <div class="stats" id="stats"></div>
          <div class="admin-layout">
            <section class="panel table-wrap" id="listings"><table><thead><tr><th>İlan</th><th>Konum</th><th>Hizmet</th><th>Durum</th><th>İşlem</th></tr></thead><tbody id="adminRows"></tbody></table></section>
            <aside class="panel login-card">
              <h2 id="formTitle">Yeni İlan</h2>
              <form class="form" id="listingForm">
                <input type="hidden" id="itemId">
                <div class="field"><label>İsim</label><input class="control" id="name" required></div>
                <div class="field"><label>Yaş</label><input class="control" id="age" type="number" min="18" required></div>
                <div class="field"><label>Konum</label><select class="control" id="city">${cities.slice(1).map(c => `<option>${c}</option>`).join("")}</select></div>
                <div class="field"><label>Hizmet</label><select class="control" id="service">${services.slice(1).map(svc => `<option>${svc}</option>`).join("")}</select></div>
                <div class="field"><label>Kategori</label><select class="control" id="category">${categories.slice(1).map(c => `<option>${c}</option>`).join("")}</select></div>
                <div class="field"><label>Açıklama</label><textarea class="control" id="about"></textarea></div>
                <label class="switch"><input type="checkbox" id="featured"> Öne çıkan ilan</label><label class="switch"><input type="checkbox" id="available" checked> Müsait</label>
                <button class="btn primary" type="submit">${icons.save} Kaydet</button><button class="btn ghost" type="button" id="clearForm">Formu Temizle</button>
              </form>
            </aside>
          </div>
          <section class="panel login-card payments-panel" id="payments"><h2>Ödeme ve Cüzdan Logları</h2><div id="paymentRows"></div></section>
        </section>
      </main>
    `;
    bindGlobal();
    bindAdmin();
  }

  function bindAdmin() {
    const form = document.getElementById("listingForm");
    const clear = () => { form.reset(); document.getElementById("itemId").value = ""; document.getElementById("formTitle").textContent = "Yeni İlan"; document.getElementById("available").checked = true; };
    const render = () => {
      const data = listings();
      const tx = transactions();
      const acc = accounts();
      document.getElementById("stats").innerHTML = [["Toplam ilan", data.length], ["Kullanıcı", acc.length], ["Öne çıkan", data.filter(x => x.featured).length], ["Demo işlem", tx.length]].map(([label, value]) => `<article class="stat"><span>${label}</span><strong>${value}</strong></article>`).join("");
      document.getElementById("adminRows").innerHTML = data.map(item => `<tr><td data-label="İlan"><strong>${escapeHtml(item.name)}</strong><br><span class="subtle">${item.age} yaş · ${escapeHtml(item.category)}</span></td><td data-label="Konum">${escapeHtml(item.city)}</td><td data-label="Hizmet"><span class="tag">${escapeHtml(item.service)}</span></td><td data-label="Durum">${item.available ? "Müsait" : "Meşgul"} ${item.featured ? "· Vitrin" : ""}</td><td data-label="İşlem"><div class="row-actions"><button class="btn small ghost" data-edit="${item.id}">${icons.edit}</button><button class="btn small ghost" data-delete="${item.id}">${icons.trash}</button></div></td></tr>`).join("");
      document.getElementById("paymentRows").innerHTML = tx.length ? tx.map(row => `<div class="payment-log"><strong>${escapeHtml(row.type)}</strong><span>${escapeHtml(row.user || "guest")} · ${escapeHtml(row.method)} · ${row.amount}</span><em>${new Date(row.at).toLocaleString()}</em></div>`).join("") : `<div class="empty">Henüz demo ödeme işlemi yok.</div>`;
    };
    document.getElementById("logoutBtn").addEventListener("click", () => { setSession(null); location.href = "../account/login/"; });
    document.getElementById("clearForm").addEventListener("click", clear);
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = listings();
      const id = document.getElementById("itemId").value || slug(document.getElementById("name").value) + "-" + Date.now();
      const existing = data.findIndex(x => x.id === id);
      const item = { id, name: document.getElementById("name").value.trim(), age: Number(document.getElementById("age").value), city: document.getElementById("city").value, service: document.getElementById("service").value, category: document.getElementById("category").value, orientation: "Doğrulanmış", price: 180, coins: 18, rating: 4.8, available: document.getElementById("available").checked, featured: document.getElementById("featured").checked, image: ["portrait-1", "portrait-2", "portrait-3"][Math.floor(Math.random() * 3)], about: document.getElementById("about").value.trim() || "Doğrulanmış demo profil. Yasalara uygun, 18+ ve gizlilik odaklı randevu akışı." };
      if (existing >= 0) data[existing] = { ...data[existing], ...item, image: data[existing].image };
      else data.unshift(item);
      saveListings(data); clear(); render(); toast("İlan kaydedildi.");
    });
    document.getElementById("adminRows").addEventListener("click", event => {
      const edit = event.target.closest("[data-edit]");
      const del = event.target.closest("[data-delete]");
      const data = listings();
      if (edit) {
        const item = data.find(x => x.id === edit.dataset.edit);
        if (!item) return;
        document.getElementById("formTitle").textContent = "İlanı Düzenle";
        ["name", "age", "city", "service", "category", "about"].forEach(key => { if (document.getElementById(key)) document.getElementById(key).value = item[key]; });
        document.getElementById("itemId").value = item.id; document.getElementById("featured").checked = item.featured; document.getElementById("available").checked = item.available;
      }
      if (del) { saveListings(data.filter(x => x.id !== del.dataset.delete)); render(); toast("İlan silindi."); }
    });
    render();
  }

  function bindGlobal() {
    document.getElementById("languageSelect")?.addEventListener("change", event => { localStorage.setItem(languageKey, event.target.value); location.reload(); });
    document.body.addEventListener("click", event => {
      const detail = event.target.closest("[data-detail]");
      const showNum = event.target.closest("[data-show-number]");
      const fav = event.target.closest("[data-fav]");
      const age = event.target.closest("[data-age-ok]");
      const support = event.target.closest("[data-support]");
      const wallet = event.target.closest("[data-open-wallet]");
      const pkg = event.target.closest("[data-package]");
      const pay = event.target.closest("[data-pay-demo]");
      const booking = event.target.closest("[data-booking]");
      const essential = event.target.closest("[data-essential-ok]");
      const settings = event.target.closest("[data-cookie-settings]");
      const close = event.target.closest("[data-modal-close]");
      const legalClose = event.target.closest(".legal-close");
      if (detail) showDetail(detail.dataset.detail);
      if (showNum) {
        const s = session();
        if (!s) { location.href = (basePrefix() || "") + "account/login/"; return; }
        const item = listings().find(x => x.id === showNum.dataset.showNumber);
        if (!item) return;
        const phone = item.phone || "+31 6 " + Math.floor(10000000 + Math.random() * 89999999);
        if (!item.phone) { const all = listings(); const idx = all.findIndex(x => x.id === item.id); if (idx >= 0) { all[idx].phone = phone; saveListings(all); } }
        document.getElementById("modalHost").innerHTML = `
          <div class="modal-backdrop" data-modal-close>
            <section class="dialog" onclick="event.stopPropagation()" style="max-width:360px">
              <div class="dialog-body" style="text-align:center;padding:32px 24px">
                <h2 style="margin-bottom:8px">${escapeHtml(item.name)}</h2>
                <p class="subtle" style="margin-bottom:20px">${escapeHtml(tv(item.service))} · ${escapeHtml(item.city)}</p>
                <div style="font-size:26px;font-weight:700;letter-spacing:2px;color:var(--red,#df2f45);margin-bottom:20px">${phone}</div>
                <p class="subtle" style="font-size:12px">Dit nummer is alleen zichtbaar voor ingelogde leden.</p>
                <div class="dialog-actions" style="justify-content:center;margin-top:16px"><button class="btn ghost" data-modal-close>Sluiten</button></div>
              </div>
            </section>
          </div>`;
        bindModalClose();
        return;
      }
      if (fav) {
        const id = fav.dataset.fav;
        const favs = visFavs();
        const idx = favs.indexOf(id);
        if (idx >= 0) { favs.splice(idx, 1); saveVisFavs(favs); fav.textContent = "♡"; fav.classList.remove("fav-active"); toast("Verwijderd uit favorieten."); }
        else { favs.push(id); saveVisFavs(favs); fav.textContent = "♥"; fav.classList.add("fav-active"); toast(t("favAdded")); }
        return;
      }
      if (age || essential) acceptLegalGate();
      if (legalClose) toast(t("legalNeed"));
      if (settings) document.getElementById("cookieSettings")?.classList.toggle("open");
      const placeholder = event.target.closest('a[href="#"]');
      if (placeholder && !event.target.closest("[data-quick-filter]")) { event.preventDefault(); toast(t("pagePreparing")); }
      if (support) toast(t("supportQueued"));
      if (wallet) showWallet();
      if (pkg) showWallet(pkg.dataset.package);
      if (booking) recordTransaction("Booking request", document.getElementById("checkoutMethod")?.value || "coins", booking.dataset.booking);
      if (pay) recordTransaction("Wallet checkout", document.getElementById("walletMethod")?.value || "card", document.getElementById("walletPackage")?.value || "package");
      if (close && event.target === close) document.getElementById("modalHost").innerHTML = "";
      if (close && close.tagName === "BUTTON") document.getElementById("modalHost").innerHTML = "";
    });
    document.getElementById("legalLanguage")?.addEventListener("change", event => { localStorage.setItem(languageKey, event.target.value); location.reload(); });
  }

  function acceptLegalGate() {
    const age = document.getElementById("ageConfirm");
    const terms = document.getElementById("termsConfirm");
    if ((age && !age.checked) || (terms && !terms.checked)) {
      toast(t("legalNeed"));
      return;
    }
    localStorage.setItem(ageKey, "yes");
    document.getElementById("ageGate")?.remove();
  }

  function recordTransaction(type, method, amount) {
    const s = session();
    const tx = transactions();
    tx.unshift({ type, method, amount, user: s ? s.username : "guest", at: Date.now() });
    saveTransactions(tx);
    toast(t("paymentQueued"));
    const host = document.getElementById("modalHost");
    if (host) host.innerHTML = "";
  }

  function toast(text) {
    const el = document.createElement("div");
    el.className = "alert ok";
    el.textContent = text;
    el.style.position = "fixed";
    el.style.right = "18px";
    el.style.bottom = "18px";
    el.style.zIndex = "120";
    el.style.boxShadow = "var(--shadow)";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }
  window.demoToast = toast;

  function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ilan"; }
  function escapeHtml(value) { return String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

  const API = window.HE_API || (location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "http://localhost:3001" : "");
  async function api(p, body) {
    if (!API) throw new Error("no-api");
    const res = await fetch(API + p, { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw Object.assign(new Error(data.error || "http"), { status: res.status, data });
    return data;
  }
  window.heApi = api;

  function filtersPage() {
    const sexOpts = ["El işi","Anal (klant)","Anal (condom)","Anal (zonder condom)","Anal play","Ass worship","BDSM dominant","BDSM submissive","Beffen","Bi-slave","Biseks","Body to body","Bondage","Boot worship","Breath play","Buiten sex","CBT","Candle wax","Cardate","Chatten","Cock & ball bondage","Deepthroat","Dildo show","Dinner date","Dirty talk","Electro","Erotische massage","Face check","Facesitting","Facetime","Fisting","Foto's op verzoek","GFE","Gagging","Gangbang","Geldslaven","High class","Hotel","Intiem","JOI","Kik","Klaarkomen in mond","Klaarkomen op gezicht","Kuisheidsgordel","Lak / Rubber","Lingam massage","Live verhalen","Masks","Massage met hoogtepunt","Masturberen","Mummificatie","Naalden","Neuken (condom)","Neuken (zonder condom)","Nipple torture","Nuru massage","Online femdom","Online findom","OnlyFans","Ontmaagding","Opsluiting","Penismassage","Pijpen (condom)","Pijpen (zonder condom)","Plassex","Pornoster","Prostaat massage","Publieke tentoonstelling","Rimmen","Rollenspel","SM massage","Sissyplay","Snapchat","Soft SM","Sperma slikken","Spitting","Squirting","Squirtshow","Tantra massage","Teams","Telefoon sex","Telegram","Thaise massage","Tongzoenen","Travestie","Trio m/m","Trio v/v","WhatsApp video"];
    const langs = ["Nederlands","Engels","Duits","Frans","Spaans","Italiaans","Turks","Arabisch"];
    const ethnics = ["Nederlands","Europees","Oost Europees","Zuid Europees","Afrikaans","Aziatisch","Zuid Amerikaans","Arabisch","Turks","Marokkaans","Amerikaans","Hindoestaans","Braziliaans","Chinees","Pools","Russisch"];
    const bodies = ["Slank","Atletisch","Normaal","Mollig","Dik"];
    const provs = ["Noord-Holland","Zuid-Holland","Utrecht","Noord-Brabant","Gelderland","Limburg","Flevoland","Friesland","Groningen","Drenthe","Overijssel","Zeeland"];
    const cityList = ["Amsterdam","Rotterdam","Den Haag","Utrecht","Eindhoven","Groningen","Alkmaar","Tilburg","Almere","Arnhem","Haarlem","Nijmegen","Breda"];
    const dist = ["5 km","10 km","25 km","50 km","100 km"];
    const types = ["Privé ontvangst","Escort","Erotische massage","BDSM","Virtual sex","Raamprostitutie"];
    const cb = (group, list, cols = 2) => `<div class="he-filter-grid" style="display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:6px 14px">${list.map(v => `<label class="he-check"><input type="checkbox" name="${group}" value="${escapeHtml(v)}"><span>${escapeHtml(v)}</span></label>`).join("")}</div>`;
    const sel = (id, list, ph) => `<select id="${id}" class="he-input"><option value="">${ph}</option>${list.map(v => `<option>${escapeHtml(v)}</option>`).join("")}</select>`;
    root.innerHTML = `
      ${header("filters")}
      <main class="he-shell" style="grid-template-columns:1fr;max-width:1100px;background:#fff;margin:0 auto">
        <section class="he-main" style="padding:24px 28px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
            <h1 style="margin:0;color:#df2f45">Uitgebreid zoeken</h1>
            <a class="he-btn ghost" href="../">← Terug</a>
          </div>
          <form id="filtersForm" class="he-form">
            <section class="he-card">
              <div class="he-grid-2">
                <label class="he-label">Zoek op naam<input id="fName" class="he-input" placeholder="Bijv. Luna"></label>
                <label class="he-label">Zoek op titel/beschrijving<input id="fText" class="he-input" placeholder="Trefwoord"></label>
              </div>
            </section>
            <section class="he-card">
              <h2 class="he-title-red">Locatie</h2>
              <div class="he-grid-2">
                <label class="he-label">Land${sel("fCountry", ["Nederland","België","Duitsland"], "Alle landen")}</label>
                <label class="he-label">Provincie${sel("fProv", provs, "Alle provincies")}</label>
                <label class="he-label">Plaats${sel("fCity", cityList, "Alle plaatsen")}</label>
                <label class="he-label">Afstand${sel("fDist", dist, "Alle afstanden")}</label>
              </div>
            </section>
            <section class="he-card"><h2 class="he-title-red">Type date</h2>${cb("fType", types, 3)}</section>
            <section class="he-card"><h2 class="he-title-red">Geslacht</h2>${cb("fGender", ["Vrouw","Man","Stel","Trans"], 4)}</section>
            <section class="he-card"><h2 class="he-title-red">Gesproken talen</h2>${cb("fLang", langs, 4)}</section>
            <section class="he-card"><h2 class="he-title-red">Afkomst</h2>${cb("fEthnic", ethnics, 4)}</section>
            <section class="he-card"><h2 class="he-title-red">Lichaamsbouw</h2>${cb("fBody", bodies, 5)}</section>
            <section class="he-card"><h2 class="he-title-red">Sex opties</h2>${cb("fSex", sexOpts, 3)}</section>
            <footer class="he-wizard-actions" style="position:sticky;bottom:0;background:#fff;padding:14px 0;border-top:1px solid #eee;display:flex;justify-content:space-between">
              <button type="reset" class="he-btn ghost">Filters resetten</button>
              <button type="submit" class="he-btn primary">Resultaten tonen</button>
            </footer>
          </form>
        </section>
      </main>
      ${footer()}
    `;
    bindGlobal();
    document.getElementById("filtersForm").addEventListener("submit", e => {
      e.preventDefault();
      const params = new URLSearchParams();
      const v = id => document.getElementById(id)?.value.trim();
      ["fName","fText","fCountry","fProv","fCity","fDist"].forEach(id => { const x = v(id); if (x) params.set(id, x); });
      ["fType","fGender","fLang","fEthnic","fBody","fSex"].forEach(g => {
        const xs = Array.from(document.querySelectorAll(`input[name="${g}"]:checked`)).map(i => i.value);
        if (xs.length) params.set(g, xs.join(","));
      });
      location.href = "../index.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  async function verifyPage() {
    const tok = new URLSearchParams(location.search).get("token");
    root.innerHTML = `
      ${header("verify")}
      <main class="he-shell" style="grid-template-columns:1fr;max-width:560px;background:#fff;margin:0 auto">
        <section class="he-main" style="padding:40px 28px;text-align:center">
          <h1 style="color:#df2f45">E-posta doğrulama</h1>
          <div id="verifyMsg" class="he-text">Bekleniyor...</div>
          <a class="he-btn primary" href="../account/login/" id="verifyGo" style="display:none;margin-top:14px">Giriş yap</a>
        </section>
      </main>
      ${footer()}
    `;
    bindGlobal();
    const msg = document.getElementById("verifyMsg");
    if (!tok) { msg.textContent = "Geçersiz bağlantı."; return; }
    try {
      const r = await api(`/api/verify?token=${encodeURIComponent(tok)}`);
      msg.innerHTML = `E-postanız doğrulandı (<b>${escapeHtml(r.username)}</b>). Şimdi giriş yapabilirsiniz.`;
      document.getElementById("verifyGo").style.display = "inline-flex";
    } catch (e) {
      msg.textContent = e.status === 404 ? "Bağlantı geçersiz veya süresi dolmuş." : "Doğrulama başarısız (API kapalı olabilir).";
    }
  }

  window.heSignupApi = async (form) => {
    try { const r = await api("/api/signup", form); return { ok: true, link: r.link }; }
    catch (e) { return e.message === "no-api" ? { ok: true, fallback: true } : { ok: false, error: e.data?.error || "signup-failed" }; }
  };
  window.heLoginApi = async (username, password) => {
    try { return await api("/api/login", { username, password }); }
    catch (e) { return e.message === "no-api" ? { fallback: true } : { error: e.data?.error || "login-failed", status: e.status }; }
  };
  window.heLoginCodeApi = async (username, code) => {
    try { return await api("/api/login-code", { username, code }); }
    catch (e) { return { error: e.data?.error || "code-failed" }; }
  };

  seedAccounts();
  if (page === "login") loginPage();
  else if (page === "account") accountPage();
  else if (page === "admin-login") adminLoginPage();
  else if (page === "admin") adminPage();
  else if (page === "zoeken") filtersPage();
  else if (page === "verify") verifyPage();
  else homePage();
})();
