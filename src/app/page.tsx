'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Trophy, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 relative py-20 bg-background grid-pattern">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Badge 
            variant="accent" 
            className="text-lg py-2 px-6 border-4 border-foreground shadow-[4px_4px_0px_black] uppercase"
          >
            <Zap className="w-5 h-5 mr-2 fill-current" />
            Registration Open for 2026
          </Badge>
        </motion.div>

        {/* Hero Title */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase text-foreground drop-shadow-[8px_8px_0px_#000]"
          >
            PACE <br />
            <span className="bg-primary px-4 border-4 border-foreground shadow-[8px_8px_0px_black] inline-block -rotate-2">
              FEST 2026
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl font-bold text-foreground bg-white border-3 border-foreground p-4 shadow-[6px_6px_0px_black] max-w-2xl mx-auto rotate-1"
          >
            NO LIMITS. NO RULES. JUST CODE. 🚀
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Button 
            variant="default" 
            size="xl" 
            animation="wiggle"
            className="text-2xl py-8 px-12 border-4 border-foreground"
            asChild
          >
            <Link href="/login" className="flex items-center gap-3">
              JOIN THE REVOLUTION <ArrowRight className="w-6 h-6 stroke-[3px]" />
            </Link>
          </Button>
          
          <Button 
            variant="secondary" 
            size="xl" 
            animation="pop"
            className="text-2xl py-8 px-12 border-4 border-foreground"
          >
            EXPLORE EVENTS
          </Button>
        </motion.div>

        {/* Trust Signals / Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_black] bg-secondary -rotate-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase font-black italic">
                <Trophy className="w-6 h-6" /> $50k PRIZE
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_black] bg-accent rotate-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase font-black italic">
                <Rocket className="w-6 h-6" /> 50+ EVENTS
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-4 border-foreground shadow-[8px_8px_0px_black] bg-primary -rotate-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase font-black italic">
                <Star className="w-6 h-6" /> 24H HACK
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      {/* Marquee effect using plain CSS/Tailwind */}
      <div className="absolute bottom-0 w-full overflow-hidden py-4 bg-foreground border-t-4 border-foreground">
        <div className="flex animate-marquee whitespace-nowrap gap-10">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-background font-black text-2xl uppercase italic">
              PACE FEST 2026 • PACE FEST 2026 • 
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

