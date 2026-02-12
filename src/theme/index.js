/* ═══════════════════════════════════════════════════
   AI Storyteller - Theme / Design Tokens
   ═══════════════════════════════════════════════════ */

export const Colors = {
    light: {
        background: '#F8F5FF',
        surface: '#FFFFFF',
        surfaceGlass: 'rgba(255,255,255,0.85)',
        textPrimary: '#1E1B4B',
        textSecondary: '#6B7280',
        textAccent: '#7C3AED',
        border: 'rgba(124,58,237,0.12)',
    },
    dark: {
        background: '#0F0A1E',
        surface: '#1A1333',
        surfaceGlass: 'rgba(30,20,60,0.85)',
        textPrimary: '#F0E6FF',
        textSecondary: '#A78BFA',
        textAccent: '#C4B5FD',
        border: 'rgba(168,85,247,0.25)',
    },
    // Shared accent colors
    purple: '#7C3AED',
    pink: '#EC4899',
    orange: '#F97316',
    blue: '#3B82F6',
    teal: '#14B8A6',
    green: '#22C55E',
    yellow: '#FBBF24',
    red: '#EF4444',
};

export const Gradients = {
    hero: ['#667EEA', '#764BA2', '#F093FB'],
    magic: ['#A855F7', '#EC4899', '#F97316'],
    ocean: ['#0EA5E9', '#6366F1'],
    forest: ['#22C55E', '#14B8A6'],
    sunset: ['#F97316', '#EC4899'],
    night: ['#1E1B4B', '#312E81', '#4C1D95'],
    button: ['#F97316', '#EC4899', '#A855F7'],
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
};

export const Radius = {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    full: 9999,
};

export const Fonts = {
    regular: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semiBold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
    extraBold: { fontWeight: '800' },
};

export const Shadows = {
    sm: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    md: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 5,
    },
    lg: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 40,
        elevation: 10,
    },
    glow: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 8,
    },
};

// Theme data for story creation
export const ThemeOptions = [
    { id: 'space', emoji: '🚀', labelKey: 'themeSpace', colors: Gradients.ocean },
    { id: 'forest', emoji: '🌳', labelKey: 'themeForest', colors: Gradients.forest },
    { id: 'ocean', emoji: '🐠', labelKey: 'themeOcean', colors: Gradients.ocean },
    { id: 'fairytale', emoji: '🏰', labelKey: 'themeFairytale', colors: Gradients.sunset },
    { id: 'dinosaur', emoji: '🦕', labelKey: 'themeDinosaur', colors: Gradients.forest },
    { id: 'superhero', emoji: '🦸', labelKey: 'themeSuperHero', colors: Gradients.sunset },
];

export const CharacterOptions = [
    { id: 'princess', emoji: '👸', labelKey: 'charPrincess' },
    { id: 'astronaut', emoji: '🧑‍🚀', labelKey: 'charAstronaut' },
    { id: 'robot', emoji: '🤖', labelKey: 'charRobot' },
    { id: 'fox', emoji: '🦊', labelKey: 'charFox' },
    { id: 'dragon', emoji: '🐉', labelKey: 'charDragon' },
    { id: 'wizard', emoji: '🧙', labelKey: 'charWizard' },
];

export const AgeGroups = [
    { id: '4-6', labelKey: 'age4_6' },
    { id: '7-9', labelKey: 'age7_9' },
    { id: '10-12', labelKey: 'age10_12' },
];
