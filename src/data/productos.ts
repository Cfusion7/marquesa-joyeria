// ============================================================
//  CATÁLOGO — Marquesa Joyería
//  ⚠️ PRUEBA: categorías, productos, precios y fotos son de muestra.
//
//  Cómo editar:
//  • Cambiar un precio: edita el número de "precio" (sin puntos).
//  • Cambiar una foto: pon la foto en /public/fotos/<categoria>/
//    y escribe aquí su ruta, por ejemplo "/fotos/anillos/solitario.jpg".
//  • Destacar un producto en la portada: destacado: true
//  • Descuento por cantidad: lista "descuentos" (desde X unidades, % de descuento).
// ============================================================

export type Variante = { nombre: string; precio: number };

export type Descuento = { desde: number; porcentaje: number };

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string; // slug de la categoría
  foto: string;
  variantes: Variante[]; // la primera es la que se muestra por defecto
  opciones?: { titulo: string; valores: string[] }; // sin costo (talla, color…)
  descuentos?: Descuento[];
  destacado?: boolean;
};

export type Categoria = { slug: string; nombre: string; descripcion: string; foto: string };

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

export const categorias: Categoria[] = [
  { slug: "anillos", nombre: "Anillos", descripcion: "Piezas para cada momento", foto: u("1611955167811-4711904bb9f8") },
  { slug: "tubos", nombre: "Tubos", descripcion: "Precio especial por cantidad", foto: u("1628926379972-9843ad139a8c") },
  { slug: "collares", nombre: "Collares", descripcion: "Cadenas y dijes delicados", foto: u("1625792508553-5e66a81659fa") },
  { slug: "aretes", nombre: "Aretes", descripcion: "Perlas, topos y argollas", foto: u("1682822749969-61a63203c501") },
  { slug: "pulseras", nombre: "Pulseras", descripcion: "Esclavas y brazaletes", foto: u("1655707063473-3ee2e5b5eeb8") },
];

const tallas = { titulo: "Talla", valores: ["5", "6", "7", "8", "9"] };
const descuentoTubos: Descuento[] = [
  { desde: 6, porcentaje: 10 },
  { desde: 12, porcentaje: 15 },
];

