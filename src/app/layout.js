import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex h-screen bg-black text-white overflow-hidden p-2 gap-2">
        {/* PANEL IZQUIERDO: Navegación y Biblioteca */}
        <aside className="hidden md:flex flex-col w-[350px] gap-2 h-full shrink-0">
          <Sidebar />
        </aside>

        {/* PANEL DERECHO: Contenido Principal */}
        <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto relative no-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
