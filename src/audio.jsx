import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';

const GlassBeadsSoundPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    return () => {
      
    };
  }, []);

  const playGlassBeadsSound = useCallback(() => {
    if (!audioContext) return;

    const duration = 
0.06 + Math.random() * 0.08;
const freq = 
730 + Math.random() * 600;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }, [audioContext]);

  useEffect(() => {
    
      const timeoutIds = [];

      for (let i = 0; i < 10; i++) {
        const timeoutId = setTimeout(() => {
          playGlassBeadsSound();
          
        }, i * 300);
        timeoutIds.push(timeoutId);
      }

      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
      };
    
  }, [ playGlassBeadsSound, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">เครื่องเล่นเสียงลูกแก้วกระทบกัน (20 ครั้ง)</h1>
      <Button
        onClick={togglePlay}
        className={`px-4 py-2 rounded bg-green-500 text-white font-bold`}
      >      
        {isPlaying ? 'หยุดเล่น!' : 'เล่นเสียง!'}
      </Button>
       <Button onClick={playGlassBeadsSound}> alofthha </Button>
    </div>
  );
};

export default GlassBeadsSoundPlayer;