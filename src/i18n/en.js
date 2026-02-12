export default {
    // Top bar
    appName: 'Story World',

    // Welcome
    welcomeTitle: 'Magical Stories',
    welcomeHighlight: 'Await You! ✨',
    welcomeSubtitle: 'Pick your character, choose a theme, and create unique stories together with AI!',
    startButton: 'Start Your Story!',
    featureAI: '🤖 AI Powered',
    featureVoice: '🔊 Read Aloud',
    featurePersonal: '⭐ Personalized',

    // Create
    nameTitle: "👋 What's Your Name?",
    namePlaceholder: 'Type your name...',
    themeTitle: '🌍 Pick a Theme',
    characterTitle: '🦸 Pick a Character',
    ageTitle: '🎂 Age Group',
    wishTitle: '💭 What Should Happen?',
    wishPlaceholder: 'E.g.: Make friends with a dragon...',
    createButton: 'Create Story ✨',
    back: 'Back',

    // Themes
    themeSpace: 'Space Adventure',
    themeForest: 'Enchanted Forest',
    themeOcean: 'Underwater World',
    themeFairytale: 'Fairy Tale Land',
    themeDinosaur: 'Dinosaur Age',
    themeSuperHero: 'Super Hero',

    // Characters
    charPrincess: 'Brave Princess',
    charAstronaut: 'Little Astronaut',
    charRobot: 'Friendly Robot',
    charFox: 'Curious Fox',
    charDragon: 'Friendly Dragon',
    charWizard: 'Young Wizard',

    // Age groups
    age4_6: 'Age 4-6',
    age7_9: 'Age 7-9',
    age10_12: 'Age 10-12',

    // Story
    newStory: '🔄 New Story',
    goBack: '← Start Over',
    ttsSpeed: 'Speed',

    // Loading
    loadingTitle: 'Writing your story...',
    loadingTexts: [
        'Characters are getting ready... 🎭',
        'Creating a magical world... 🌟',
        'Adventure is about to begin... 🚀',
        'Imagination is taking off... ✨',
        'Opening the pages... 📖',
    ],

    // Settings
    settings: 'Settings',
    apiKeyLabel: 'Gemini API Key',
    apiKeyPlaceholder: 'Paste your API key...',
    apiKeyHint: 'Get a free API key from Google AI Studio.',
    apiKeyLink: 'Get API Key →',
    language: 'Language',
    darkMode: 'Dark Mode',
    save: 'Save',

    // Toasts
    toastSaved: 'Settings saved! ✅',
    toastNoKey: 'Please enter an API key in settings 🔑',
    toastSelectTheme: 'Please select a theme 🌍',
    toastSelectChar: 'Please select a character 🦸',
    toastError: 'Error creating story ❌',

    // AI Prompt
    promptTemplate: `You are a creative and warm storyteller for children.
Write a story in English for children aged {age_group} based on the following details.

Theme: {theme}
Main Character: {character}
Child's Name: {child_name}
{wish_line}

Rules:
- The story should be 4-6 paragraphs
- Include the child's name in the story (as the hero or an important character)
- Use simple, clear, and age-appropriate language
- Include positive, educational, and encouraging messages
- Make it an engaging adventure that sparks imagination
- Include a short lesson/moral at the end of the story
- Write the title on the first line, then leave a blank line before the story
- Add an emoji to the title
- Leave a blank line after each paragraph
- After the last paragraph, add a "---" separator, then write a moral starting with "Moral of the Story:"`,
    wishLine: 'The child wants in the story: {wish}',
};
