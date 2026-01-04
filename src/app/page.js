"use client";
import { loginWithSpotify } from "@/lib/auth";

export default function LoginPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
            <h1 className="text-4xl font-bold mb-8">Spotify Taste Mixer</h1>
            <button 
                onClick={loginWithSpotify}
                className="bg-[#1DB954] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition"
            >
                Iniciar sesión con Spotify
            </button>
        </div>
    );
}