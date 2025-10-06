import React, { useState, useEffect } from 'react';
import './App.css';
import VoiceChat from './components/VoiceChat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎙️ Sesli Destek Botu</h1>
        <p>Mikrofona tıklayıp konuşun veya yazarak soru sorun</p>
      </header>
      <VoiceChat />
    </div>
  );
}

export default App;