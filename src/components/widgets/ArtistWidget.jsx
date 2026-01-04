"use client";
import { useState, useEffect } from "react";
import { searchArtists } from "@/lib/spotify"; 
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export default function ArtistWidget({ onSelect, selectedItems = [] }) { 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      if (query.length > 2) {
        const data = await searchArtists(query);
        setResults(data || []);
      } else {
        setResults([]);
      }
    };
    const timer = setTimeout(fetchArtists, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleAdd = (artist) => {
    if (selectedItems.length < 5 && !selectedItems.find(a => a.id === artist.id)) {
      onSelect([...selectedItems, artist]);
      setQuery("");
      setResults([]);
    }
  };

  return (
    <div className="bg-[#121212] p-4 rounded-lg border border-white/5">
      <h2 className="text-white text-lg font-bold mb-4">Artistas ({selectedItems.length}/5)</h2>
      <div className="relative mb-4">
        <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca artistas..."
          className="w-full bg-[#242424] pl-10 pr-4 py-2 rounded-md text-sm text-white border-none focus:ring-1 focus:ring-white"
        />
      </div>

      {/* Lista de resultados compacta estilo Spotify */}
      {results.map(artist => (
        <div key={artist.id} className="flex items-center justify-between p-2 hover:bg-[#282828] rounded-md transition group">
          <div className="flex items-center gap-3">
            <img src={artist.images[2]?.url} className="w-8 h-8 rounded-full" alt="" />
            <span className="text-sm text-white">{artist.name}</span>
          </div>
          <button 
            onClick={() => handleAdd(artist)}
            className="text-xs font-bold border border-neutral-500 px-3 py-1 rounded-full hover:border-white"
          >
            Añadir
          </button>
        </div>
      ))}

      {/* Grid de seleccionados */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {selectedItems.map(artist => (
          <div key={artist.id} className="bg-[#181818] p-2 rounded-md flex items-center gap-2 relative">
            <img src={artist.images[2]?.url} className="w-6 h-6 rounded-full" alt="" />
            <span className="text-xs truncate text-white">{artist.name}</span>
            <button onClick={() => onSelect(selectedItems.filter(a => a.id !== artist.id))} className="ml-auto">
              <AiOutlineClose size={12} className="text-neutral-500 hover:text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}