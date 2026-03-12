/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  User,
  Home as HomeIcon,
  Compass,
  Heart,
  LayoutDashboard,
  PlusCircle,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ChevronRight,
  Star,
  ShieldCheck,
  Handshake,
  TrendingUp,
  MessageSquare,
  Mail,
  ArrowLeft,
  Share2,
  Phone,
  Settings,
  Menu,
  MoreVertical,
  Trash2,
  Edit3,
  Megaphone,
  Calendar
} from 'lucide-react';
import { Property, Screen, Stat, Activity } from './types';
import { supabase } from './lib/supabase';

// --- Components ---

const Navbar = ({ onNavigate, currentScreen }: { onNavigate: (s: Screen) => void, currentScreen: Screen }) => (
  <nav className="sticky top-0 z-50 bg-white/70 dark:bg-bg-dark/70 backdrop-blur-xl border-b border-primary/10">
    <div className="max-w-[1600px] mx-auto flex items-center justify-between p-4 md:px-8">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
        <div className="bg-white p-1 rounded-xl shadow-lg border border-primary/10 transition-transform group-hover:scale-110">
          <img src="/logo.png" alt="G12 Logo" className="size-8 object-contain" />
        </div>
        <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase dark:text-white">
          G12 <span className="text-primary font-light">Imobiliária</span>
        </h2>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-1 mr-4">
          {['home', 'admin'].map((s) => (
            <button
              key={s}
              onClick={() => onNavigate(s as Screen)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentScreen === s ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark'}`}
            >
              {s === 'home' ? 'Início' : 'Admin'}
            </button>
          ))}
        </div>
        <button className="p-2.5 rounded-xl hover:bg-primary/10 transition-colors dark:text-white">
          <Bell className="size-5" />
        </button>
        <button
          onClick={() => onNavigate('admin')}
          className={`p-1.5 rounded-xl transition-all border-2 ${currentScreen === 'admin' ? 'border-primary' : 'border-transparent'}`}
        >
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
            <User className="size-5" />
          </div>
        </button>
      </div>
    </div>
  </nav>
);

const BottomNav = ({ onNavigate, currentScreen }: { onNavigate: (s: Screen) => void, currentScreen: Screen }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-bg-dark/90 backdrop-blur-lg border-t border-primary/10 px-4 py-3 flex justify-around items-center">
    {[
      { id: 'home', icon: HomeIcon, label: 'Início' },
      { id: 'details', icon: Heart, label: 'Favoritos' },
      { id: 'admin', icon: User, label: 'Admin' },
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id as Screen)}
        className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === item.id ? 'text-primary' : 'text-slate-400'}`}
      >
        <item.icon className="size-5" />
        <span className="text-[10px] font-bold uppercase">{item.label}</span>
      </button>
    ))}
  </div>
);

const PropertyCard: React.FC<{ property: Property, onClick: () => void }> = ({ property, onClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {property.tag && (
        <div className="absolute top-5 left-5 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
          {property.tag}
        </div>
      )}
      <div className="absolute bottom-5 left-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-2xl font-black tracking-tighter">{property.price.toLocaleString('pt-AO')} AOA</p>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-xl font-black mb-2 dark:text-white group-hover:text-primary transition-colors">{property.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-2">
        <MapPin className="size-4 text-primary" /> {property.location}
      </p>
      <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-border-dark text-slate-600 dark:text-slate-300">
        <div className="flex flex-col items-center gap-1">
          <Bed className="size-5 text-primary/60" />
          <span className="text-xs font-black">{property.bedrooms} Qts</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Bath className="size-5 text-primary/60" />
          <span className="text-xs font-black">{property.bathrooms} Ban</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Maximize className="size-5 text-primary/60" />
          <span className="text-xs font-black">{property.area}m²</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Screens ---

const HomeScreen = ({ properties, stats, onPropertyClick, onNavigate }: { properties: Property[], stats: Stat[], onPropertyClick: (p: Property) => void, onNavigate: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pb-20"
  >
    {/* Hero */}
    <header className="relative h-[600px] flex flex-col justify-end p-6 md:p-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover"
          alt="Luxury House"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-6">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/30 backdrop-blur-md"
        >
          Exclusividade em Angola
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black leading-tight text-white"
        >
          Soluções Imobiliárias <br />sob medida para o <span className="text-primary">seu futuro</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg max-w-xl"
        >
          Encontre a residência dos seus sonhos com o padrão de excelência G12.
        </motion.p>
      </div>
    </header>

    {/* Search Bar */}
    <section className="px-4 -mt-10 relative z-20">
      <div className="max-w-4xl mx-auto glass-card p-3 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex bg-slate-100 dark:bg-bg-dark p-1 rounded-xl md:w-1/3">
            <button className="flex-1 py-3 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">Comprar</button>
            <button className="flex-1 py-3 px-4 rounded-lg text-slate-500 dark:text-slate-400 text-sm font-bold hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors">Alugar</button>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input
              className="w-full h-full bg-slate-100 dark:bg-bg-dark border-none rounded-xl pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Localização, condomínio ou tipo..."
              type="text"
            />
          </div>
          <button className="btn-primary flex items-center justify-center gap-2">
            <Settings className="size-4" /> Filtrar
          </button>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center space-y-1"
        >
          <p className="text-4xl font-black text-primary">{stat.value}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-widest">{stat.label}</p>
        </motion.div>
      ))}
    </section>

    {/* Featured */}
    <section className="px-6 py-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter">Imóveis em Destaque</h2>
          <div className="h-2 w-32 bg-primary rounded-full"></div>
        </div>
        <button className="text-primary font-black flex items-center gap-2 hover:gap-4 transition-all group text-lg">
          Ver todos os imóveis <ChevronRight className="size-6" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-10">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} onClick={() => onPropertyClick(prop)} />
        ))}
      </div>
    </section>

    {/* Why Us */}
    <section className="bg-primary/5 dark:bg-primary/5 py-24 my-12">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl font-black dark:text-white">Por que escolher a G12?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Oferecemos uma experiência personalizada e segura em cada passo do seu investimento.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: 'Segurança Jurídica', desc: 'Garantimos total transparência e conformidade com as leis angolanas.' },
            { icon: Handshake, title: 'Atendimento VIP', desc: 'Consultores dedicados a encontrar o imóvel perfeito para o seu estilo.' },
            { icon: TrendingUp, title: 'Inteligência de Mercado', desc: 'Análises detalhadas de valorização nas melhores zonas de Luanda.' },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-6 group p-8 rounded-3xl hover:bg-white dark:hover:bg-surface-dark transition-all duration-500 shadow-xl shadow-transparent hover:shadow-primary/5">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:rotate-12 group-hover:scale-110">
                <item.icon className="size-10" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary to-primary-hover rounded-[40px] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black">Pronto para encontrar <br />o seu lugar?</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">Nossos consultores estão disponíveis para uma consultoria gratuita hoje mesmo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl">Falar com Consultor</button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all hover:scale-105 active:scale-95">Ver Catálogo 2024</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
      </div>
    </section>
  </motion.div>
);

const DetailsScreen = ({ property, onBack }: { property: Property, onBack: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    className="fixed inset-0 z-[60] bg-white dark:bg-bg-dark overflow-y-auto"
  >
    {/* Hero Section */}
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <motion.img
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src={property.imageUrl}
        className="w-full h-full object-cover"
        alt={property.title}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="absolute top-8 left-8 z-10">
        <button
          onClick={onBack}
          className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20 group"
        >
          <ArrowLeft className="size-6 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-12 left-8 right-8 md:left-20 md:right-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl space-y-6"
        >
          <div className="flex flex-wrap gap-3">
            <span className="bg-primary px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30">
              {property.type}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest border border-white/30">
              {property.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
            {property.title}
          </h1>
          <div className="flex items-center gap-4 text-white/80 text-lg font-medium">
            <MapPin className="size-6 text-primary" /> {property.location}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-[1600px] mx-auto px-8 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-3 gap-20 pb-32">
      <div className="lg:col-span-2 space-y-16">
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-border-dark" />
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em]">Descrição do Imóvel</h2>
            <div className="h-px flex-1 bg-slate-200 dark:bg-border-dark" />
          </div>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {property.description}
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Quartos', val: property.bedrooms, icon: Bed },
            { label: 'Casas de Banho', val: property.bathrooms, icon: Bath },
            { label: 'Área Total', val: `${property.area} m²`, icon: Maximize },
            { label: 'Ano Const.', val: '2023', icon: Calendar },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-[2.5rem] border border-slate-100 dark:border-border-dark group hover:border-primary/30 transition-all">
              <item.icon className="size-8 text-primary mb-6 transition-transform group-hover:scale-110" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-2xl font-black dark:text-white tracking-tight">{item.val}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <h3 className="text-3xl font-black dark:text-white tracking-tight">Comodidades Premium</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-surface-dark rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
                <div className="size-3 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-8">
        <div className="sticky top-32 glass-card p-10 rounded-[3rem] border-primary/10 shadow-2xl space-y-10">
          <div className="space-y-2">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Preço de Venda</p>
            <p className="text-5xl font-black text-primary tracking-tighter">{property.price.toLocaleString('pt-AO')} AOA</p>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-bg-dark rounded-[2rem] space-y-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <User className="size-8" />
              </div>
              <div>
                <p className="font-black dark:text-white text-lg">Ricardo Santos</p>
                <p className="text-sm text-slate-500 font-bold">Consultor Senior</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm hover:bg-primary-hover transition-all shadow-xl shadow-primary/20">
                Agendar Visita
              </button>
              <button className="w-full py-5 bg-white dark:bg-surface-dark text-primary border-2 border-primary/20 rounded-2xl font-black text-sm hover:bg-primary/5 transition-all">
                Enviar Mensagem
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <button className="p-4 rounded-2xl bg-slate-100 dark:bg-bg-dark text-slate-500 hover:text-primary transition-all"><Share2 className="size-6" /></button>
            <button className="p-4 rounded-2xl bg-slate-100 dark:bg-bg-dark text-slate-500 hover:text-red-500 transition-all"><Heart className="size-6" /></button>
          </div>
        </div>
      </aside>
    </div>
  </motion.div>
);

const ICON_MAP: Record<string, any> = {
  home_work: HomeIcon,
  history: Calendar,
  groups: User,
  verified: ShieldCheck,
  trending_up: TrendingUp,
  compass: Compass
};

const AdminScreen = ({ properties, stats, activities, onNavigate, onRefresh }: { properties: Property[], stats: Stat[], activities: Activity[], onNavigate: (s: Screen) => void, onRefresh: () => void }) => {
  const deleteProperty = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este imóvel?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      alert('Erro ao eliminar imóvel: ' + error.message);
    } else {
      onRefresh();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-12 max-w-7xl mx-auto space-y-16 pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold dark:text-white tracking-tighter uppercase leading-[0.85]">Painel <br /> <span className="text-primary">Administrativo</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Gestão inteligente do seu portfólio imobiliário.</p>
        </div>
        <button className="btn-primary flex items-center gap-3 px-10 py-6 text-lg">
          <PlusCircle className="size-6" /> Novo Imóvel
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] space-y-6 group hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className={`p-4 rounded-2xl ${stat.icon === 'home_work' ? 'bg-blue-500/10 text-blue-500' : stat.icon === 'groups' ? 'bg-emerald-500/10 text-emerald-500' : stat.icon === 'history' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'} transition-transform group-hover:scale-110`}>
                {(() => {
                  const Icon = ICON_MAP[stat.icon] || HomeIcon;
                  return <Icon className="size-7" />;
                })()}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-emerald-500 text-sm font-black flex items-center gap-1">
                  <TrendingUp className="size-4" /> {stat.change}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">ESTE MÊS</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
              <p className="text-3xl font-extrabold dark:text-white tracking-tighter">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 glass-card rounded-[3rem] overflow-hidden"
        >
          <div className="p-8 md:p-10 border-b border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-xl dark:text-white tracking-tight">Desempenho de Vendas</h3>
              <p className="text-sm text-slate-500 font-medium">Volume mensal em AOA (Jan - Jun)</p>
            </div>
            <select className="bg-slate-100 dark:bg-bg-dark border-none rounded-2xl text-sm font-bold px-6 py-3 outline-none dark:text-white shadow-inner">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="p-8 md:p-10 h-[400px] flex items-end justify-between gap-4 md:gap-8">
            {[40, 70, 45, 90, 65, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                <div className="w-full relative flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full max-w-[60px] bg-primary/10 rounded-2xl relative overflow-hidden transition-all group-hover:bg-primary/20"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 h-full rounded-2xl"
                    />
                  </motion.div>
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg">
                    {h}M
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-[3rem] flex flex-col"
        >
          <div className="p-8 md:p-10 border-b border-primary/10">
            <h3 className="font-extrabold text-xl dark:text-white tracking-tight">Atividade Recente</h3>
          </div>
          <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[500px] scrollbar-hide">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-5 items-start p-4 hover:bg-primary/5 rounded-[2rem] transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-lg shadow-transparent group-hover:shadow-primary/20">
                  <Bell className="size-6" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-black dark:text-white group-hover:text-primary transition-colors">{act.title}</p>
                  <p className="text-xs text-slate-500 font-medium truncate">{act.subtitle}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 border-t border-primary/10">
            <button className="w-full py-5 rounded-2xl text-sm font-black text-primary bg-primary/5 hover:bg-primary/10 transition-all">Ver todos os logs</button>
          </div>
        </motion.div>
      </div>

      {/* Property Management Section */}
      <div className="space-y-10 pt-10 border-t border-primary/10">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold dark:text-white tracking-tight">Gestão de Imóveis</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie sua listagem e status de vendas.</p>
        </div>

        <div className="space-y-6">
          <div className="relative group max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5 group-focus-within:text-primary transition-colors" />
            <input
              className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm dark:text-white shadow-sm"
              placeholder="Pesquisar por localização, tipo ou código..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {['Todos', 'Ativos', 'Pendentes', 'Vendidos'].map((tab, i) => (
              <button
                key={tab}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-border-dark hover:border-primary/40'}`}
              >
                {tab} <span className={`px-2 py-0.5 rounded-full text-[10px] ${i === 0 ? 'bg-white/20' : 'bg-slate-100 dark:bg-bg-dark'}`}>{i === 0 ? '24' : '8'}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group hover:border-primary/30 transition-all"
              >
                <div className="w-full lg:w-[400px] h-64 lg:h-auto shrink-0 overflow-hidden relative">
                  <img src={prop.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={prop.title} referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl ${prop.status === 'Ativo' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {prop.status}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between gap-8">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <h3 className="text-xl font-extrabold dark:text-white leading-tight tracking-tight group-hover:text-primary transition-colors">{prop.title}</h3>
                      <span className="text-primary font-extrabold text-2xl tracking-tighter">{prop.price.toLocaleString('pt-AO')} AOA</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-black uppercase tracking-wider">
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-bg-dark px-4 py-2 rounded-xl"><MapPin className="size-4 text-primary" /> {prop.location}</div>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-bg-dark px-4 py-2 rounded-xl"><Bed className="size-4 text-primary" /> {prop.bedrooms} Qts</div>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-bg-dark px-4 py-2 rounded-xl"><Maximize className="size-4 text-primary" /> {prop.area} m²</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-border-dark pt-8 gap-6">
                    <div className="flex gap-4">
                      <button className="p-4 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all bg-slate-50 dark:bg-bg-dark shadow-sm"><Edit3 className="size-6" /></button>
                      <button className="p-4 text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-2xl transition-all bg-slate-50 dark:bg-bg-dark shadow-sm"><Megaphone className="size-6" /></button>
                      <button
                        onClick={() => deleteProperty(prop.id)}
                        className="p-4 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all bg-slate-50 dark:bg-bg-dark shadow-sm"
                      >
                        <Trash2 className="size-6" />
                      </button>
                    </div>
                    <button
                      onClick={() => onNavigate('details')}
                      className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      Ver Detalhes Completos <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: propsData, error: propsError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (propsError) throw propsError;

      const mappedProperties: Property[] = propsData.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: p.location,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        parking: p.parking,
        type: p.type,
        status: p.status,
        tag: p.tag,
        imageUrl: p.image_url,
        description: p.description,
        amenities: p.amenities
      }));

      setProperties(mappedProperties);

      const { data: statsData, error: statsError } = await supabase
        .from('stats')
        .select('*');

      if (statsError) throw statsError;
      setStats(statsData);

      const { data: actData, error: actError } = await supabase
        .from('activities')
        .select('*')
        .order('id', { ascending: false });

      if (actError) throw actError;
      setActivities(actData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handlePropertyClick = (p: Property) => {
    setSelectedProperty(p);
    setScreen('details');
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-500">
      <Navbar onNavigate={setScreen} currentScreen={screen} />

      <main className="max-w-[2000px] mx-auto">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomeScreen
              properties={properties}
              stats={stats}
              onPropertyClick={handlePropertyClick}
              onNavigate={setScreen}
            />
          )}
          {screen === 'details' && selectedProperty && (
            <DetailsScreen
              property={selectedProperty}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'admin' && (
            <AdminScreen
              properties={properties}
              stats={stats}
              activities={activities}
              onNavigate={setScreen}
              onRefresh={fetchData}
            />
          )}
        </AnimatePresence>
      </main>

      <BottomNav onNavigate={setScreen} currentScreen={screen} />

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-24 right-6 z-[100] p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-primary/10 dark:border-border-dark transition-all hover:scale-110 active:scale-95"
      >
        <div className="relative size-6">
          <motion.div
            animate={{ rotate: isDarkMode ? 180 : 0, opacity: isDarkMode ? 0 : 1 }}
            className="absolute inset-0 text-amber-500"
          >
            <Star className="size-6 fill-amber-500" />
          </motion.div>
          <motion.div
            animate={{ rotate: isDarkMode ? 0 : -180, opacity: isDarkMode ? 1 : 0 }}
            className="absolute inset-0 text-primary"
          >
            <HomeIcon className="size-6 fill-primary" />
          </motion.div>
        </div>
      </button>
    </div>
  );
}
