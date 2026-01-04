"use client";
import { useState } from "react";
import { searchTracks } from "@/lib/spotify";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export default function TrackWidget({ selectedTracks, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      const data = await searchTracks(val);
      setResults(data || []);
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="flex flex-col gap-4 bg-[#121212] p-4 rounded-xl border border-white/5">
      {/* Título de la sección en blanco brillante */}
      <h3 className="text-xs font-bold text-white uppercase tracking-widest px-1">
        Añadir Canciones
      </h3>

      <div className="relative group w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <AiOutlineSearch size={20} className={query ? "text-[#1DB954]" : "text-white/40"} />
        </div>

        {/* INPUT: Fondo gris oscuro y texto blanco */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="¿Qué quieres escuchar?"
          className="w-full bg-[#1e1e1e] text-white text-sm rounded-full py-3 pl-12 pr-12 border border-white/10 focus:outline-none focus:bg-[#252525] focus:border-[#1DB954]/50 transition-all placeholder:text-white/30"
        />

        {query && (
          <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white">
            <AiOutlineClose size={18} />
          </button>
        )}
      </div>

      {/* LISTA DE RESULTADOS: Fondo gris oscuro */}
      {results.length > 0 && (
        <div className="bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-[300px] overflow-y-auto z-50">
          {results.map((track, index) => (
            <button
              key={`search-${track.id}-${index}`}
              onClick={() => {
                onSelect(track);
                clearSearch();
              }}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 text-left bg-[#1e1e1e]"
            >
              {/* SOLUCIÓN IMAGEN GIGANTE: Tamaño fijo de 40px */}
              <div className="flex-none" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                <img 
                  src={track.album?.images[0]?.url || "/placeholder.png"} 
                  alt="" 
                  className="rounded object-cover w-full h-full"
                />
              </div>
              
              <div className="flex flex-col overflow-hidden">
                {/* LETRA DE COLOR BLANCO PARA EL NOMBRE */}
                <span className="text-[14px] font-bold text-white truncate leading-tight">
                  {track.name}
                </span>
                {/* LETRA BLANCO TENUE PARA EL ARTISTA */}
                <span className="text-[12px] text-white/60 truncate mt-0.5">
                  {track.artists?.[0]?.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* TAGS DE CANCIONES SELECCIONADAS */}
      <div className="flex flex-wrap gap-2">
        {selectedTracks.map((track, idx) => (
          <div 
            key={`selected-${track.id}-${idx}`} 
            className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/10 text-[11px]"
          >
            <span className="truncate max-w-[150px] font-medium">{track.name}</span>
            <button onClick={() => onSelect(track)} className="text-white/50 hover:text-white transition-colors">
              <AiOutlineClose size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}