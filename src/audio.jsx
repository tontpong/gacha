import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GlassBeadsSoundPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

const timeoutIds = [];

      for (let i = 0; i < 20; i++) {
        const timeoutId = setTimeout(() => {
          playGlassBeadsSound();
          if (i === 5) window.alert("555");
        }, i * 300);
        timeoutIds.push(timeoutId);
      }


    return () => {
      if (context.state !== 'closed') {
        context.close();
timeoutIds.forEach(id => clearTimeout(id));
      }
    };
  }, []);

  const playGlassBeadsSound = useCallback(() => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [audioContext]);

  useEffect(() => {
    if (isPlaying && playCount < 20) {
      const timeoutIds = [];

      for (let i = 0; i < 20 - playCount; i++) {
        const timeoutId = setTimeout(() => {
          playGlassBeadsSound();
          setPlayCount(prevCount => {
            if (prevCount + 1 >= 20) {
              setIsPlaying(false);
            }
            return prevCount + 1;
          });
        }, i * 300);
        timeoutIds.push(timeoutId);
      }

      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
      };
    }
  }, [isPlaying, playCount, playGlassBeadsSound]);

  const togglePlay = () => {
    if (!isPlaying) {
      setPlayCount(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">เครื่องเล่นเสียงลูกแก้วกระทบกัน (20 ครั้ง)</h1>
      <Button
        onClick={togglePlay}
        className={`px-4 py-2 rounded ${
          isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } text-white font-bold`}
      >
        {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
        {isPlaying ? 'หยุดเล่น' : 'เล่นเสียง'}
      </Button>
      <p className="mt-4">จำนวนครั้งที่เล่น: {playCount} / 20</p>
    </div>
  );
};

export default GlassBeadsSoundPlayer;