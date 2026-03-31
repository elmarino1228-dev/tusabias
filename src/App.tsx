/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Play, 
  ChevronRight, 
  Home, 
  Compass, 
  PlayCircle, 
  Newspaper, 
  Star, 
  Share2, 
  MoreVertical, 
  Verified, 
  Instagram, 
  Youtube, 
  Music2, 
  Clock,
  Bell,
  PlusSquare,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type View = 'home' | 'explore' | 'videos' | 'news' | 'profiles' | 'ranking';

// --- Mock Data ---
const STORIES = [
  { id: 1, name: 'EL ALFA', img: 'https://picsum.photos/seed/alfa/200/200' },
  { id: 2, name: 'VITALY', img: 'https://picsum.photos/seed/vitaly/200/200' },
  { id: 3, name: 'LUINNY', img: 'https://picsum.photos/seed/luinny/200/200' },
  { id: 4, name: 'CAROLINE', img: 'https://picsum.photos/seed/caroline/200/200' },
  { id: 5, name: 'TOKISCHA', img: 'https://picsum.photos/seed/tokischa/200/200' },
];

const CATEGORIES = [
  { id: 'urbana', name: 'Música Urbana', featured: true, img: 'https://picsum.photos/seed/urban/800/600', tag: 'Trending' },
  { id: 'tv', name: 'TV & Radio', img: 'https://picsum.photos/seed/tv/400/600', sub: 'Caroline Aquino' },
  { id: 'youtube', name: 'YouTube Dominio', img: 'https://picsum.photos/seed/yt/400/600', sub: 'Carlos Durán' },
  { id: 'influencers', name: 'Influencers & TikTokers', img: 'https://picsum.photos/seed/social/800/400', tag: 'The Digital Pulse' },
  { id: 'humor', name: 'Humor & Comedia', img: 'https://picsum.photos/seed/comedy/800/400', tag: 'Pura Risa Dominicana' },
];

const VIDEOS = [
  { 
    id: 1, 
    title: 'Crisis en el Género: Las declaraciones que sacudieron la industria', 
    channel: 'Alofoke Media Group', 
    views: '1.5M', 
    time: '12 hours ago', 
    duration: '08:45', 
    img: 'https://picsum.photos/seed/news1/640/360',
    avatar: 'https://picsum.photos/seed/ava1/100/100',
    tag: 'ÚLTIMA HORA'
  },
  { 
    id: 2, 
    title: 'Vibra Tropical - El Pachá x Varios Artistas', 
    channel: 'Color Visión Canal 9', 
    views: '890K', 
    time: '1 day ago', 
    duration: '03:52', 
    img: 'https://picsum.photos/seed/music1/640/360',
    avatar: 'https://picsum.photos/seed/ava2/100/100'
  },
  { 
    id: 3, 
    title: 'Dembow King Session - Urban Music RD', 
    channel: 'Urban Music RD', 
    views: '2.1M', 
    time: '3 days ago', 
    duration: '05:15', 
    img: 'https://picsum.photos/seed/music2/640/360',
    avatar: 'https://picsum.photos/seed/ava3/100/100'
  },
];

const RANKING = [
  { id: 1, title: 'La Mamá de la Mamá', artist: 'El Alfa x CJ x El Cherry Scom', img: 'https://picsum.photos/seed/rank1/200/200', trending: true },
  { id: 2, title: 'Linda', artist: 'Tokischa x Rosalía', img: 'https://picsum.photos/seed/rank2/200/200' },
  { id: 3, title: 'Tamo en Nota', artist: 'Rauw Alejandro x Angel Dior', img: 'https://picsum.photos/seed/rank3/200/200', new: true },
  { id: 4, title: 'Gogo Dance', artist: 'El Alfa', img: 'https://picsum.photos/seed/rank4/200/200' },
  { id: 5, title: 'Delincuente', artist: 'Tokischa x Anuel AA', img: 'https://picsum.photos/seed/rank5/200/200' },
];

// --- Components ---

const TopBar = () => (
  <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-[0_8px_24px_rgba(129,233,255,0.08)]">
    <div className="flex items-center gap-4">
      <button className="text-primary hover:opacity-80 transition-opacity">
        <Menu size={24} />
      </button>
      <h1 className="text-2xl font-headline font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary uppercase">
        TU SABIAS
      </h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-white hover:opacity-80 transition-opacity">
        <Search size={22} />
      </button>
      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
        <img 
          src="https://picsum.photos/seed/user/100/100" 
          alt="User" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </header>
);

