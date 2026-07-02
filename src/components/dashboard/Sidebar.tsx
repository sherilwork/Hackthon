"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  Layers, 
  CheckSquare, 
  Code2, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { icon: Home, label: 'Home', href: '/', active: true },
  { icon: Layers, label: 'Projects', href: '/projects' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Code2, label: 'Code Reviews', href: '/reviews' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Briefcase, label: 'Clients', href: '/clients' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: BarChart3, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-[220px] h-full flex flex-col py-8 px-4 bg-background border-r border-border/40">
      <div className="mb-10 px-4">
        <h1 className="text-3xl font-headline italic text-primary tracking-tight">Sheril</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all group",
              item.active 
                ? "bg-secondary text-primary" 
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-4 h-4", item.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="flex items-center gap-3 px-2 py-2 hover:bg-secondary/40 rounded-xl transition-colors cursor-pointer group">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="https://picsum.photos/seed/adnan/100/100" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Adnan</p>
            <p className="text-[10px] text-muted-foreground truncate">Senior Designer</p>
          </div>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        </div>
      </div>
    </aside>
  );
}
