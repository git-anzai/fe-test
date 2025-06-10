"use client";

import type React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { PanelState } from '@/types';

interface SidebarProps {
  panels: PanelState[];
  onTogglePanel: (id: string) => void;
  isMobileMenuOpen: boolean;
}

export function Sidebar({ panels, onTogglePanel, isMobileMenuOpen }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <aside className={cn(
        "bg-sidebar text-sidebar-foreground flex-col items-center p-3 space-y-3 border-r border-sidebar-border shadow-md",
        "md:flex md:w-16", 
        isMobileMenuOpen ? "flex w-full absolute top-16 left-0 z-40 h-auto shadow-xl rounded-b-lg" : "hidden" 
      )}>
        {panels.map((panel) => {
          const Icon = panel.IconComponent;
          const isActive = panel.isVisible;
          return (
            <Tooltip key={panel.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onTogglePanel(panel.id)}
                  aria-label={`Toggle ${panel.title} panel`}
                  className={cn(
                    "w-full rounded-md transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar flex flex-col align-items-center justify-center p-2",
                    isActive
                      ? "text-#000 hover:text-sidebar-foreground/80 hover:bg-sidebar-accent/20"
                      : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80 hover:bg-sidebar-accent/20",
                    "md:w-10 md:h-10 w-full justify-start md:justify-center flex items-center text-left md:text-center px-4 md:px-2 py-3 md:py-2"
                  )}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  <span className="text-xs">{panel.title}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block bg-card text-card-foreground border-border">
                <p>{panel.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </aside>
    </TooltipProvider>
  );
}
