"use client";
import { useState, useEffect, useCallback } from "react"; 
import Header from "@/components/Header";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import GenreWidget from "@/components/widgets/GenreWidget";
import TrackWidget from "@/components/widgets/TrackWidget";
import MoodWidget from "@/components/widgets/MoodWidget";
import PopularityWidget from "@/components/widgets/PopularityWidget";
import DecadeWidget from "@/components/widgets/DecadeWidget";
import PlaylistDisplay from "@/components/PlaylistDisplay";
import { generatePlaylist, exportToSpotify } from "@/lib/spotify";

export default function DashboardPage() {
  const [playlist, setPlaylist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  const [selections, setSelections] = useState({
    artists: [], genres: [], tracks: [],
    mood: { energy: 50, valence: 50, danceability: 50, acousticness: 50 },
    popularity: 50, decade: null
  });

  useEffect(() => {
    const savedFavs = localStorage.getItem("mixer_favorites");
    const savedHist = localStorage.getItem("mixer_history");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHist) setHistory(JSON.parse(savedHist));
  }, []);

  const handleTrackSelect = useCallback((track) => {
    setSelections(prev => {
      const exists = prev.tracks.find(t => t.id === track.id);
      if (exists) {
        return { ...prev, tracks: prev.tracks.filter(t => t.id !== track.id) };
      }
      if (prev.tracks.length + prev.artists.length < 5) {
        return { ...prev, tracks: [...prev.tracks, track] };
      }
      return prev;
    });
  }, []);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const tracks = await generatePlaylist(selections);
      setPlaylist(tracks || []);
    } catch (error) {
      console.error("Error al generar la mezcla:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (name, tracks) => {
    if (tracks.length === 0) return;
    setExporting(true);
    try {
      const url = await exportToSpotify(name, tracks.map(t => t.uri));
      if (url) {
        const newHistory = [{ name, url, time: new Date().toLocaleTimeString() }, ...history].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem("mixer_history", JSON.stringify(newHistory));
        window.open(url, "_blank");
      }
    } finally {
      setExporting(false);
    }
  };

  const reorderPlaylist = (from, to) => {
  setPlaylist(prev => {
    const updated = [...prev];
    const [movedItem] = updated.splice(from, 1); 
    updated.splice(to, 0, movedItem); 
    return updated;
  });
};

  const removeTrack = (id) => setPlaylist(prev => prev.filter(t => t.id !== id));

  const toggleFavorite = (track) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === track.id);
      const updated = isFav ? prev.filter(f => f.id !== track.id) : [...prev, track];
      localStorage.setItem("mixer_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="flex h-screen bg-black text-white p-2 gap-2 overflow-hidden">
      {/* IZQUIERDA: Ajustes */}
      <aside className="w-[300px] bg-[#121212] rounded-lg p-6 flex flex-col border border-white/5 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-neutral-400 uppercase tracking-widest text-left">Ajustes</h2>
        <div className="space-y-10">
          <MoodWidget mood={selections.mood} onChange={(val) => setSelections(p => ({...p, mood: val}))} />
          <PopularityWidget popularity={selections.popularity} onSelect={(val) => setSelections(p => ({...p, popularity: val.popularity}))} />
          <DecadeWidget selectedDecade={selections.decade} onSelect={(val) => setSelections(p => ({...p, decade: val}))} />
        </div>
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="mt-10 w-full bg-[#1DB954] text-black py-4 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Mezclando..." : "GENERAR MEZCLA"}
        </button>
      </aside>

      {/* CENTRO: Selectores */}
      <main className="flex-1 bg-[#121212] rounded-lg p-6 overflow-y-auto border border-white/5">
        <Header />
        <div className="mt-6 space-y-6">
          <ArtistWidget selectedItems={selections.artists} onSelect={(val) => setSelections(p => ({...p, artists: val}))} />
          <TrackWidget 
            selectedTracks={selections.tracks} 
            onSelect={handleTrackSelect} 
          />
          <GenreWidget selectedItems={selections.genres} onSelect={(val) => setSelections(p => ({...p, genres: val}))} />
        </div>
      </main>

      {/* DERECHA: Playlist e Historial */}
      <aside className="w-[380px] flex flex-col gap-2">
        <div className="flex-1 bg-[#121212] rounded-lg p-4 overflow-y-auto border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Tu Mezcla</h2>
            <button 
              onClick={() => handleExport("Mi Mezcla IA", playlist)} 
              className="bg-[#1DB954] text-black px-4 py-1 rounded-full text-[10px] font-bold"
            >
              {exporting ? "..." : "EXPORTAR"}
            </button>
          </div>
          <PlaylistDisplay 
            tracks={playlist} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
            onRemoveTrack={removeTrack} 
            onReorder={reorderPlaylist} 
          />
        </div>

        <div className="h-[300px] bg-[#121212] rounded-lg p-4 border border-white/5 flex flex-col overflow-hidden">
          <h2 className="text-xs font-bold text-neutral-400 uppercase mb-4 tracking-widest text-left">Favoritos</h2>
          <div className="flex-1 overflow-y-auto mb-4 no-scrollbar">
            <PlaylistDisplay 
              tracks={favorites} 
              favorites={favorites} 
              onToggleFavorite={toggleFavorite} 
              onRemoveTrack={(id) => setFavorites(prev => prev.filter(f => f.id !== id))} 
            />
          </div>
          <div className="border-t border-white/10 pt-4 text-left">
            <h3 className="text-[15px] text-neutral-500 uppercase mb-2 italic">Playlists Exportadas</h3>
            <div className="space-y-1">
              {history.map((h, i) => (
                <a key={i} href={h.url} target="_blank" className="block text-[11px] text-neutral-400 hover:text-[#1DB954] truncate">
                  📁 {h.name} ({h.time})
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}