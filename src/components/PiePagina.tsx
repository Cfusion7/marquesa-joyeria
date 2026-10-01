import Link from "next/link";
import { negocio } from "@/data/negocio";
import Redes from "./Redes";

export default function PiePagina() {
  return (
    <footer className="mt-16 bg-esmeralda pb-24 text-crema md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-script text-4xl text-dorado-claro">{negocio.nombre}</p>
          <p className="mt-1 text-[11px] tracking-[0.35em] uppercase text-dorado-claro/80">{negocio.subtitulo}</p>
          <p className="mt-4 font-serif text-lg italic text-crema/80">{negocio.eslogan}</p>
        </div>

        <div className="space-y-2 text-sm text-crema/85">
          <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-dorado-claro">Visítanos</p>
          <a href={negocio.mapsUrl} target="_blank" rel="noopener" className="block underline-offset-4 hover:underline">
            {negocio.direccion}, {negocio.ciudad}
          </a>
          <p>{negocio.horario}</p>
          <p>{negocio.cobertura}</p>
          <a href={`https://wa.me/${negocio.whatsapp}`} target="_blank" rel="noopener" className="block underline-offset-4 hover:underline">
            WhatsApp {negocio.whatsappVisible}
          </a>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-dorado-claro">Explora</p>
          <div className="flex flex-col gap-2 text-crema/85">
            <Link href="/destacados" className="hover:text-dorado-claro">Productos destacados</Link>
            <Link href="/catalogo" className="hover:text-dorado-claro">Catálogo</Link>
            <Link href="/carrito" className="hover:text-dorado-claro">Mi pedido</Link>
          </div>
          <div className="mt-6">
            <Redes claro />
          </div>
        </div>
      </div>
      <div className="border-t border-crema/10 py-4 text-center text-[11px] tracking-wider text-crema/50">
        © {new Date().getFullYear()} {negocio.nombre} {negocio.subtitulo}
      </div>
    </footer>
  );
}
