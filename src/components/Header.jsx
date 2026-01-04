"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Elimina los tokens del localStorage
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    router.push("/"); // Redirige al login
  };

  return (
    <header className="flex justify-between items-center p-4 bg-neutral-900">
      <div className="flex items-center">
        <h1 className="text-4xl font-black text-[#1DB954] tracking-tighter uppercase">
          Spotify Taste Mixer
        </h1>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-white text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition"
      >
        Cerrar Sesión
      </button>
    </header>
  );
}