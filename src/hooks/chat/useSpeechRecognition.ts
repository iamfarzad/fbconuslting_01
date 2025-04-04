"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Check for SpeechRecognition API availability safely
let SpeechRecognitionAPI: any = null;
let isSpeechRecognitionSupported = false;

// Moved check inside useEffect

export const useSpeechRecognition = (continuous: boolean = false): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null); // Use 'any' as type varies across browsers

  // Define stopListening early so it can be used in useEffect's dependency array if needed
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  // Initialize SpeechRecognition
  useEffect(() => {
    // Perform the check inside useEffect to ensure it runs client-side
    if (typeof window !== 'undefined') {
      SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      isSpeechRecognitionSupported = !!SpeechRecognitionAPI;
    }

    if (!isSpeechRecognitionSupported || !SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return; // Exit early if not supported
    }
    
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = continuous; // Keep listening vs. stop after pause
    recognition.interimResults = true; // Get results as they come in
    recognition.lang = 'en-US'; // Default language, could be made configurable

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Update with final transcript first, then potentially interim
      setTranscript(finalTranscript || interimTranscript); 
      // If continuous is false, stop listening when a final result is received
      if (!continuous && finalTranscript) {
         stopListening(); // Call the defined stopListening
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false); // Ensure listening state is reset on error
    };

    recognition.onend = () => {
      // Only set listening to false if it wasn't manually stopped
      // and continuous mode is off (or naturally ended)
      if (recognitionRef.current && !continuous) { 
         setIsListening(false);
      }
      // If continuous, it might restart automatically or need manual restart
    };

    recognitionRef.current = recognition;

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  // Pass stopListening in dependency array
  }, [continuous, stopListening]); 

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript(''); // Clear previous transcript
        setError(null);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        // Handle cases where start() is called prematurely
        console.error("Error starting speech recognition:", err);
        setError("Could not start listening.");
        setIsListening(false);
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported: isSpeechRecognitionSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
};
