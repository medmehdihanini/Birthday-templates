import React, { useState, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './App.css';
import photo1 from './assets/IMG_0016.jpeg';
import photo2 from './assets/IMG_0017.jpeg';
import photo3 from './assets/IMG_0018.jpeg';

function App() {
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);
  const totalCandles = 5;

  // Démarrer la page
  const handleStart = () => {
    setStarted(true);
    // Animation d'entrée
    anime({
      targets: '.welcome-screen',
      opacity: 0,
      scale: 0.8,
      duration: 1000,
      easing: 'easeInOutQuad',
    });
    
    setTimeout(() => {
      anime({
        targets: '.candle',
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: (el, i) => i * 200,
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
      });
      
      anime({
        targets: '.instruction',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 1000,
        easing: 'easeOutQuad',
      });
    }, 1000);
  };

  // Souffler une bougie
  const blowCandle = (index) => {
    if (candlesBlown < totalCandles) {
      const newCount = candlesBlown + 1;
      setCandlesBlown(newCount);
      
      // Animation de la flamme qui s'éteint
      anime({
        targets: `.candle-${index} .flame`,
        opacity: 0,
        scale: 0,
        duration: 500,
        easing: 'easeOutQuad',
      });
      
      anime({
        targets: `.candle-${index}`,
        filter: ['brightness(1)', 'brightness(0.5)'],
        duration: 500,
        easing: 'easeOutQuad',
      });

      // Particules de fumée
      anime({
        targets: `.candle-${index} .smoke`,
        opacity: [0, 1, 0],
        translateY: [0, -50],
        duration: 1500,
        easing: 'easeOutQuad',
      });

      // Si toutes les bougies sont soufflées
      if (newCount === totalCandles) {
        setTimeout(() => {
          revealSurprise();
        }, 1000);
      }
    }
  };

  // Révéler la surprise
  const revealSurprise = () => {
    setShowSurprise(true);
    
    // Jouer la chanson
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // Animation des bougies qui disparaissent
    anime({
      targets: '.candles-container',
      opacity: 0,
      scale: 0.5,
      duration: 1000,
      easing: 'easeInQuad',
    });

    // Animation de la surprise
    setTimeout(() => {
      anime({
        targets: '.surprise-container',
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .6)',
      });

      // Animation des cœurs
      anime({
        targets: '.heart',
        translateY: [0, -100],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 1.5],
        delay: (el, i) => 500 + i * 100,
        duration: 3000,
        loop: true,
        easing: 'easeOutQuad',
      });

      // Animation des pétales
      anime({
        targets: '.petal',
        translateY: [0, 600],
        translateX: (el, i) => Math.random() * 400 - 200,
        rotate: (el, i) => Math.random() * 360,
        opacity: [1, 0],
        delay: (el, i) => i * 50,
        duration: (el, i) => 2000 + Math.random() * 2000,
        loop: true,
        easing: 'easeInQuad',
      });

      // Animation du texte principal
      anime({
        targets: '.birthday-text',
        scale: [1, 1.1, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutQuad',
      });

      // Animation des étincelles
      anime({
        targets: '.sparkle',
        scale: [0, 1, 0],
        rotate: (el, i) => Math.random() * 360,
        opacity: [0, 1, 0],
        delay: (el, i) => i * 100,
        duration: 1500,
        loop: true,
        easing: 'easeOutQuad',
      });
    }, 1000);
  };

  return (
    <div className="App">
      {/* Écran de bienvenue */}
      {!started && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-title">✨ Pour Toi, Maman ✨</h1>
            <p className="welcome-subtitle">Une surprise spéciale t'attend...</p>
            <button className="start-button" onClick={handleStart}>
              Commencer
            </button>
          </div>
        </div>
      )}

      {/* Section des bougies */}
      {started && !showSurprise && (
        <div className="candles-section">
          <div className="instruction">
            💨 Souffle sur les bougies pour découvrir ta surprise 💨
          </div>
          <div className="candles-container">
            {[...Array(totalCandles)].map((_, index) => (
              <div
                key={index}
                className={`candle candle-${index}`}
                onClick={() => blowCandle(index)}
              >
                <div className="flame">🔥</div>
                <div className="smoke">💨</div>
                <div className="candle-stick"></div>
              </div>
            ))}
          </div>
          <div className="counter">
            {candlesBlown} / {totalCandles} bougies soufflées
          </div>
        </div>
      )}

      {/* Surprise - Happy Birthday */}
      {showSurprise && (
        <div className="surprise-container">
          {/* Pétales de fleurs */}
          {[...Array(30)].map((_, i) => (
            <div key={i} className="petal" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}>🌸</div>
          ))}

          {/* Cœurs flottants */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}>❤️</div>
          ))}

          {/* Étincelles */}
          {[...Array(50)].map((_, i) => (
            <div key={i} className="sparkle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}>✨</div>
          ))}

          {/* Message principal */}
          <div className="birthday-message">
            <h1 className="birthday-text">
              Joyeux Anniversaire
            </h1>
            <h2 className="mom-name">AHLEM ❤️</h2>
            <p className="love-message">
              🌹 Tu es la meilleure maman du monde 🌹
            </p>
            <p className="love-message-2">
              Que cette journée soit aussi merveilleuse que toi 💖
            </p>
          </div>

          {/* Images flottantes en arrière-plan */}
          <div className="background-photos">
            <div className="bg-photo bg-photo-1">
              <img src={photo1} alt="AHLEM" />
            </div>
            <div className="bg-photo bg-photo-2">
              <img src={photo2} alt="AHLEM" />
            </div>
            <div className="bg-photo bg-photo-3">
              <img src={photo3} alt="AHLEM" />
            </div>
          </div>
        </div>
      )}

      {/* Audio player (caché) */}
      <audio ref={audioRef} loop>
        <source src="/song/song.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
