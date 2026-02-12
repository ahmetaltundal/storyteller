import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    StatusBar,
    Linking,
    Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients, Spacing, Radius, Colors } from '../theme';
import { i18n } from '../i18n';
import { StoryAI } from '../services/ai';
import MagicButton from '../components/MagicButton';

export default function SettingsScreen({ navigation }) {
    const [apiKey, setApiKey] = useState('');
    const [lang, setLang] = useState(i18n.getLang());
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        (async () => {
            const key = await StoryAI.getApiKey();
            if (key) setApiKey(key);
        })();
    }, []);

    const handleSave = async () => {
        await StoryAI.setApiKey(apiKey);
        await i18n.setLang(lang);
        Alert.alert('✅', i18n.t('toastSaved'));
    };

    const openAIStudio = () => {
        Linking.openURL('https://aistudio.google.com/app/apikey');
    };

    return (
        <LinearGradient colors={Gradients.hero} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.title}>{i18n.t('settings')}</Text>

                    {/* API Key */}
                    <Text style={styles.label}>{i18n.t('apiKeyLabel')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t('apiKeyPlaceholder')}
                        placeholderTextColor="#999"
                        value={apiKey}
                        onChangeText={setApiKey}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={styles.hint}>
                        {i18n.t('apiKeyHint')}{' '}
                        <Text style={styles.link} onPress={openAIStudio}>
                            {i18n.t('apiKeyLink')}
                        </Text>
                    </Text>

                    {/* Language */}
                    <Text style={[styles.label, { marginTop: Spacing.xl }]}>
                        {i18n.t('language')}
                    </Text>
                    <View style={styles.langRow}>
                        <TouchableOpacity
                            onPress={() => setLang('tr')}
                            style={[styles.langBtn, lang === 'tr' && styles.langBtnActive]}
                        >
                            <Text style={[styles.langText, lang === 'tr' && styles.langTextActive]}>
                                🇹🇷 Türkçe
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setLang('en')}
                            style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
                        >
                            <Text style={[styles.langText, lang === 'en' && styles.langTextActive]}>
                                🇬🇧 English
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Save */}
                    <View style={styles.saveWrap}>
                        <MagicButton title={i18n.t('save')} icon="💾" onPress={handleSave} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing['3xl'],
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: Radius.xl,
        padding: Spacing.xl,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1E1B4B',
        marginBottom: Spacing.xl,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: Spacing.sm,
    },
    input: {
        backgroundColor: '#F8F5FF',
        borderRadius: Radius.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1E1B4B',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    hint: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: Spacing.xs,
        lineHeight: 20,
    },
    link: {
        color: '#7C3AED',
        fontWeight: '700',
    },
    langRow: {
        flexDirection: 'row',
        gap: 12,
    },
    langBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: Radius.md,
        backgroundColor: '#F8F5FF',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    langBtnActive: {
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124,58,237,0.08)',
    },
    langText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6B7280',
    },
    langTextActive: {
        color: '#7C3AED',
        fontWeight: '700',
    },
    saveWrap: {
        alignItems: 'center',
        marginTop: Spacing['2xl'],
    },
});
