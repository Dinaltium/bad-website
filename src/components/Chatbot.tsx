'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, loading, sendMessage, loadHistory } = useChatbot();
  const { isLoggedIn } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      loadHistory();
    }
  }, [isOpen, isLoggedIn, loadHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading || !isLoggedIn) return;

    const message = input;
    setInput('');
    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Remove the check that hides the whole component
  // if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originY: 'bottom', originX: 'right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] flex flex-col"
          >
            <Card className="flex-1 flex flex-col border-4 border-foreground shadow-[12px_12px_0px_black] overflow-hidden bg-background">
              {/* Header */}
              <div className="bg-primary p-4 border-b-4 border-foreground flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 border-2 border-foreground shadow-[2px_2px_0px_black]">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase italic text-black leading-none">PACE BOT</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/60">AI COMMAND CENTER</span>
                      {!isLoggedIn && <span className="bg-black text-white text-[8px] px-1 font-black">AUTH REQUIRED</span>}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:rotate-90 transition-transform p-1"
                >
                  <X className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth grid-pattern-sm"
              >
                {!isLoggedIn ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="bg-accent p-6 border-4 border-foreground shadow-[6px_6px_0px_black] rotate-3">
                      <Zap className="w-12 h-12 text-black animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-black uppercase italic text-xl">PROTOCOL LOCKED</h4>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Authentication Required to Transmit</p>
                    </div>
                    <Button asChild className="border-4 border-foreground shadow-[4px_4px_0px_black]">
                      <Link href="/login" onClick={() => setIsOpen(false)}>INITIALIZE LOGIN</Link>
                    </Button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 grayscale">
                    <Zap className="w-12 h-12" />
                    <p className="text-xs font-black uppercase tracking-widest">Awaiting Transmissions...</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 border-3 border-foreground shadow-[4px_4px_0px_black] font-bold text-sm ${
                        msg.role === 'user' 
                          ? 'bg-accent rotate-1' 
                          : 'bg-white -rotate-1'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-60">
                          {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                          <span className="text-[10px] font-black uppercase">{msg.role === 'user' ? 'PARTICIPANT' : 'PACE BOT'}</span>
                        </div>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))
                )}
                {loading && isLoggedIn && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 border-3 border-foreground shadow-[4px_4px_0px_black] -rotate-1 animate-pulse">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t-4 border-foreground bg-muted">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="TYPE YOUR TRANSMISSION..."
                    className="flex-1 p-3 border-3 border-foreground bg-white outline-none font-bold text-sm focus:bg-primary transition-colors placeholder:text-foreground/30 uppercase italic"
                  />
                  <Button 
                    type="submit" 
                    disabled={!input.trim() || loading}
                    className="p-3 aspect-square border-3 border-foreground shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-none border-4 border-foreground flex items-center justify-center shadow-[6px_6px_0px_black] transition-all ${
          isOpen ? 'bg-accent rotate-12' : 'bg-primary'
        }`}
      >
        {isOpen ? <X size={32} className="text-black" /> : <MessageSquare size={32} className="text-black" />}
      </motion.button>
    </div>
  );
}
