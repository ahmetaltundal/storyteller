import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients, Spacing } from '../theme';
import { i18n } from '../i18n';
import MagicButton from '../components/MagicButton';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const bookBounce = useRef(new Animated.Value(0)).current;
    const badgeFades = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
    ];

    useEffect(() => {
        // Main content fade in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Book floating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(bookBounce, {
                    toValue: -15,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(bookBounce, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Badge staggered fade in
        badgeFades.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: 800 + index * 200,
                useNativeDriver: true,
            }).start();
        });
    }, []);

    const features = [
        i18n.t('featureAI'),
        i18n.t('featureVoice'),
        i18n.t('featurePersonal'),
    ];

    return (
        <LinearGradient
            colors={Gradients.hero}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar barStyle="light-content" />

            {/* Floating Stars */}
            <Stars />

            <Animated.View
                style={[
                    styles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                {/* Book Emoji */}
                <Animated.Text
                    style={[styles.bookEmoji, { transform: [{ translateY: bookBounce }] }]}
                >
                    📖
                </Animated.Text>

                {/* Title */}
                <Text style={styles.title}>{i18n.t('welcomeTitle')}</Text>
                <Text style={styles.titleHighlight}>{i18n.t('welcomeHighlight')}</Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>{i18n.t('welcomeSubtitle')}</Text>

                {/* Start Button */}
                <MagicButton
                    title={i18n.t('startButton')}
                    icon="✨"
                    onPress={() => navigation.navigate('Create')}
                    style={{ marginTop: Spacing.xl }}
                />

                {/* Feature Badges */}
                <View style={styles.badges}>
                    {features.map((feat, idx) => (
                        <Animated.View
                            key={idx}
                            style={[styles.badge, { opacity: badgeFades[idx] }]}
                        >
                            <Text style={styles.badgeText}>{feat}</Text>
                        </Animated.View>
                    ))}
                </View>
            </Animated.View>
        </LinearGradient>
    );
}

/* Simple star particles */
function Stars() {
    const stars = useRef(
        Array.from({ length: 30 }, () => ({
            left: Math.random() * width,
            top: Math.random() * 800,
            size: 2 + Math.random() * 3,
            delay: Math.random() * 3000,
            duration: 2000 + Math.random() * 3000,
        }))
    ).current;

    return (
        <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
            {stars.map((star, i) => (
                <StarDot key={i} {...star} />
            ))}
        </View>
    );
}

function StarDot({ left, top, size, delay, duration }) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: duration / 2,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: duration / 2,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left,
                top,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#FFF',
                opacity,
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing['3xl'],
    },
    bookEmoji: {
        fontSize: 80,
        marginBottom: Spacing.lg,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 10 },
        textShadowRadius: 20,
    },
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    titleHighlight: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FBBF24',
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 26,
        maxWidth: 340,
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginTop: Spacing['2xl'],
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    badgeText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '600',
    },
});
