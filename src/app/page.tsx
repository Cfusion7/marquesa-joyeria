import Link from "next/link";
import { negocio } from "@/data/negocio";
import { fotosPortada } from "@/data/productos";
import Redes from "@/components/Redes";

export default function Inicio() {
  return (
    <section className="relative overflow-hidden">
      {/* fondo beige suave */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-beige),var(--color-crema)_65%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-10 md:grid-cols-2 md:gap-14 md:pt-20">
        <div className="text-center md:text-left">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dorado-oscuro">
            {negocio.ciudad} · {negocio.cobertura}
          </p>
          <h1 className="mt-4 font-script text-[84px] leading-[0.9] text-esmeralda md:text-[120px]">{negocio.nombre}</h1>
          <p className="mt-1 text-[13px] tracking-[0.6em] uppercase text-dorado-oscuro md:pl-2">{negocio.subtitulo}</p>
          <div className="filete mx-auto mt-6 w-32 md:mx-0" />
          <p className="mt-6 font-serif text-2xl italic text-tinta/80 md:text-3xl">{negocio.eslogan}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link href="/destacados" className="btn-primario">
              Productos destacados
            </Link>
            <Link href="/catalogo" className="btn-secundario">
              Ver catálogo
            </Link>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <Redes />
          </div>
        </div>

        {/* Collage de fotos */}
        <div className="grid grid-cols-2 gap-3">
          {fotosPortada.map((src, i) => (
            <div
              key={src}
              className={`overflow-hidden rounded-[28px] border border-dorado-claro bg-white p-1.5 shadow-sm ${i % 2 === 1 ? "translate-y-6" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Joyería Marquesa" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-6 pt-8 text-center">
        <a
          href={negocio.mapsUrl}
          target="_blank"
          rel="noopener"
          className="text-sm text-esmeralda underline-offset-4 hover:underline"
        >
          <svg viewBox="0 0 24 24" className="mr-1.5 inline h-4 w-4 -translate-y-px text-dorado" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {negocio.direccion}, {negocio.ciudad}
        </a>
        <p className="mt-1 text-xs text-gris">{negocio.horario}</p>
      </div>
    </section>
  );
}
