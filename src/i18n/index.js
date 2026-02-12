import tr from './tr';
import en from './en';
import { storage } from '../services/storage';

const translations = { tr, en };
let currentLang = 'tr';
let listeners = [];

export const i18n = {
    async init() {
        const saved = await storage.get('lang');
        if (saved && translations[saved]) {
            currentLang = saved;
        }
    },

    t(key) {
        return translations[currentLang]?.[key] || translations['en']?.[key] || key;
    },

    getLang() {
        return currentLang;
    },

    async setLang(lang) {
        if (translations[lang]) {
            currentLang = lang;
            await storage.set('lang', lang);
            listeners.forEach((fn) => fn(lang));
        }
    },

    onChange(fn) {
        listeners.push(fn);
        return () => {
            listeners = listeners.filter((l) => l !== fn);
        };
    },
};
