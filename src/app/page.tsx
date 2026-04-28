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

  const filteredEvents = events.filter(e => 
    (selectedCategory === 'All' || e.category === selectedCategory) &&
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Link href="/" className="text-3xl font-black uppercase tracking-tighter hover:skew-x-[-10deg] transition-transform text-black">
            PACE<span className="text-primary italic">FEST</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-black uppercase text-black">
            <Link href="#events" className="hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Events</Link>
            <Link href="#schedule" className="hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Schedule</Link>
            <Link href="#stats" className="hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Stats</Link>
          </div>
          <Button variant="default" className="border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black" animation="wiggle">
            Login Portal
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="space-y-10 relative z-10">
            <Badge variant="accent" className="text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-2deg]">
              OCT 12-14, 2026 • UNIVERSITY CAMPUS
            </Badge>
            <h1 className="text-7xl md:text-[9rem] font-black leading-[0.8] uppercase tracking-tighter drop-shadow-[10px_10px_0px_#000]">
              LIMITLESS <br />
              <span className="text-primary italic">ENERGY.</span>
            </h1>
            <p className="text-2xl font-bold bg-white border-4 border-border p-6 shadow-[8px_8px_0px_black] rotate-1 max-w-lg text-black">
              The biggest technical festival of the decade is here. Join 50,000+ students in a journey of pure innovation.
            </p>
            <div className="flex gap-6 pt-6">
              <Button size="xl" className="border-4 border-border text-2xl py-8 px-12" animation="pop">
                GET TICKETS <Zap className="ml-2 w-6 h-6 fill-current" />
              </Button>
            </div>
          </div>

          <div className="relative">
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
      <section id="stats" className="bg-secondary border-y-4 border-border py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            { label: 'Registrations', value: '12,450', icon: Users },
            { label: 'Total Prize Pool', value: '$50,000', icon: Trophy },
            { label: 'Colleges', value: '120+', icon: MapPin },
            { label: 'Experience', value: '10 YRS', icon: Star }
          ].map((stat, i) => (
            <Card key={i} className="border-4 border-border shadow-[8px_8px_0px_black] bg-white hover:scale-105 transition-transform rotate-[1deg] text-black">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent border-2 border-border shadow-[2px_2px_0px_black] text-black">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="text-sm font-bold uppercase">{stat.label}</div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Events Hub */}
      <section id="events" className="px-6 py-32 max-w-7xl mx-auto space-y-20">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
              >
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
              </motion.div>
            ))}
          </AnimatePresence>
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
      <section id="schedule" className="px-6 py-32 max-w-4xl mx-auto space-y-20">
        <h2 className="text-6xl font-black uppercase tracking-tighter text-center">The Battle Plan</h2>
        <div className="space-y-8 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block"></div>
          {[
            { day: 'DAY 01', title: 'The Awakening', desc: 'Opening Ceremony & Hackathon Kickoff', icon: Zap, color: 'bg-primary' },
            { day: 'DAY 02', title: 'Peak Performance', desc: 'Gaming Finals & Tech Talk Series', icon: Rocket, color: 'bg-secondary' },
            { day: 'DAY 03', title: 'The Finale', desc: 'Award Night & Cultural Explosion', icon: Trophy, color: 'bg-accent' }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="flex-1 text-center md:text-right">
                {i % 2 === 0 ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-primary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <p className="font-bold">{item.desc}</p>
                  </div>
                ) : null}
              </div>
              <div className={`w-20 h-20 rounded-full border-4 border-border ${item.color} flex items-center justify-center shadow-[4px_4px_0px_black] z-10 shrink-0`}>
                <item.icon className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                {i % 2 !== 0 ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-secondary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <p className="font-bold">{item.desc}</p>
                  </div>
                ) : (
                  <div className="md:hidden">
                    <div className="text-4xl font-black text-primary">{item.day}</div>
                    <div className="text-2xl font-black uppercase">{item.title}</div>
                    <p className="font-bold">{item.desc}</p>
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
          <div className="text-background text-3xl font-black uppercase tracking-widest">STAY CONNECTED</div>
          <div className="flex gap-10">
            {['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'DISCORD'].map(social => (
              <a key={social} href="#" className="text-white font-black text-xl hover:text-primary hover:skew-x-[-12deg] transition-all">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
