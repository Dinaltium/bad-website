'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Users, Trophy, Clock, Search, Filter } from 'lucide-react';

const EVENTS = [
  { id: 1, name: 'Code Clash', cat: 'technical', icon: '💻', prize: '₹25,000', desc: 'Head-to-head competitive programming. DSA problems.', date: 'May 16', time: '3 hrs', team: 'Individual', color: 'bg-primary' },
  { id: 2, name: 'Arena Kings', cat: 'gaming', icon: '🎮', prize: '₹40,000', desc: 'Esports tournament: BGMI + Valorant. Squad up.', date: 'May 17', time: '5 hrs', team: 'Team of 4', color: 'bg-secondary' },
  { id: 3, name: 'Hackathon 24', cat: 'innovation', icon: '🤖', prize: '₹1,00,000', desc: '24-hour hackathon. Build something real.', date: 'May 16–17', time: '24 hrs', team: 'Team of 3', color: 'bg-accent' },
  { id: 4, name: 'Stage Royale', cat: 'cultural', icon: '💃', prize: '₹20,000', desc: 'Dance, music, drama. Solo and group entries.', date: 'May 18', time: '4 hrs', team: 'Solo/Group', color: 'bg-primary' },
  { id: 5, name: 'Quiz Blitz', cat: 'technical', icon: '🧠', prize: '₹15,000', desc: 'Rapid-fire tech + GK quiz. Sharpest minds win.', date: 'May 17', time: '2 hrs', team: 'Team of 2', color: 'bg-secondary' },
  { id: 6, name: 'UI Sprint', cat: 'design', icon: '🎨', prize: '₹12,000', desc: 'Design a stunning app in 2 hours. Creativity wins.', date: 'May 18', time: '2 hrs', team: 'Individual', color: 'bg-accent' },
  { id: 7, name: 'CTF Arena', cat: 'technical', icon: '🔐', prize: '₹30,000', desc: 'Cybersecurity challenge. Break and defend.', date: 'May 16', time: '4 hrs', team: 'Team of 2', color: 'bg-primary' },
  { id: 8, name: 'Paper Pitch', cat: 'innovation', icon: '💡', prize: '₹10,000', desc: 'Present your research paper to expert judges.', date: 'May 17', time: '1 hr', team: 'Individual', color: 'bg-secondary' },
  { id: 9, name: 'Open Mic', cat: 'cultural', icon: '🎤', prize: '₹8,000', desc: 'Poetry, stand-up, spoken word. Crowd favorite.', date: 'May 18', time: '3 hrs', team: 'Solo', color: 'bg-accent' },
  { id: 10, name: 'Chess Masters', cat: 'gaming', icon: '♟', prize: '₹8,000', desc: 'Blitz chess tournament. Swiss system knockout.', date: 'May 17', time: '3 hrs', team: 'Individual', color: 'bg-primary' },
  { id: 11, name: 'Lens & Light', cat: 'design', icon: '📸', prize: '₹7,000', desc: 'On-campus photography contest. Theme-based.', date: 'May 16', time: '2 hrs', team: 'Individual', color: 'bg-secondary' },
  { id: 12, name: 'Bot Wars', cat: 'innovation', icon: '🏗', prize: '₹20,000', desc: 'Build and battle robots in a maze challenge.', date: 'May 18', time: '4 hrs', team: 'Team of 3', color: 'bg-accent' },
];

export default function EventsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filteredEvents = EVENTS.filter(e => 
    (filter === 'all' || e.cat === filter) && 
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 space-y-12 grid-pattern">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <Badge className="bg-accent text-accent-foreground border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase text-lg px-6 py-2">
            // ALL EVENTS
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
            CHOOSE YOUR <span className="text-primary underline decoration-8">BATTLES</span>
          </h1>
          <p className="text-2xl font-bold max-w-3xl">
            12 events. One fest. Every event has a massive prize pool waiting for you.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {['all', 'technical', 'gaming', 'cultural', 'innovation', 'design'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-black uppercase border-3 border-foreground shadow-[4px_4px_0px_black] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${filter === cat ? 'bg-secondary' : 'bg-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground" />
            <input 
              className="w-full p-4 pl-12 border-4 border-foreground bg-white outline-none font-black uppercase tracking-tighter focus:bg-accent"
              placeholder="SEARCH EVENTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full border-4 border-foreground shadow-[10px_10px_0px_black] bg-white overflow-hidden group hover:rotate-1 transition-transform">
                <CardHeader className={`p-6 border-b-4 border-foreground ${event.color} transition-colors`}>
                  <div className="flex justify-between items-start">
                    <span className="text-5xl">{event.icon}</span>
                    <Badge className="bg-foreground text-background border-2 border-foreground uppercase font-black">
                      {event.cat}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-black uppercase mt-4 group-hover:italic transition-all">
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <p className="font-bold text-lg leading-snug">{event.desc}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 font-black uppercase text-sm italic">
                      <Calendar size={18} className="text-primary" /> {event.date}
                    </div>
                    <div className="flex items-center gap-3 font-black uppercase text-sm italic">
                      <Clock size={18} className="text-secondary" /> {event.time}
                    </div>
                    <div className="flex items-center gap-3 font-black uppercase text-sm italic">
                      <Users size={18} className="text-accent" /> {event.team}
                    </div>
                  </div>

                  <div className="pt-4 border-t-4 border-foreground">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-black text-primary drop-shadow-[2px_2px_0px_black]">
                        {event.prize}
                      </div>
                      <Button className="border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase bg-secondary text-foreground hover:bg-accent">
                        REGISTER →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
