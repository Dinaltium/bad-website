'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SplashLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING NERVE CENTER...');
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statuses = [
    'ENCRYPTING TRANSMISSIONS...',
    'CALIBRATING SENSORS...',
    'LOADING TRACK DATA...',
    'READY FOR LAUNCH...'
  ];

  // Reset and show loader on every route change
  useEffect(() => {
    setIsVisible(true);
    setProgress(0);
    setStatus('RE-ROUTING TRANSMISSION...');

    const duration = 1200; // Faster for sub-pages (1.2s)
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return Math.min(prev + step + Math.random() * 5, 100);
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatus((prev) => {
        const currentIndex = statuses.indexOf(prev);
        if (currentIndex === -1 || currentIndex === statuses.length - 1) return statuses[0];
        return statuses[currentIndex + 1];
      });
    }, 400);

    return () => {
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-background grid-pattern flex flex-col items-center justify-center p-6 text-center space-y-12"
        >
          <div className="space-y-4">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-primary border-4 border-foreground p-6 shadow-[8px_8px_0px_black] mx-auto w-fit"
            >
              <Zap className="w-16 h-16 text-black fill-current" />
            </motion.div>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
