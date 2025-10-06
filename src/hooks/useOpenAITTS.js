import { useState, useRef } from 'react';

export const useOpenAITTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  const speak = async (text, voice = 'nova') => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsSpeaking(true);

      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: text,
          voice: voice
        }),
      });

      if (!response.ok) {
        throw new Error('TTS API hatası');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audioRef.current.onerror = (e) => {
        console.error('Ses çalma hatası:', e);
        setIsSpeaking(false);
      };

      await audioRef.current.play();

    } catch (error) {
      console.error('TTS Hatası:', error);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  };

  return { isSpeaking, speak, stop };
};