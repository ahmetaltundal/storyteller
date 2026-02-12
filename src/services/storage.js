import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'storyteller_';

export const storage = {
    async get(key) {
        try {
            return await AsyncStorage.getItem(PREFIX + key);
        } catch {
            return null;
        }
    },

    async set(key, value) {
        try {
            await AsyncStorage.setItem(PREFIX + key, value);
        } catch (e) {
            console.warn('Storage set error:', e);
        }
    },

    async remove(key) {
        try {
            await AsyncStorage.removeItem(PREFIX + key);
        } catch (e) {
            console.warn('Storage remove error:', e);
        }
    },
};
