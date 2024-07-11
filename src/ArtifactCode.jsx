import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

const items = [
  { name: ['犬', 'Dog', 'หมา', '狗'], emoji: '🐶' },
  { name: ['鳥', 'Bird', 'นก', '鸟'], emoji: '🐦' },
  { name: ['魚', 'Fish', 'ปลา', '鱼'], emoji: '🐠' },
  { name: ['太陽', 'Sun', 'พระอาทิตย์', '太阳'], emoji: '☀️' },
  { name: ['月', 'Moon', 'พระจันทร์', '月亮'], emoji: '🌙' },
  { name: ['ティーポット', 'Teapot', 'กาน้ำ', '茶壶'], emoji: '🫖' },
  { name: ['葉', 'Leaf', 'ใบไม้', '叶子'], emoji: '🍃' },
  { name: ['茶碗', 'Tea cup', 'จอกชา', '茶杯'], emoji: '🍵' }
];

const ballColors = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'];
const borderColors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500'];

const translations = {
  title: ['ガチャポン機', 'Gacha Machine', 'เครื่องกาชาปอง', '扭蛋机'],
  play: ['回す', 'Play', 'หมุนกาชาปอง', '扭蛋'],
  playing: ['プレイ中...', 'Playing...', 'กำลังเล่น...', '正在扭...'],
  open: ['開ける', 'Open Ball', 'เปิดลูกบอล', '打开'],
  reset: ['リセット', 'Reset', 'เริ่มเล่นใหม่', '重置'],
  result: ['結果：', 'Result:', 'คุณได้:', '结果：'],
  language: ['言語', 'Languagge', 'ภาษา', '语言']
};

export default function GachaSimulator() {
  const [balls, setBalls] = useState(45);
  const [result, setResult] = useState(null);
  const [stage, setStage] = useState('ready'); // 'ready', 'dispensing', 'opening', 'result'
  const [ballPosition, setBallPosition] = useState(0);
  const [capsuleColor, setCapsuleColor] = useState(0);
  const [language, setLanguage] = useState(0);

  useEffect(() => {
    if (stage === 'dispensing') {
      let position = 0;
window.startPlaying();
      const interval = setInterval(() => {
        position += 5;
        setBallPosition(position);
        setCapsuleColor((prev) => (prev + 1) % ballColors.length);
        if (position >= 100) {
window.stopPlaying();
          clearInterval(interval);
          setStage('opening');
        }
      }, 50);
window.stopPlaying();
      return () => clearInterval(interval);
    }
  }, [stage]);

  const playGacha = () => {
   setCapsuleColor(Math.floor(Math.random() * ballColors.length));
  
    if (balls > 0 && stage === 'ready') {
      setBalls(balls - 1);
      setStage('dispensing');
      setResult(null);
    }
  };

  const openBall = () => {
    if (stage === 'opening') {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setResult(randomItem);
      setStage('result');
    }
  };

  const reset = () => {
    setBalls(45);
    setResult(null);
    setStage('ready');
    setBallPosition(0);
  };

  const changeLanguage = (direction) => {
    setLanguage((prev) => (prev + direction + 4) % 4);
  };

  return (
       
 <div className="p-4 max-w-md mx-auto">
      <SpeedInsights/>
      <Analytics/>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => changeLanguage(-1)}><ChevronLeft size={24} /></Button>
        <div className="text-center">
          {translations.language.map((lang, index) => (
            <span key={index} className={language === index ? 'text-blue-500 underline font-black' : 'text-gray-500 no-underline font-thin'}>
              {lang}
            </span>
          )).reduce((prev, curr) => [prev, ' / ', curr])}
        </div>
        <Button onClick={() => changeLanguage(1)}><ChevronRight size={24} /></Button>
<div><button onclick="startPlaying()">a</button>......<button onclick="stopPlaying()">b</button></div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{translations.title[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-80 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-gray-400 rounded-lg"></div>
            {Array.from({ length: balls }).map((_, index) => (
              <div
                key={index}
                className={`absolute w-6 h-6 ${ballColors[index % ballColors.length]} ${borderColors[index % borderColors.length]} border-2 rounded-full`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 10}%`,
                }}
              ></div>
            ))}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-300 border-t-4 border-gray-400"></div>
            {stage !== 'ready' && (
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 ${ballColors[capsuleColor]} ${borderColors[capsuleColor]} border-2 rounded-full flex items-center justify-center text-2xl`}
                style={{ bottom: stage === 'dispensing' ? `${ballPosition}%` : '0%' }}
                onClick={openBall}
              >
                {stage === 'result' ? result.emoji : ''}
              </div>
            )}
          </div>
          <Button 
            onClick={playGacha} 
            disabled={balls === 0 || stage !== 'ready'} 
            className="w-full mb-2"
          >
            {stage === 'ready' ? translations.play[language] : translations.playing[language]}
          </Button>
          {stage === 'opening' && (
            <Button onClick={openBall} className="w-full mb-2">{translations.open[language]}</Button>
          )}

          {result && (
            <p className="text-center">{translations.result[language]} {result.name[language]} {result.emoji}</p>
          )}
          {stage !== 'ready' && (
            <Button onClick={reset} className="w-full mb-2">{translations.reset[language]}</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
  }
            
