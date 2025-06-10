
"use client";

import React from 'react';
import { Panel } from "./Panel";
import type { PanelState } from '@/types';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

interface PanelContainerProps {
  panels: PanelState[];
  onClosePanel: (id: string) => void;
}

export function PanelContainer({ panels: allPanels, onClosePanel }: PanelContainerProps) {
  const visiblePanels = allPanels.filter(p => p.isVisible);

  if (visiblePanels.length === 0) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">No panels are currently open. Click an icon on the left to open a panel.</p>
      </main>
    );
  }
  
  return (
    <main 
      className="flex-1 overflow-x-auto bg-background"
    >
      <SortableContext 
        items={visiblePanels.map(p => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex h-full">
          {visiblePanels.map((panel) => (
            <Panel
              key={panel.id}
              id={panel.id}
              panel={panel}
              onClosePanel={onClosePanel}
            />
          ))}
        </div>
      </SortableContext>
    </main>
  );
}