const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'explore', icon: Compass, label: 'Explorar' },
    { id: 'videos', icon: PlayCircle, label: 'Videos' },
    { id: 'news', icon: Newspaper, label: 'Noticias' },
    { id: 'profiles', icon: Star, label: 'Perfiles' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container-low/90 backdrop-blur-lg rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] border-t border-white/5">
      {items.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-300",
              isActive ? "text-primary scale-110" : "text-slate-500 hover:text-primary"
            )}
          >
            <div className={cn(
              "p-1 rounded-xl transition-all",
              isActive && "bg-primary/10"
            )}>
              <item.icon size={24} fill={isActive ? "currentColor" : "none"} />
            </div>
            <span className="font-headline text-[9px] font-black uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const VideoCard = ({ video }: { video: typeof VIDEOS[0] }) => (
  <div className="flex flex-col group cursor-pointer">
    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-surface-container">
      <img 
        src={video.img} 
        alt={video.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {video.tag && (
        <span className="absolute top-2 left-2 bg-tertiary text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
          {video.tag}
        </span>
      )}
      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
        {video.duration}
      </span>
    </div>
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-primary/20">
        <img src={video.avatar} alt={video.channel} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h3 className="font-headline font-bold text-lg leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-primary text-xs font-black uppercase tracking-widest">{video.channel}</p>
        <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-tighter">
          {video.views} views • {video.time}
        </p>
      </div>
    </div>
  </div>
);

// --- Views ---

const HomeView = ({ setView }: { setView: (v: View) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="space-y-10"
  >
    {/* Stories */}
    <section className="no-scrollbar overflow-x-auto flex gap-4 py-2">
      {STORIES.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary group-active:scale-90 transition-transform">
            <div className="p-0.5 bg-surface rounded-full">
              <img src={story.img} alt={story.name} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{story.name}</span>
        </div>
      ))}
    </section>

    {/* Hero */}
    <section className="relative rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setView('profiles')}>
      <div className="aspect-[16/9] md:aspect-[21/9] relative">
        <img 
          src="https://picsum.photos/seed/hero/1200/600" 
          alt="Featured" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 scrim-bottom"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <span className="inline-flex items-center gap-2 bg-tertiary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Estreno Exclusivo
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight uppercase italic editorial-shadow">
            EL ALFA HACE HISTORIA EN LOS LATIN GRAMMYS
          </h2>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-surface font-black uppercase tracking-widest px-8 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(129,233,255,0.4)]">
              <Play size={18} fill="currentColor" /> Reproducir
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Ticker */}
    <section className="bg-surface-container-low border-y border-white/5 py-3 -mx-4 px-4 overflow-hidden flex items-center">
      <span className="bg-tertiary text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter mr-4 flex-shrink-0 z-10">NOTICIAS FLASH</span>
      <div className="whitespace-nowrap flex gap-12 items-center animate-scroll">
        <span className="text-sm font-bold uppercase tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Alofoke confirma nueva entrevista con El Mayor Clásico esta noche.
        </span>
        <span className="text-sm font-bold uppercase tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          Tokischa anuncia gira mundial comenzando en Santo Domingo.
        </span>
      </div>
    </section>

    {/* Video Grid */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {VIDEOS.map(video => <VideoCard key={video.id} video={video} />)}
    </section>

    <div className="flex justify-center pb-10">
      <button className="flex items-center gap-3 bg-surface-container-high hover:bg-surface-bright text-white font-bold px-10 py-4 rounded-full transition-all border border-white/5 group">
        <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        Cargar Más Videos
      </button>
    </div>
  </motion.div>
);

