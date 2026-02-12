export default {
    // Top bar
    appName: 'Hikaye Dünyası',

    // Welcome
    welcomeTitle: 'Sihirli Hikayeler',
    welcomeHighlight: 'Seni Bekliyor! ✨',
    welcomeSubtitle: 'Kendi karakterini seç, temanı belirle ve yapay zeka ile birlikte eşsiz hikayeler oluştur!',
    startButton: 'Hikayene Başla!',
    featureAI: '🤖 Yapay Zeka',
    featureVoice: '🔊 Sesli Okuma',
    featurePersonal: '⭐ Kişisel Hikaye',

    // Create
    nameTitle: '👋 Adın Ne?',
    namePlaceholder: 'Adını yaz...',
    themeTitle: '🌍 Tema Seç',
    characterTitle: '🦸 Karakter Seç',
    ageTitle: '🎂 Yaş Grubu',
    wishTitle: '💭 Hikayende Ne Olsun?',
    wishPlaceholder: 'Örneğin: Bir ejderha ile arkadaş olsun...',
    createButton: 'Hikaye Oluştur ✨',
    back: 'Geri',

    // Themes
    themeSpace: 'Uzay Macerası',
    themeForest: 'Büyülü Orman',
    themeOcean: 'Denizaltı Dünyası',
    themeFairytale: 'Masal Diyarı',
    themeDinosaur: 'Dinozor Çağı',
    themeSuperHero: 'Süper Kahraman',

    // Characters
    charPrincess: 'Cesur Prenses',
    charAstronaut: 'Küçük Astronot',
    charRobot: 'Sevimli Robot',
    charFox: 'Meraklı Tilki',
    charDragon: 'Dost Ejderha',
    charWizard: 'Genç Büyücü',

    // Age groups
    age4_6: '4-6 Yaş',
    age7_9: '7-9 Yaş',
    age10_12: '10-12 Yaş',

    // Story
    newStory: '🔄 Yeni Hikaye',
    goBack: '← Başa Dön',
    ttsSpeed: 'Hız',

    // Loading
    loadingTitle: 'Hikaye yazılıyor...',
    loadingTexts: [
        'Karakterler hazırlanıyor... 🎭',
        'Sihirli dünya oluşturuluyor... 🌟',
        'Macera başlamak üzere... 🚀',
        'Hayal gücü harekete geçiyor... ✨',
        'Sayfalar açılıyor... 📖',
    ],

    // Settings
    settings: 'Ayarlar',
    apiKeyLabel: 'Gemini API Anahtarı',
    apiKeyPlaceholder: 'API anahtarınızı yapıştırın...',
    apiKeyHint: "Google AI Studio'dan ücretsiz API anahtarı alabilirsiniz.",
    apiKeyLink: 'API Anahtarı Al →',
    language: 'Dil',
    darkMode: 'Karanlık Mod',
    save: 'Kaydet',

    // Toasts
    toastSaved: 'Ayarlar kaydedildi! ✅',
    toastNoKey: 'Lütfen ayarlardan API anahtarı girin 🔑',
    toastSelectTheme: 'Lütfen bir tema seçin 🌍',
    toastSelectChar: 'Lütfen bir karakter seçin 🦸',
    toastError: 'Hikaye oluşturulurken hata oluştu ❌',

    // AI Prompt
    promptTemplate: `Sen çocuklar için hikaye yazan yaratıcı ve sıcak bir yazarsın.
Aşağıdaki bilgilere göre {age_group} yaş grubu çocuklar için Türkçe bir hikaye yaz.

Tema: {theme}
Ana Karakter: {character}
Çocuğun Adı: {child_name}
{wish_line}

Kurallar:
- Hikaye 4-6 paragraf olsun
- Çocuğun adı hikayede geçsin (hikayenin kahramanı veya önemli bir karakter olarak)
- Dil basit, anlaşılır ve yaşa uygun olsun
- Pozitif, eğitici ve cesaret verici mesajlar içersin
- İlgi çekici ve hayal gücünü ateşleyen bir macera olsun
- Hikayenin sonunda kısa bir ders/moral olsun
- Başlığı ilk satıra yaz, sonra boş satır bırakıp hikayeye başla
- Başlığa emoji ekle
- Her paragraftan sonra boş satır bırak
- Son paragraftan sonra "---" ayracı koy, sonra "Hikayenin Dersi:" ile başlayan bir moral yaz`,
    wishLine: 'Çocuğun hikayede istediği: {wish}',
};
