import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CarritoProvider } from "@/lib/carrito";
import Encabezado from "@/components/Encabezado";
import PiePagina from "@/components/PiePagina";
import BarraCarrito from "@/components/BarraCarrito";
import { negocio } from "@/data/negocio";

export const metadata: Metadata = {
  title: `${negocio.nombre} ${negocio.subtitulo} · ${negocio.ciudad}`,
  description: `${negocio.eslogan}. Anillos, collares, aretes y pulseras. ${negocio.cobertura}.`,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f3d2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Great+Vibes&family=Montserrat:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <CarritoProvider>
          <Encabezado />
          <main className="min-h-[70vh]">{children}</main>
          <PiePagina />
          <BarraCarrito />
        </CarritoProvider>
      </body>
    </html>
  );
}
