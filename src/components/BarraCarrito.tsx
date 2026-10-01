"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { calcular, formatoCOP, useCarrito } from "@/lib/carrito";

/** Barra fija abajo en celular con el total del pedido */
export default function BarraCarrito() {
  const { items } = useCarrito();
  const ruta = usePathname();
  if (items.length === 0 || ruta === "/carrito") return null;
  const { total, unidades } = calcular(items);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-dorado-claro bg-crema/95 p-3 backdrop-blur md:hidden">
      <Link href="/carrito" className="btn-primario w-full justify-between !px-5 !tracking-[0.08em]">
        <span>
          Ver pedido · {unidades} {unidades === 1 ? "pieza" : "piezas"}
        </span>
        <span className="font-semibold">{formatoCOP(total)}</span>
      </Link>
    </div>
  );
}
