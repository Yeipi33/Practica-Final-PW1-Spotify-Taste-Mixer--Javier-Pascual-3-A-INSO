"use client";

export default function MoodWidget({ mood, onChange }) {
  const params = [
    { id: 'energy', label: 'Energía', desc: 'Pistas intensas' },
    { id: 'valence', label: 'Positividad', desc: 'Vibras alegres' },
    { id: 'danceability', label: 'Ritmo', desc: 'Para bailar' }
  ];

  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-white/5">
      <h2 className="text-white text-lg font-bold mb-6">Estado de Ánimo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {params.map((p) => (
          <div key={p.id} className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-neutral-300">{p.label}</span>
              <span className="text-xs font-bold text-purple-500">{mood[p.id]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mood[p.id]}
              onChange={(e) => onChange({...mood, [p.id]: parseInt(e.target.value)})}
              className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <p className="text-[10px] text-neutral-600 leading-tight">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}