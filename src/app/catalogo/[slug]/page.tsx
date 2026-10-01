import { notFound } from "next/navigation";
import { categorias, getCategoria, productosDe } from "@/data/productos";
import TituloSeccion from "@/components/TituloSeccion";
import BarraCategorias from "@/components/BarraCategorias";
import TarjetaProducto from "@/components/TarjetaProducto";

export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategoria(slug);
  return { title: c ? `${c.nombre} · Marquesa Joyería` : "Marquesa Joyería" };
}

export default async function PaginaCategoria({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategoria(slug);
  if (!c) notFound();
  const lista = productosDe(slug);

  return (
    <>
      <BarraCategorias activa={slug} />
      <TituloSeccion script="Colección" titulo={c.nombre} texto={c.descripcion} />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <TarjetaProducto key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}
