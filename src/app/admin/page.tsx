'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Trophy, Zap, Shield, Heart, Landmark, 
  Lightbulb, Activity, Search, Download, 
  Settings, Bell, CheckCircle, AlertCircle, 
  TrendingUp, BarChart3, Database, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Registrations', value: '1,284', change: '+12%', color: 'bg-primary' },
    { label: 'Hackathon Teams', value: '42', change: '+8', color: 'bg-secondary' },
    { label: 'Revenue Collected', value: '₹42,000', change: '+15%', color: 'bg-accent' },
    { label: 'Swag Status', value: '85%', change: 'Low Stock', color: 'bg-white' },
  ];

  const tracks = [
    { name: 'Healthcare', count: 12, total: 42, color: 'bg-red-400', icon: Heart },
    { name: 'Fintech', count: 10, total: 42, color: 'bg-emerald-400', icon: Landmark },
    { name: 'Cybersecurity', count: 8, total: 42, color: 'bg-blue-400', icon: Shield },
    { name: 'Open Innovation', count: 12, total: 42, color: 'bg-yellow-400', icon: Lightbulb },
  ];

  const recentRegs = [
    { name: 'Arjun Reddy', email: 'arjun@example.com', track: 'Fintech', status: 'Verified' },
    { name: 'Sanya Mirza', email: 'sanya@tech.in', track: 'Healthcare', status: 'Pending' },
    { name: 'Vikram Singh', email: 'vik@cyber.co', track: 'Cybersecurity', status: 'Verified' },
    { name: 'Priya Das', email: 'priya@innovate.org', track: 'Open Innovation', status: 'Verified' },
  ];

  return (
    <div className="min-h-screen bg-background grid-pattern p-6 md:p-12 space-y-12 pb-40">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-8 border-foreground pb-12">
          <div className="space-y-4">
            <Badge className="bg-foreground text-background border-4 border-foreground shadow-[4px_4px_0px_black] font-black uppercase px-6 py-2 text-lg">
              // CLASSIFIED: MISSION CONTROL
            </Badge>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
              ADMIN <br /> <span className="text-primary drop-shadow-[8px_8px_0px_#000]">CENTER</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-16 px-8 border-4 border-foreground shadow-[6px_6px_0px_black] font-black uppercase italic hover:bg-muted">
              <Download className="mr-2 w-6 h-6" /> Export Data
            </Button>
            <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_black] -rotate-2">
              <div className="text-xs font-black uppercase opacity-60 flex items-center gap-2">
                <Activity size={14} className="text-red-600" /> System Status
              </div>
              <div className="text-xl font-black uppercase">ALL SYSTEMS NOMINAL</div>
            </div>
          </div>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className={`p-10 border-4 border-foreground shadow-[8px_8px_0px_black] ${stat.color} transition-all hover:scale-[1.02]`}>
              <div className="text-sm font-black uppercase opacity-70 mb-4">{stat.label}</div>
              <div className="text-6xl font-black mb-2">{stat.value}</div>
              <div className="flex items-center gap-2 text-sm font-black uppercase italic">
                <TrendingUp size={16} /> {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Track Distribution */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-4 border-foreground shadow-[12px_12px_0px_black] bg-white p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black uppercase italic flex items-center gap-2">
                  <BarChart3 size={28} /> TRACKS
                </h3>
                <Badge variant="outline" className="border-2 border-foreground font-black">LIVE</Badge>
              </div>
              <div className="space-y-8">
                {tracks.map((t, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <t.icon size={20} className={t.color.replace('bg-', 'text-')} />
                        <span className="font-black uppercase tracking-tight text-lg">{t.name}</span>
                      </div>
                      <span className="font-black opacity-60 italic">{t.count} Teams</span>
                    </div>
                    <div className="h-6 border-4 border-foreground bg-muted relative overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                      <div 
                        className={`absolute inset-y-0 left-0 ${t.color} border-r-4 border-foreground transition-all duration-1000`} 
                        style={{ width: `${(t.count / t.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-accent border-4 border-foreground p-8 shadow-[10px_10px_0px_black] space-y-4">
              <h4 className="text-2xl font-black uppercase italic flex items-center gap-2">
                <Bell size={24} /> QUICK ALERTS
              </h4>
              <div className="space-y-3">
                <div className="bg-white/50 p-4 border-2 border-foreground flex items-center gap-3 font-bold text-sm">
                  <AlertCircle size={18} className="text-red-600" /> 3 teams haven't submitted docs
                </div>
                <div className="bg-white/50 p-4 border-2 border-foreground flex items-center gap-3 font-bold text-sm">
                  <CheckCircle size={18} className="text-green-600" /> Server migration complete
                </div>
              </div>
            </div>
          </div>

          {/* Recent Warriors Table */}
          <Card className="lg:col-span-2 border-4 border-foreground shadow-[12px_12px_0px_black] overflow-hidden bg-white">
            <CardHeader className="bg-foreground text-background p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-4xl font-black uppercase italic flex items-center gap-3">
                  <Database size={32} /> RECENT WARRIORS
                </CardTitle>
                <CardDescription className="text-background/60 font-black uppercase mt-2">Latest enforcements on the field</CardDescription>
              </div>
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                <Input placeholder="SEARCH NAME..." className="pl-12 bg-white text-black font-black border-4 border-foreground h-12 shadow-[4px_4px_0px_white]" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted border-b-8 border-foreground text-left">
                      <th className="p-6 font-black uppercase text-sm italic">Name</th>
                      <th className="p-6 font-black uppercase text-sm italic">Track</th>
                      <th className="p-6 font-black uppercase text-sm italic">Status</th>
                      <th className="p-6 font-black uppercase text-sm italic text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegs.map((reg, i) => (
                      <tr key={i} className="border-b-4 border-foreground/10 hover:bg-primary/10 transition-colors group">
                        <td className="p-6">
                          <div className="font-black text-xl uppercase tracking-tighter">{reg.name}</div>
                          <div className="text-xs font-bold opacity-50">{reg.email}</div>
                        </td>
                        <td className="p-6">
                          <Badge variant="secondary" className="border-2 border-foreground font-black uppercase italic text-[10px]">
                            {reg.track}
                          </Badge>
                        </td>
                        <td className="p-6">
                          <div className={`flex items-center gap-2 font-black uppercase italic text-sm ${reg.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {reg.status === 'Verified' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                            {reg.status}
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <Button size="sm" className="bg-white text-black border-2 border-foreground shadow-[3px_3px_0px_black] font-black uppercase text-[10px] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            Review File
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <div className="p-6 bg-muted border-t-4 border-foreground text-center">
              <Button variant="link" className="font-black uppercase italic text-foreground hover:text-primary">
                View All 1,284 Registrations <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Global Settings Toggle */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: 'HACKATHON REG', status: 'ACTIVE', color: 'bg-primary' },
            { label: 'SCHEDULE VISIBILITY', status: 'PUBLIC', color: 'bg-secondary' },
            { label: 'POOL PRIZE STATUS', status: 'LOCKED', color: 'bg-accent' },
          ].map((toggle, i) => (
            <div key={i} className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_black] flex items-center justify-between group">
              <div>
                <div className="text-xs font-black uppercase opacity-60 mb-1">{toggle.label}</div>
                <div className="text-2xl font-black uppercase italic tracking-tighter">{toggle.status}</div>
              </div>
              <div className="w-16 h-8 border-4 border-foreground bg-muted relative rounded-none cursor-pointer">
                <div className={`absolute top-0 bottom-0 w-1/2 ${toggle.color} border-2 border-foreground transition-all ${i === 2 ? 'right-0' : 'left-0'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
