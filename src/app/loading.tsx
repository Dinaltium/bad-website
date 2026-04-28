'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING NERVE CENTER...');

  const statuses = [
    'ENCRYPTING TRANSMISSIONS...',
    'CALIBRATING SENSORS...',
    'LOADING TRACK DATA...',
    'READY FOR LAUNCH...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.random() * 20;
        return next > 100 ? 100 : next;
      });
    }, 200);

    const statusTimer = setInterval(() => {
      setStatus((prev) => {
        const currentIndex = statuses.indexOf(prev);
        if (currentIndex === -1 || currentIndex === statuses.length - 1) return statuses[0];
        return statuses[currentIndex + 1];
      });
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-background grid-pattern flex flex-col items-center justify-center p-6 text-center space-y-12">
      <div className="space-y-4">
        <div className="bg-primary border-4 border-foreground p-6 shadow-[8px_8px_0px_black] mx-auto w-fit animate-wiggle">
          <Zap className="w-16 h-16 text-black fill-current" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
          LOADING <span className="text-primary italic">PACEFEST</span>
        </h1>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Progress value={progress} className="h-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_black]" />
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-black uppercase tracking-widest text-foreground animate-pulse">
            {status}
          </span>
          <span className="text-sm font-black italic">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-8xl font-black opacity-5 mx-4 italic uppercase">
              NO LIMITS • NO LIMITS • NO LIMITS •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
