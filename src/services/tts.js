import * as Speech from 'expo-speech';
import { i18n } from '../i18n';

let onStateChange = null;

export const TTS = {
    isPlaying: false,
    isPaused: false,
    speed: 0.85,

    setOnStateChange(fn) {
        onStateChange = fn;
    },

    speak(text) {
        this.stop();
        const lang = i18n.getLang() === 'tr' ? 'tr-TR' : 'en-US';

        Speech.speak(text, {
            language: lang,
            rate: this.speed,
            pitch: 1.1,
            onStart: () => {
                this.isPlaying = true;
                this.isPaused = false;
                this._notify();
            },
            onDone: () => {
                this.isPlaying = false;
                this.isPaused = false;
                this._notify();
            },
            onError: () => {
                this.isPlaying = false;
                this.isPaused = false;
                this._notify();
            },
        });

        this.isPlaying = true;
        this._notify();
    },

    pause() {
        if (this.isPlaying && !this.isPaused) {
            Speech.pause();
            this.isPaused = true;
            this._notify();
        }
    },

    resume() {
        if (this.isPaused) {
            Speech.resume();
            this.isPaused = false;
            this._notify();
        }
    },

    togglePlayPause(text) {
        if (this.isPaused) {
            this.resume();
        } else if (this.isPlaying) {
            this.pause();
        } else {
            this.speak(text);
        }
    },

    stop() {
        Speech.stop();
        this.isPlaying = false;
        this.isPaused = false;
        this._notify();
    },

    setSpeed(s) {
        this.speed = s;
    },

    _notify() {
        onStateChange?.({ isPlaying: this.isPlaying, isPaused: this.isPaused });
    },
};
