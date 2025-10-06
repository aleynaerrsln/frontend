import React from 'react';
import './App.css';
import ECommerceSite from './components/ECommerceSite';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  return (
    <div className="App">
      <ECommerceSite />
      <VoiceAssistant />
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default App;