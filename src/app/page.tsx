'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Zap, Trophy, Rocket, Star, Calendar, 
  Clock, MapPin, Mail, Phone, MessageSquare, 
  Users, Code, Gamepad2, Search, Check, X, ArrowUpRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const categories = ['All', 'Technical', 'Gaming', 'Creative', 'Fun'];

const events = [
  {
    id: 1,
    title: 'Code Royale 2026',
    category: 'Technical',
    description: 'The ultimate algorithm battle. Solve or get deleted. ⚔️',
    prize: '$2500',
    date: 'Oct 12',
    time: '10:00 AM',
    location: 'Lab 404',
    color: 'bg-primary',
    tag: 'MOST POPULAR'
  },
  {
    id: 2,
    title: 'Frag-O-Mania',
    category: 'Gaming',
    description: 'Valorant & FIFA 25 pro tournaments. No lag, just skill. 🎮',
    prize: '$3000',
    date: 'Oct 13',
    time: '02:00 PM',
    location: 'Arena Alpha',
    color: 'bg-secondary',
    tag: 'PRO ONLY'
  },
  {
    id: 3,
    title: 'Design Dash',
    category: 'Creative',
    description: '60 minutes to redesign the future. Pixel perfect or bust. 🎨',
    prize: '$1500',
    date: 'Oct 12',
    time: '04:00 PM',
    location: 'Studio X',
    color: 'bg-accent',
    tag: 'NEW'
  },
  {
    id: 4,
    title: 'Beat Blast',
    category: 'Creative',
    description: 'Dance battle under neon lights. Show your moves. 🕺',
    prize: '$1000',
    date: 'Oct 14',
    time: '07:00 PM',
    location: 'Main Stage',
    color: 'bg-neon-pink',
    tag: 'WILD'
  },
  {
    id: 5,
    title: 'AI Prompt Hack',
    category: 'Technical',
    description: 'Bending LLMs to your will. The prompt is the sword. 🤖',
    prize: '$2000',
    date: 'Oct 13',
    time: '11:00 AM',
    location: 'Cyber Room',
    color: 'bg-neon-blue',
    tag: 'TRENDING'
  },
  {
    id: 6,
    title: 'Treasure Hunt',
    category: 'Fun',
    description: 'Find the hidden flags across the campus. First one wins. 🗺️',
    prize: '$500',
    date: 'Oct 14',
    time: '09:00 AM',
    location: 'Everywhere',
    color: 'bg-neon-green',
    tag: 'ADVENTURE'
  },
  {
    id: 7,
    title: 'CTF Arena',
    category: 'Technical',
    description: 'Cybersecurity challenge. Break and defend. 🔐',
    prize: '$2000',
    date: 'Oct 12',
    time: '09:00 PM',
    location: 'Cyber Lab',
    color: 'bg-primary',
    tag: 'ELITE'
  },
  {
    id: 8,
    title: 'Paper Pitch',
    category: 'Innovation',
    description: 'Present your research paper to expert judges. 💡',
    prize: '$1200',
    date: 'Oct 13',
    time: '10:00 AM',
    location: 'Seminar Hall',
    color: 'bg-secondary',
    tag: 'SCHOLAR'
  },
  {
    id: 9,
    title: 'Open Mic',
    category: 'Creative',
    description: 'Poetry, stand-up, spoken word. Crowd favorite. 🎤',
    prize: '$800',
    date: 'Oct 14',
    time: '05:00 PM',
    location: 'Cafe Corner',
    color: 'bg-accent',
    tag: 'VIBE'
  },
  {
    id: 10,
    title: 'Bot Wars',
    category: 'Innovation',
    description: 'Build and battle robots in a maze challenge. 🏗',
    prize: '$3000',
    date: 'Oct 13',
    time: '03:00 PM',
    location: 'Robot Arena',
    color: 'bg-neon-orange',
    tag: 'DESTRUCTIVE'
  },
  {
    id: 11,
    title: 'Lens & Light',
    category: 'Creative',
    description: 'On-campus photography contest. Theme-based. 📸',
    prize: '$700',
    date: 'Oct 12',
    time: '11:00 AM',
    location: 'Whole Campus',
    color: 'bg-neon-purple',
    tag: 'FOCUS'
  },
  {
    id: 12,
    title: 'Startup Pitch',
    category: 'Innovation',
    description: 'Pitch your idea to real VCs. Get funded. 🚀',
    prize: '$5000',
    date: 'Oct 14',
    time: '02:00 PM',
    location: 'Grand Ballroom',
    color: 'bg-primary',
    tag: 'UNICORN'
  }
];

