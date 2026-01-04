"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";

export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // 1. Obtenemos el código de la URL que devuelve Spotify
    const code = searchParams.get("code");

    useEffect(() => {
        const exchangeToken = async () => {
            if (!code) return;

            try {
                // 2. Llamada a tu API Route para intercambiar el código por el token
                const response = await fetch("/api/spotify-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (data.access_token) {
                    // 3. Usamos el nombre exacto que busca spotifyRequest
                    localStorage.setItem("spotify_access_token", data.access_token);
                    
                    if (data.refresh_token) {
                        localStorage.setItem("spotify_refresh_token", data.refresh_token);
                    }

                    // 4. Redirigir al Dashboard tras el éxito
                    router.push("/dashboard");
                } else {
                    console.error("No se recibió el token de la API");
                    router.push("/");
                }
            } catch (error) {
                console.error("Error en el intercambio de tokens:", error);
                router.push("/");
            }
        };

        exchangeToken();
    }, [code, router]);

    return (
        <div className="flex flex-col h-screen bg-black text-white">
            {/* Incluimos el Header para mantener la estética */}
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin mb-4"></div>
                <h1 className="text-2xl font-bold">Autenticando con Spotify...</h1>
                <p className="text-neutral-400 mt-2">Estamos configurando tu sesión de música.</p>
            </div>
        </div>
    );
}