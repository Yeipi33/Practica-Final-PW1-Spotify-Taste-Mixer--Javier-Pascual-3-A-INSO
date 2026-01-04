"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  AiFillHome, 
  AiOutlineSearch, 
  AiFillHeart,
  AiOutlinePlus 
} from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { getFavorites } from "@/lib/favorites";

export default function Sidebar() {
  const pathname = usePathname();
  const [favorites, setFavorites] = useState([]);

  // Sincronizar favoritos con el localStorage al cargar y mediante eventos
  useEffect(() => {
    const loadFavs = () => setFavorites(getFavorites());
    loadFavs();
    
    // Escuchar cambios en otros componentes 
    window.addEventListener('storage', loadFavs);
    const interval = setInterval(loadFavs, 2000); // Polling simple para actualizar interfaz

    return () => {
      window.removeEventListener('storage', loadFavs);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      {/* Navegación Superior */}
      <nav className="bg-[#121212] rounded-lg p-4 space-y-4">
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-4 text-sm font-bold transition ${pathname === '/dashboard' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
        >
          <AiFillHome size={26} />
          Inicio
        </Link>
        <div className="flex items-center gap-4 text-sm font-bold text-neutral-400 hover:text-white cursor-not-allowed transition">
          <AiOutlineSearch size={26} />
          Buscar
        </div>
      </nav>

      {/* Biblioteca y Favoritos */}
      <div className="flex-1 bg-[#121212] rounded-lg p-2 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-neutral-400 hover:text-white transition cursor-pointer">
            <VscLibrary size={26} />
            <span className="text-sm font-bold">Tu biblioteca</span>
          </div>
          <button className="text-neutral-400 hover:text-white p-1 hover:bg-white/5 rounded-full transition">
            <AiOutlinePlus size={20} />
          </button>
        </div>

        {/* Lista de Favoritos Guardados */}
        <div className="flex-1 overflow-y-auto custom-scrollbar mt-2 px-2">
          {favorites.length === 0 ? (
            <div className="bg-[#242424] p-5 rounded-xl mt-4">
              <p className="text-white text-sm font-bold">Crea tu primera lista</p>
              <p className="text-xs text-neutral-300 mt-2">Es muy fácil, te ayudaremos.</p>
              <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full mt-4 hover:scale-105 transition">
                Crear lista
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Acceso rápido a favoritos */}
              <div className="flex items-center gap-3 p-2 rounded-md bg-gradient-to-br from-purple-900/40 to-[#181818] cursor-pointer hover:bg-white/5 transition group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-400 rounded flex items-center justify-center shadow-lg">
                  <AiFillHeart className="text-white" size={20} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white">Tus favoritos</span>
                  <span className="text-xs text-neutral-400">{favorites.length} canciones</span>
                </div>
              </div>

              {/* Render de canciones individuales favoritas */}
              {favorites.map((track) => (
                <div 
                  key={track.id} 
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 cursor-pointer transition group"
                >
                  <img 
                    src={track.album?.images[2]?.url} 
                    className="w-12 h-12 rounded shadow-md group-hover:opacity-80" 
                    alt="" 
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold text-white truncate">{track.name}</span>
                    <span className="text-xs text-neutral-400 truncate">Canción • {track.artists[0]?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}