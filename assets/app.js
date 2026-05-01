(function () {
  const root = document.getElementById("app");
  const page = document.body.dataset.page || "home";

  const storageKey = "happyend-demo-listings";
  const sessionKey = "happyend-demo-session";
  const accountsKey = "happyend-demo-accounts";
  const transactionsKey = "happyend-demo-transactions";
  const activityKey = "happyend-demo-account-activity";
  const ageKey = "happyend-age-ok";
  const languageKey = "happyend-demo-language";

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
  function activityId(account) { return account ? `${account.role}:${account.username}` : "guest"; }
  function allActivity() { try { return JSON.parse(localStorage.getItem(activityKey) || "{}"); } catch (_) { return {}; } }
  function defaultActivity(account) {
    if (account && account.role === "advertiser") {
      return {
        reviews: [{ title: "Profielbeoordeling", text: "Reviews worden na publicatie en moderatie zichtbaar.", time: "Demo" }],
        reports: [{ title: "Verificatiecontrole", text: "Admin review staat klaar voordat de advertentie live gaat.", status: "Open" }],
        notifications: [{ title: "Profiel concept", text: "Vul media, pakket en betaling aan om live te gaan.", time: "Vandaag" }],
        saved: [{ title: "Mijn advertentie concept", text: "1HappyEnd demo profiel", frequency: "Actief" }],
        messages: [{ title: "Nieuwe aanvraag", text: "Visitor demo vraagt beschikbaarheid en prijsinformatie.", time: "1 minuut geleden" }]
      };
    }
    return {
      reviews: [{ title: "Bekleyen değerlendirme", text: "Son görüştüğünüz profiller için değerlendirme bırakma alanı.", time: "Demo" }],
      reports: [{ title: "Güvenlik raporu", text: "Şikayet ve destek talepleri bu hesap altında takip edilir.", status: "Hazır" }],
      notifications: [{ title: "Berichtenbox", text: "Yeni mesaj ve cevap bildirimleri burada görünür.", time: "Aktif" }],
      saved: [{ title: "Amsterdam · Escort", text: "Günlük bildirim", frequency: "Günlük" }, { title: "Rotterdam · Masaj", text: "Haftalık bildirim", frequency: "Haftalık" }],
      messages: [{ title: "Support", text: "Hesabınız demo ortamında aktif.", time: "Bugün" }]
    };
  }
  function accountActivity(account) {
    const store = allActivity();
    const id = activityId(account);
    if (!store[id]) {
      store[id] = defaultActivity(account);
      localStorage.setItem(activityKey, JSON.stringify(store));
    }
    return store[id];
  }
  function saveAccountActivity(account, activity) {
    const store = allActivity();
    store[activityId(account)] = activity;
    localStorage.setItem(activityKey, JSON.stringify(store));
  }
  function activityRows(items, emptyText = "Kayıt bulunamadı") {
    if (!items || !items.length) return `<article><strong>${emptyText}</strong><span>Bu alan hesabınıza bağlıdır; yeni işlem oluştuğunda otomatik görünür.</span><em>Hazır</em></article>`;
    return items.map(item => `<article><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text || item.status || item.frequency || "")}</span><em>${escapeHtml(item.time || item.status || item.frequency || "Demo")}</em></article>`).join("");
  }
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
          <a class="classic-brand" href="${prefix}index.html" aria-label="1HappyEnd"><img src="${prefix}assets/brand/happyend-logo-red-crop.jpg" alt="1HappyEnd"></a>
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
            <a href="${prefix}index.html#filters" id="topFilterToggle">${t("filters")}</a>
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
          <div class="card-actions"><button class="btn primary small" data-detail="${item.id}">${t("showNumber")}</button><button class="btn ghost small" data-fav="${item.id}">${icons.star} ${t("favorite")}</button></div>
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
            <div class="filter-toggles" id="qualityFilters">
              <button type="button" class="filter-check" id="photoFilter" aria-pressed="false">${t("tenPhotos")}</button>
              <button type="button" class="filter-check" id="videoFilter" aria-pressed="false">${t("withVideo")}</button>
              <button type="button" class="filter-check" id="reviewFilter" aria-pressed="false">${t("withReviews")}</button>
            </div>
            <div class="filter-buttons"><button class="btn primary" id="searchBtn">${icons.search} ${t("search")}</button><button class="btn ghost" id="resetBtn">${icons.close} ${t("reset")}</button></div>
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
          (!isQualityOn(reviewFilter) || reviews > 0);
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
    document.getElementById("resetBtn").addEventListener("click", () => { search.value = ""; if (topSearch) topSearch.value = ""; if (topCategory) topCategory.value = ""; service.value = "Tüm Hizmetler"; city.value = "Tüm Konumlar"; [photoFilter, videoFilter, reviewFilter].forEach(button => setQuality(button, false)); state = { category: "Tümü", availableOnly: false, sort: "default" }; document.querySelectorAll(".chip").forEach((b, i) => b.classList.toggle("active", i === 0)); document.querySelectorAll(".view-tools .btn").forEach(btn => btn.classList.remove("primary")); apply(); });
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
            <div class="dialog-actions"><button class="btn primary" data-booking="${item.id}">${t("request")}</button><button class="btn ghost" data-modal-close>${t("close")}</button></div>
          </div>
        </section>
      </div>
    `;
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
    window.submitAccount = function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const msg = document.getElementById("loginMessage");
      const data = accounts();
      if (mode === "register" && role !== "admin") {
        if (!document.getElementById("adultConfirm").checked) { msg.innerHTML = `<div class="alert">${t("adultError")}</div>`; return; }
        if (data.some(a => a.username === username)) { msg.innerHTML = `<div class="alert">${t("existsError")}</div>`; return; }
        const account = { username, password, role, name: document.getElementById("fullName").value.trim() || username, email: document.getElementById("email").value.trim(), wallet: role === "visitor" ? 25 : 0, currency: "EUR", balance: role === "advertiser" ? 100 : 0 };
        data.push(account); saveAccounts(data); setSession({ username, role, at: Date.now(), needsSettingsConfirm: true });
        msg.innerHTML = `<div class="alert ok">${t("registerOk")}</div>`;
        setTimeout(() => { location.href = "../"; }, 700);
        return;
      }
      const found = data.find(a => (a.username === username || a.email === username) && a.password === password && a.role !== "admin");
      if (!found) { msg.innerHTML = `<div class="alert">${t("loginError")}</div>`; return; }
      setSession({ username: found.username, role: found.role, at: Date.now(), needsSettingsConfirm: false });
      msg.innerHTML = `<div class="alert ok">${t("loginOk")}</div>`;
      setTimeout(() => { location.href = "../"; }, 500);
      return false;
    };
    document.getElementById("accountForm").addEventListener("submit", window.submitAccount);
    update();
  }

  function adminLoginPage() {
    root.innerHTML = `
      <main class="classic-login-page admin-login-page">
        <section class="classic-login-card">
          <a class="admin-login-logo" href="../../index.html"><img src="../../assets/brand/happyend-logo-red-crop.jpg" alt="1HappyEnd"></a>
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

  function accountPanelKey(label, isAdvertiser) {
    const visitor = { "Ayarlar": "settings", "Yorumlar": "reviews", "Raporlar": "reports", "Meldingen": "notifications", "Opgeslagen Zoekopdrachten": "saved" };
    const advertiser = { "Ayarlar": "settings", "Profil": "profile", "Ilanlar": "listings", "Medya": "media", "Paketler": "packages", "Odemeler": "payments", "Mesajlar": "messages" };
    return (isAdvertiser ? advertiser : visitor)[label] || "settings";
  }

  function accountPage() {
    const a = currentAccount();
    if (!a || a.role === "admin") { location.href = "login/"; return; }
    const s = session();
    const isAdvertiser = a.role === "advertiser";
    const activity = accountActivity(a);
    const settingsMenu = isAdvertiser
      ? ["Ayarlar", "Profil", "Ilanlar", "Medya", "Paketler", "Odemeler", "Mesajlar"]
      : ["Ayarlar", "Yorumlar", "Raporlar", "Meldingen", "Opgeslagen Zoekopdrachten"];
    root.innerHTML = `
      ${accountVersionBanner()}
      ${header("account")}
      ${s && s.needsSettingsConfirm ? settingsConfirmModal(a) : ""}
      <main class="account-settings-shell">
        <aside class="account-settings-sidebar">
          ${settingsMenu.map((item, index) => `<a class="${index === 0 ? "active" : ""}" href="#" data-account-menu="${accountPanelKey(item, isAdvertiser)}">${item}</a>`).join("")}
          <button id="memberLogout">Uitloggen</button>
        </aside>
        <section class="account-settings-main">
          <h1 id="accountPanelTitle">Ayarlar</h1>
          <article class="settings-card" data-account-panel="settings">
            <h2>Wijzig bijnaam</h2>
            <label>Nieuwe bijnaam</label>
            <input id="memberName" value="${escapeHtml(a.name || a.username)}">
            <button class="settings-save" data-demo-save>Wijzigen</button>
          </article>
          <article class="settings-card" data-account-panel="settings">
            <h2>Voorkeurstaal</h2>
            <p>Selecteer alstublieft jouw voorkeurstaal</p>
            <select id="memberLanguage"><option>NL</option><option>TR</option><option>EN</option><option>DE</option><option>FR</option><option>ES</option></select>
          </article>
          ${isAdvertiser ? `
            <article class="settings-card advertiser-card" data-account-panel="profile">
              <h2>Advertentieprofiel</h2>
              <label>Profielnaam</label>
              <input id="memberListingTitle" value="${escapeHtml(a.listingTitle || "1HappyEnd demo profiel")}">
              <label>Dienst</label>
              <select id="memberService">${services.slice(1).map(svc => `<option>${svc}</option>`).join("")}</select>
              <label>Stad</label>
              <select id="memberCity">${cities.slice(1).map(city => `<option>${city}</option>`).join("")}</select>
              <label>Prijsindicatie</label>
              <input id="memberPrice" value="€180 per uur">
              <label>Korte omschrijving</label>
              <textarea id="memberBio">Foto, video, prijs en beschikbaarheid kunnen hier worden voorbereid.</textarea>
              <button class="settings-save" data-demo-save>Wijzigingen opslaan</button>
            </article>
            <article class="settings-card advertiser-card" data-account-panel="media">
              <h2>Media & verificatie</h2>
              <div class="advertiser-status"><span>Profielstatus</span><strong>Concept · admin controle nodig</strong></div>
              <div class="media-upload-grid">
                <button type="button" data-demo-save>Profielfoto uploaden</button>
                <button type="button" data-demo-save>Galerij toevoegen</button>
                <button type="button" data-demo-save>Verificatiefoto uploaden</button>
                <button type="button" data-demo-save>Video toevoegen</button>
              </div>
              <p>Media wordt in deze demo lokaal gesimuleerd. In de echte versie komt hier upload, preview en moderatie.</p>
            </article>
            <article class="settings-card advertiser-card" data-account-panel="listings">
              <div class="account-list-row"><strong>1HappyEnd demo profiel</strong><span>Concept</span><button type="button" data-demo-save>Bewerken</button></div>
              <div class="account-list-row"><strong>Nieuwe advertentie</strong><span>Nog niet gepubliceerd</span><button type="button" data-demo-save>Aanmaken</button></div>
              <p>Advertenties worden na betaling en admincontrole zichtbaar in de lijst.</p>
            </article>
            <article class="settings-card advertiser-card" data-account-panel="packages">
              <div class="package-row"><span>Basis advertentie</span><strong>Actief</strong><button type="button" data-demo-save>Beheren</button></div>
              <div class="package-row"><span>Premium vitrin</span><strong>€149 / 30 dagen</strong><button type="button" data-demo-save>Activeren</button></div>
              <div class="package-row"><span>Veilingpositie</span><strong>Niet actief</strong><button type="button" data-demo-save>Bieden</button></div>
            </article>
            <article class="settings-card advertiser-card" data-account-panel="payments">
              <div class="mini-table">
                <div><span>Beschikbaar saldo</span><strong>€${a.balance || 100}</strong></div>
                <div><span>HE Coin</span><strong>${a.wallet || 0}</strong></div>
                <div><span>Laatste betaling</span><strong>Demo checkout voorbereid</strong></div>
              </div>
              <button class="settings-save" type="button" data-open-wallet>Betaalpagina openen</button>
            </article>
            <article class="settings-card advertiser-card" data-account-panel="messages">
              <div class="message-list compact">
                ${activityRows(activity.messages)}
                ${activityRows(activity.notifications.slice(0, 1))}
              </div>
            </article>
          ` : ""}
          ${!isAdvertiser ? `
            <article class="settings-card" data-account-panel="reviews">
              <div class="message-list compact">
                ${activityRows(activity.reviews)}
              </div>
            </article>
            <article class="settings-card" data-account-panel="reports">
              <p>Güvenlik, şikayet ve destek talepleri buradan takip edilir.</p>
              <div class="message-list compact">${activityRows(activity.reports)}</div>
              <div class="account-list-row"><strong>Yeni rapor oluştur</strong><span>Destek ekibine gider ve Meldingen alanına bildirim düşer</span><button type="button" data-add-report>Başlat</button></div>
            </article>
            <article class="settings-card" data-account-panel="saved">
              ${activity.saved.map(item => `<div class="account-list-row"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text || item.frequency)}</span><button type="button" data-demo-save>Düzenle</button></div>`).join("")}
              <div class="account-list-row"><strong>Yeni arama kaydet</strong><span>Arama ve bildirimlere bağlanır</span><button type="button" data-add-saved>Kaydet</button></div>
            </article>
          ` : ""}
          <article class="settings-card" data-account-panel="${isAdvertiser ? "messages" : "settings"}">
            <h2>Berichtenbox</h2>
            <p>Via de berichtenbox kun je veilig contact onderhouden binnen 1HappyEnd. In de demo wordt dit lokaal opgeslagen.</p>
            <label class="settings-toggle"><input type="checkbox" checked><span></span><b>De berichtenbox staat aan</b></label>
            <div class="settings-radios">
              <p>Ik wil een e-mail ontvangen:</p>
              <label><input type="radio" name="msgfreq" checked> Bij ieder nieuw bericht</label>
              <label><input type="radio" name="msgfreq"> Maximaal 1 keer per dag</label>
              <label><input type="radio" name="msgfreq"> Maximaal 1 keer per week</label>
              <label><input type="radio" name="msgfreq"> Stuur mij geen email</label>
            </div>
            <button class="settings-save" data-demo-save>Wijzigingen opslaan</button>
          </article>
          <article class="settings-card" data-account-panel="${isAdvertiser ? "settings" : "notifications"}">
            <p>Bepaal hoe vaak je updates, favorieten en profielmeldingen ontvangt.</p>
            <div class="message-list compact">${activityRows(activity.notifications)}</div>
            <div class="settings-radios">
              <label><input type="radio" name="notfreq" checked> Bij iedere melding</label>
              <label><input type="radio" name="notfreq"> Maximaal 1 keer per dag</label>
              <label><input type="radio" name="notfreq"> Maximaal 1 keer per week</label>
              <label><input type="radio" name="notfreq"> Geen meldingen per email</label>
            </div>
            <button class="settings-save" data-demo-save>Wijzigingen opslaan</button>
          </article>
          <article class="settings-card" data-account-panel="settings">
            <h2>Wachtwoord wijzigen</h2>
            <label>Oude wachtwoord</label><input type="password">
            <label>Nieuwe wachtwoord</label><input type="password">
            <label>Herhaal nieuwe wachtwoord</label><input type="password">
            <button class="settings-save" data-demo-save>Wijzigen</button>
          </article>
          <article class="settings-card" data-account-panel="settings">
            <h2>E-mailadres wijzigen</h2>
            <p>Na wijziging wordt een bevestigingslink naar het nieuwe adres gestuurd.</p>
            <label>Nieuw e-mailadres</label>
            <input id="memberEmail" type="email" value="${escapeHtml(a.email || "")}">
            <button class="settings-save" data-demo-save>Wijzigen</button>
          </article>
          <article class="settings-card danger" data-account-panel="settings">
            <h2>Account verwijderen</h2>
            <p>Demo ortamında hesap silme işlemi yalnızca örnek akış olarak gösterilir.</p>
            <a href="#" data-demo-save>Verwijderen hesabını tıklayın</a>
          </article>
        </section>
      </main>
      ${footer()}
    `;
    bindGlobal();
    bindMemberDashboard();
    return;
    const memberTitle = isAdvertiser ? "Reklamveren hesabı" : "Ziyaretçi hesabı";
    const memberText = isAdvertiser
      ? "İlan, doğrulama, medya, müsaitlik ve vitrin paketlerini tek panelden yönetin."
      : "Favoriler, HE Coin bakiyesi, randevu talepleri ve güvenli mesajlarınızı yönetin.";
    root.innerHTML = `
      ${header("account")}
      ${s && s.needsSettingsConfirm ? settingsConfirmModal(a) : ""}
      <main class="member-shell">
        <section class="member-hero">
          <div>
            <span class="eyebrow">1HappyEnd üyelik merkezi</span>
            <h1>${memberTitle}</h1>
            <p>${memberText}</p>
          </div>
          <div class="member-id-card">
            <span>${isAdvertiser ? "Advertiser ID" : "Visitor ID"}</span>
            <strong>${escapeHtml(a.username)}</strong>
            <em>${escapeHtml(a.email || "email eklenmedi")}</em>
          </div>
        </section>
        <section class="member-grid">
          <aside class="member-menu">
            <button class="active" data-member-tab="overview">Genel Bakış</button>
            <button data-member-tab="profile">${isAdvertiser ? "Profil & İlan" : "Profil"}</button>
            <button data-member-tab="wallet">Cüzdan</button>
            <button data-member-tab="messages">Mesajlar</button>
            <button data-member-tab="security">Güvenlik</button>
            <button id="memberLogout">Çıkış</button>
          </aside>
          <section class="member-content">
            <div class="member-tab active" id="tab-overview">
              <div class="member-stats">
                <article><span>Hesap tipi</span><strong>${isAdvertiser ? "Reklamveren" : "Ziyaretçi"}</strong></article>
                <article><span>HE Coin</span><strong>${a.wallet || 0}</strong></article>
                <article><span>${isAdvertiser ? "Vitrin bakiyesi" : "Favori profil"}</span><strong>${isAdvertiser ? `€${a.balance || 0}` : "6"}</strong></article>
                <article><span>Durum</span><strong>18+ onaylı</strong></article>
              </div>
              <div class="member-card">
                <h2>${isAdvertiser ? "Yayın hazırlığı" : "Üyelik avantajları"}</h2>
                <div class="checklist">
                  <label><input type="checkbox" checked> 18+ onay ve kullanım koşulları</label>
                  <label><input type="checkbox" checked> E-posta/telefon doğrulama adımı</label>
                  <label><input type="checkbox" ${isAdvertiser ? "checked" : ""}> ${isAdvertiser ? "İlan paketi ve vitrin hazırlığı" : "HE Coin ile talep oluşturma"}</label>
                  <label><input type="checkbox"> Canlı ödeme sağlayıcısı bağlanınca otomatik tahsilat</label>
                </div>
              </div>
            </div>
            <div class="member-tab" id="tab-profile">
              <div class="member-card">
                <h2>${isAdvertiser ? "Reklamveren profil bilgileri" : "Ziyaretçi profil bilgileri"}</h2>
                <form class="member-form" id="memberProfileForm">
                  <label>Ad Soyad / Firma<input id="memberName" value="${escapeHtml(a.name || "")}"></label>
                  <label>E-posta<input id="memberEmail" type="email" value="${escapeHtml(a.email || "")}"></label>
                  ${isAdvertiser ? `
                    <label>İlan başlığı<input id="memberListingTitle" value="${escapeHtml(a.listingTitle || "Premium doğrulanmış profil")}"></label>
                    <label>Hizmet türü<select id="memberService">${services.slice(1).map(svc => `<option ${a.service === svc ? "selected" : ""}>${svc}</option>`).join("")}</select></label>
                    <label>Kısa açıklama<textarea id="memberBio">${escapeHtml(a.bio || "Fotoğraf, video, fiyat ve müsaitlik bilgileri panelden yönetilir.")}</textarea></label>
                    <div class="upload-strip"><span>Fotoğraf yükleme</span><button type="button" data-demo-upload>Dosya seç</button><em>Mock upload hazır</em></div>
                  ` : `
                    <label>Tercih edilen şehir<select id="memberCity">${cities.slice(1).map(city => `<option ${a.city === city ? "selected" : ""}>${city}</option>`).join("")}</select></label>
                    <label>Gizlilik tercihi<select id="memberPrivacy"><option>Standart</option><option>Premium doğrulamalı talep</option></select></label>
                  `}
                  <button class="classic-submit" type="submit">Bilgileri kaydet</button>
                </form>
              </div>
            </div>
            <div class="member-tab" id="tab-wallet">
              <div class="member-card">
                <h2>Cüzdan ve ödeme hazırlığı</h2>
                <div class="wallet-summary member-wallet"><span>HE Coin</span><strong>${a.wallet || 0}</strong><span>EUR</span><strong>€${a.balance || 0}</strong><span>USD</span><strong>$0</strong></div>
                <div class="package-grid compact-packages">
                  <article class="package-card"><span class="pill">Visitor</span><h3>100 HE Coin</h3><strong>€89</strong><button class="classic-outline" data-package="100">Paketi seç</button></article>
                  <article class="package-card"><span class="pill">Advertiser</span><h3>Vitrin Boost</h3><strong>€149</strong><button class="classic-outline" data-package="boost">Paketi seç</button></article>
                </div>
              </div>
            </div>
            <div class="member-tab" id="tab-messages">
              <div class="member-card">
                <h2>Mesajlar ve talepler</h2>
                <div class="message-list">
                  <article><strong>Support</strong><span>Hesabınız demo ortamında aktif. Canlıya geçince e-posta bildirimleri bağlanacak.</span><em>az önce</em></article>
                  <article><strong>${isAdvertiser ? "Yeni talep" : "Randevu talebi"}</strong><span>${isAdvertiser ? "Ziyaretçi talepleri burada listelenecek." : "Seçtiğiniz profillerle güvenli mesajlaşma hazır."}</span><em>1 dk önce</em></article>
                </div>
              </div>
            </div>
            <div class="member-tab" id="tab-security">
              <div class="member-card">
                <h2>Güvenlik ve doğrulama</h2>
                <div class="checklist">
                  <label><input type="checkbox" checked> 18+ yaş beyanı</label>
                  <label><input type="checkbox" checked> Çerez ve gizlilik onayı</label>
                  <label><input type="checkbox"> Kimlik doğrulama sağlayıcısı entegrasyonu</label>
                  <label><input type="checkbox"> Şikayet ve engelleme kayıtları</label>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      ${footer()}
    `;
    bindGlobal();
    bindMemberDashboard();
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
            <img src="../assets/brand/happyend-logo-red-crop.jpg" alt="1HappyEnd">
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
    const openAccountPanel = (key, label) => {
      document.querySelectorAll("[data-account-menu]").forEach(item => item.classList.toggle("active", item.dataset.accountMenu === key));
      document.querySelectorAll("[data-account-panel]").forEach(item => item.classList.toggle("is-hidden", item.dataset.accountPanel !== key));
      const title = document.getElementById("accountPanelTitle");
      if (title) title.textContent = label || document.querySelector(`[data-account-menu="${key}"]`)?.textContent || "Ayarlar";
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.querySelector(".account-settings-sidebar")?.addEventListener("click", event => {
      const item = event.target.closest("[data-account-menu]");
      if (!item) return;
      event.preventDefault();
      openAccountPanel(item.dataset.accountMenu, item.textContent.trim());
    });
    if (document.querySelector("[data-account-panel]")) openAccountPanel("settings", "Ayarlar");
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
    document.querySelector("[data-add-report]")?.addEventListener("click", event => {
      event.preventDefault();
      const a = currentAccount();
      if (!a) return;
      const activity = accountActivity(a);
      const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      activity.reports.unshift({ title: "Yeni güvenlik raporu", text: "Demo rapor destek ekibine iletildi.", status: "Open" });
      activity.notifications.unshift({ title: "Rapor oluşturuldu", text: "Yeni raporunuz Raporlar ve Meldingen alanına bağlandı.", time: stamp });
      saveAccountActivity(a, activity);
      toast("Rapor oluşturuldu ve Meldingen alanına bağlandı.");
      accountPage();
      setTimeout(() => document.querySelector('[data-account-menu="reports"]')?.click(), 40);
    });
    document.querySelector("[data-add-saved]")?.addEventListener("click", event => {
      event.preventDefault();
      const a = currentAccount();
      if (!a) return;
      const activity = accountActivity(a);
      const count = activity.saved.length + 1;
      activity.saved.unshift({ title: `Yeni demo arama ${count}`, text: "Kaydedildi · günlük bildirim", frequency: "Günlük" });
      activity.notifications.unshift({ title: "Arama kaydedildi", text: "Kaydedilen arama bildirimlere bağlandı.", time: "Az önce" });
      saveAccountActivity(a, activity);
      toast("Arama kaydedildi ve Meldingen alanına bağlandı.");
      accountPage();
      setTimeout(() => document.querySelector('[data-account-menu="saved"]')?.click(), 40);
    });
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
      if (fav) toast(t("favAdded"));
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
    document.getElementById("modalHost").innerHTML = "";
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

  seedAccounts();
  if (page === "login") loginPage();
  else if (page === "account") accountPage();
  else if (page === "admin-login") adminLoginPage();
  else if (page === "admin") adminPage();
  else homePage();
})();
