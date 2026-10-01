"use client";

import { useState } from "react";
import type { Producto } from "@/data/productos";
import { formatoCOP, useCarrito } from "@/lib/carrito";

export default function TarjetaProducto({ p }: { p: Producto }) {
  const { agregar } = useCarrito();
  const [vi, setVi] = useState(0);
  const [opcion, setOpcion] = useState(p.opciones?.valores[0] ?? "");
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const variante = p.variantes[vi];

  const onAgregar = () => {
    agregar({
      productoId: p.id,
      variante: variante.nombre,
      opcion: p.opciones ? `${p.opciones.titulo} ${opcion}` : undefined,
      precio: variante.precio,
      cantidad,
    });
    setAgregado(true);
    setCantidad(1);
    setTimeout(() => setAgregado(false), 1600);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-dorado-claro/70 bg-white shadow-[0_1px_0_rgba(176,141,87,0.15)]">
      <div className="relative aspect-square bg-beige">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.foto} alt={p.nombre} loading="lazy" className="h-full w-full object-cover" />
        {p.descuentos && (
          <span className="absolute left-3 top-3 rounded-full bg-esmeralda px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-crema">
            Precio por cantidad
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-serif text-[22px] font-semibold leading-tight text-esmeralda">{p.nombre}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-gris">{p.descripcion}</p>
        </div>

        <p className="text-xl font-semibold text-dorado-oscuro">{formatoCOP(variante.precio)}</p>

        {p.descuentos && (
          <ul className="rounded-xl bg-esmeralda-50 px-3 py-2 text-[12px] text-esmeralda">
            {p.descuentos.map((d) => (
              <li key={d.desde}>
                Desde {d.desde} unidades: <b>−{d.porcentaje}%</b>
              </li>
            ))}
          </ul>
        )}

        {p.variantes.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {p.variantes.map((v, i) => (
              <button
                key={v.nombre}
                onClick={() => setVi(i)}
                className={`rounded-full border px-3 py-1.5 text-[12px] transition ${
                  i === vi ? "border-esmeralda bg-esmeralda text-crema" : "border-dorado-claro text-tinta hover:border-dorado"
                }`}
              >
                {v.nombre}
              </button>
            ))}
          </div>
        )}

        {p.opciones && (
          <label className="flex items-center gap-2 text-[13px] text-gris">
            {p.opciones.titulo}
            <select
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              className="rounded-lg border border-dorado-claro bg-crema px-2 py-1.5 text-tinta"
            >
              {p.opciones.valores.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        )}

        <div className="mt-auto flex items-center gap-3 pt-1">
          <div className="flex items-center rounded-full border border-dorado-claro">
            <button aria-label="Menos" onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="h-11 w-10 text-lg text-esmeralda">
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">{cantidad}</span>
            <button aria-label="Más" onClick={() => setCantidad((c) => c + 1)} className="h-11 w-10 text-lg text-esmeralda">
              +
            </button>
          </div>
          <button
            onClick={onAgregar}
            className={`h-11 flex-1 rounded-full text-[13px] font-medium tracking-[0.1em] uppercase transition ${
              agregado ? "bg-dorado text-white" : "bg-esmeralda text-crema hover:bg-esmeralda-700"
            }`}
          >
            {agregado ? <span className="aparecer inline-block">✓ Agregado</span> : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
