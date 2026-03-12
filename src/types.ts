export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  type: 'Apartamento' | 'Vivenda' | 'Penthouse' | 'Escritório';
  status: 'Ativo' | 'Pendente' | 'Vendido';
  tag?: string;
  imageUrl: string;
  description: string;
  amenities: string[];
}

export interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: string;
}

export interface Activity {
  id: string;
  type: 'lead' | 'sale' | 'property' | 'visit';
  title: string;
  subtitle: string;
  time: string;
}

export type Screen = 'home' | 'details' | 'admin' | 'management';
