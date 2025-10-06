import React from 'react';
import VoiceMode from './VoiceMode';

export default function ChatWindow({
  showVoiceMode,
  setShowVoiceMode,
  setShowChat,
  isListening,
  isSpeaking,
  transcript,
  audioLevel,
  startListening,
  chatHistory,
  message,
  setMessage,
  handleSendMessage,
  chatEndRef
}) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '380px',
      height: '600px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      border: '2px solid #FFD700',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#000000',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #FFD700'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isSpeaking ? '#ff4444' : isListening ? '#ffaa00' : '#00ff00',
            animation: (isSpeaking || isListening) ? 'pulse 1s infinite' : 'none'
          }}></div>
          <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '16px' }}>
            {isSpeaking ? 'Konuşuyor...' : isListening ? 'Dinliyor...' : 'Sesli Asistan'}
          </span>
        </div>
        <button
          onClick={() => setShowChat(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFD700',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0',
            lineHeight: '1'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        background: showVoiceMode ? '#ffffff' : '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: showVoiceMode ? 'center' : 'flex-start',
        justifyContent: showVoiceMode ? 'center' : 'flex-start'
      }}>
        {showVoiceMode ? (
          <VoiceMode 
            isListening={isListening}
            isSpeaking={isSpeaking}
            transcript={transcript}
            audioLevel={audioLevel}
            startListening={startListening}
            setShowVoiceMode={setShowVoiceMode}
          />
        ) : (
          chatHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
              <h3 style={{ color: '#667eea', marginBottom: '8px', fontSize: '18px' }}>
                Merhaba! Size nasıl yardımcı olabilirim?
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                Mikrofona tıklayarak konuşabilir veya yazabilirsiniz.
              </p>
              <button
                onClick={() => setShowVoiceMode(true)}
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Sesli Moda Geç
              </button>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, idx) => (
                <div key={idx} style={{ 
                  marginBottom: '16px', 
                  display: 'flex', 
                  justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start', 
                  width: '100%' 
                }}>
                  <div style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: chat.type === 'user' ? '#000000' : '#fff',
                    color: chat.type === 'user' ? '#FFD700' : '#333',
                    border: chat.type === 'bot' ? '2px solid #e0e0e0' : 'none',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {chat.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </>
          )
        )}
      </div>

      {!showVoiceMode && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          background: 'white',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Mesajınızı yazın..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: message.trim() ? '#667eea' : '#ccc',
              border: 'none',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
            📤
          </button>
          <button 
            onClick={() => setShowVoiceMode(true)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#FFD700',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: '#000000' }}>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}