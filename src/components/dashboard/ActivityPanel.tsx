
"use client"

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activityItems = [
  { id: 1, user: 'Sarah', action: 'merged a pull request in', target: 'Project Core', time: '2m ago', color: 'bg-accent' },
  { id: 2, user: 'Marcus', action: 'commented on', target: 'UI Refactor', time: '15m ago', color: 'bg-green-500' },
  { id: 3, user: 'Lena', action: 'uploaded assets for', target: 'Client Alpha', time: '1h ago', color: 'bg-yellow-500' },
  { id: 4, user: 'Jason', action: 'resolved issue', target: '#402 Backend', time: '3h ago', color: 'bg-accent' },
  { id: 5, user: 'Sarah', action: 'updated milestone', target: 'Launch Prep', time: '5h ago', color: 'bg-accent' },
];

export function ActivityPanel() {
  return (
    <div className="w-full h-full bg-[#48644A] rounded-[22px] p-6 text-white overflow-hidden flex flex-col shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-headline text-lg font-semibold tracking-wide">Team Activity</h4>
      </div>
      
      <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
        {activityItems.map((item) => (
          <div key={item.id} className="flex gap-4 group cursor-default">
            <div className="relative">
              <Avatar className="h-9 w-9 border-2 border-white/10 shrink-0">
                <AvatarImage src={`https://picsum.photos/seed/${item.user}/100/100`} />
                <AvatarFallback>{item.user[0]}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#48644A] ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/90">
                <span className="font-bold text-white">{item.user}</span> {item.action} <span className="text-white/70 italic">{item.target}</span>
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="text-[10px] font-semibold text-white/60 hover:text-white uppercase tracking-[0.2em] transition-colors">
          View full collective pulse →
        </button>
      </div>
    </div>
  );
}
