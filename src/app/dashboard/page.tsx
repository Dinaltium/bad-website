'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, User, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <Badge className="bg-primary text-foreground border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase px-4 py-1">
              // STUDENT DASHBOARD
            </Badge>
            <h1 className="text-6xl font-black uppercase tracking-tighter">
              HEY, <span className="text-secondary italic">{user?.name}</span> 👋
            </h1>
            <p className="text-xl font-bold opacity-70 italic">PACE Fest 2026 is in 17 days. Ready to win?</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_black] rotate-2">
            <div className="text-sm font-black uppercase opacity-60">Registration ID</div>
            <div className="text-2xl font-black uppercase">PF26-4892</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Events Registered', value: '2', sub: 'of 12 available', color: 'bg-primary' },
            { label: 'Rankings', value: '#12', sub: 'in Department', color: 'bg-secondary' },
            { label: 'Amount Paid', value: '₹180', sub: 'Full Access', color: 'bg-accent' },
            { label: 'Days Left', value: '17', sub: 'Until Kickoff', color: 'bg-white' },
          ].map((stat, i) => (
            <div key={i} className={`p-8 border-4 border-foreground shadow-[6px_6px_0px_black] ${stat.color} transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}>
              <div className="text-sm font-black uppercase opacity-70 mb-2">{stat.label}</div>
              <div className="text-5xl font-black mb-1">{stat.value}</div>
              <div className="text-xs font-black uppercase italic opacity-60">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="border-4 border-foreground shadow-[10px_10px_0px_black] overflow-hidden">
            <CardHeader className="bg-foreground text-background p-6">
              <CardTitle className="text-2xl font-black uppercase flex items-center gap-2 italic">
                <Trophy size={24} /> My Registrations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted border-b-4 border-foreground text-left">
                    <th className="p-4 font-black uppercase text-xs">Event</th>
                    <th className="p-4 font-black uppercase text-xs">Date</th>
                    <th className="p-4 font-black uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-foreground/10 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-bold uppercase tracking-tighter">Code Clash</td>
                    <td className="p-4 font-bold text-sm">May 16, 10 AM</td>
                    <td className="p-4">
                      <Badge className="bg-success text-foreground border-2 border-foreground uppercase font-black text-[10px]">Confirmed</Badge>
                    </td>
                  </tr>
                  <tr className="border-b-2 border-foreground/10 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-bold uppercase tracking-tighter">Quiz Blitz</td>
                    <td className="p-4 font-bold text-sm">May 17, 11 AM</td>
                    <td className="p-4">
                      <Badge className="bg-warning text-foreground border-2 border-foreground uppercase font-black text-[10px]">Pending Team</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="border-4 border-foreground shadow-[10px_10px_0px_black] p-8 -rotate-1">
             <h3 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
               <Settings size={28} /> Quick Profile
             </h3>
             <div className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase opacity-60">Department</label>
                   <div className="p-4 border-3 border-foreground bg-white font-black uppercase tracking-tighter italic">CSE</div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase opacity-60">Year</label>
                   <div className="p-4 border-3 border-foreground bg-white font-black uppercase tracking-tighter italic">3rd Year</div>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase opacity-60">College</label>
                 <div className="p-4 border-3 border-foreground bg-white font-black uppercase tracking-tighter italic">PACE Institute of Technology</div>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