export default function CompleteEventsPage() {
  const { isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Use GSAP Ticker for Lenis (Single Source of Truth)
    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial set to ensure state
      gsap.set(['.hero-badge', '.hero-title-line', '.hero-desc', '.hero-cta', '.hero-image', '.stat-card'], { 
        opacity: 0 
      });

      tl.fromTo('.hero-badge', { y: -50, opacity: 0, rotate: -10 }, { y: 0, opacity: 1, rotate: -2, duration: 1 })
        .fromTo('.hero-title-line', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, '-=0.5')
        .fromTo('.hero-desc', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-image', { x: 200, opacity: 0, rotate: 10 }, { x: 0, opacity: 1, rotate: -3, duration: 1.2 }, '-=1')
        .fromTo('.stat-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.5');

      // Scroll Triggered Animations
      gsap.from('.event-card', {
        scrollTrigger: {
          trigger: '.events-grid',
          start: 'top 95%',
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      });


      // Force a refresh once everything is calculated
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    // Make lenis accessible for scrollToSection
    (window as any).lenis = lenis;

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  const filteredEvents = events.filter(e => 
    (selectedCategory === 'All' || e.category === selectedCategory) &&
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);


  const handleRegister = (id: number) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern text-foreground selection:bg-primary selection:text-white">

      {/* Hero Section */}
      <section className="px-6 min-h-[80vh] md:min-h-screen flex flex-col justify-center max-w-7xl mx-auto pt-32 pb-10 md:pt-40 md:pb-20">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="space-y-10 relative z-10">
            <div className="hero-badge inline-block">
              <Badge variant="accent" className="text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-2deg]">
                OCT 12-14, 2026 • UNIVERSITY CAMPUS
              </Badge>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[9rem] font-black leading-[0.9] md:leading-[0.85] uppercase tracking-tighter drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[10px_10px_0px_#000] group">
              <div className="hero-title-line animate-glitch group-hover:animate-glitch-active cursor-default" data-text="LIMITLESS">LIMITLESS</div>
              <div className="hero-title-line text-primary italic animate-glitch group-hover:animate-glitch-active cursor-default" data-text="ENERGY.">ENERGY.</div>
            </h1>
            <p className="hero-desc text-lg md:text-2xl font-bold bg-white border-4 border-border p-4 md:p-6 shadow-[4px_4px_0px_black] md:shadow-[8px_8px_0px_black] rotate-1 max-w-lg text-black">
              The biggest technical festival of the decade is here. Join 50,000+ students in a journey of pure innovation.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-6 pt-6">
              <Button size="xl" className="border-4 border-border text-xl sm:text-2xl py-6 sm:py-8 px-8 sm:px-12 w-full sm:w-auto" animation="pop" asChild>
                <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                  {isLoggedIn ? "VIEW ALL EVENTS" : "GET TICKETS"} <Zap className="ml-2 w-6 h-6 fill-current" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hero-image">
            <div className="w-full aspect-square bg-accent border-4 border-border shadow-[20px_20px_0px_black] flex items-center justify-center -rotate-3 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <Rocket className="w-32 h-32 sm:w-48 sm:h-48 group-hover:translate-y-[-20px] group-hover:translate-x-[20px] transition-transform duration-500" />
              <div className="absolute top-6 sm:top-10 right-6 sm:right-10 bg-white border-4 border-border p-2 sm:p-4 shadow-[4px_4px_0px_black] rotate-6">
                <span className="text-xl sm:text-4xl font-black italic text-black">50+ EVENTS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-secondary border-y-4 border-border min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-10 left-[-5%] text-[15rem] font-black uppercase text-black/5 rotate-[-5deg] select-none pointer-events-none">
          NUMBERS
        </div>
        <div className="absolute bottom-10 right-[-5%] text-[15rem] font-black uppercase text-black/5 rotate-[5deg] select-none pointer-events-none">
          GLORY
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
          <div className="text-center space-y-2 md:space-y-4">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-black underline decoration-white decoration-4 md:decoration-8">The Hall of Data</h2>
            <p className="text-base sm:text-2xl font-bold text-black uppercase italic">By the numbers, we are unstoppable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Registrations', value: '12,450', icon: Users, color: 'bg-accent' },
              { label: 'Total Prize Pool', value: '$50,000', icon: Trophy, color: 'bg-primary' },
              { label: 'Colleges', value: '120+', icon: MapPin, color: 'bg-neon-pink' },
              { label: 'Experience', value: '10 YRS', icon: Star, color: 'bg-neon-blue' },
              { label: 'Coffee Consumed', value: '5,000L', icon: Zap, color: 'bg-neon-green' },
              { label: 'Lines of Code', value: '2.5M+', icon: Code, color: 'bg-white' },
              { label: 'Bugs Squashed', value: '9,999+', icon: Rocket, color: 'bg-secondary' },
              { label: 'Pizzas Eaten', value: '1,200', icon: Gamepad2, color: 'bg-accent' }
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <Card className="border-4 border-border shadow-[8px_8px_0px_black] bg-white hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all rotate-[1deg] text-black">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-3 ${stat.color} border-2 border-border shadow-[2px_2px_0px_black] text-black`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-black">{stat.value}</div>
                      <div className="text-[10px] md:text-sm font-bold uppercase">{stat.label}</div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Hub */}
      <section id="events" className="px-6 min-h-screen flex flex-col justify-center max-w-7xl mx-auto space-y-10 md:space-y-20 py-10 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div className="space-y-2 md:space-y-4 text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter underline decoration-primary decoration-4 md:decoration-8">Events Hub</h2>
            <p className="text-base sm:text-xl font-bold max-w-lg mx-auto md:mx-0">Find your event. Crush the competition. Own the stage.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <Input 
                placeholder="SEARCH EVENTS..." 
                className="pl-12 w-full md:w-80 h-14 border-4 border-border shadow-[4px_4px_0px_black] text-lg font-bold focus:shadow-none transition-all bg-white text-black placeholder:text-zinc-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={`text-sm md:text-lg px-4 md:px-8 h-10 md:h-14 border-[3px] md:border-4 border-border shadow-[3px_3px_0px_black] md:shadow-[4px_4px_0px_black] uppercase font-black italic ${selectedCategory === cat ? '' : 'bg-white hover:bg-muted text-black'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <Card className="h-full border-4 border-border shadow-[10px_10px_0px_black] bg-white flex flex-col hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all group text-black">
                <CardHeader className={`border-b-4 border-border ${event.color} p-6 relative overflow-hidden text-black`}>
                  <Badge className="absolute top-4 right-4 border-2 border-border bg-white text-black font-black uppercase italic">
                    {event.tag}
                  </Badge>
                  <CardTitle className="text-3xl font-black uppercase mt-4 group-hover:translate-x-2 transition-transform">{event.title}</CardTitle>
                  <CardDescription className="text-black font-bold uppercase">{event.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6 flex-1 text-black">
                  <p className="text-lg font-bold leading-tight text-black">{event.description}</p>
                  <div className="space-y-3 font-bold text-black">
                    <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {event.date}</div>
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.location}</div>
                  </div>
                  <div className="pt-4 border-t-2 border-dashed border-border flex items-center justify-between text-black">
                    <span className="text-sm font-black uppercase italic">Grand Prize:</span>
                    <span className="text-2xl font-black text-primary underline decoration-4 underline-offset-4">{event.prize}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full border-4 border-border text-lg font-black italic h-14"
                    animation="pop"
                    onClick={() => handleRegister(event.id)}
                    variant={registeredEvents.includes(event.id) ? 'secondary' : 'default'}
                  >
                    {registeredEvents.includes(event.id) ? (
                      <>REGISTERED <Check className="ml-2 w-6 h-6" /></>
                    ) : (
                      <>REGISTER NOW <ArrowUpRight className="ml-2 w-6 h-6" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/events" className="w-full sm:w-auto px-6 sm:px-0">
            <Button className="h-16 sm:h-20 w-full sm:px-12 text-xl sm:text-3xl font-black border-4 border-border shadow-[4px_4px_0px_black] sm:shadow-[8px_8px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase italic bg-accent text-black" animation="pop">
              SHOW MORE EVENTS <ArrowRight className="ml-3 w-6 h-6 sm:w-10 sm:h-10" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Floating Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-success text-black border-4 border-border p-6 shadow-[8px_8px_0px_black] flex items-center gap-4 min-w-[300px] rotate-[-1deg]"
          >
            <div className="p-2 bg-white border-2 border-border">
              <Check className="w-6 h-6" />
            </div>
            <span className="text-xl font-black uppercase">Registration Success! See you at the fest.</span>
            <button onClick={() => setShowNotification(false)} className="ml-auto hover:scale-125 transition-transform">
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hackathon Mission Control */}
      <section id="hackathon" className="px-6 min-h-screen flex flex-col justify-center max-w-7xl mx-auto space-y-20 py-20 relative overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <Badge className="bg-primary text-black text-2xl py-3 px-8 border-4 border-border shadow-[6px_6px_0px_black] uppercase font-black italic animate-pulse">
            LIVE HACKATHON STATUS: ACTIVE
          </Badge>
          <h2 className="text-4xl sm:text-7xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-none text-black">
            MISSION <span className="text-secondary underline decoration-4 md:decoration-8">CONTROL</span>
          </h2>
          <p className="text-2xl font-bold max-w-3xl text-black">
            24 Hours. No Rules. Just pure creation. The PACEFEST Hackathon is the ultimate test of endurance, skill, and coffee consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 items-stretch">
          {/* Main 24h Hackathon Card */}
          <Link href="/hackathon" className="group">
            <div className="h-full bg-indigo-600 border-8 border-border shadow-[15px_15px_0px_black] p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-none transition-all">
              {/* Animated Noise/Glow Effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="flex-1 space-y-6 relative z-10">
                <Badge className="bg-white text-indigo-600 border-2 border-indigo-600 text-lg py-1 px-4 mb-4 font-black uppercase italic shadow-[4px_4px_0px_black]">
                  🔥 Premium Event
                </Badge>
                <h3 className="text-4xl sm:text-6xl md:text-[6rem] font-black text-white uppercase italic leading-none drop-shadow-[4px_4px_0px_#000]">
                  24-HOUR <br/> <span className="text-yellow-300">HACKATHON</span>
                </h3>
                <p className="text-2xl font-bold text-indigo-50 max-w-2xl leading-tight">
                  The ultimate 24-hour non-stop coding experience. Starts April 29 @ 10:00 AM.
                </p>
                <div className="inline-block bg-black/30 border-2 border-white/20 px-4 py-2 text-white font-mono text-lg backdrop-blur-sm">
                  <span className="text-yellow-300">|</span> Judging Rounds: <span className="text-white font-bold">9:30 PM & 11:00 AM</span>
                </div>
                <div className="pt-4">
                  <Button size="xl" className="h-20 px-12 bg-white text-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-2xl font-black italic uppercase">
                    REGISTER NOW
                  </Button>
                </div>
              </div>

              <div className="relative w-80 h-80 flex items-center justify-center shrink-0 z-10">
                <div className="absolute inset-0 border-8 border-white/20 rounded-full animate-[spin_15s_linear_infinite]"></div>
                <div className="absolute inset-4 border-4 border-dashed border-yellow-300/40 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                <div className="text-[10rem] font-black text-white italic drop-shadow-[8px_8px_0px_#000]">24<span className="text-yellow-300 text-5xl">HR</span></div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-center pt-10 px-6 sm:px-0">
          <Link href="/schedule" className="w-full sm:w-auto">
            <Button size="xl" className="h-20 sm:h-24 w-full sm:px-16 text-xl sm:text-3xl font-black border-4 border-border shadow-[4px_4px_0px_black] sm:shadow-[10px_10px_0px_black] bg-white text-black hover:bg-primary transition-all uppercase italic" animation="pop">
              VIEW TIMELINE <ArrowRight className="ml-4 w-6 h-6 sm:w-10 sm:h-10" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Marquee Footer */}
      <footer className="bg-foreground border-t-8 border-border py-12 relative overflow-hidden mt-32">
        <div className="flex animate-marquee whitespace-nowrap gap-20">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-background font-black text-8xl uppercase italic opacity-20">
              PACE FEST 2026 • PACE FEST 2026 • 
            </span>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <div className="text-background text-xl sm:text-3xl font-black uppercase tracking-widest">STAY CONNECTED</div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 px-4">
            <a href="https://www.instagram.com/pacemangalore_official/" target="_blank" rel="noopener noreferrer" className="text-background font-black text-sm sm:text-xl hover:text-primary hover:skew-x-[-12deg] transition-all">
              INSTAGRAM
            </a>
            <a href="https://www.linkedin.com/school/p-a-college-of-engineering-mangalore/" target="_blank" rel="noopener noreferrer" className="text-background font-black text-sm sm:text-xl hover:text-primary hover:skew-x-[-12deg] transition-all">
              LINKEDIN
            </a>
            <a href="#" className="text-background font-black text-sm sm:text-xl hover:text-primary hover:skew-x-[-12deg] transition-all">
              DISCORD
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
