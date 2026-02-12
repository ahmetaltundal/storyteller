import { i18n } from '../i18n';
import { storage } from './storage';

const API_BASE =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const StoryAI = {
    async getApiKey() {
        return (await storage.get('api_key')) || '';
    },

    async setApiKey(key) {
        await storage.set('api_key', key.trim());
    },

    async hasApiKey() {
        const key = await this.getApiKey();
        return key.length > 0;
    },

    /**
     * Generate a story based on user selections
     */
    async generateStory({ theme, character, childName, ageGroup, wish }) {
        const apiKey = await this.getApiKey();
        if (!apiKey) throw new Error('NO_API_KEY');

        const prompt = this.buildPrompt({ theme, character, childName, ageGroup, wish });

        try {
            const response = await fetch(`${API_BASE}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.9,
                        topP: 0.95,
                        topK: 40,
                        maxOutputTokens: 2048,
                    },
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
                    ],
                }),
            });

            if (!response.ok) {
                if (response.status === 400) throw new Error('INVALID_API_KEY');
                throw new Error(`API_ERROR: ${response.status}`);
            }

            const data = await response.json();
            if (!data.candidates?.length) throw new Error('NO_RESPONSE');

            const text = data.candidates[0].content?.parts?.[0]?.text;
            if (!text) throw new Error('EMPTY_RESPONSE');

            return this.parseStory(text);
        } catch (error) {
            if (['NO_API_KEY', 'INVALID_API_KEY', 'API_ERROR', 'NO_RESPONSE', 'EMPTY_RESPONSE'].some(
                (e) => error.message.startsWith(e)
            )) {
                throw error;
            }
            throw new Error('NETWORK_ERROR');
        }
    },

    buildPrompt({ theme, character, childName, ageGroup, wish }) {
        let prompt = i18n.t('promptTemplate');
        prompt = prompt.replace('{age_group}', ageGroup || '4-6');
        prompt = prompt.replace('{theme}', theme);
        prompt = prompt.replace('{character}', character);
        prompt = prompt.replace('{child_name}', childName || (i18n.getLang() === 'tr' ? 'Küçük Kaşif' : 'Little Explorer'));

        if (wish?.trim()) {
            prompt = prompt.replace('{wish_line}', i18n.t('wishLine').replace('{wish}', wish));
        } else {
            prompt = prompt.replace('{wish_line}', '');
        }
        return prompt;
    },

    parseStory(text) {
        const lines = text.trim().split('\n');

        // Extract title
        let title = '';
        let bodyStartIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                title = line.replace(/^#+\s*/, '').replace(/^\*+|\*+$/g, '').trim();
                bodyStartIndex = i + 1;
                break;
            }
        }

        const bodyText = lines.slice(bodyStartIndex).join('\n');
        let moral = '';
        let storyText = bodyText;

        const separators = ['---', 'Hikayenin Dersi:', 'Moral of the Story:', 'Ders:', 'Moral:'];
        for (const sep of separators) {
            const idx = bodyText.lastIndexOf(sep);
            if (idx !== -1) {
                storyText = bodyText.substring(0, idx).trim();
                let moralText = bodyText.substring(idx).replace(/^---\s*/, '').replace(/^\*+|\*+$/g, '').trim();
                if (moralText) moral = moralText;
                break;
            }
        }

        const paragraphs = storyText
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter((p) => p.length > 0 && p !== '---')
            .map((p) => p.replace(/^\*+|\*+$/g, '').trim());

        return { title: title || '📖 Story', paragraphs, moral };
    },
};
