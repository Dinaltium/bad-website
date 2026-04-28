'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
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
    login(email);
    router.push('/events');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background grid-pattern-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-4 border-foreground shadow-[12px_12px_0px_black] p-8">
          <CardHeader className="p-0 text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <div className="bg-primary p-4 border-4 border-foreground shadow-[4px_4px_0px_black] rotate-3">
                <Shield size={40} className="text-foreground" />
              </div>
            </div>
            <CardTitle className="text-4xl font-black uppercase tracking-tighter italic">
              {isLogin ? 'WELCOME BACK' : 'JOIN THE FEST'}
            </CardTitle>
            <p className="font-bold text-muted-foreground uppercase text-sm">
              {isLogin ? 'Enter your credentials' : 'Create your student account'}
            </p>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            {/* Tabs */}
            <div className="flex border-4 border-foreground p-1 bg-muted">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-black uppercase transition-all ${isLogin ? 'bg-accent border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-black uppercase transition-all ${!isLogin ? 'bg-primary border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                  placeholder="name@college.edu"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                    placeholder="Arjun Sharma"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-black uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit"
                className="w-full py-8 text-xl font-black border-4 border-foreground shadow-[6px_6px_0px_black] uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {isLogin ? <><LogIn className="mr-2" /> LOGIN</> : <><UserPlus className="mr-2" /> REGISTER</>}
              </Button>
            </form>

            <div className="text-center pt-4">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-black uppercase text-sm hover:underline decoration-2 underline-offset-4"
              >
                {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : "ALREADY REGISTERED? LOGIN"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
