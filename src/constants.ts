import { Property, Activity, Stat } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Penthouse Exclusiva Talatona',
    price: 145000000,
    location: 'Luanda, Talatona',
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    type: 'Penthouse',
    status: 'Ativo',
    tag: 'Destaque',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    description: 'Esta exclusiva penthouse localizada no coração de Talatona oferece uma vista panorâmica inigualável. Com acabamentos de alto padrão, domótica integrada e terraço privativo com jacuzzi, é a definição de luxo urbano em Luanda.',
    amenities: ['Piscina Infinita', 'Ginásio VIP', 'Segurança 24/7', 'Terraço Gourmet']
  },
  {
    id: '2',
    title: 'Villa Contemporânea Viana',
    price: 85500000,
    location: 'Luanda Sul, Viana',
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    type: 'Vivenda',
    status: 'Ativo',
    tag: 'Novo',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Uma moradia moderna com design minimalista, perfeita para famílias que procuram conforto e segurança numa zona em crescimento.',
    amenities: ['Jardim Privativo', 'Garagem Dupla', 'Cozinha Equipada']
  },
  {
    id: '3',
    title: 'Apt. Moderno Ingombota',
    price: 42000000,
    location: 'Centro, Ingombota',
    area: 95,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    type: 'Apartamento',
    status: 'Pendente',
    tag: 'Negociável',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'Localização estratégica no centro da cidade, ideal para profissionais que desejam estar perto de tudo.',
    amenities: ['Elevador', 'Portaria 24h', 'Vista Cidade']
  }
];

export const STATS: Stat[] = [
  { label: 'Imóveis Vendidos', value: '500+', change: '+5%', trend: 'up', icon: 'home_work' },
  { label: 'Anos de Experiência', value: '12+', change: '+12%', trend: 'up', icon: 'history' },
  { label: 'Clientes Felizes', value: '2.5k', change: '+8%', trend: 'up', icon: 'groups' },
  { label: 'Taxas Ocultas', value: '0%', change: '0%', trend: 'up', icon: 'verified' }
];

export const ACTIVITIES: Activity[] = [
  { id: '1', type: 'lead', title: 'Novo Lead: João Pedro', subtitle: 'Interessado em Edifício Mirante', time: 'HÁ 5 MINUTOS' },
  { id: '2', type: 'sale', title: 'Imóvel Vendido!', subtitle: 'Moradia T4 - Talatona', time: 'HÁ 2 HORAS' },
  { id: '3', type: 'property', title: 'Novo Imóvel Adicionado', subtitle: 'Apartamento Central - Luanda', time: 'ONTEM' },
  { id: '4', type: 'visit', title: 'Nova Visita Agendada', subtitle: 'Dona Maria - Quinta-feira 14h', time: 'ONTEM' }
];
