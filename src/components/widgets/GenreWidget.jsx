"use client";

export default function GenreWidget({ onSelect, selectedItems = [] }) {
  // Lista de géneros sugeridos
  const genres = [ 'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music' ];

  const toggleGenre = (genre) => {
    let updated;
    if (selectedItems.includes(genre)) {
      updated = selectedItems.filter(g => g !== genre);
    } else if (selectedItems.length < 5) {
      updated = [...selectedItems, genre];
    } else {
      return;
    }
    onSelect(updated); // Comunica el cambio al Dashboard
  };

  return (
    <div className="bg-[#121212] p-4 rounded-lg border border-white/5">
      <h2 className="text-white text-lg font-bold mb-4">
        Géneros ({selectedItems.length}/5)
      </h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedItems.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 
                ${isSelected 
                  ? "bg-[#1DB954] text-black scale-105" // Verde Spotify
                  : "bg-[#242424] text-white hover:bg-[#2a2a2a]"
                }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}