const ExploreView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="space-y-10"
  >
    <section>
      <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tight leading-none mb-2 uppercase">
        Explore <span className="text-primary italic">Categorias</span>
      </h2>
      <p className="text-slate-400 font-medium text-lg max-w-md">
        Lo más picante del entretenimiento dominicano, filtrado por tu mundo favorito.
      </p>
    </section>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {CATEGORIES.map((cat, idx) => (
        <div 
          key={cat.id} 
          className={cn(
            "relative rounded-xl overflow-hidden group cursor-pointer shadow-2xl",
            cat.featured ? "col-span-2 aspect-[4/5]" : "col-span-1 aspect-[3/4]",
            idx === 2 && "translate-y-8"
          )}
        >
          <img 
            src={cat.img} 
            alt={cat.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent flex flex-col justify-end p-6">
            {cat.tag && (
              <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mb-3">
                {cat.tag}
              </span>
            )}
            <h3 className={cn(
              "font-headline font-black uppercase italic -ml-1 text-white",
              cat.featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
            )}>
              {cat.name}
            </h3>
            {cat.sub && <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{cat.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProfileView = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="space-y-12"
  >
    <section className="relative h-[530px] -mx-4 md:-mx-8 overflow-hidden">
      <img 
        src="https://picsum.photos/seed/elalfa/1200/800" 
        alt="El Alfa" 
        className="absolute inset-0 w-full h-full object-cover scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
      <div className="absolute bottom-0 w-full p-6 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-surface overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/elalfa_ava/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-surface p-1 rounded-full">
              <Verified size={14} fill="currentColor" />
            </div>
          </div>
          <div>
            <span className="bg-secondary px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-sm text-white">Líder del Movimiento</span>
            <h2 className="font-headline text-4xl md:text-6xl font-black italic tracking-tighter editorial-shadow -mt-1 uppercase">El Alfa</h2>
            <p className="font-headline text-2xl md:text-3xl font-black italic tracking-tighter text-primary editorial-shadow -mt-2">EL JEFE</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full max-w-md">
          <button className="flex-1 bg-gradient-to-r from-primary to-primary-container text-surface font-black uppercase tracking-widest py-3 rounded-full shadow-[0_0_20px_rgba(129,233,255,0.4)]">
            Seguir
          </button>
          <div className="flex gap-2">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Share2 size={20} />
            </button>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>

    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      <button className="flex items-center gap-2 bg-surface-container border border-white/5 px-4 py-2 rounded-full whitespace-nowrap">
        <Instagram size={16} className="text-pink-500" />
        <span className="text-xs font-bold uppercase tracking-wider">12.4M Instagram</span>
      </button>
      <button className="flex items-center gap-2 bg-surface-container border border-white/5 px-4 py-2 rounded-full whitespace-nowrap">
        <Youtube size={16} className="text-red-500" />
        <span className="text-xs font-bold uppercase tracking-wider">9.8M YouTube</span>
      </button>
      <button className="flex items-center gap-2 bg-surface-container border border-white/5 px-4 py-2 rounded-full whitespace-nowrap">
        <Music2 size={16} className="text-blue-400" />
        <span className="text-xs font-bold uppercase tracking-wider">TikTok Viral</span>
      </button>
    </div>

    <section>
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-headline text-3xl font-black italic tracking-tighter uppercase text-secondary">Últimas Noticias</h3>
        <button className="text-xs font-bold uppercase tracking-widest text-primary">Ver Todo</button>
      </div>
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] group">
        <img src="https://picsum.photos/seed/news_alfa/800/450" alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h4 className="font-headline text-2xl font-black italic tracking-tighter leading-none mb-2">EL ALFA ANUNCIA GIRA MUNDIAL "LA LEYENDA DEL DEMBOW" 2024</h4>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <Clock size={12} />
            <span>Hace 2 horas</span>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const RankingView = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="space-y-8"
  >
    <section className="relative h-[300px] -mx-4 md:-mx-8 rounded-b-[3rem] overflow-hidden">
      <img src="https://picsum.photos/seed/djrico/1200/600" alt="DJ Rico" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="inline-block px-3 py-1 bg-tertiary text-white font-black text-[10px] uppercase tracking-widest rounded-sm mb-2 italic">EXCLUSIVO</div>
        <h2 className="font-headline font-black italic text-6xl md:text-8xl tracking-tighter leading-none text-white editorial-shadow">
          TOP 10 <br/>
          <span className="text-primary italic">DJ RICO RD</span>
        </h2>
      </div>
    </section>

    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-headline font-extrabold text-xl tracking-tight">ESTA SEMANA</h3>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ACTUALIZADO HOY</span>
      </div>
      
      <div className="grid gap-4">
        {RANKING.map((item) => (
          <div key={item.id} className="bg-surface-container-low rounded-xl p-4 flex items-center gap-4 group active:scale-[0.98] transition-all">
            <div className={cn(
              "text-4xl md:text-5xl font-headline font-black italic min-w-[3rem]",
              item.id === 1 ? "text-primary" : "text-slate-700"
            )}>
              {item.id < 10 ? `0${item.id}` : item.id}
            </div>
            <div className="relative w-16 h-16 shrink-0">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
              {item.trending && (
                <div className="absolute -top-2 -right-2 bg-secondary text-white text-[8px] font-black px-1.5 py-0.5 rounded italic">TRENDING</div>
              )}
              {item.new && (
                <div className="absolute -top-2 -right-2 bg-tertiary text-white text-[8px] font-black px-1.5 py-0.5 rounded italic">NEW</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white truncate text-lg">{item.title}</h4>
              <p className="text-slate-500 text-sm truncate uppercase font-bold tracking-tight">{item.artist}</p>
            </div>
            <button className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              item.id === 1 ? "bg-primary text-surface shadow-lg shadow-primary/20" : "bg-white/5 text-primary border border-white/5"
            )}>
              <Play size={20} fill="currentColor" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-surface pb-32">
      <TopBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && <HomeView key="home" setView={setView} />}
          {view === 'explore' && <ExploreView key="explore" />}
          {view === 'videos' && <RankingView key="ranking" />}
          {view === 'profiles' && <ProfileView key="profiles" />}
          {view === 'news' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <Newspaper size={64} className="text-tertiary" />
              <h2 className="text-2xl font-headline font-black uppercase italic">Noticias al Minuto</h2>
              <p className="text-slate-400">Próximamente: El feed de noticias más picante.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* FAB */}
      <button className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-br from-primary to-primary-container text-surface rounded-full shadow-[0_8px_24px_rgba(129,233,255,0.4)] flex items-center justify-center z-40 active:scale-90 transition-transform">
        <PlusSquare size={32} fill="currentColor" />
      </button>

      <BottomNav currentView={view} setView={setView} />
    </div>
  );
}
