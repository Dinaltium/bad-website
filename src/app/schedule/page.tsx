'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Zap, Rocket, Trophy, Clock, Calendar, 
  MapPin, Coffee, Utensils, Music, Laptop,
  Gamepad2, Presentation, PartyPopper, ArrowLeft,
  Search, Shield, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Lenis from 'lenis';

const fullSchedule = [
  {
    day: 'APRIL 27',
    date: 'DAY 01',
    theme: 'MINOR EVENTS & WARMUP',
    color: 'text-primary',
    events: [
      { time: '09:00 AM', title: 'Check-in & Registration', desc: 'Collect your badges and welcome kits.', icon: Laptop },
      { time: '11:00 AM', title: 'Tech Talk: Modern Architectures', desc: 'Opening keynote on industry trends.', icon: Zap },
      { time: '02:00 PM', title: 'Coding Sprint (Minor)', desc: 'Short 2-hour competitive programming round.', icon: Rocket },
      { time: '04:30 PM', title: 'Gaming Qualifiers: Round 1', desc: 'FIFA and Mortal Kombat initial heats.', icon: Gamepad2 },
      { time: '07:00 PM', title: 'Networking Mixer', desc: 'Meet your peers and mentors over snacks.', icon: Music },
    ]
  },
  {
    day: 'APRIL 28',
    date: 'DAY 02',
    theme: 'COMPETITION HEATS',
    color: 'text-secondary',
    events: [
      { time: '10:00 AM', title: 'Design Dash', desc: 'UI/UX design challenge for all levels.', icon: Laptop },
      { time: '01:00 PM', title: 'Gaming Semifinals', desc: 'High-stakes battle in the Arena Alpha.', icon: Gamepad2 },
      { time: '03:00 PM', title: 'Paper Presentations', desc: 'Research papers on Emerging Tech.', icon: Presentation },
      { time: '06:00 PM', title: 'Hackathon Pre-Briefing', desc: 'Rules, themes, and API keys reveal.', icon: Shield },
    ]
  },
  {
    day: 'APRIL 29',
    date: 'DAY 03',
    theme: 'THE HACKATHON BEGINS',
    color: 'text-accent',
    events: [
      { time: '09:00 AM', title: 'Hackathon Final Check-in', desc: 'Team verification and desk allocation.', icon: Coffee },
      { time: '10:00 AM', title: 'HACKATHON COMMENCE', desc: 'The 24-hour clock starts NOW. ⚔️', icon: Rocket },
      { time: '02:00 PM', title: 'Lunch Break & Mentor Meet', desc: 'Refuel and refine your project direction.', icon: Utensils },
      { time: '06:00 PM', title: 'Checkpoint Alpha', desc: 'Quick progress update for the leaderboard.', icon: Star },
      { time: '09:30 PM', title: 'JUDGING ROUND 01', desc: 'Initial prototype review and technical vetting.', icon: Search },
    ]
  },
  {
    day: 'APRIL 30',
    date: 'DAY 04',
    theme: 'FINAL BATTLE & GLORY',
    color: 'text-primary',
    events: [
      { time: '08:00 AM', title: 'Last Mile Push', desc: 'Final commits and documentation check.', icon: Laptop },
      { time: '10:00 AM', title: 'HACKATHON ENDS', desc: 'Hands off keyboard. All repos locked.', icon: Trophy },
      { time: '11:00 AM', title: 'JUDGING ROUND 02', desc: 'Final demos and Q&A with the expert panel.', icon: Presentation },
      { time: '02:00 PM', title: 'Grand Award Ceremony', desc: 'Winners announced. Prizes distributed.', icon: Trophy },
      { time: '04:00 PM', title: 'PACEFEST After-Party', desc: 'Celebrating the spirit of innovation.', icon: PartyPopper },
    ]
  }
];

export default function SchedulePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stubs: [0, 1],
    restDelta: 0.001
  });

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

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background grid-pattern pt-28 px-6 md:pt-32 md:p-12 pb-32 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 space-y-8">
          <Link href="/">
            <Button variant="outline" className="border-4 border-border shadow-[4px_4px_0px_black] font-black uppercase italic mb-4 hover:bg-muted text-black">
              <ArrowLeft className="mr-2 w-5 h-5" /> BACK TO HUB
            </Button>
          </Link>
          <div className="space-y-4">
            <Badge variant="accent" className="text-lg md:text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-1deg]">
              THE BATTLE PLAN: APRIL 27-30
            </Badge>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none text-black">
              EVENT <span className="text-primary underline decoration-4 md:decoration-8">TIMELINE</span>
            </h1>
            <p className="text-lg sm:text-2xl font-bold max-w-2xl text-black">
              From minor skirmishes to the final 24-hour grand battle. Plan your victory.
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-32 space-y-40">
          {/* Filling Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-3 bg-muted border-2 border-border rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(255,107,107,0.5)]"
            />
          </div>

          {fullSchedule.map((day, dayIdx) => (
            <div key={dayIdx} className="space-y-20">
              {/* Day Marker */}
              <div className="relative z-10 flex justify-center">
                <div className="bg-white border-4 md:border-8 border-border p-6 md:p-8 shadow-[8px_8px_0px_black] md:shadow-[12px_12px_0px_black] rotate-[-2deg] flex flex-col items-center">
                  <span className={`text-4xl sm:text-6xl font-black ${day.color}`}>{day.day}</span>
                  <span className="text-xl sm:text-2xl font-black uppercase italic text-black">{day.date}</span>
                  <div className="w-full h-1 md:h-2 bg-border my-3 md:my-4"></div>
                  <span className="text-lg md:text-xl font-black uppercase tracking-widest text-black text-center">{day.theme}</span>
                </div>
              </div>

              <div className="space-y-24 relative">
                {day.events.map((event, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px" }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Event Content */}
                      <div className={`flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="bg-white border-4 border-border p-8 shadow-[8px_8px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all group">
                          <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                            <div className={`p-4 border-2 border-border ${day.color.replace('text-', 'bg-')} shadow-[4px_4px_0px_black]`}>
                              <event.icon className="w-8 h-8 text-black" />
                            </div>
                            <span className="text-2xl font-black italic text-black">{event.time}</span>
                          </div>
                          <h3 className="text-3xl font-black uppercase mb-2 text-black group-hover:text-primary transition-colors">{event.title}</h3>
                          <p className="text-lg font-bold text-zinc-600">{event.desc}</p>
                        </div>
                      </div>

                      {/* Stepper Dot */}
                      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border-4 border-border bg-white z-20 shadow-[0_0_0_8px_white]">
                        <motion.div 
                          className="w-full h-full rounded-full bg-primary"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                        />
                      </div>

                      <div className="flex-1 hidden md:block"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-40 text-center space-y-8">
          <Trophy className="w-20 sm:w-32 h-20 sm:h-32 text-primary mx-auto animate-bounce" />
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic text-black">READY FOR GLORY?</h2>
          <Link href="/hackathon" className="w-full sm:w-auto">
            <Button size="xl" className="h-20 sm:h-28 w-full sm:px-16 border-4 border-border text-2xl sm:text-3xl shadow-[6px_6px_0px_black] sm:shadow-[10px_10px_0px_black]" animation="pop">
              JOIN THE HACKATHON
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
