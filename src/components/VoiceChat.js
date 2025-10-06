import React, { useState, useRef } from 'react';
import axios from 'axios';
import './VoiceChat.css';

function VoiceChat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef = useRef(null);
  const voiceModeRef = useRef(false);

  // Recognition'ı başlat
  if (!recognitionRef.current) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'tr-TR';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const spokenText = event.results[resultIndex][0].transcript;
        console.log('Konuşulan metin:', spokenText);
        
        // Sadece final sonuçları kullan
        if (event.results[resultIndex].isFinal) {
          setTranscript(spokenText);
          
          // Backend'e gönder
          sendMessageToBot(spokenText);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Ses tanıma hatası:', event.error);
        if (event.error === 'not-allowed') {
          alert('Mikrofon izni verilmedi. Lütfen tarayıcı ayarlarından izin verin.');
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Recognition sonlandı, yeniden başlatılıyor...');
        setIsListening(false);
        
        // Sesli moddaysak sürekli yeniden başlat
        if (voiceModeRef.current) {
          setTimeout(() => {
            try {
              recognitionRef.current.start();
              setIsListening(true);
              setTranscript('Dinliyorum...');
              console.log('Mikrofon yeniden başlatıldı');
            } catch (error) {
              console.error('Yeniden başlatma hatası:', error);
            }
          }, 300);
        }
      };
    }
  }

  const sendMessageToBot = async (textMessage) => {
    const userMessage = textMessage;
    
    if (!userMessage || !userMessage.trim()) return;

    console.log('Backend\'e gönderiliyor:', userMessage);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage
      });

      const botResponse = response.data.botResponse;
      console.log('Bot cevabı:', botResponse);
      
      setChatHistory(prev => [...prev, 
        { type: 'user', text: userMessage },
        { type: 'bot', text: botResponse }
      ]);
      
      speakText(botResponse);

    } catch (error) {
      console.error('Hata:', error);
      const errorMsg = 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.';
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        text: errorMsg
      }]);
      speakText(errorMsg);
    }
  };

  const startVoiceMode = () => {
    setVoiceMode(true);
    voiceModeRef.current = true;
    setTranscript('');
    setTimeout(() => {
      startListening();
    }, 500);
  };

  const closeVoiceMode = () => {
    setVoiceMode(false);
    voiceModeRef.current = false;
    stopListening();
    window.speechSynthesis.cancel();
    setTranscript('');
    setIsListening(false);
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setIsListening(true);
        setTranscript('Dinliyorum...');
        recognitionRef.current.start();
        console.log('Mikrofon başlatıldı');
      } catch (error) {
        console.error('Mikrofon başlatma hatası:', error);
        if (error.message && error.message.includes('already started')) {
          console.log('Mikrofon zaten çalışıyor');
          setIsListening(true);
        } else {
          setIsListening(false);
        }
      }
    } else {
      alert('Tarayıcınız ses tanımayı desteklemiyor. Chrome veya Edge kullanın.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        console.log('Mikrofon durduruldu');
      } catch (error) {
        console.error('Mikrofon durdurma hatası:', error);
      }
    }
  };

  const handleSendMessage = async (textMessage) => {
    const userMessage = textMessage || message;
    
    if (!userMessage.trim()) return;

    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage
      });

      const botResponse = response.data.botResponse;
      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      speakText(botResponse);

    } catch (error) {
      console.error('Hata:', error);
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' 
      }]);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        console.log('Bot konuşuyor:', text);
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log('Bot konuşması bitti');
        setIsSpeaking(false);
        
        // Sesli modda cevap bittikten sonra tekrar dinlemeye başla
        if (voiceModeRef.current) {
          setTranscript('Dinliyorum...');
          setTimeout(() => {
            setIsListening(true);
          }, 500);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Sesli Mod Ekranı
  if (voiceMode) {
    return (
      <div className="voice-mode-container">
        <button className="close-voice-mode" onClick={closeVoiceMode}>
          ✕ Kapat
        </button>

        <div className="voice-mode-content">
          {isListening && !isSpeaking && (
            <div className="microphone-animation">
              <div className="mic-icon">🎤</div>
              <div className="sound-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {isSpeaking && (
            <div className="speaking-animation">
              <div className="speaker-icon">🔊</div>
              <div className="sound-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div className="transcript-display">
            {transcript || 'Konuşmaya hazır...'}
          </div>

          <div className="voice-mode-status">
            {isListening && !isSpeaking && <p className="status-listening">🎙️ Dinliyorum...</p>}
            {isSpeaking && <p className="status-speaking">💬 Yanıtlıyorum...</p>}
            {!isListening && !isSpeaking && <p className="status-ready">Konuşmak için bekliyor...</p>}
          </div>
        </div>
      </div>
    );
  }

  // Normal Chat Ekranı
  return (
    <div className="voice-chat-container">
      <div className="chat-box">
        {chatHistory.length === 0 ? (
          <div className="empty-state">
            <p>👋 Merhaba! Size nasıl yardımcı olabilirim?</p>
            <p>Mikrofona tıklayarak konuşabilir veya yazabilirsiniz.</p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Mesajınızı yazın..."
          className="message-input"
        />
        
        <button 
          onClick={() => handleSendMessage()}
          className="send-button"
          disabled={!message.trim()}
        >
          📤 Gönder
        </button>

        <button
          onClick={startVoiceMode}
          className="mic-button"
        >
          🎤 Konuş
        </button>
      </div>

      {isSpeaking && (
        <div className="speaking-indicator">
          🔊 Bot konuşuyor...
        </div>
      )}
    </div>
  );
}

export default VoiceChat;