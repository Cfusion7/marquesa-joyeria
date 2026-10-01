import { negocio } from "@/data/negocio";

const iconos = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M16.6 3c.3 2.1 1.6 3.6 3.6 3.8v2.9c-1.3 0-2.5-.4-3.6-1.1v6.1c0 3.2-2.4 5.3-5.3 5.3A5.2 5.2 0 0 1 6 14.8c0-3.2 2.8-5.6 6.2-5.1v3c-1.5-.4-3.1.5-3.1 2.1 0 1.3 1 2.3 2.3 2.3 1.4 0 2.3-1 2.3-2.6V3h2.9Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a7.7 7.7 0 1 1 6.6 3.6Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.9-.9-2.8-2.2-.2-.3.2-.3.6-1 .1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.4-.2Z" />
    </svg>
  ),
};

export default function Redes({ claro = false }: { claro?: boolean }) {
  const lista = [
    { nombre: "Instagram", href: negocio.redes.instagram, icono: iconos.instagram },
    { nombre: "Facebook", href: negocio.redes.facebook, icono: iconos.facebook },
    { nombre: "TikTok", href: negocio.redes.tiktok, icono: iconos.tiktok },
    { nombre: "WhatsApp", href: `https://wa.me/${negocio.whatsapp}`, icono: iconos.whatsapp },
  ];
  return (
    <div className="flex items-center gap-3">
      {lista.map((r) => (
        <a
          key={r.nombre}
          href={r.href}
          target="_blank"
          rel="noopener"
          aria-label={r.nombre}
          className={`grid h-11 w-11 place-items-center rounded-full border transition ${
            claro
              ? "border-dorado-claro/50 text-dorado-claro hover:bg-dorado-claro hover:text-esmeralda"
              : "border-dorado/60 bg-white text-esmeralda hover:bg-esmeralda hover:text-crema"
          }`}
        >
          {r.icono}
        </a>
      ))}
    </div>
  );
}
