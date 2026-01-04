"use client";

export default function DecadeWidget({ selectedDecade, onSelect }) {
  const decades = [
    { label: "60s", value: "1960-1969", icon: "☮️" },
    { label: "70s", value: "1970-1979", icon: "🕺" },
    { label: "80s", value: "1980-1989", icon: "🎸" },
    { label: "90s", value: "1990-1999", icon: "🕹️" },
    { label: "00s", value: "2000-2009", icon: "🎧" },
    { label: "10s", value: "2010-2019", icon: "📱" },
    { label: "Actual", value: "2020-2025", icon: "✨" },
  ];

  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-white/5 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-bold">Década Ideal</h2>
        <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest">Época Musical</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {decades.map((decade) => {
          const isSelected = selectedDecade === decade.value;
          return (
            <button
              key={decade.label}
              onClick={() => onSelect(isSelected ? null : decade.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 border
                ${isSelected 
                  ? "bg-purple-600 border-purple-400 text-white scale-105 shadow-[0_0_15px_rgba(147,51,234,0.3)]" 
                  : "bg-[#242424] border-transparent text-neutral-400 hover:border-white/20 hover:text-white"
                }`}
            >
              <span>{decade.icon}</span>
              {decade.label}
            </button>
          );
        })}
      </div>
      
      <p className="text-[11px] text-neutral-500 mt-4 leading-tight">
        {selectedDecade 
          ? `Filtrando música entre ${selectedDecade.split('-')[0]} y ${selectedDecade.split('-')[1]}.`
          : "Selecciona una década para dar contexto temporal a tu mezcla."}
      </p>
    </div>
  );
}