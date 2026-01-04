"use client";
import { useState, useRef } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineDelete, AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

export default function PlaylistDisplay({ 
  tracks = [], 
  favorites = [], 
  onToggleFavorite, 
  onRemoveTrack,
  onReorder 
}) {
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);

  const togglePreview = (url) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setPlayingUrl(null);
    }
    if (playingUrl === url) {
      audioRef.current.pause();
      setPlayingUrl(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingUrl(url);
    }
  };

  
    /*IMPLEMENTACIÓN DRAG & DROP*/
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("sourceIndex", index);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("sourceIndex");
    if (onReorder && sourceIndex !== "") {
      onReorder(parseInt(sourceIndex), targetIndex);
    }
  };

  if (tracks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="px-1 border-b border-white/5 pb-2 text-left">
        <h3 className="text-green font-bold text-[15px] uppercase tracking-[0.2em]">
          {tracks.length} CANCIONES ENCONTRADAS
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => {
          const isFav = favorites.some((f) => f.id === track.id);
          const uniqueKey = `${track.id}-${index}`;
          const isCurrentPlaying = playingUrl === track.preview_url;

          return (
            <div 
              key={uniqueKey}
              draggable // Habilita el arrastre
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd} 
              onDragOver={(e) => e.preventDefault()} // Necesario para permitir el drop
              onDrop={(e) => handleDrop(e, index)}
              className="flex items-center justify-between bg-[#121212] p-2 rounded-lg hover:bg-[#1a1a1a] transition-all border border-white/5 cursor-move group"
            >
              <div className="flex items-center gap-3 overflow-hidden pointer-events-none"> 
                {/* pointer-events-none en el contenido interno ayuda a que el drag sea más estable */}
                <div className="shrink-0 flex-none relative pointer-events-auto" style={{ width: '40px', height: '40px' }}>
                  <img src={track.album?.images[0]?.url || "/placeholder.png"} className="w-full h-full object-cover rounded" alt="" />
                  {track.preview_url && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); togglePreview(track.preview_url); }} 
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isCurrentPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      {isCurrentPlaying ? <AiFillPauseCircle size={24} className="text-[#1DB954]" /> : <AiFillPlayCircle size={24} className="text-white" />}
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-[13px] font-bold text-white truncate leading-tight mb-1">{track.name}</span>
                  <span className="text-[11px] text-neutral-400 truncate">{track.artists[0]?.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-4 pointer-events-auto">
                <button onClick={() => onToggleFavorite(track)} className={`p-2 transition-transform active:scale-90 ${isFav ? 'text-[#1DB954]' : 'text-neutral-500 hover:text-white'}`}>
                  {isFav ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                </button>
                <button onClick={() => onRemoveTrack(track.id)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}