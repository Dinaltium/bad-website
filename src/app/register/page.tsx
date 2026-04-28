'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Zap, Sparkles, Shield, Landmark, Heart, Lightbulb, MapPin, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !yearOfStudy || !collegeName || !location || !usn || !password) {
      setError('PROTOCOL ERROR: ALL FIELDS MANDATORY');
      return;
    }

    setLoading(true);
    try {
      await register('participant', {
        name,
        yearOfStudy: parseInt(yearOfStudy),
        collegeName,
        location,
        usn,
        password,
      });
      router.push('/events');
    } catch (err: any) {
      setError(err.message || 'REGISTRATION FAILED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
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
        className="w-full max-w-2xl relative z-10"
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
          
          <CardContent className="p-8">
            {error && (
              <div className="mb-6 p-4 border-4 border-foreground bg-destructive text-white font-black uppercase italic shadow-[4px_4px_0px_black]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      placeholder="WARRIOR NAME" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">USN / ID</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      placeholder="1XX21XX000" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">Year of Study</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all appearance-none outline-none"
                    >
                      <option value="">SELECT YEAR</option>
                      <option value="1">1st YEAR</option>
                      <option value="2">2nd YEAR</option>
                      <option value="3">3rd YEAR</option>
                      <option value="4">4th YEAR</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      placeholder="CITY, STATE" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">College Name</label>
                  <div className="relative">
                    <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      placeholder="NAME OF YOUR INSTITUTION" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 opacity-60">Secret Password</label>
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

              <Button 
                type="submit"
                disabled={loading}
                variant="secondary"
                className="w-full h-14 sm:h-20 text-xl sm:text-3xl font-black border-4 border-border shadow-[4px_4px_0px_black] sm:shadow-[10px_10px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase italic bg-accent text-black" 
              >
                {loading ? 'PROCESSING...' : (
                  <>ENLIST NOW <Zap className="ml-2 w-6 h-6 sm:w-10 sm:h-10 fill-current" /></>
                )}
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
