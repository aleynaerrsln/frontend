import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // Sesleri yükle
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Sesler yüklendiğinde
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Türkçe kadın sesi seç (öncelik sırasına göre)
      const turkishFemaleVoices = voices.filter(voice => 
        voice.lang.startsWith('tr') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('kadın') ||
         voice.name.includes('Filiz') || // Microsoft Filiz (Türkçe kadın)
         voice.name.includes('Yelda') || // Google Türkçe kadın
         voice.name.includes('Zeynep')) // Türkçe kadın isimleri
      );

      // Eğer kadın sesi yoksa, herhangi bir Türkçe ses
      const turkishVoices = voices.filter(voice => voice.lang.startsWith('tr'));
      
      // En iyi sesi seç
      if (turkishFemaleVoices.length > 0) {
        utterance.voice = turkishFemaleVoices[0];
      } else if (turkishVoices.length > 0) {
        utterance.voice = turkishVoices[0];
      }

      // Profesyonel ses ayarları
      utterance.lang = 'tr-TR';
      utterance.rate = 0.95;    // Biraz daha yavaş, net konuşma
      utterance.pitch = 1.1;    // Biraz daha tiz, kadınsı ton
      utterance.volume = 1.0;   // Maksimum ses

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error('Ses hatası:', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return { isSpeaking, speak };
};