export const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";

export const loginWithSpotify = () => {
    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        scope: "user-read-private user-read-email playlist-modify-public",
        show_dialog: "true"
    });
    window.location.href = `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
};

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("spotify_access_token", accessToken);
    localStorage.setItem("spotify_refresh_token", refreshToken);
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    
    if (!refreshToken) return null;

    try {
        const response = await fetch("/api/spotify-refresh", {
            method: "POST",
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const data = await response.json();
        
        if (data.access_token) {
            localStorage.setItem("spotify_access_token", data.access_token);
            return data.access_token;
        }
    } catch (error) {
        console.error("Error refrescando el token", error);
        return null;
    }
};