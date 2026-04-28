'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, Trophy, Users, Star, ArrowLeft, 
  Code, Shield, Cpu, Globe, Rocket, 
  Heart, Landmark, Lightbulb, Check, 
  Gamepad2, Gift, Coffee, Wifi, Moon, 
  Utensils, Sparkles, Search, Gem
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tracks = [
  { icon: Heart, title: 'HEALTHCARE', desc: 'Revolutionize patient care, diagnostics, and mental health with AI and IoT.', color: 'text-red-400' },
  { icon: Landmark, title: 'FINTECH', desc: 'Build the future of banking, payments, and decentralized finance.', color: 'text-emerald-400' },
  { icon: Shield, title: 'CYBERSECURITY', desc: 'Develop tools to protect privacy and secure the global digital infrastructure.', color: 'text-blue-400' },
  { icon: Lightbulb, title: 'OPEN INNOVATION', desc: 'No limits. Bring your wildest, most disruptive tech ideas to life.', color: 'text-yellow-400' },
];

const miniGames = [
  { title: 'TERMINAL WARS', desc: 'Fastest typer wins. No GUI allowed.' },
  { title: 'DEBUGGING RACE', desc: 'Fix 10 critical bugs in 5 minutes.' },
  { title: 'HARDWARE TEARDOWN', desc: 'Identify components in record time.' },
];

const goodies = [
  'Exclusive PACEFEST 2026 Tech T-Shirt',
  'Premium Laptop Skin Pack',
  'Mechanical Keyboard Keycaps',
  'Mystery Swag Box for all Finalists',
];

const perks = [
  { icon: Wifi, title: 'GBPS WIFI', desc: 'Ultra-low latency connection for all.' },
  { icon: Utensils, title: '24/7 CATERING', desc: 'High-energy meals and midnight snacks.' },
  { icon: Coffee, title: 'UNLIMITED FUEL', desc: 'Endless RedBull and premium coffee.' },
  { icon: Moon, title: 'REST ZONES', desc: 'Comfortable sleeping pods and beanbags.' },
];

