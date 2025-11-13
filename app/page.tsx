"use client";

import { useEffect, useMemo, useState } from "react";
import { generateScript } from "@/lib/scriptGenerator";
import type { GeneratedScript, NarrativeFormat } from "@/lib/types";

const exemplosTema = [
  "Estratégias de storytelling para educadores",
  "Como marcas constroem narrativas memoráveis",
  "Metodologia ativa para aulas interativas",
  "Comunicação de dados em apresentações impactantes"
];

const formatoLabels: Record<NarrativeFormat, string> = {
  historia: "História",
  video: "Vídeo",
  apresentacao: "Apresentação",
  aula: "Aula"
};

export default function HomePage() {
  const [tema, setTema] = useState("Uma boa estrutura narrativa mantém a atenção do público");
  const [formato, setFormato] = useState<NarrativeFormat>("video");
  const [roteiro, setRoteiro] = useState<GeneratedScript | null>(null);
  const [autoPopulateIndex, setAutoPopulateIndex] = useState(0);

  useEffect(() => {
    setRoteiro(generateScript(tema, formato));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chamadaParaAcao = useMemo(() => {
    if (!roteiro) return "";
    return `Finalize o roteiro convidando o público a agir com base em ${roteiro.tema.toLowerCase()}.`;
  }, [roteiro]);

  const handleGerar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const scriptGerado = generateScript(tema, formato);
    setRoteiro(scriptGerado);
  };

  const handleUsarExemplo = () => {
    const nextIndex = (autoPopulateIndex + 1) % exemplosTema.length;
    setAutoPopulateIndex(nextIndex);
    const novoTema = exemplosTema[nextIndex];
    setTema(novoTema);
    const scriptGerado = generateScript(novoTema, formato);
    setRoteiro(scriptGerado);
  };

  return (
    <main className="space-y-12">
      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-xl shadow-blue-950/20 backdrop-blur">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Crie roteiros automáticos</span>
          <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">
            Estruture histórias, vídeos ou apresentações com lógica de começo, meio e fim
          </h1>
          <p className="text-slate-300 sm:text-lg">
            Transforme uma ideia ou tema central em um roteiro completo em 10 partes com introdução, desenvolvimento e
            encerramento. Cada bloco já vem com objetivos narrativos, tópicos sugeridos, ganchos de transição e pistas visuais.
          </p>
        </div>

        <form onSubmit={handleGerar} className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Tema ou ideia central
              <textarea
                value={tema}
                onChange={(event) => setTema(event.target.value)}
                rows={4}
                className="resize-none"
                placeholder="Insira aqui o tema ou ideia central"
                required
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {Object.entries(formatoLabels).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormato(value as NarrativeFormat)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    formato === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-blue-500/25 transition hover:scale-[1.01] hover:shadow-blue-400/30"
            >
              Gerar roteiro completo
            </button>
            <button
              type="button"
              onClick={handleUsarExemplo}
              className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
            >
              Usar exemplo sugerido
            </button>
            <p className="rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-4 text-xs text-slate-400">
              O gerador cria 10 partes (aprox. 7.000 caracteres cada) com lógica sequencial, ganchos narrativos e blocos de fala.
              Depois, destrincha os personagens principais para facilitar a criação de imagens ou storyboards.
            </p>
          </div>
        </form>
      </section>

      {roteiro ? (
        <section className="space-y-10">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
              <span>{formatoLabels[roteiro.formato]}</span>
              <span className="h-px w-8 bg-slate-700" aria-hidden />
              <span>Promessa: {roteiro.promessaCentral}</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Roteiro estruturado para: {roteiro.tema}</h2>
            <p className="text-slate-300">{roteiro.mensagemPrincipal}</p>
          </header>

          <div className="space-y-8">
            {roteiro.partes.map((parte) => (
              <article
                key={parte.id}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-lg shadow-slate-950/30"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent" aria-hidden />
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-4 sm:max-w-[70%]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      {parte.fase}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-100">{parte.titulo}</h3>
                      <p className="text-sm text-slate-300">{parte.objetivoNarrativo}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Tópicos essenciais</h4>
                      <ul className="mt-2 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                        {parte.topicos.map((topico) => (
                          <li key={topico} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                            {topico}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Detalhes da cena / bloco</h4>
                      <p className="text-sm text-slate-300">{parte.detalhesCena}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:max-w-[27%]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
                      <h5 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Gancho narrativo</h5>
                      <p className="mt-2 text-slate-200">{parte.gancho}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
                      <h5 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Transição sugerida</h5>
                      <p className="mt-2 text-slate-200">{parte.transicao}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
                      <h5 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Sugestão visual</h5>
                      <p className="mt-2 text-slate-200">{parte.sugestaoVisual}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="grid gap-6 lg:grid-cols-[1fr,1fr,1fr]">
            {roteiro.personagens.map((personagem) => (
              <div
                key={personagem.nome}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-xl shadow-slate-950/30"
              >
                <div className="absolute inset-0 opacity-20" aria-hidden>
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#2563eb20,_transparent_55%)]" />
                </div>
                <div className="relative space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                    Personagem
                  </span>
                  <h3 className="text-lg font-semibold text-slate-100">{personagem.nome}</h3>
                  <p className="text-sm text-accent">{personagem.papelNarrativo}</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Traços chave</h4>
                    <ul className="space-y-1">
                      {personagem.tracosChave.map((trait) => (
                        <li key={trait} className="rounded border border-slate-800 bg-slate-900/70 px-3 py-2">
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Arco dramático</h4>
                    <p>{personagem.arco}</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Referências visuais</h4>
                    <p>{personagem.referenciasVisuais}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <footer className="rounded-3xl border border-dashed border-primary/40 bg-primary/10 p-6 text-sm text-primary">
            <h3 className="text-base font-semibold text-primary-foreground/80">Próximos passos criativos</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-primary-foreground/80">
              <li>Grave ou escreva cada parte com foco nas intenções narrativas apresentadas.</li>
              <li>Use os detalhes dos personagens para gerar imagens consistentes em ferramentas de IA generativa.</li>
              <li>{chamadaParaAcao}</li>
            </ul>
          </footer>
        </section>
      ) : null}
    </main>
  );
}
