"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import { negocio } from "@/data/negocio";

export function IconoBolsa({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export default function Encabezado() {
  const { items } = useCarrito();
  const unidades = items.reduce((s, i) => s + i.cantidad, 0);
  const ruta = usePathname();
  const enlace = (href: string, texto: string) => (
    <Link
      href={href}
      className={`text-[13px] tracking-[0.14em] uppercase transition hover:text-dorado-oscuro ${
        ruta === href || (href !== "/" && ruta.startsWith(href)) ? "text-dorado-oscuro" : "text-tinta/80"
      }`}
    >
      {texto}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-dorado-claro/60 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-2 leading-none" aria-label="Inicio">
          <span className="font-script text-[34px] text-esmeralda">{negocio.nombre}</span>
          <span className="text-[10px] tracking-[0.35em] uppercase text-dorado-oscuro">{negocio.subtitulo}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {enlace("/", "Inicio")}
          {enlace("/destacados", "Destacados")}
          {enlace("/catalogo", "Catálogo")}
        </nav>

        <Link href="/carrito" className="relative rounded-full p-2 text-esmeralda hover:bg-beige" aria-label="Ver carrito">
          <IconoBolsa />
          {unidades > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-dorado px-1 text-[11px] font-semibold text-white">
              {unidades}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
