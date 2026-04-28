'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Fill the damn details! 🛑');
      return;
    }
    router.push('/events');
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-background grid-pattern">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-foreground font-bold hover:translate-x-[-2px] transition-transform"
      >
        <ArrowLeft className="w-5 h-5 border-2 border-foreground" /> BACK TO SAFETY
      </Link>

      <motion.div 
        initial={{ opacity: 0, rotate: -5 }}
        animate={{ opacity: 1, rotate: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="border-4 border-foreground shadow-[12px_12px_0px_black] bg-white">
          <CardHeader className="text-center space-y-2 border-b-4 border-foreground bg-accent">
            <CardTitle className="text-4xl font-black uppercase italic">Access Portal</CardTitle>
            <CardDescription className="text-foreground font-bold">Identities required for entry.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-lg font-black uppercase">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <Input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 border-4 border-foreground pl-12 text-lg font-bold shadow-[4px_4px_0px_black] focus:shadow-none transition-all"
                    placeholder="HACKER_X"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-lg font-black uppercase">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 border-4 border-foreground pl-12 text-lg font-bold shadow-[4px_4px_0px_black] focus:shadow-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  className="bg-destructive text-destructive-foreground p-3 border-4 border-foreground font-black text-center uppercase rotate-1"
                >
                  {error}
                </motion.div>
              )}

              <Button 
                type="submit"
                size="xl"
                variant="default"
                animation="shake"
                className="w-full border-4 border-foreground text-xl py-8"
              >
                <LogIn className="w-6 h-6 mr-2" />
                ENTER THE FEST
              </Button>
            </form>

            <div className="text-center pt-8">
              <p className="text-sm font-black uppercase">
                New here? <span className="text-primary underline cursor-pointer hover:bg-primary hover:text-white px-1">Create an Identity</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

