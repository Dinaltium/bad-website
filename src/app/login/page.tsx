'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Code, Globe, Zap, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    // Simple functional login from AuthContext
    login(email);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Stickers */}
      <div className="absolute top-20 left-20 rotate-[-12deg] hidden md:block">
        <Badge variant="accent" className="text-2xl py-3 px-8 border-4 border-border shadow-[6px_6px_0px_black] uppercase font-black">
          NO LIMITS
        </Badge>
      </div>
      <div className="absolute bottom-20 right-20 rotate-[15deg] hidden md:block">
        <div className="bg-primary border-4 border-border p-6 shadow-[8px_8px_0px_black] rotate-[-5deg]">
          <Zap className="w-12 h-12 text-black fill-current" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-4 border-border shadow-[12px_12px_0px_black] bg-white text-black relative">
          <CardHeader className="bg-secondary border-b-4 border-border p-10 text-center relative">
            <Link href="/" className="absolute -top-6 -left-6 z-20">
              <Badge variant="accent" className="text-xl py-2 px-6 border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black rotate-[-6deg] hover:rotate-0 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                ← RETURN HOME
              </Badge>
            </Link>
            <CardTitle className="text-6xl font-black uppercase tracking-tighter italic leading-none">
              WELCOME <br /> <span className="text-white">BACK</span>
            </CardTitle>
            <CardDescription className="text-black font-bold uppercase mt-2">
              Access the PACEFEST nerve center
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      type="email" 
                      placeholder="YOU@EXAMPLE.COM" 
                      className="pl-12 h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-bold focus:shadow-none transition-all placeholder:text-zinc-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
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

              <Button 
                type="submit"
                className="w-full h-16 text-2xl font-black border-4 border-border shadow-[6px_6px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase italic" 
                animation="pop"
              >
                AUTHENTICATE <ArrowRight className="ml-2 w-8 h-8" />
              </Button>
            </form>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t-2 border-border"></div>
              <span className="flex-shrink mx-4 text-sm font-black uppercase">Or continue with</span>
              <div className="flex-grow border-t-2 border-border"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-black hover:bg-muted">
                <Code className="mr-2 w-5 h-5" /> GITHUB
              </Button>
              <Button variant="outline" className="h-14 border-4 border-border shadow-[4px_4px_0px_black] bg-white text-black font-black hover:bg-muted">
                <Globe className="mr-2 w-5 h-5" /> GOOGLE
              </Button>
            </div>
          </CardContent>

          <CardFooter className="bg-muted p-6 border-t-4 border-border flex justify-center">
            <p className="font-bold text-sm">
              NEW TO THE FEST? <Link href="/register" className="text-primary underline font-black hover:text-primary/80">RECRUIT ME</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
