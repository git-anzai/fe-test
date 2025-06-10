
"use client";

import type React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@/components/icons/HeroIcons";
import type { PanelState } from '@/types';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PanelProps {
  id: string; // Required by useSortable
  panel: PanelState;
  onClosePanel: (id: string) => void;
}

export function Panel({ id, panel, onClosePanel }: PanelProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "h-full transition-all duration-300 ease-in-out transform flex-1 basis-1/3",
        isDragging ? "opacity-75 scale-105 shadow-2xl z-10 relative" : "opacity-100 scale-100 shadow-lg",
      )}
    >
      <Card className="h-full w-full min-w-80 md:min-w-96 flex flex-col bg-card overflow-hidden">
        <CardHeader
          {...attributes}
          {...listeners}
          className="flex flex-row items-center justify-betweenbg-card border-b cursor-grab select-none bg-[#e5e7eb]"
        >
          <div className='w-full flex flex-row items-center justify-between cursor-grab select-none p-2'>
          <CardTitle className="text-lg font-headline font-medium text-card-foreground">{panel.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onPointerDown={(e) => {
              e.stopPropagation(); 
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClosePanel(panel.id);
            }}
            aria-label={`Close ${panel.title} panel`}
            className="text-muted-foreground hover:text-foreground"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow overflow-y-auto">
          {panel.content ? panel.content : <p className="text-sm text-muted-foreground">Content for {panel.title} goes here.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
