"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProducto, type Descuento } from "@/data/productos";
import { negocio } from "@/data/negocio";

export type ItemCarrito = {
  key: string; // producto + variante + opción
  productoId: string;
  variante: string;
  opcion?: string;
  precio: number; // precio unitario de la variante
  cantidad: number;
};

export const formatoCOP = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");

/** % de descuento que aplica para una cantidad dada */
export function porcentajePara(descuentos: Descuento[] | undefined, cantidad: number) {
  if (!descuentos) return 0;
  return descuentos.filter((d) => cantidad >= d.desde).reduce((m, d) => Math.max(m, d.porcentaje), 0);
}

export type LineaCalculada = ItemCarrito & { nombre: string; porcentaje: number; subtotal: number; bruto: number };

/** Calcula subtotales: el descuento se aplica sumando todas las unidades del mismo producto */
export function calcular(items: ItemCarrito[]) {
  const unidadesPorProducto: Record<string, number> = {};
  items.forEach((i) => (unidadesPorProducto[i.productoId] = (unidadesPorProducto[i.productoId] || 0) + i.cantidad));
  const lineas: LineaCalculada[] = items.map((i) => {
    const p = getProducto(i.productoId);
    const porcentaje = porcentajePara(p?.descuentos, unidadesPorProducto[i.productoId]);
    const bruto = i.precio * i.cantidad;
    return { ...i, nombre: p?.nombre ?? i.productoId, porcentaje, bruto, subtotal: bruto * (1 - porcentaje / 100) };
  });
  const bruto = lineas.reduce((s, l) => s + l.bruto, 0);
  const total = lineas.reduce((s, l) => s + l.subtotal, 0);
  const unidades = items.reduce((s, i) => s + i.cantidad, 0);
  return { lineas, bruto, ahorro: bruto - total, total, unidades };
}

export type DatosCliente = { nombre: string; entrega: string; direccion: string; nota: string };

export function mensajeWhatsApp(items: ItemCarrito[], c: DatosCliente) {
  const { lineas, total, ahorro } = calcular(items);
  const filas = lineas.map((l) => {
    const detalle = [l.variante, l.opcion].filter(Boolean).join(" / ");
    const desc = l.porcentaje ? ` (−${l.porcentaje}% por cantidad)` : "";
    return `• ${l.nombre}${detalle ? ` (${detalle})` : ""} — Cantidad: ${l.cantidad} — ${formatoCOP(l.subtotal)}${desc}`;
  });
  const partes = [
    `Hola ${negocio.nombre} ${negocio.subtitulo}, quiero hacer el siguiente pedido:`,
    "",
    ...filas,
    "",
    ...(ahorro > 0 ? [`Descuento por cantidad: −${formatoCOP(ahorro)}`] : []),
    `Total estimado: ${formatoCOP(total)}`,
    "",
    `Nombre: ${c.nombre || "-"}`,
    `Entrega: ${c.entrega || "-"}`,
    `Dirección: ${c.direccion || "-"}`,
    `Nota: ${c.nota || "-"}`,
    "",
    "Quedo atento(a) para confirmar el pedido. ¡Gracias!",
  ];
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(partes.join("\n"))}`;
}

type Ctx = {
  items: ItemCarrito[];
  agregar: (i: Omit<ItemCarrito, "key">) => void;
  cambiar: (key: string, cantidad: number) => void;
  quitar: (key: string) => void;
  vaciar: () => void;
  listo: boolean;
};

const CarritoCtx = createContext<Ctx | null>(null);
const CLAVE = "marquesa-carrito-v1";

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {}
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {}
  }, [items, listo]);

  const valor = useMemo<Ctx>(
    () => ({
      items,
      listo,
      agregar: (i) => {
        const key = [i.productoId, i.variante, i.opcion ?? ""].join("|");
        setItems((prev) => {
          const existe = prev.find((p) => p.key === key);
          if (existe) return prev.map((p) => (p.key === key ? { ...p, cantidad: p.cantidad + i.cantidad } : p));
          return [...prev, { ...i, key }];
        });
      },
      cambiar: (key, cantidad) =>
        setItems((prev) => (cantidad <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, cantidad } : p)))),
      quitar: (key) => setItems((prev) => prev.filter((p) => p.key !== key)),
      vaciar: () => setItems([]),
    }),
    [items, listo]
  );

  return <CarritoCtx.Provider value={valor}>{children}</CarritoCtx.Provider>;
}

export function useCarrito() {
  const c = useContext(CarritoCtx);
  if (!c) throw new Error("useCarrito fuera de CarritoProvider");
  return c;
}
