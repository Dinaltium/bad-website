'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import StaggeredMenu from '@/components/ui/staggered-menu';

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsGlitching(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { label: 'Events', ariaLabel: 'View events', link: '/events' },
    { label: 'Schedule', ariaLabel: 'View festival schedule', link: '/schedule' },
    { label: 'Hackathon', ariaLabel: 'Hackathon portal', link: '/hackathon' },
    { label: 'Join Us', ariaLabel: 'Register for fest', link: '/register' },
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/pacemangalore_official/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/school/p-a-college-of-engineering-mangalore/' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b-4 border-border px-6 py-4 flex items-center justify-between">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter hover:skew-x-[-10deg] transition-transform text-black animate-glitch ${isGlitching ? 'animate-glitch-entrance' : ''}`} data-text="PACEFEST">
          PACE<span className="text-primary italic">FEST</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-black uppercase text-black">
          <Link href="/events" className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Events</Link>
          <Link href="/schedule" className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Schedule</Link>
          <Link href="/hackathon" className="cursor-pointer hover:text-primary underline decoration-transparent hover:decoration-primary decoration-4 transition-all">Hackathon</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href={isLoggedIn ? "/dashboard" : "/login"} className="hidden md:block">
            <Button variant="default" className="border-4 border-border shadow-[4px_4px_0px_black] uppercase font-black" animation="wiggle">
              {isLoggedIn ? "Dashboard" : "Login Portal"}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <StaggeredMenu 
              items={menuItems} 
              socialItems={socialItems}
              position="right"
              accentColor="#FFD93D"
              isFixed={true}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
