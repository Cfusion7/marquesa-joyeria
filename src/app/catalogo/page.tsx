import Link from "next/link";
import { categorias, productosDe } from "@/data/productos";
import TituloSeccion from "@/components/TituloSeccion";
import BarraCategorias from "@/components/BarraCategorias";

export default function Catalogo() {
  return (
    <>
      <BarraCategorias />
      <TituloSeccion script="Colección" titulo="Nuestro catálogo" texto="Elige una categoría para ver las piezas." />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-5">
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/catalogo/${c.slug}`}
            className="group overflow-hidden rounded-2xl border border-dorado-claro/70 bg-white transition hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden bg-beige">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.foto} alt={c.nombre} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-3 text-center">
              <h2 className="font-serif text-xl font-semibold text-esmeralda">{c.nombre}</h2>
              <p className="text-[12px] text-gris">{c.descripcion}</p>
              <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-dorado-oscuro">{productosDe(c.slug).length} piezas</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
