import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useAudioLevel } from '../hooks/useAudioLevel';
import ChatWindow from './ChatWindow';

export default function VoiceAssistant() {
  const [showChat, setShowChat] = useState(false);
  const [showVoiceMode, setShowVoiceMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const { isListening, transcript, startListening } = useSpeechRecognition();
  const { isSpeaking, speak } = useTextToSpeech();
  const audioLevel = useAudioLevel(isListening);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleVoiceResult = async (text) => {
    if (!text || !text.trim()) return;

    console.log('Backend\'e gönderiliyor:', text);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: text
      });

      const botResponse = response.data.botResponse;
      console.log('Bot cevabı:', botResponse);
      
      setChatHistory(prev => [...prev, 
        { type: 'user', text: text },
        { type: 'bot', text: botResponse }
      ]);
      
      speak(botResponse);
    } catch (error) {
      console.error('Hata:', error);
      const errorMsg = 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.';
      setChatHistory(prev => [...prev, 
        { type: 'user', text: text },
        { type: 'bot', text: errorMsg }
      ]);
      speak(errorMsg);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage
      });

      const botResponse = response.data.botResponse;
      
      setChatHistory(prev => [...prev, 
        { type: 'user', text: userMessage },
        { type: 'bot', text: botResponse }
      ]);
      
      speak(botResponse);
    } catch (error) {
      console.error('Hata:', error);
      setChatHistory(prev => [...prev, 
        { type: 'user', text: userMessage },
        { type: 'bot', text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' }
      ]);
    }
  };

  const handleStartListening = () => {
    startListening(handleVoiceResult);
  };

  return (
    <>
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#000000',
            border: '3px solid #FFD700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = '#FFD700';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#000000';
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: '#FFD700' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {showChat && (
        <ChatWindow
          showVoiceMode={showVoiceMode}
          setShowVoiceMode={setShowVoiceMode}
          setShowChat={setShowChat}
          isListening={isListening}
          isSpeaking={isSpeaking}
          transcript={transcript}
          audioLevel={audioLevel}
          startListening={handleStartListening}
          chatHistory={chatHistory}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          chatEndRef={chatEndRef}
        />
      )}
    </>
  );
}