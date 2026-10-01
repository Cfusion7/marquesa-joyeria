import Link from "next/link";
import { categorias } from "@/data/productos";

/** Barra para saltar entre categorías */
export default function BarraCategorias({ activa }: { activa?: string }) {
  return (
    <div className="sticky top-16 z-30 border-b border-dorado-claro/50 bg-crema/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
        <Link
          href="/destacados"
          className={`shrink-0 rounded-full border px-4 py-2 text-[12px] tracking-[0.12em] uppercase ${
            activa === "destacados" ? "border-esmeralda bg-esmeralda text-crema" : "border-dorado-claro bg-white text-tinta"
          }`}
        >
          Destacados
        </Link>
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/catalogo/${c.slug}`}
            className={`shrink-0 rounded-full border px-4 py-2 text-[12px] tracking-[0.12em] uppercase ${
              activa === c.slug ? "border-esmeralda bg-esmeralda text-crema" : "border-dorado-claro bg-white text-tinta"
            }`}
          >
            {c.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
}
