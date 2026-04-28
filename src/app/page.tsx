'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Gamepad2, Music, Users, Calendar, Trophy, 
  ArrowRight, Star, Rocket, Zap, Search, Filter,
  MapPin, Clock, X, Check, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  }
];

export default function CompleteEventsPage() {
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

    // Request Animation Frame for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

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
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.schedule-item', {
        scrollTrigger: {
          trigger: '#schedule',
          start: 'top 70%',
        },
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });
    });

    // Make lenis accessible for scrollToSection
    (window as any).lenis = lenis;

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const filteredEvents = events.filter(e => 
    (selectedCategory === 'All' || e.category === selectedCategory) &&
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(id, { offset: -80, duration: 1.5 });
    }
  };

  const handleRegister = (id: number) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern text-foreground selection:bg-primary selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-3xl font-black uppercase tracking-tighter hover:skew-x-[-10deg] transition-transform text-black animate-glitch" data-text="PACEFEST">
            PACE<span className="text-primary italic">FEST</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-black uppercase text-black">
            <button onClick={() => scrollToSection('#events')} className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Events</button>
            <button onClick={() => scrollToSection('#schedule')} className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Schedule</button>
            <button onClick={() => scrollToSection('#stats')} className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Stats</button>
          </div>
          <Link href="/login">
            <Button variant="default" className="border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black" animation="wiggle">
              Login Portal
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 min-h-screen flex flex-col justify-center max-w-7xl mx-auto py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="space-y-10 relative z-10">
            <div className="hero-badge inline-block">
              <Badge variant="accent" className="text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-2deg]">
                OCT 12-14, 2026 • UNIVERSITY CAMPUS
              </Badge>
            </div>
            <h1 className="text-7xl md:text-[9rem] font-black leading-[0.8] uppercase tracking-tighter drop-shadow-[10px_10px_0px_#000]">
              <div className="hero-title-line animate-glitch cursor-default" data-text="LIMITLESS">LIMITLESS</div>
              <div className="hero-title-line text-primary italic animate-glitch cursor-default" data-text="ENERGY.">ENERGY.</div>
            </h1>
            <p className="hero-desc text-2xl font-bold bg-white border-4 border-border p-6 shadow-[8px_8px_0px_black] rotate-1 max-w-lg text-black">
              The biggest technical festival of the decade is here. Join 50,000+ students in a journey of pure innovation.
            </p>
            <div className="hero-cta flex gap-6 pt-6">
              <Button size="xl" className="border-4 border-border text-2xl py-8 px-12" animation="pop">
                GET TICKETS <Zap className="ml-2 w-6 h-6 fill-current" />
              </Button>
            </div>
          </div>

          <div className="relative hero-image">
            <div className="w-full aspect-square bg-accent border-4 border-border shadow-[20px_20px_0px_black] flex items-center justify-center -rotate-3 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <Rocket className="w-48 h-48 group-hover:translate-y-[-20px] group-hover:translate-x-[20px] transition-transform duration-500" />
              <div className="absolute top-10 right-10 bg-white border-4 border-border p-4 shadow-[4px_4px_0px_black] rotate-6">
                <span className="text-4xl font-black italic text-black">50+ EVENTS</span>
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
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black underline decoration-white decoration-8">The Hall of Data</h2>
            <p className="text-2xl font-bold text-black uppercase italic">By the numbers, we are unstoppable.</p>
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
                      <div className="text-3xl font-black">{stat.value}</div>
                      <div className="text-sm font-bold uppercase">{stat.label}</div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Hub */}
      <section id="events" className="px-6 min-h-screen flex flex-col justify-center max-w-7xl mx-auto space-y-20 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter underline decoration-primary decoration-8">Events Hub</h2>
            <p className="text-xl font-bold max-w-lg">Find your event. Crush the competition. Own the stage.</p>
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
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={`text-lg px-8 h-14 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black italic ${selectedCategory === cat ? '' : 'bg-white hover:bg-muted text-black'}`}
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

      {/* Schedule Section */}
      <section id="schedule" className="px-6 min-h-screen flex flex-col justify-center max-w-4xl mx-auto space-y-20 py-20">
        <h2 className="text-6xl font-black uppercase tracking-tighter text-center">The Battle Plan</h2>
        <div className="space-y-10 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-border hidden md:block"></div>
          {[
            { day: 'Day 1', title: 'The Awakening', events: ['Check-in', 'Opening Ceremony', 'Hackathon Kickoff'], icon: Zap, color: 'bg-primary' },
            { day: 'Day 2', title: 'The Grind', events: ['Gaming Heats', 'Workshops', 'Creative Jam'], icon: Rocket, color: 'bg-secondary' },
            { day: 'Day 3', title: 'The Glory', events: ['Final Battles', 'Award Night', 'After Party'], icon: Trophy, color: 'bg-accent' },
          ].map((item, i) => (
            <div key={i} className={`schedule-item relative flex items-center gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="flex-1 text-center md:text-right">
                {i % 2 === 0 ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-primary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <ul className="text-lg font-bold space-y-1 mt-4">
                      {item.events.map((e, idx) => <li key={idx}>• {e}</li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className={`w-20 h-20 rounded-full border-4 border-border ${item.color} flex items-center justify-center shadow-[4px_4px_0px_black] z-10 shrink-0`}>
                <item.icon className="w-10 h-10 text-black" />
              </div>
              <div className="flex-1 text-center md:text-left">
                {i % 2 !== 0 ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-secondary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <ul className="text-lg font-bold space-y-1 mt-4">
                      {item.events.map((e, idx) => <li key={idx}>• {e}</li>)}
                    </ul>
                  </div>
                ) : (
                  <div className="md:hidden">
                    <div className="text-4xl font-black text-primary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <ul className="text-lg font-bold space-y-1 mt-4">
                      {item.events.map((e, idx) => <li key={idx}>• {e}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
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
          <div className="text-black text-3xl font-black uppercase tracking-widest">STAY CONNECTED</div>
          <div className="flex gap-10">
            {['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'DISCORD'].map(social => (
              <a key={social} href="#" className="text-black font-black text-xl hover:text-primary hover:skew-x-[-12deg] transition-all">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
