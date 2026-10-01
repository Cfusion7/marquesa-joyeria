import { productos } from "@/data/productos";
import TituloSeccion from "@/components/TituloSeccion";
import BarraCategorias from "@/components/BarraCategorias";
import TarjetaProducto from "@/components/TarjetaProducto";

export const metadata = { title: "Productos destacados · Marquesa Joyería" };

export default function Destacados() {
  const lista = productos.filter((p) => p.destacado);
  return (
    <>
      <BarraCategorias activa="destacados" />
      <TituloSeccion script="Favoritos" titulo="Productos destacados" texto="Las piezas más queridas de nuestras clientas." />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <TarjetaProducto key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}
