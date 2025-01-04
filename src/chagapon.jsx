import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const h = { n: ['?', '??', '???', '????'], e: '🎁' };

const i = [
  { n: ['犬', 'Dog', 'หมา', '狗'], e: '🐶' },
  { n: ['鳥', 'Bird', 'นก', '鸟'], e: '🐦' },
  { n: ['魚', 'Fish', 'ปลา', '鱼'], e: '🐠' },
  { n: ['太陽', 'Sun', 'พระอาทิตย์', '太阳'], e: '☀️' },
  { n: ['月', 'Moon', 'พระจันทร์', '月亮'], e: '🌙' },
  { n: ['ティーポット', 'Teapot', 'กาน้ำ', '茶壶'], e: '🫖' },
  { n: ['葉', 'Leaf', 'ใบไม้', '叶子'], e: '🍃' },
  { n: ['茶碗', 'Tea cup', 'จอกชา', '茶杯'], e: '🍵' }
];

const bc = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'];
const bdc = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500'];

const t = {
  t: ['ガチャポン機', 'The Chagapon', 'ชากา ปองปอง', '扭蛋机'],
  p: ['回す', 'Play', 'หมุนกาชาปอง', '扭蛋'],
  pi: ['プレイ中...', 'Playing...', 'กำลังเล่น...', '正在扭...'],
  o: ['開ける', 'Open Ball', 'เปิดลูกบอล', '打开'],
  r: ['リセット', 'Reset', 'เริ่มเล่นใหม่', '重置'],
  re: ['結果：', 'Result:', 'คุณได้:', '结果：'],
  l: ['言語', 'Language', 'ภาษา', '语言']
};

const rn = (max = 1) => Math.random() * max;
const ra = (arr) => arr[Math.floor(rn(arr.length))];

export default function G() {
  const [s, setS] = useState('ready');
  const [b, setB] = useState(45);
  const [r, setR] = useState(h);
  const [bp, setBP] = useState(0);
  const [bs, setBS] = useState(50);
  const [cc, setCC] = useState(0);
  const [l, setL] = useState(0);
  const [ac, setAC] = useState(null);

  useEffect(() => {
    const c = new (window.AudioContext || window.webkitAudioContext)();
    setAC(c);
    return () => {
      if (c.state !== 'closed') c.close();  
    }
  }, []);

  const pbs = () => {
    if (!ac) return;
    const d = 0.06 + rn(0.08);
    const f = 450 + rn(850);
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, ac.currentTime);
    g.gain.setValueAtTime(0.5, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + d);
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + d);
  };
  
  const pbss = () => {
    const ti = [];
    for (let j = 0; j < 3; j++) {
      const tid = setTimeout(() => {
        pbs();        
      }, j * (30 + rn(80)));
      ti.push(tid);
    }
    return () => ti.forEach(id => clearTimeout(id));
  };

  useEffect(() => {
    if (s === 'dispensing') {
      let p = 0;
      setBS(50);
      setB(b - 1);
      setR(h);

      const ii = setInterval(() => {
        pbss();
      }, 110);

      const iv = setInterval(() => {
        if (rn() < 0.3) {
          p += 1;
          setBP(p);
        } else 
          setBS(
            (pv) => rn() < 0.5 ?
              (pv < 20 ? pv += 5 : pv -= 5) :
              (pv > 80 ? pv -= 5 : pv += 5) 
          );
        setCC(Math.floor(rn(bc.length)));
        setR(ra(i));
        if (p >= 100) 
          setS('opening');
      }, 50);

      return () => {
        clearInterval(iv);
        clearInterval(ii);
        setR(h);
      }; 
    }
  }, [s]);

  const pg = () => {
    if (b > 0 && s === 'ready') 
      setS('dispensing');    
  }

  const ob = () => {
    if (s === 'opening') {      
      setR(ra(i));
      setS('result');
    }
  }

  const rs = () => {
    setS('ready');
    setB(45);
    setR(h);
    setBS(50);
    setBP(0);
  };

  const cl = (d) => 
    setL((pv) => (pv + d + 4) % 4);

  return (    
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => cl(-1)}><ChevronLeft size={24} /></Button>
        <div className="text-center">
          {t.l.map((lg, idx) => (
            <span key={idx} className={l === idx ? 'text-blue-500 underline font-black' : 'text-gray-500 no-underline font-thin'} onClick={() => setL(idx)}>{lg}
            </span>
          )).reduce((pv, cv) => [pv, ' / ', cv])}
        </div>
        <Button onClick={() => cl(1)}><ChevronRight size={24} /></Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.t[l]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-80 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-gray-400 rounded-lg"></div>
            {Array.from({ length: b }).map((_, idx) => (
              <div
                key={idx}
                className={`absolute w-6 h-6 ${bc[idx % bc.length]} ${bdc[idx % bdc.length]} border-2 rounded-full`}
                style={{
                  left: `${rn(80) + 10}%`,
                  top: `${rn(60) + 10}%`
                }}
              ></div>
            ))}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-300 border-t-4 border-gray-400"></div>
            {s !== 'ready' && (
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 ${bc[cc]} ${bdc[cc]} border-2 rounded-full flex items-center justify-center text-2xl`}
                style={{ 
                  top: s === 'dispensing' ? `${bp}%` : '84%' ,
                  left: s === 'dispensing' ? `${bs}%` : '50%' 
                }}
                onClick={ob}
              >
                { r.e }
              </div>
            )}
          </div>

          <Button 
            onClick={pg} 
            disabled={s !== 'ready'} 
            className="w-full mb-2"
          >
            {s === 'ready' ? t.p[l] : t.pi[l]}
          </Button>

          {s === 'opening' && (
            <Button onClick={ob} className="w-full mb-2">{t.o[l]}</Button>
          )}

          {s === 'result' && (
            <p className="text-center">{t.re[l]} {r.n[l]} {r.e}<br/><br/></p>
          )}
          {s !== 'opening' && s !== 'result' && (
            <p className="text-center text-gray-500 no-underline font-thin">.<br/><br/></p>
          )}

          {s !== 'ready' && (
            <Button onClick={rs} className="w-full mb-2">{t.r[l]}</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}