export const productos: Producto[] = [
  // ---------- ANILLOS ----------
  {
    id: "anillo-rosa-imperial", nombre: "Anillo Rosa Imperial", categoria: "anillos",
    descripcion: "Piedra rosada rodeada de circones, en baño de oro rosa.",
    foto: u("1603561596973-8166e9e089d1"),
    variantes: [{ nombre: "Baño de oro rosa", precio: 189000 }, { nombre: "Oro rosa 18k", precio: 1450000 }],
    opciones: tallas, destacado: true,
  },
  {
    id: "anillo-corazon", nombre: "Anillo Corazón Brillante", categoria: "anillos",
    descripcion: "Corazón pavé de circones sobre aro fino.",
    foto: u("1610109108120-7aeac1ae2c1f"),
    variantes: [{ nombre: "Oro laminado", precio: 95000 }, { nombre: "Oro 18k", precio: 890000 }],
    opciones: tallas,
  },
  {
    id: "anillo-racimo", nombre: "Anillo Racimo Champaña", categoria: "anillos",
    descripcion: "Racimo de piedras color champaña, estilo cóctel.",
    foto: u("1611955167811-4711904bb9f8"),
    variantes: [{ nombre: "Oro laminado", precio: 165000 }],
    opciones: tallas, destacado: true,
  },
  {
    id: "anillo-trio", nombre: "Set Trío de Anillos", categoria: "anillos",
    descripcion: "Tres anillos combinables: círculo, corazón y banda.",
    foto: u("1543294001-f7cd5d7fb516"),
    variantes: [{ nombre: "Set de 3", precio: 210000 }],
    opciones: tallas,
  },

  // ---------- TUBOS (descuento por cantidad) ----------
  {
    id: "tubo-argolla-clasica", nombre: "Tubo Argolla Clásica", categoria: "tubos",
    descripcion: "Argolla tipo tubo, acabado pulido. Ideal para surtir.",
    foto: u("1628926379972-9843ad139a8c"),
    variantes: [{ nombre: "4 mm", precio: 38000 }, { nombre: "6 mm", precio: 48000 }],
    opciones: tallas, descuentos: descuentoTubos, destacado: true,
  },
  {
    id: "tubo-grueso", nombre: "Tubo Grueso Bicolor", categoria: "tubos",
    descripcion: "Tubo grueso en dos tonos, oro y plata.",
    foto: u("1615655114865-4cc1bda5901e"),
    variantes: [{ nombre: "Unidad", precio: 55000 }],
    descuentos: descuentoTubos,
  },

  // ---------- COLLARES ----------
  {
    id: "collar-riviera", nombre: "Collar Riviera", categoria: "collares",
    descripcion: "Línea de circones engastados, cierre ajustable.",
    foto: u("1625792508553-5e66a81659fa"),
    variantes: [{ nombre: "Oro laminado", precio: 175000 }],
    destacado: true,
  },
  {
    id: "collar-gota", nombre: "Collar Gota Dorada", categoria: "collares",
    descripcion: "Dije en forma de gota sobre cadena fina.",
    foto: u("1705326454924-f6777522b030"),
    variantes: [{ nombre: "45 cm", precio: 129000 }, { nombre: "50 cm", precio: 139000 }],
  },
  {
    id: "collar-punto-luz", nombre: "Punto de Luz Plata", categoria: "collares",
    descripcion: "Dije cuadrado pavé en plata 925.",
    foto: u("1588444968576-f8fe92ce56fd"),
    variantes: [{ nombre: "Plata 925", precio: 149000 }],
  },
  {
    id: "collar-dijes", nombre: "Cadena Monedas", categoria: "collares",
    descripcion: "Cadena delicada con tres dijes tipo moneda.",
    foto: u("1717282924526-07a7373bb142"),
    variantes: [{ nombre: "Oro laminado", precio: 98000 }],
  },

  // ---------- ARETES ----------
  {
    id: "aretes-perla-barroca", nombre: "Aretes Perla Barroca", categoria: "aretes",
    descripcion: "Perla de agua dulce con topo dorado.",
    foto: u("1682822749969-61a63203c501"),
    variantes: [{ nombre: "Par", precio: 115000 }],
    destacado: true,
  },
  {
    id: "topos-perla", nombre: "Topos de Perla", categoria: "aretes",
    descripcion: "Clásicos topos de perla para todos los días.",
    foto: u("1623303179820-de8ec58b03dc"),
    variantes: [{ nombre: "6 mm", precio: 65000 }, { nombre: "8 mm", precio: 78000 }],
  },
  {
    id: "aretes-flor", nombre: "Aretes Flor Rosé", categoria: "aretes",
    descripcion: "Flor tallada en baño de oro rosa, gancho francés.",
    foto: u("1701777892740-88419a701472"),
    variantes: [{ nombre: "Par", precio: 89000 }],
  },
  {
    id: "aretes-corazon-azul", nombre: "Aretes Corazón Zafiro", categoria: "aretes",
    descripcion: "Cristal azul en forma de corazón, gancho dorado.",
    foto: u("1630019925419-5fc53b4a52cf"),
    variantes: [{ nombre: "Par", precio: 72000 }],
  },

  // ---------- PULSERAS ----------
  {
    id: "esclava-lisa", nombre: "Esclava Lisa", categoria: "pulseras",
    descripcion: "Esclava rígida pulida con broche invisible.",
    foto: u("1655707063473-3ee2e5b5eeb8"),
    variantes: [{ nombre: "Oro laminado", precio: 135000 }],
    opciones: { titulo: "Tamaño", valores: ["S", "M", "L"] },
  },
  {
    id: "brazalete-cruzado", nombre: "Brazalete Cruzado", categoria: "pulseras",
    descripcion: "Diseño cruzado con línea de circones.",
    foto: u("1655707063513-a08dad26440e"),
    variantes: [{ nombre: "Oro laminado", precio: 159000 }],
    destacado: true,
  },
  {
    id: "esclava-diamantada", nombre: "Esclava Diamantada", categoria: "pulseras",
    descripcion: "Textura diamantada que brilla con la luz.",
    foto: u("1655707063496-e1c00b3280de"),
    variantes: [{ nombre: "Oro laminado", precio: 145000 }],
  },
  {
    id: "esclava-bolitas", nombre: "Esclava Bolitas", categoria: "pulseras",
    descripcion: "Esclava fina de bolitas, perfecta para combinar.",
    foto: u("1655707063475-1381a4c0a63a"),
    variantes: [{ nombre: "Oro laminado", precio: 79000 }],
  },
];

// Fotos de la portada
export const fotosPortada = [
  u("1704957205144-299bbf127891"),
  u("1655707063092-5c4509de41b8"),
  u("1611955167811-4711904bb9f8"),
  u("1682822749969-61a63203c501"),
];

export const getCategoria = (slug: string) => categorias.find((c) => c.slug === slug);
export const productosDe = (slug: string) => productos.filter((p) => p.categoria === slug);
export const getProducto = (id: string) => productos.find((p) => p.id === id);
