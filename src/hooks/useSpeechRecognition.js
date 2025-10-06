import { useState, useRef, useEffect, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const onResultCallback = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'tr-TR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const spokenText = event.results[resultIndex][0].transcript;
        
        if (event.results[resultIndex].isFinal) {
          setTranscript(spokenText);
          setIsListening(false);
          if (onResultCallback.current) {
            onResultCallback.current(spokenText);
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Ses tanıma hatası:', event.error);
        setIsListening(false);
        setTranscript('');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Recognition temizleme');
        }
      }
    };
  }, []);

  const startListening = useCallback((callback) => {
    onResultCallback.current = callback;
    
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        setTranscript('Dinliyorum...');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Mikrofon başlatma hatası:', error);
        setIsListening(false);
        setTranscript('');
      }
    }
  }, [isListening]);

  return { isListening, transcript, startListening };
};