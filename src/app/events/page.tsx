'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Zap, Trophy, Rocket, Star, Calendar, 
  Clock, MapPin, Search, Check, ArrowUpRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import Lenis from 'lenis';

const categories = ['All', 'Technical', 'Gaming', 'Creative', 'Fun', 'Innovation'];

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

export default function AllEventsPage() {
  const { isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);

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
    <div className="min-h-screen bg-background grid-pattern pt-28 pb-10 px-6 md:pt-32 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <Link href="/">
              <Button variant="outline" className="border-4 border-border shadow-[4px_4px_0px_black] font-black uppercase italic mb-4 hover:bg-muted text-black">
                <ArrowLeft className="mr-2 w-5 h-5" /> BACK TO HUB
              </Button>
            </Link>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
              ALL <span className="text-primary underline decoration-4 md:decoration-8">EVENTS</span>
            </h1>
            <p className="text-lg sm:text-2xl font-bold max-w-2xl text-black">
              The complete battle catalog. Choose your arena, claim your prize, and etch your name in PACEFEST history.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 text-black" />
            <Input 
              placeholder="SEARCH THE ARENA..." 
              className="pl-12 md:pl-14 w-full h-14 md:h-16 border-[3px] md:border-4 border-border shadow-[4px_4px_0px_black] md:shadow-[6px_6px_0px_black] text-lg md:text-xl font-black focus:shadow-none transition-all bg-white text-black placeholder:text-zinc-500 uppercase italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={`text-sm md:text-xl px-4 md:px-10 h-12 md:h-16 border-[3px] md:border-4 border-border shadow-[3px_3px_0px_black] md:shadow-[6px_6px_0px_black] uppercase font-black italic ${selectedCategory === cat ? '' : 'bg-white hover:bg-muted text-black'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div 
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="h-full border-4 border-border shadow-[12px_12px_0px_black] bg-white flex flex-col hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all group text-black">
                  <CardHeader className={`border-b-4 border-border ${event.color} p-8 relative overflow-hidden text-black`}>
                    <Badge className="absolute top-4 right-4 border-2 border-border bg-white text-black font-black uppercase italic py-1 px-3">
                      {event.tag}
                    </Badge>
                    <CardTitle className="text-4xl font-black uppercase mt-4 group-hover:skew-x-[-10deg] transition-transform">{event.title}</CardTitle>
                    <CardDescription className="text-black font-black uppercase tracking-widest">{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8 flex-1 text-black">
                    <p className="text-xl font-bold leading-tight text-black">{event.description}</p>
                    <div className="space-y-4 font-black text-black text-lg">
                      <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" /> {event.date}</div>
                      <div className="flex items-center gap-3"><Clock className="w-6 h-6 text-secondary" /> {event.time}</div>
                      <div className="flex items-center gap-3"><MapPin className="w-6 h-6 text-accent" /> {event.location}</div>
                    </div>
                    <div className="pt-6 border-t-4 border-dashed border-border flex items-center justify-between text-black">
                      <span className="text-lg font-black uppercase italic">Grand Prize:</span>
                      <span className="text-3xl font-black text-primary underline decoration-6 underline-offset-8 italic">{event.prize}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button 
                      className="w-full border-4 border-border text-2xl font-black italic h-16 shadow-[4px_4px_0px_black] hover:shadow-none transition-all"
                      animation="pop"
                      onClick={() => handleRegister(event.id)}
                      variant={registeredEvents.includes(event.id) ? 'secondary' : 'default'}
                    >
                      {registeredEvents.includes(event.id) ? (
                        <>REGISTERED <Check className="ml-2 w-8 h-8" /></>
                      ) : (
                        <>REGISTER NOW <ArrowUpRight className="ml-2 w-8 h-8" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
          >
            <Badge className="bg-secondary text-black text-2xl py-6 px-12 border-4 border-border shadow-[8px_8px_0px_black] uppercase font-black italic">
              <Zap className="mr-3 w-8 h-8 fill-current" /> Registration Successful!
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
