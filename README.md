# Marquesa Joyería — catálogo web

Catálogo con carrito y pedidos por WhatsApp (Next.js + Tailwind).

## Dónde se edita cada cosa

| Qué quiero cambiar | Archivo |
|---|---|
| WhatsApp, dirección, horario, redes, eslogan | `src/data/negocio.ts` |
| Productos, precios, categorías, destacados, descuentos por cantidad | `src/data/productos.ts` |
| Colores y tipografías | `src/app/globals.css` (bloque `@theme`) |

## Fotos

Hoy las fotos son de muestra (Unsplash). Para usar las reales:
1. Suelta la foto en `public/fotos/<categoría>/`, por ejemplo `public/fotos/tubos/tubo-clasico.jpg`.
2. En `src/data/productos.ts` cambia `foto: u("...")` por `foto: "/fotos/tubos/tubo-clasico.jpg"`.

Recomendado: fotos cuadradas, fondo blanco o beige.

## Eslóganes propuestos

1. Joyas que cuentan tu historia *(el que está puesto)*
2. Elegancia que se lleva en la piel
3. Brillo atemporal, hecho para ti

## Descuento por cantidad

Cada producto puede tener `descuentos: [{ desde: 6, porcentaje: 10 }, { desde: 12, porcentaje: 15 }]`.
El descuento se calcula sumando todas las unidades de ese producto en el carrito (aunque sean de tallas distintas).
