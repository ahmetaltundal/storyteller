import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients, Radius } from '../theme';

export default function MagicButton({ title, icon, onPress, style, variant = 'primary' }) {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    if (variant === 'secondary') {
        return (
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    activeOpacity={0.8}
                    style={styles.secondary}
                >
                    {icon && <Text style={styles.icon}>{icon}</Text>}
                    <Text style={styles.secondaryText}>{title}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={Gradients.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {icon && <Text style={styles.icon}>{icon}</Text>}
                    <Text style={styles.text}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: Radius.full,
        gap: 8,
        shadowColor: '#EC4899',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 8,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
    },
    icon: {
        fontSize: 22,
    },
    secondary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: Radius.full,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.25)',
        gap: 6,
    },
    secondaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