export default function HackathonPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from('.reveal-hero', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });

      gsap.from('.track-card', {
        scrollTrigger: {
          trigger: '.track-grid',
          start: 'top 95%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });

      gsap.from('.reveal-section', {
        scrollTrigger: {
          trigger: '.reveal-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black overflow-hidden pb-40">
      {/* Background Decor */}
      <div className="fixed inset-0 grid-pattern opacity-5 pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-40 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-10 border-b-4 border-white/5 pb-24">
          <div className="space-y-4">
            <Link href="/">
              <Button variant="ghost" className="text-zinc-500 hover:text-white hover:bg-white/5 font-black uppercase italic mb-8">
                <ArrowLeft className="mr-2 w-5 h-5" /> BACK TO HUB
              </Button>
            </Link>
            <div className="flex justify-center gap-4 reveal-hero">
              <Badge className="bg-white text-black border-2 border-white text-xl py-2 px-8 font-black uppercase italic shadow-[6px_6px_0px_rgba(255,107,107,1)]">
                APRIL 29-30
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-[8rem] lg:text-[9rem] font-black uppercase italic tracking-tighter reveal-hero leading-[0.9] md:leading-none">
              THE <span className="text-primary drop-shadow-[4px_4px_0px_#fff] md:drop-shadow-[8px_8px_0px_#fff]">24H</span> <br/> HACKATHON
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 font-bold max-w-3xl mx-auto reveal-hero">
              Where lines of code become legacies. Join the most intense 24-hour sprint of the year.
            </p>
          </div>
          <div className="reveal-hero w-full sm:w-auto px-6 sm:px-0">
            <Link href="/register">
              <Button size="xl" className="h-20 sm:h-28 w-full sm:px-20 text-2xl sm:text-4xl font-black bg-primary text-black border-4 border-black shadow-[6px_6px_0px_white] sm:shadow-[10px_10px_0px_white] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase italic">
                REGISTER NOW
              </Button>
            </Link>
          </div>
        </div>

        {/* Tracks Section */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic">THE <span className="text-secondary underline decoration-4">TRACKS</span></h2>
            <p className="text-lg sm:text-xl text-zinc-500 font-bold">Choose your battlefield. Solve real-world problems.</p>
          </div>
          <div className="track-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {tracks.map((track, i) => (
              <div key={i} className="track-card opacity-100 bg-zinc-900 p-8 space-y-6 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group relative overflow-hidden shadow-[10px_10px_0px_white]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-all"></div>
                <div className={`w-16 h-16 bg-white/5 flex items-center justify-center border-2 border-white/10 ${track.color} group-hover:scale-110 transition-transform`}>
                  <track.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-tight break-words min-h-[4rem] flex items-end">{track.title}</h3>
                <p className="text-zinc-400 font-bold leading-relaxed text-sm">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Pool Section */}
        <div className="reveal-section">
          <div className="bg-zinc-900 p-8 md:p-16 shadow-[25px_25px_0px_white] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
              <div className="space-y-8 text-center lg:text-left">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic text-white leading-none">
                  THE <span className="text-primary">PRIZES</span>
                </h2>
                <div className="text-2xl sm:text-4xl font-black text-primary border-l-8 border-primary pl-8 italic">
                  POOL: ₹3.0L
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full lg:w-auto">
                {[
                  { pos: '1ST', prize: '₹1.5L', color: 'bg-primary' },
                  { pos: '2ND', prize: '₹1.0L', color: 'bg-white' },
                  { pos: '3RD', prize: '₹50K', color: 'bg-secondary' },
                ].map((p, i) => (
                  <div key={i} className={`${p.color} text-black p-10 shadow-[10px_10px_0px_white] text-center space-y-4 transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform min-w-[220px]`}>
                    <div className="text-2xl font-black">{p.pos} PLACE</div>
                    <div className="text-5xl font-black italic break-keep whitespace-nowrap">{p.prize}</div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60">+ EXCLUSIVE SWAG</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Perks & Goodies */}
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Perks */}
          <div className="space-y-12">
            <h3 className="text-5xl font-black uppercase italic flex items-center gap-4">
              <Sparkles className="w-10 h-10 text-primary" /> WE PROVIDE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {perks.map((perk, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="p-4 bg-white/5 border-2 border-white/10 text-primary">
                    <perk.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic">{perk.title}</h4>
                    <p className="text-zinc-500 font-bold text-sm">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goodies */}
          <div className="space-y-12">
            <h3 className="text-5xl font-black uppercase italic flex items-center gap-4">
              <Gift className="w-10 h-10 text-secondary" /> GOODIES & SWAG
            </h3>
            <div className="bg-zinc-900/50 border-4 border-white/5 p-10 space-y-6 shadow-[8px_8px_0px_rgba(255,255,255,0.05)]">
              {goodies.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xl font-black text-zinc-300 italic group">
                  <div className="w-3 h-3 bg-secondary rounded-full group-hover:scale-150 transition-transform"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini Games Section */}
        <div className="space-y-16 py-20 border-y-4 border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic">MINI <span className="text-accent underline decoration-4">GAMES</span></h2>
            <p className="text-xl text-zinc-500 font-bold uppercase">Breaks from the grind. Instant prizes. High octane fun.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {miniGames.map((game, i) => (
              <div key={i} className="bg-black border-4 border-white/5 p-10 text-center space-y-6 hover:shadow-[10px_10px_0px_white] hover:border-white/20 transition-all relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-black px-6 py-2 font-black italic uppercase text-lg">
                  ROUND {i + 1}
                </div>
                <h4 className="text-3xl font-black uppercase italic pt-4">{game.title}</h4>
                <p className="text-zinc-500 font-bold">{game.desc}</p>
                <Gamepad2 className="w-12 h-12 text-accent mx-auto opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col items-center text-center space-y-10 pt-20">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl md:text-9xl font-black uppercase italic leading-none drop-shadow-[6px_6px_0px_#ff6b6b] md:drop-shadow-[8px_8px_0px_#ff6b6b]">
              HACK THE <br/> <span className="text-white">FUTURE.</span>
            </h2>
            <p className="text-xl sm:text-3xl text-zinc-500 font-bold italic uppercase tracking-tighter">
              The clock is ticking. Are you in?
            </p>
          </div>
          <Link href="/register" className="w-full sm:w-auto px-6 sm:px-0">
            <Button size="xl" className="h-24 sm:h-32 w-full sm:px-24 text-2xl sm:text-5xl font-black bg-primary text-black border-4 border-black shadow-[8px_8px_0px_white] sm:shadow-[15px_15px_0px_white] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all uppercase italic">
              SECURE YOUR SPOT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
