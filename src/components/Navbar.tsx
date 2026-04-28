'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Schedule', href: '/#schedule' },
    { name: 'Contact', href: '/#contact' },
    ...(isLoggedIn ? [{ name: 'Events', href: '/events' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b-4 border-foreground px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-1 group">
          PACE<span className="text-primary group-hover:text-secondary transition-colors">FEST</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-bold uppercase hover:text-primary transition-colors tracking-tight"
            >
              {link.name}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-black uppercase bg-accent px-4 py-2 border-3 border-foreground shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                <User size={20} /> {user?.name}
              </Link>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={logout}
                className="border-3 border-foreground shadow-[4px_4px_0px_black] font-black"
              >
                <LogOut size={20} className="mr-2" /> LOGOUT
              </Button>
            </div>
          ) : (
            <Button 
              asChild
              variant="default"
              className="border-3 border-foreground shadow-[4px_4px_0px_black] font-black uppercase text-lg px-8 py-6"
            >
              <Link href="/login">
                <LogIn size={20} className="mr-2" /> LOGIN / REGISTER
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden border-3 border-foreground p-2 bg-white shadow-[4px_4px_0px_black]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b-4 border-foreground p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase border-3 border-foreground p-4 bg-white shadow-[6px_6px_0px_black]"
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <Button 
                asChild
                className="border-3 border-foreground shadow-[6px_6px_0px_black] font-black uppercase text-xl p-8"
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  LOGIN / REGISTER
                </Link>
              </Button>
            ) : (
              <Button 
                variant="destructive"
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="border-3 border-foreground shadow-[6px_6px_0px_black] font-black uppercase text-xl p-8"
              >
                LOGOUT
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
