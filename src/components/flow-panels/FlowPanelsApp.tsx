
"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from "./Sidebar";
import { PanelContainer } from "./PanelContainer";
import { MapIcon, MusicalNoteIcon, ChatBubbleBottomCenterIcon, Bars3Icon } from "@/components/icons/HeroIcons";
import type { PanelConfig, PanelState } from '@/types';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';

const initialPanelConfigs: PanelConfig[] = [
  { id: 'map', title: 'Map', IconComponent: MapIcon, defaultVisible: true, content: <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center"><p className="text-foreground/50">Map Content Placeholder</p></div> },
  { id: 'music', title: 'Music', IconComponent: MusicalNoteIcon, defaultVisible: true, content: <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center"><p className="text-foreground/50">Music Player Placeholder</p></div> },
  { id: 'chat', title: 'Chat', IconComponent: ChatBubbleBottomCenterIcon, defaultVisible: false, content: <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center"><p className="text-foreground/50">Chat Room Placeholder</p></div> },
];

export function FlowPanelsApp() {
  const [panels, setPanels] = useState<PanelState[]>(() =>
    initialPanelConfigs.map(config => ({
      ...config,
      isVisible: config.defaultVisible,
    }))
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPanels((currentPanels) => {
        const oldIndex = currentPanels.findIndex(p => p.id === active.id);
        const newIndex = currentPanels.findIndex(p => p.id === over.id);
        
        if (oldIndex === -1 || newIndex === -1) return currentPanels; // Should not happen

        return arrayMove(currentPanels, oldIndex, newIndex);
      });
    }
  };

  const handleTogglePanel = (id: string) => {
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === id ? { ...panel, isVisible: !panel.isVisible } : panel
      )
    );
    if (window.innerWidth < 768) { 
      setIsMobileMenuOpen(false); 
    }
  };
  
  if (!isMounted) {
    return (
      <div className="flex flex-1 h-screen items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Loading FlowPanels...</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row flex-1 h-screen overflow-hidden bg-background">
        <header className="md:hidden flex items-center justify-between p-3 border-b bg-sidebar text-sidebar-foreground">
          <h1 className="text-lg font-headline font-semibold">FlowPanels</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-sidebar-foreground hover:bg-sidebar-accent/20">
            <Bars3Icon className="w-6 h-6"/>
          </Button>
        </header>
        
        <div className={cn(
            "md:flex md:relative", 
            isMobileMenuOpen ? "block" : "hidden" 
          )}>
          <Sidebar
            panels={panels}
            onTogglePanel={handleTogglePanel}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>
        
        <div className={cn("flex flex-col flex-1 overflow-hidden", isMobileMenuOpen && "md:block")}>
           <PanelContainer
            panels={panels}
            onClosePanel={handleTogglePanel} 
          />
        </div>
      </div>
    </DndContext>
  );
}
