'use client';

import { motion } from 'framer-motion';
import { Code, Gamepad2, Music, Users, Calendar, Trophy, ArrowRight, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    id: 1,
    title: 'Coding Contest',
    description: 'Solve complex algorithms and compete for the title of Ultimate Coder.',
    icon: Code,
    color: 'bg-primary',
    prize: '$1500',
    date: 'Oct 12, 10:00 AM'
  },
  {
    id: 2,
    title: 'Gaming Arena',
    description: 'Show your skills in Valorant and FIFA tournaments. Glory awaits.',
    icon: Gamepad2,
    color: 'bg-secondary',
    prize: '$2000',
    date: 'Oct 13, 02:00 PM'
  },
  {
    id: 3,
    title: 'Rhythmic Dance',
    description: 'Let your feet do the talking in this high-energy dance battle.',
    icon: Music,
    color: 'bg-accent',
    prize: '$1000',
    date: 'Oct 14, 06:00 PM'
  }
];

export default function EventsPage() {
  return (
    <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full space-y-16 bg-background grid-pattern">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-foreground font-black uppercase hover:translate-x-[-4px] transition-transform"
          >
            <HomeIcon className="w-5 h-5 border-2 border-foreground" /> GO HOME
          </Link>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase drop-shadow-[6px_6px_0px_#000]">Event Schedule</h1>
          <p className="text-xl font-bold bg-white border-3 border-foreground p-4 shadow-[4px_4px_0px_black] max-w-xl rotate-1">
            Pick your battlefield. Glory or defeat. There is no middle ground. ⚔️
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-accent border-4 border-foreground p-6 shadow-[6px_6px_0px_black] -rotate-2">
          <Users className="w-8 h-8" />
          <span className="text-2xl font-black uppercase">1,200+ WARRIORS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex"
          >
            <Card className="border-4 border-foreground shadow-[10px_10px_0px_black] bg-white flex-1 flex flex-col hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
              <CardHeader className={`border-b-4 border-foreground ${event.color} p-8`}>
                <div className="w-16 h-16 bg-white border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_black]">
                  <event.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-black uppercase mt-4">{event.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 flex-1 space-y-6 font-bold">
                <p className="text-lg leading-tight">
                  {event.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <span className="uppercase">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-primary" />
                    <span className="uppercase text-xl font-black italic underline decoration-primary decoration-4">PRIZE: {event.prize}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button 
                  variant="default" 
                  size="xl" 
                  animation="pop"
                  className="w-full border-4 border-foreground text-lg font-black italic"
                >
                  REGISTER NOW <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center py-12">
        <Badge variant="outline" className="text-2xl py-4 px-10 border-4 border-foreground shadow-[6px_6px_0px_black] uppercase font-black italic rotate-1">
          More events coming to destroy you soon...
        </Badge>
      </div>
    </main>
  );
}

