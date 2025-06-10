import type React from 'react';

export interface PanelConfig {
  id: string;
  title: string;
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  defaultVisible: boolean;
  content?: React.ReactNode; // Optional: if content is static and simple
}

export interface PanelState extends PanelConfig {
  isVisible: boolean;
}
