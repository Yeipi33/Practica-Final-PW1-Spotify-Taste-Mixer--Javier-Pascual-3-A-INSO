"use client";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai';

// src/components/TrackCard.jsx
export default function TrackCard({ track, onRemove, onFavorite }) {
  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <img src={track.album.images[0].url} className="rounded shadow-md" alt={track.name} />
          <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <PlayIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <div>
          <h4 className="font-semibold text-white truncate max-w-[200px]">{track.name}</h4>
          <p className="text-sm text-neutral-400">{track.artists[0].name}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-sm text-neutral-500 font-mono">{track.duration}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <button onClick={() => onFavorite(track)} className="p-2 hover:text-spotify-green">
             <HeartIcon />
          </button>
          <button onClick={() => onRemove(track.id)} className="p-2 hover:text-red-500">
             <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}