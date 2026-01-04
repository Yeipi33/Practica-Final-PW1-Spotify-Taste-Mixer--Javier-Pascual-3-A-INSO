export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('spotify_mixer_favorites');
  return saved ? JSON.parse(saved) : [];
};

export const saveFavorite = (track) => {
  const favorites = getFavorites();
  const exists = favorites.find(f => f.id === track.id);
  
  if (!exists) {
    const updated = [track, ...favorites];
    localStorage.setItem('spotify_mixer_favorites', JSON.stringify(updated));
    return updated;
  }
  return favorites;
};

export const removeFavorite = (trackId) => {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.id !== trackId);
  localStorage.setItem('spotify_mixer_favorites', JSON.stringify(updated));
  return updated;
};