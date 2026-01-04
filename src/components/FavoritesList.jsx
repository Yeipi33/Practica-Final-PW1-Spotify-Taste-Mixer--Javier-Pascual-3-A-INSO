"use client";
import { useState, useEffect } from "react";
import { getFavorites, removeFavorite } from "@/lib/favorites";

export default function FavoritesList() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const load = () => setFavorites(getFavorites());
        load();
        window.addEventListener('storage', load);
        return () => window.removeEventListener('storage', load);
    }, []);

    return (
        <div className="space-y-2 overflow-y-auto h-full pr-2 no-scrollbar">
            {favorites.length === 0 ? (
                <p className="text-xs text-neutral-500 italic">No hay favoritos guardados.</p>
            ) : (
                favorites.map(track => (
                    <div key={track.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-md">
                        <img src={track.album?.images[2]?.url} className="w-8 h-8 rounded" alt="" />
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate text-white">{track.name}</p>
                            <p className="text-[10px] text-neutral-400 truncate">{track.artists[0]?.name}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}