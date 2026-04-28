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
  const [userType, setUserType] = useState<'admin' | 'participant'>('participant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin fields
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Participant fields
  const [participantName, setParticipantName] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [location, setLocation] = useState('');
  const [usn, setUsn] = useState('');
  const [participantPassword, setParticipantPassword] = useState('');

  const { login, register } = useAuth();
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

        if (isLogin) {
          await login('admin', { name: adminName, password: adminPassword });
        } else {
          await register('admin', { name: adminName, password: adminPassword });
        }
        router.push('/dashboard');
      } else {
        if (isLogin) {
          if (!usn || !participantPassword) {
            setError('Please fill in USN and password');
            setLoading(false);
            return;
          }
          await login('participant', { usn, password: participantPassword });
        } else {
          if (!participantName || !yearOfStudy || !collegeName || !location || !usn || !participantPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
          }
          await register('participant', {
            name: participantName,
            yearOfStudy: parseInt(yearOfStudy),
            collegeName,
            location,
            usn,
            password: participantPassword,
          });
        }
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
              {isLogin ? 'Enter your credentials' : 'Create your account'}
            </p>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            {/* User Type Toggle */}
            <div className="flex border-4 border-foreground p-1 bg-muted">
              <button
                type="button"
                onClick={() => setUserType('participant')}
                className={`flex-1 py-3 font-black uppercase transition-all ${userType === 'participant' ? 'bg-primary border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Participant
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-3 font-black uppercase transition-all ${userType === 'admin' ? 'bg-accent border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Admin
              </button>
            </div>

            {/* Login/Register Toggle */}
            <div className="flex border-4 border-foreground p-1 bg-muted">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-black uppercase transition-all ${isLogin ? 'bg-accent border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-black uppercase transition-all ${!isLogin ? 'bg-primary border-2 border-foreground shadow-[2px_2px_0px_black]' : 'hover:bg-background/50'}`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="p-4 border-3 border-red-500 bg-red-50 text-red-700 font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {userType === 'admin' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Admin Name</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                      placeholder="Admin Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Password</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              ) : (
                <>
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase">Full Name</label>
                      <input
                        type="text"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase">Year of Study</label>
                      <select
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase">College Name</label>
                      <input
                        type="text"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                        placeholder="College Name"
                      />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                        placeholder="City, State"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">USN</label>
                    <input
                      type="text"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
                      placeholder="1XX21XX000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Password</label>
                    <input
                      type="password"
                      value={participantPassword}
                      onChange={(e) => setParticipantPassword(e.target.value)}
                      className="w-full p-4 border-3 border-foreground bg-white outline-none font-bold focus:bg-accent transition-colors"
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
                {loading ? 'PROCESSING...' : (isLogin ? <><LogIn className="mr-2" /> LOGIN</> : <><UserPlus className="mr-2" /> REGISTER</>)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
