"use client";


/*Función central para peticiones a Spotify.*/
export async function spotifyRequest(endpoint, options = {}) {
  const token = localStorage.getItem("spotify_access_token");
  if (!token) return null;

  try {
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers 
      }
    });

    if (res.status === 204) return true;
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error en spotifyRequest:", error);
    return null;
  }
}


 /*Exportación de la lista a la cuenta del usuario.*/
export async function exportToSpotify(playlistName, trackUris) {
  try {
    const user = await spotifyRequest("/me");
    if (!user?.id) return null;

    const newPlaylist = await spotifyRequest(`/users/${user.id}/playlists`, {
      method: "POST",
      body: JSON.stringify({ name: playlistName, public: false })
    });

    if (!newPlaylist?.id) return null;

    await spotifyRequest(`/playlists/${newPlaylist.id}/tracks`, {
      method: "POST",
      body: JSON.stringify({ uris: trackUris })
    });

    return newPlaylist.external_urls.spotify;
  } catch (error) {
    return null;
  }
}


/*Búsqueda de artistas y canciones */
export const searchArtists = async (query) => {
  if (!query) return [];
  const data = await spotifyRequest(`/search?type=artist&q=${encodeURIComponent(query)}&limit=5`);
  return data?.artists?.items || [];
};

export const searchTracks = async (query) => {
  if (!query) return [];
  const data = await spotifyRequest(`/search?type=track&q=${encodeURIComponent(query)}&limit=10`);
  return data?.tracks?.items || [];
};

/*Generación de la playlist basada en preferencias del usuario.*/
export async function generatePlaylist(preferences) {
  let allTracks = [];
  try {
    // 1. Añadir canciones seleccionadas manualmente
    if (preferences.tracks?.length > 0) {
      allTracks.push(...preferences.tracks);
    }

    // 2. Obtener Top Tracks de los artistas seleccionados
    if (preferences.artists?.length > 0) {
      for (const artist of preferences.artists) {
        const data = await spotifyRequest(`/artists/${artist.id}/top-tracks?market=ES`);
        if (data?.tracks) {
          allTracks.push(...data.tracks.slice(0, 5));
        }
      }
    }

    const targetPop = preferences.popularity || 50;
    
    // 3. Filtrar y formatear asegurando el campo preview_url
    const filteredTracks = allTracks.filter(track => 
      track.popularity >= targetPop - 25 && track.popularity <= targetPop + 25
    );

    // Eliminamos duplicados y nos aseguramos de que el objeto final tenga el preview_url
    return Array.from(new Map(filteredTracks.map(t => [t.id, t])).values()).map(track => ({
      id: track.id,
      name: track.name,
      uri: track.uri,
      artists: track.artists,
      album: track.album,
      preview_url: track.preview_url,
      popularity: track.popularity
    }));

  } catch (error) {
    console.error("Error en generación:", error);
    return [];
  }
}