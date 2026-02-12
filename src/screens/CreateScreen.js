import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients, Spacing, Radius, ThemeOptions, CharacterOptions, AgeGroups } from '../theme';
import { i18n } from '../i18n';
import { StoryAI } from '../services/ai';
import SelectionCard from '../components/SelectionCard';
import MagicButton from '../components/MagicButton';

export default function CreateScreen({ navigation }) {
    const [childName, setChildName] = useState('');
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedChar, setSelectedChar] = useState(null);
    const [selectedAge, setSelectedAge] = useState('4-6');
    const [wish, setWish] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        const hasKey = await StoryAI.hasApiKey();
        if (!hasKey) {
            Alert.alert('🔑', i18n.t('toastNoKey'), [
                { text: 'OK', onPress: () => navigation.navigate('Settings') },
            ]);
            return;
        }
        if (!selectedTheme) {
            Alert.alert('🌍', i18n.t('toastSelectTheme'));
            return;
        }
        if (!selectedChar) {
            Alert.alert('🦸', i18n.t('toastSelectChar'));
            return;
        }

        const theme = ThemeOptions.find((t) => t.id === selectedTheme);
        const character = CharacterOptions.find((c) => c.id === selectedChar);

        setLoading(true);
        try {
            const story = await StoryAI.generateStory({
                theme: i18n.t(theme.labelKey),
                character: i18n.t(character.labelKey),
                childName: childName.trim() || undefined,
                ageGroup: selectedAge,
                wish: wish.trim(),
            });

            navigation.navigate('Story', {
                story,
                themeEmoji: theme.emoji,
                charEmoji: character.emoji,
            });
        } catch (error) {
            let message = error.message;
            if (message === 'API_BUSY_TRY_AGAIN') {
                message = i18n.t('apiBusy');
            } else if (message.startsWith('API_ERROR: 429')) {
                message = i18n.t('apiBusy');
            }
            Alert.alert('❌', i18n.t('toastError') + '\n' + message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={Gradients.hero} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Name Input */}
                <Text style={styles.sectionTitle}>{i18n.t('nameTitle')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={i18n.t('namePlaceholder')}
                    placeholderTextColor="#999"
                    value={childName}
                    onChangeText={setChildName}
                    maxLength={30}
                />

                {/* Theme Selection */}
                <Text style={styles.sectionTitle}>{i18n.t('themeTitle')}</Text>
                <View style={styles.grid}>
                    {ThemeOptions.map((theme) => (
                        <View key={theme.id} style={styles.gridItem}>
                            <SelectionCard
                                emoji={theme.emoji}
                                label={i18n.t(theme.labelKey)}
                                selected={selectedTheme === theme.id}
                                colors={theme.colors}
                                onPress={() => setSelectedTheme(theme.id)}
                            />
                        </View>
                    ))}
                </View>

                {/* Character Selection */}
                <Text style={styles.sectionTitle}>{i18n.t('characterTitle')}</Text>
                <View style={styles.grid}>
                    {CharacterOptions.map((char) => (
                        <View key={char.id} style={styles.gridItem}>
                            <SelectionCard
                                emoji={char.emoji}
                                label={i18n.t(char.labelKey)}
                                selected={selectedChar === char.id}
                                onPress={() => setSelectedChar(char.id)}
                            />
                        </View>
                    ))}
                </View>

                {/* Age Group */}
                <Text style={styles.sectionTitle}>{i18n.t('ageTitle')}</Text>
                <View style={styles.ageRow}>
                    {AgeGroups.map((age) => (
                        <TouchableOpacity
                            key={age.id}
                            onPress={() => setSelectedAge(age.id)}
                            style={[styles.ageBtn, selectedAge === age.id && styles.ageBtnSelected]}
                        >
                            <Text style={[styles.ageBtnText, selectedAge === age.id && styles.ageBtnTextSelected]}>
                                {i18n.t(age.labelKey)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Wish */}
                <Text style={styles.sectionTitle}>{i18n.t('wishTitle')}</Text>
                <TextInput
                    style={[styles.input, styles.wishInput]}
                    placeholder={i18n.t('wishPlaceholder')}
                    placeholderTextColor="#999"
                    value={wish}
                    onChangeText={setWish}
                    multiline
                    maxLength={200}
                />

                {/* Create Button */}
                <View style={styles.createBtn}>
                    <MagicButton
                        title={loading ? '...' : i18n.t('createButton')}
                        icon={loading ? '⏳' : '✨'}
                        onPress={handleCreate}
                    />
                </View>

                <View style={{ height: 40 }} />
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: Spacing.md,
        marginTop: Spacing.lg,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: Radius.lg,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#1E1B4B',
        borderWidth: 2,
        borderColor: 'rgba(124,58,237,0.1)',
    },
    wishInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    gridItem: {
        width: '30%',
        flexGrow: 1,
    },
    ageRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    ageBtn: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderWidth: 2,
        borderColor: 'rgba(124,58,237,0.1)',
    },
    ageBtnSelected: {
        backgroundColor: '#7C3AED',
        borderColor: '#7C3AED',
    },
    ageBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E1B4B',
    },
    ageBtnTextSelected: {
        color: '#FFFFFF',
    },
    createBtn: {
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
});
