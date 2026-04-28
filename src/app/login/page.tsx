'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [userType, setUserType] = useState<'admin' | 'participant'>('participant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin fields
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Participant fields
  const [usn, setUsn] = useState('');
  const [participantPassword, setParticipantPassword] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (userType === 'admin') {
        if (!adminName || !adminPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        await login('admin', { name: adminName, password: adminPassword });
        router.push('/dashboard');
      } else {
        if (!usn || !participantPassword) {
          setError('Please fill in USN and password');
          setLoading(false);
          return;
        }
        await login('participant', { usn, password: participantPassword });
        router.push('/events');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern-sm flex flex-col items-center p-6 pt-32 pb-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-4 border-foreground shadow-[12px_12px_0px_black] p-8 bg-white">
          <CardHeader className="p-0 text-center space-y-4 mb-8">
            <div className="flex justify-center">
              <div className="bg-primary p-4 border-4 border-foreground shadow-[4px_4px_0px_black] rotate-3">
                <Shield size={40} className="text-foreground" />
              </div>
            </div>
            <CardTitle className="text-4xl font-black uppercase tracking-tighter italic text-black">
              WELCOME BACK
            </CardTitle>
            <p className="font-bold text-zinc-500 uppercase text-sm">
              Enter your credentials to access the node
            </p>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            {/* User Type Toggle */}
            <div className="flex border-4 border-foreground p-1 bg-muted">
              <button
                type="button"
                onClick={() => setUserType('participant')}
                className={`flex-1 py-3 font-black uppercase transition-all ${userType === 'participant' ? 'bg-primary text-black border-2 border-foreground shadow-[2px_2px_0px_black]' : 'text-zinc-500 hover:bg-background/50'}`}
              >
                Participant
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-3 font-black uppercase transition-all ${userType === 'admin' ? 'bg-accent text-black border-2 border-foreground shadow-[2px_2px_0px_black]' : 'text-zinc-500 hover:bg-background/50'}`}
              >
                Admin
              </button>
            </div>

            {error && (
              <div className="p-4 border-3 border-red-500 bg-red-50 text-red-700 font-bold uppercase text-xs italic">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {userType === 'admin' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-black ml-1">Admin Identity</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white text-black outline-none font-bold focus:bg-accent transition-colors placeholder:text-zinc-300"
                      placeholder="ADMIN NAME"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-black ml-1">Security Key</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white text-black outline-none font-bold focus:bg-accent transition-colors placeholder:text-zinc-300"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-black ml-1">USN Designation</label>
                    <input
                      type="text"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      className="w-full p-4 border-3 border-foreground bg-white text-black outline-none font-bold focus:bg-accent transition-colors placeholder:text-zinc-300"
                      placeholder="1XX21XX000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-black ml-1">Access Password</label>
                    <input
                      type="password"
                      value={participantPassword}
                      onChange={(e) => setParticipantPassword(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white text-black outline-none font-bold focus:bg-accent transition-colors placeholder:text-zinc-300"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-8 text-xl font-black border-4 border-foreground shadow-[6px_6px_0px_black] uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? 'AUTHENTICATING...' : <><LogIn className="mr-2 w-6 h-6" /> INITIALIZE LOGIN</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
