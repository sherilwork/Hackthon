
"use client"

import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Header() {
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-headline font-semibold text-foreground">{greeting}, Adnan 👋</h2>
        <p className="text-xs font-headline italic text-muted-foreground mt-1">Ready to craft something beautiful today?</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            className="pl-9 pr-4 py-2 bg-secondary/50 border-none rounded-full h-10 text-xs focus-visible:ring-1 focus-visible:ring-primary/20" 
            placeholder="Search projects, tasks..." 
          />
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 h-10 w-10 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>

        <Button size="icon" className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
