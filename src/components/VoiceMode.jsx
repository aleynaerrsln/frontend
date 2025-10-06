import React from 'react';

export default function VoiceMode({ 
  isListening, 
  isSpeaking, 
  transcript, 
  audioLevel,
  startListening, 
  setShowVoiceMode
}) {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '40px',
        textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)'
      }}>
        ⚡ ikas
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '100px',
        marginBottom: '30px'
      }}>
        {[...Array(20)].map((_, i) => {
          const height = isListening 
            ? 15 + (audioLevel * 70 * Math.sin((i / 20) * Math.PI))
            : isSpeaking
            ? 15 + (40 * Math.sin((Date.now() / 200 + i / 5) % (2 * Math.PI)))
            : 15;
          
          return (
            <div
              key={i}
              style={{
                width: '4px',
                height: `${height}px`,
                background: '#FFD700',
                borderRadius: '2px',
                transition: 'height 0.05s ease',
                boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
              }}
            />
          );
        })}
      </div>

      <div style={{
        color: '#000000',
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '20px',
        minHeight: '50px'
      }}>
        {isSpeaking ? 'Yanıtlıyorum...' : isListening ? 'Dinliyorum...' : 'Konuşmaya hazır'}
        <div style={{ fontSize: '14px', marginTop: '8px', color: '#666' }}>
          {transcript || 'Mikrofona tıklayın'}
        </div>
      </div>

      <button
        onClick={startListening}
        disabled={isListening || isSpeaking}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isListening ? '#ff4444' : '#FFD700',
          border: 'none',
          cursor: (isListening || isSpeaking) ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          opacity: (isListening || isSpeaking) ? 0.7 : 1
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: isListening ? 'white' : '#000000' }}>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={() => setShowVoiceMode(false)}
        style={{
          marginTop: '20px',
          background: '#ffffff',
          border: '2px solid #FFD700',
          color: '#000000',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        Chat Görünümü
      </button>
    </div>
  );
}