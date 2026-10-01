export default function TituloSeccion({ script, titulo, texto }: { script: string; titulo: string; texto?: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 pb-8 pt-10 text-center">
      <p className="font-script text-4xl text-dorado md:text-5xl">{script}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold text-esmeralda md:text-4xl">{titulo}</h1>
      <div className="filete mx-auto mt-4 w-24" />
      {texto && <p className="mt-4 text-sm leading-relaxed text-gris">{texto}</p>}
    </div>
  );
}
