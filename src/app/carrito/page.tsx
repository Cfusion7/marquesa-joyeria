"use client";

import Link from "next/link";
import { useState } from "react";
import { calcular, formatoCOP, mensajeWhatsApp, useCarrito } from "@/lib/carrito";
import { getProducto } from "@/data/productos";
import TituloSeccion from "@/components/TituloSeccion";

const entregas = ["Envío a domicilio", "Recoger en tienda"];

export default function Carrito() {
  const { items, cambiar, quitar, vaciar, listo } = useCarrito();
  const [cliente, setCliente] = useState({ nombre: "", entrega: entregas[0], direccion: "", nota: "" });
  const { lineas, bruto, ahorro, total } = calcular(items);

  if (!listo) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <>
        <TituloSeccion script="Tu pedido" titulo="Aún no has elegido piezas" texto="Explora el catálogo y agrega tus favoritas." />
        <div className="flex justify-center gap-3 px-4">
          <Link href="/catalogo" className="btn-primario">Ver catálogo</Link>
        </div>
      </>
    );
  }

  const campo = "w-full rounded-xl border border-dorado-claro bg-white px-4 py-3 text-sm outline-none focus:border-esmeralda";

  return (
    <>
      <TituloSeccion script="Tu pedido" titulo="Resumen del pedido" />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-[1.4fr_1fr]">
        {/* Productos */}
        <div className="space-y-3">
          {lineas.map((l) => {
            const p = getProducto(l.productoId);
            return (
              <div key={l.key} className="flex gap-3 rounded-2xl border border-dorado-claro/70 bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p?.foto} alt={l.nombre} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif text-lg font-semibold leading-tight text-esmeralda">{l.nombre}</p>
                      <p className="text-[12px] text-gris">{[l.variante, l.opcion].filter(Boolean).join(" · ")}</p>
                    </div>
                    <button onClick={() => quitar(l.key)} className="text-[12px] text-gris underline" aria-label="Quitar">
                      Quitar
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-dorado-claro">
                      <button onClick={() => cambiar(l.key, l.cantidad - 1)} className="h-9 w-9 text-esmeralda" aria-label="Menos">−</button>
                      <span className="w-6 text-center text-sm">{l.cantidad}</span>
                      <button onClick={() => cambiar(l.key, l.cantidad + 1)} className="h-9 w-9 text-esmeralda" aria-label="Más">+</button>
                    </div>
                    <div className="text-right">
                      {l.porcentaje > 0 && <p className="text-[11px] text-gris line-through">{formatoCOP(l.bruto)}</p>}
                      <p className="font-semibold text-dorado-oscuro">{formatoCOP(l.subtotal)}</p>
                      {l.porcentaje > 0 && <p className="text-[11px] text-esmeralda">−{l.porcentaje}% por cantidad</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={vaciar} className="text-[12px] text-gris underline">Vaciar pedido</button>
        </div>

        {/* Datos y envío */}
        <div className="h-fit space-y-4 rounded-2xl border border-dorado-claro bg-beige/60 p-5">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatoCOP(bruto)}</span></div>
            {ahorro > 0 && (
              <div className="flex justify-between text-esmeralda"><span>Descuento por cantidad</span><span>−{formatoCOP(ahorro)}</span></div>
            )}
            <div className="filete my-2" />
            <div className="flex justify-between text-lg font-semibold text-esmeralda">
              <span>Total estimado</span><span>{formatoCOP(total)}</span>
            </div>
          </div>

          <p className="pt-2 text-[11px] tracking-[0.2em] uppercase text-dorado-oscuro">Tus datos (opcional)</p>
          <input className={campo} placeholder="Nombre" value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            {entregas.map((e) => (
              <button
                key={e}
                onClick={() => setCliente({ ...cliente, entrega: e })}
                className={`rounded-xl border px-3 py-3 text-[13px] ${cliente.entrega === e ? "border-esmeralda bg-esmeralda text-crema" : "border-dorado-claro bg-white"}`}
              >
                {e}
              </button>
            ))}
          </div>
          {cliente.entrega === entregas[0] && (
            <input className={campo} placeholder="Dirección y ciudad" value={cliente.direccion} onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })} />
          )}
          <textarea className={campo} rows={2} placeholder="Nota (ej. es para regalo)" value={cliente.nota} onChange={(e) => setCliente({ ...cliente, nota: e.target.value })} />

          <a
            href={mensajeWhatsApp(items, { ...cliente, direccion: cliente.entrega === entregas[0] ? cliente.direccion : "" })}
            target="_blank"
            rel="noopener"
            className="btn-primario w-full !py-5"
          >
            Enviar pedido por WhatsApp
          </a>
          <p className="text-center text-[11px] text-gris">No pagas aquí: confirmamos disponibilidad y forma de pago por WhatsApp.</p>
        </div>
      </div>
    </>
  );
}
