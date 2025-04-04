"use client";

import { useState, useEffect, useCallback, useRef } from 'react'; // Import useRef

interface SpeechSynthesisHook {
  speak: (text: string, lang?: string, voiceName?: string) => void;
  cancel: () => void;
  isPlaying: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  error: string | null;
}

const isSpeechSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices when available
  const populateVoiceList = useCallback(() => {
    if (!isSpeechSynthesisSupported) return;
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    }
  }, []);

  useEffect(() => {
    if (!isSpeechSynthesisSupported) {
      setError('Speech synthesis is not supported in this browser.');
      return;
    }

    // Initial population
    populateVoiceList();

    // Browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = populateVoiceList;

    // Cleanup
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      // Cancel any ongoing speech when the hook unmounts
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [populateVoiceList]);

  const speak = useCallback((text: string, lang: string = 'en-US', voiceName?: string) => {
    if (!isSpeechSynthesisSupported || isPlaying) return;

    // Cancel previous speech if any
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance; // Store ref

    utterance.lang = lang;
    utterance.rate = 1; // Adjust rate as needed (0.1 to 10)
    utterance.pitch = 1; // Adjust pitch as needed (0 to 2)

    // Try to find the requested voice
    if (voiceName) {
      const selectedVoice = voices.find(voice => voice.name === voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        console.warn(`Voice "${voiceName}" not found. Using default.`);
      }
    } else {
       // Optionally select a default preferred voice if none specified
       const defaultVoice = voices.find(voice => voice.lang === lang && voice.default);
       if (defaultVoice) utterance.voice = defaultVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setError(null);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setError(`Speech synthesis error: ${event.error}`);
      setIsPlaying(false);
      utteranceRef.current = null;
    };

    window.speechSynthesis.speak(utterance);

  }, [isPlaying, voices]); // Depend on voices array

  const cancel = useCallback(() => {
    if (!isSpeechSynthesisSupported || !isPlaying) return;
    window.speechSynthesis.cancel(); // This triggers the 'onend' event
    setIsPlaying(false); // Explicitly set state just in case
    utteranceRef.current = null;
  }, [isPlaying]);

  return {
    speak,
    cancel,
    isPlaying,
    isSupported: isSpeechSynthesisSupported,
    voices,
    error,
  };
};
