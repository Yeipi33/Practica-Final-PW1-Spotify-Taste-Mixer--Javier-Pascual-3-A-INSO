"use client";

export default function PopularityWidget({ popularity, onSelect }) {
  const getStatus = (val) => {
    if (val < 30) return { label: "Underground", color: "text-blue-400" };
    if (val < 70) return { label: "Popular", color: "text-purple-400" };
    return { label: "Mainstream", color: "text-[#1DB954]" };
  };

  const status = getStatus(popularity);

  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-bold">Popularidad</h2>
        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/5 ${status.color}`}>
          {status.label}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] text-neutral-500 font-bold uppercase">
          <span>Joyas Ocultas</span>
          <span>Éxitos Mundiales</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={popularity}
          onChange={(e) => onSelect({ popularity: parseInt(e.target.value) })}
          className="w-full h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-400"
        />
        <div className="flex justify-between items-center">
          <p className="text-[11px] text-neutral-500">Ajusta el nivel de fama de las canciones.</p>
          <span className="text-sm font-mono text-white">{popularity}%</span>
        </div>
      </div>
    </div>
  );
}