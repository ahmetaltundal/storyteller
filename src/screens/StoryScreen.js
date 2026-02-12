import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Gradients, Spacing, Radius, Shadows } from '../theme';
import { i18n } from '../i18n';
import { TTS } from '../services/tts';
import MagicButton from '../components/MagicButton';

export default function StoryScreen({ route, navigation }) {
    const { story, themeEmoji, charEmoji } = route.params;
    const [ttsState, setTtsState] = useState({ isPlaying: false, isPaused: false });
    const [speed, setSpeed] = useState(0.85);

    // Paragraph animations
    const paragraphAnims = useRef(
        story.paragraphs.map(() => new Animated.Value(0))
    ).current;
    const moralAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Stagger paragraph animations
        const animations = paragraphAnims.map((anim, i) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                delay: 200 + i * 200,
                useNativeDriver: true,
            })
        );

        Animated.parallel([
            ...animations,
            Animated.timing(moralAnim, {
                toValue: 1,
                duration: 600,
                delay: 200 + story.paragraphs.length * 200,
                useNativeDriver: true,
            }),
        ]).start();

        // TTS state
        TTS.setOnStateChange(setTtsState);

        return () => {
            TTS.stop();
        };
    }, []);

    const fullText =
        story.paragraphs.join('. ') + (story.moral ? '. ' + story.moral : '');

    const handlePlayPause = () => {
        TTS.togglePlayPause(fullText);
    };

    const handleStop = () => {
        TTS.stop();
    };

    const handleSpeedChange = (val) => {
        setSpeed(val);
        TTS.setSpeed(val);
    };

    const handleNewStory = () => {
        TTS.stop();
        navigation.goBack();
    };

    const handleGoHome = () => {
        TTS.stop();
        navigation.popToTop();
    };

    return (
        <LinearGradient colors={Gradients.hero} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Story Card */}
                <View style={styles.card}>
                    {/* Magic Top Line */}
                    <LinearGradient colors={Gradients.magic} style={styles.topLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

                    {/* Title */}
                    <Text style={styles.titleEmoji}>
                        {themeEmoji} {charEmoji}
                    </Text>
                    <Text style={styles.title}>{story.title}</Text>

                    {/* Paragraphs */}
                    <View style={styles.body}>
                        {story.paragraphs.map((p, i) => (
                            <Animated.Text
                                key={i}
                                style={[
                                    styles.paragraph,
                                    {
                                        opacity: paragraphAnims[i],
                                        transform: [
                                            {
                                                translateY: paragraphAnims[i].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [20, 0],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                {p}
                            </Animated.Text>
                        ))}
                    </View>

                    {/* Moral */}
                    {story.moral ? (
                        <Animated.View
                            style={[
                                styles.moralBox,
                                {
                                    opacity: moralAnim,
                                    transform: [
                                        {
                                            translateY: moralAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.moralText}>{story.moral}</Text>
                        </Animated.View>
                    ) : null}

                    {/* TTS Controls */}
                    <View style={styles.ttsBar}>
                        <TouchableOpacity
                            onPress={handlePlayPause}
                            style={[styles.ttsBtn, styles.ttsPlayBtn]}
                        >
                            <Text style={styles.ttsBtnText}>
                                {ttsState.isPlaying && !ttsState.isPaused ? '⏸' : '▶️'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleStop} style={[styles.ttsBtn, styles.ttsStopBtn]}>
                            <Text style={styles.ttsBtnText}>⏹</Text>
                        </TouchableOpacity>

                        <View style={styles.speedControl}>
                            <Text style={styles.speedLabel}>{i18n.t('ttsSpeed')}</Text>
                            <View style={styles.sliderWrap}>
                                <Text style={styles.speedVal}>{speed.toFixed(1)}x</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <MagicButton
                        title={i18n.t('newStory')}
                        variant="secondary"
                        onPress={handleNewStory}
                    />
                    <MagicButton
                        title={i18n.t('goBack')}
                        variant="secondary"
                        onPress={handleGoHome}
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
    card: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: Radius.xl,
        overflow: 'hidden',
        ...Shadows.lg,
    },
    topLine: {
        height: 4,
        width: '100%',
    },
    titleEmoji: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: Spacing.xl,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E1B4B',
        textAlign: 'center',
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.sm,
        marginBottom: Spacing.lg,
        lineHeight: 32,
    },
    body: {
        paddingHorizontal: Spacing.lg,
    },
    paragraph: {
        fontSize: 17,
        lineHeight: 30,
        color: '#1E1B4B',
        marginBottom: Spacing.lg,
    },
    moralBox: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.sm,
        marginBottom: Spacing.lg,
        padding: Spacing.lg,
        backgroundColor: 'rgba(124,58,237,0.06)',
        borderRadius: Radius.lg,
        borderLeftWidth: 4,
        borderLeftColor: '#7C3AED',
    },
    moralText: {
        fontSize: 15,
        fontWeight: '600',
        fontStyle: 'italic',
        color: '#7C3AED',
        lineHeight: 24,
    },
    ttsBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        backgroundColor: 'rgba(124,58,237,0.04)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(124,58,237,0.08)',
    },
    ttsBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ttsPlayBtn: {
        backgroundColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    ttsStopBtn: {
        backgroundColor: 'rgba(124,58,237,0.1)',
    },
    ttsBtnText: {
        fontSize: 20,
    },
    speedControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginLeft: 8,
    },
    speedLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    sliderWrap: {
        alignItems: 'center',
    },
    speedVal: {
        fontSize: 13,
        fontWeight: '700',
        color: '#7C3AED',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: Spacing.xl,
        flexWrap: 'wrap',
    },
});
