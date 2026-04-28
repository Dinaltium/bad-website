'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Zap, LogIn, Sparkles, Shield, Landmark, Heart, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [track, setTrack] = useState('');
  const [joinHackathon, setJoinHackathon] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all mandatory fields');
      return;
    }
    // Simple functional login from AuthContext
    login(email);
    router.push('/');
  };

  const tracks = [
    { id: 'healthcare', name: 'HEALTHCARE', icon: Heart, color: 'text-primary' },
    { id: 'fintech', name: 'FINTECH', icon: Landmark, color: 'text-secondary' },
    { id: 'cyber', name: 'CYBERSECURITY', icon: Shield, color: 'text-accent' },
    { id: 'open', name: 'OPEN INNOVATION', icon: Lightbulb, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-background grid-pattern-sm flex flex-col items-center p-6 pt-32 pb-20 relative">
      {/* Decorative Stickers */}
      <div className="absolute top-20 right-20 rotate-[12deg] hidden md:block">
        <Badge variant="primary" className="text-2xl py-3 px-8 border-4 border-border shadow-[6px_6px_0px_black] uppercase font-black">
          ELITE SQUAD
        </Badge>
      </div>
      <div className="absolute bottom-20 left-20 rotate-[-15deg] hidden md:block">
        <div className="bg-accent border-4 border-border p-6 shadow-[8px_8px_0px_black] rotate-[5deg]">
          <Sparkles className="w-12 h-12 text-black fill-current" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-xl relative z-10"
      >
        <Card className="border-4 border-border shadow-[12px_12px_0px_black] bg-white text-black relative">
          <CardHeader className="bg-primary border-b-4 border-border p-6 sm:p-10 text-center relative">
            <Link href="/" className="absolute -top-6 -left-6 z-20">
              <Badge variant="accent" className="text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-6deg] hover:rotate-0 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                ← RETURN HOME
              </Badge>
            </Link>
            <CardTitle className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-none">
              JOIN THE <br /> <span className="text-white">SQUAD</span>
            </CardTitle>
            <CardDescription className="text-black font-bold uppercase mt-2">
              Claim your spot in PACEFEST 2026
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Warrior Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      placeholder="YOUR FULL NAME" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      type="email" 
                      placeholder="YOU@EXAMPLE.COM" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Secret Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Hackathon Toggle */}
              <button
                type="button"
                onClick={() => setJoinHackathon(!joinHackathon)}
                className={`w-full p-4 border-4 border-black flex items-center gap-4 transition-all ${joinHackathon ? 'bg-primary shadow-none translate-x-1 translate-y-1' : 'bg-muted shadow-[4px_4px_0px_black] hover:bg-muted/80'}`}
              >
                <div className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-all ${joinHackathon ? 'bg-black' : 'bg-white'}`}>
                  {joinHackathon && <Zap className="w-5 h-5 text-primary fill-current" />}
                </div>
                <span className="font-black uppercase tracking-wider text-sm">WANT TO JOIN HACKATHON?</span>
              </button>

              {/* Track Selection - Conditional */}
              {joinHackathon && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 overflow-hidden"
                >
                  <label className="text-sm font-black uppercase tracking-widest ml-1">CHOOSE YOUR BATTLEFIELD (REQUIRED)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tracks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTrack(t.id)}
                        className={`p-4 border-4 transition-all flex flex-col items-center gap-2 group ${
                          track === t.id 
                          ? 'border-black bg-black text-white shadow-none' 
                          : 'border-border bg-white text-black shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                        }`}
                      >
                        <t.icon className={`w-6 h-6 ${track === t.id ? 'text-white' : t.color}`} />
                        <span className="text-[10px] font-black uppercase text-center">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <Button 
                type="submit"
                variant="secondary"
                className="w-full h-14 sm:h-16 text-xl sm:text-2xl font-black border-4 border-border shadow-[4px_4px_0px_black] sm:shadow-[6px_6px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase italic" 
              >
                ENLIST NOW <Zap className="ml-2 w-6 h-6 sm:w-8 sm:h-8 fill-current" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="bg-muted p-6 border-t-4 border-border flex justify-center">
            <p className="font-bold text-sm">
              ALREADY ENLISTED? <Link href="/login" className="text-secondary underline font-black hover:text-secondary/80">AUTHENTICATE</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
