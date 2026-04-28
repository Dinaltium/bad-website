'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Trophy, Rocket, Star, Calendar, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 bg-background overflow-hidden grid-pattern-bold">
        <div className="max-w-5xl w-full text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Badge className="text-lg py-2 px-6 border-3 border-foreground shadow-[4px_4px_0px_black] uppercase font-black bg-accent text-accent-foreground -rotate-2">
              <Zap className="w-5 h-5 mr-2 fill-current" />
              Registration Open — April 28 to May 15, 2026
            </Badge>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase"
            >
              WELCOME TO <br />
              <span className="text-primary bk-text-shadow-lg italic">PACE FEST</span> <br />
              <span className="bg-secondary px-6 border-4 border-foreground shadow-[10px_10px_0px_black] inline-block rotate-1">
                2026
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-3xl font-bold text-foreground max-w-2xl mx-auto"
            >
              The biggest technical festival of the year. Compete, innovate, and win. 12 events, ₹5L+ in prizes.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Button 
              size="xl" 
              className="text-2xl py-8 px-12 border-4 border-foreground shadow-[8px_8px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all bg-primary font-black"
              asChild
            >
              <Link href={isLoggedIn ? "/events" : "/login"}>
                {isLoggedIn ? "VIEW EVENTS" : "REGISTER NOW"} <ArrowRight className="ml-3 w-8 h-8 stroke-[4px]" />
              </Link>
            </Button>
            
            <Button 
              variant="secondary" 
              size="xl" 
              className="text-2xl py-8 px-12 border-4 border-foreground shadow-[8px_8px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-black"
              asChild
            >
              <Link href="#about">EXPLORE FEST</Link>
            </Button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary border-4 border-foreground rounded-full shadow-[8px_8px_0px_black] -z-10 animate-bounce" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent border-4 border-foreground rotate-12 shadow-[8px_8px_0px_black] -z-10 animate-pulse" />
      </section>

      {/* Stats Section */}
      <section className="bg-foreground py-16 border-y-4 border-foreground overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-20 text-background font-black text-4xl uppercase italic">
              <span>2,400+ Participants</span>
              <span>12 Major Events</span>
              <span>₹5L+ Prize Pool</span>
              <span>3 Days of Madness</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="text-lg border-2 border-foreground px-4 py-1 font-black uppercase tracking-widest">
              // ABOUT PACE FEST
            </Badge>
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
              MORE THAN A <br />
              <span className="text-secondary underline decoration-8 underline-offset-8">FESTIVAL</span>. <br />
              IT'S A MOVEMENT.
            </h2>
            <p className="text-xl font-bold leading-relaxed">
              PACE Fest has been the launchpad for the next generation of engineers, creators, and innovators since 2019. 
              Starting as a small tech show, we now host 2,400+ participants from 60+ colleges.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white border-4 border-foreground shadow-[6px_6px_0px_black] rotate-1">
                <Trophy className="w-10 h-10 mb-4 text-primary" />
                <h4 className="text-xl font-black uppercase">Prize-First</h4>
                <p className="font-bold text-muted-foreground">Every event has a real reward.</p>
              </div>
              <div className="p-6 bg-white border-4 border-foreground shadow-[6px_6px_0px_black] -rotate-1">
                <Star className="w-10 h-10 mb-4 text-accent" />
                <h4 className="text-xl font-black uppercase">Open to All</h4>
                <p className="font-bold text-muted-foreground">Any college, any branch.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-accent border-8 border-foreground shadow-[20px_20px_0px_black] rotate-3 flex items-center justify-center p-12 overflow-hidden">
               <Rocket className="w-full h-full text-foreground opacity-20 absolute -bottom-10 -right-10 rotate-12" />
               <div className="text-center space-y-4 relative z-10">
                 <span className="text-9xl font-black">7+</span>
                 <p className="text-3xl font-black uppercase tracking-tighter">Years of Legacy</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 px-6 bg-secondary grid-pattern">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_white]">
              3 DAYS. 12 EVENTS.
            </h2>
            <p className="text-2xl font-black uppercase opacity-80">Zero Conflicts. Maximum Hype.</p>
          </div>

          <div className="space-y-8">
            {[
              { day: 'Day 1 — May 16', events: ['09:00 AM - Opening Ceremony', '10:00 AM - Code Clash', '10:00 AM - Hackathon 24 Begins'], color: 'bg-primary' },
              { day: 'Day 2 — May 17', events: ['09:00 AM - Arena Kings (Valorant)', '11:00 AM - Quiz Blitz', '02:00 PM - Paper Pitch'], color: 'bg-accent' },
              { day: 'Day 3 — May 18', events: ['09:00 AM - Bot Wars', '10:00 AM - UI Sprint', '07:00 PM - Grand Finale'], color: 'bg-white' },
            ].map((day, idx) => (
              <div key={idx} className={`border-4 border-foreground shadow-[10px_10px_0px_black] p-8 ${day.color} ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-foreground pb-2">{day.day}</h3>
                <div className="space-y-4">
                  {day.events.map((event, i) => (
                    <div key={i} className="flex items-center gap-4 text-xl font-bold">
                      <div className="w-4 h-4 bg-foreground" />
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <h2 className="text-6xl font-black uppercase tracking-tighter">
              GOT <span className="text-primary">QUESTIONS</span>?
            </h2>
            <div className="space-y-6">
               <div className="flex items-center gap-6 p-6 border-4 border-foreground bg-white shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                 <MapPin className="w-10 h-10 text-secondary" />
                 <div>
                   <h4 className="text-xl font-black uppercase">Venue</h4>
                   <p className="font-bold text-muted-foreground">PACE Institute, Auditorium Block</p>
                 </div>
               </div>
               <div className="flex items-center gap-6 p-6 border-4 border-foreground bg-white shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                 <Mail className="w-10 h-10 text-primary" />
                 <div>
                   <h4 className="text-xl font-black uppercase">Email</h4>
                   <p className="font-bold text-muted-foreground">events@pacefest2026.in</p>
                 </div>
               </div>
               <div className="flex items-center gap-6 p-6 border-4 border-foreground bg-white shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                 <Phone className="w-10 h-10 text-accent" />
                 <div>
                   <h4 className="text-xl font-black uppercase">Phone</h4>
                   <p className="font-bold text-muted-foreground">+91 98765 43210</p>
                 </div>
               </div>
            </div>
          </div>

          <Card className="border-4 border-foreground shadow-[12px_12px_0px_black] p-8 -rotate-1">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-4xl font-black uppercase">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-black uppercase">Name</label>
                <input className="w-full p-4 border-3 border-foreground bg-white focus:bg-accent outline-none font-bold" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-black uppercase">Email</label>
                <input className="w-full p-4 border-3 border-foreground bg-white focus:bg-accent outline-none font-bold" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-black uppercase">Message</label>
                <textarea className="w-full p-4 border-3 border-foreground bg-white focus:bg-accent outline-none font-bold min-h-[150px]" placeholder="Ask us anything..." />
              </div>
              <Button className="w-full py-8 text-xl font-black border-4 border-foreground shadow-[6px_6px_0px_black] uppercase">
                Send Message <MessageSquare className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-6 border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-4xl font-black italic uppercase tracking-tighter">
            PACE<span className="text-primary">FEST</span>
          </div>
          <div className="flex gap-10 font-black uppercase text-lg">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="#about" className="hover:text-primary">About</Link>
            <Link href="#schedule" className="hover:text-primary">Schedule</Link>
            <Link href="/login" className="hover:text-primary">Login</Link>
          </div>
          <div className="font-bold text-center md:text-right">
            <p>© 2026 PACE Fest. No Rights Reserved. Just Code.</p>
            <p className="text-accent uppercase italic">Built with Neubrutalism.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
