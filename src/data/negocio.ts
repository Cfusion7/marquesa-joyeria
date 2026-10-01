// ============================================================
//  DATOS DEL NEGOCIO — Marquesa Joyería
//  Para cambiar algo (WhatsApp, dirección, horario, redes),
//  edita solo el texto entre comillas.
// ============================================================

export const negocio = {
  nombre: "Marquesa",
  subtitulo: "Joyería",

  // Eslogan que se ve en la portada (opciones propuestas en el README)
  eslogan: "Joyas que cuentan tu historia",

  ciudad: "Medellín",
  cobertura: "Envíos a toda Colombia",

  direccion: "Centro Comercial Gran Plaza, local 1032",

  // Enlace de Google Maps (se arma solo con la dirección)
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Centro Comercial Gran Plaza local 1032 Medellín"),

  horario: "Lunes a sábado, 9:00 a.m. – 6:00 p.m.",

  // WhatsApp que recibe los pedidos: 57 (Colombia) + número, sin espacios ni +
  whatsapp: "573183266495",
  whatsappVisible: "318 326 6495",

  // PENDIENTE: reemplazar por los perfiles reales de la joyería
  redes: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
  },
};
