import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadows, Radius } from '../theme';

export default function SelectionCard({ emoji, label, selected, onPress, colors }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[styles.card, selected && styles.cardSelected]}
        >
            {selected && colors && (
                <LinearGradient
                    colors={[...colors.map((c) => c + '22')]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            )}
            <Text style={[styles.emoji, selected && styles.emojiSelected]}>{emoji}</Text>
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
            {selected && (
                <View style={styles.check}>
                    <Text style={styles.checkText}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: Radius.lg,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(124,58,237,0.08)',
        overflow: 'hidden',
        ...Shadows.sm,
    },
    cardSelected: {
        borderColor: '#7C3AED',
        ...Shadows.glow,
    },
    emoji: {
        fontSize: 36,
        marginBottom: 6,
    },
    emojiSelected: {
        fontSize: 40,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1E1B4B',
        textAlign: 'center',
    },
    labelSelected: {
        color: '#7C3AED',
    },
    check: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#7C3AED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
});
