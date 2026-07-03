export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
  textColor: string;
  features: string[];
  mockupUrl?: string; // Optional custom screen display for the laptop mockup when active
}

export interface ExtraProduct {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  priceEstimate?: string;
}

export interface Partner {
  name: string;
  iconName: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface LocationPin {
  id: string;
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  status: string;
  ipRange: string;
}
