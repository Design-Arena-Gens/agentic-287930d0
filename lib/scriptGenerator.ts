import { CharacterProfile, GeneratedScript, NarrativeFormat, ScriptPart } from "./types";

const formatLabels: Record<NarrativeFormat, { titulo: string; audiencia: string; linguagem: string; chamada: string }> = {
  historia: {
    titulo: "Narrativa Literária",
    audiencia: "leitor",
    linguagem: "descritiva e envolvente",
    chamada: "Convide o leitor a seguir para o próximo capítulo com uma pergunta intrigante ou uma revelação súbita."
  },
  video: {
    titulo: "Roteiro para Vídeo",
    audiencia: "espectador",
    linguagem: "dinâmica e visual",
    chamada: "Finalize cada parte com um plano de corte que estimule a curiosidade para a cena seguinte."
  },
  apresentacao: {
    titulo: "Apresentação Estruturada",
    audiencia: "plateia",
    linguagem: "objetiva e inspiradora",
    chamada: "Feche cada bloco com uma promessa do valor que virá a seguir."
  },
  aula: {
    titulo: "Plano de Aula Imersivo",
    audiencia: "estudante",
    linguagem: "didática e aplicada",
    chamada: "Amarre cada segmento com uma questão provocativa ou estudo de caso."
  }
};

const partBlueprints: Array<{
  fase: ScriptPart["fase"];
  tituloModelo: string;
  objetivoBase: string;
  foco: string;
  hookModelo: string;
  transicaoModelo: string;
  visualModelo: string;
}> = [
  {
    fase: "Introdução",
    tituloModelo: "Abertura magnética",
    objetivoBase: "Situar rapidamente o público e expor a promessa central",
    foco: "contextualização inicial",
    hookModelo: "Provoque com uma pergunta que conecte o tema {tema} a uma necessidade imediata do {audiencia}.",
    transicaoModelo: "Mostre que a resposta estará na próxima parte com uma frase como: 'Para entender como isso afeta você, acompanhe o próximo passo.'",
    visualModelo: "Cenas amplas ou slides com poucos elementos que destaquem a frase-chave da promessa."
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Panorama do problema",
    objetivoBase: "Evidenciar o conflito ou desafio central",
    foco: "dor ou desequilíbrio",
    hookModelo: "Destaque uma estatística ou relato curto que reforce a relevância do tema {tema}.",
    transicaoModelo: "Conclua apontando que existe uma virada possível que será apresentada na sequência.",
    visualModelo: "Detalhes que expressem tensão: closes dramáticos, gráficos de queda ou perguntas em destaque."
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Origem e causas",
    objetivoBase: "Explicar a raiz do problema com clareza",
    foco: "origens do conflito",
    hookModelo: "Conecte o histórico de {tema} com um ponto de virada que chamou a atenção do {audiencia}.",
    transicaoModelo: "Avance sinalizando que a solução começa a se desenhar nos próximos blocos.",
    visualModelo: "Linha do tempo, mapa mental ou flashback rápido para situar o público." 
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Introdução do protagonista/solução",
    objetivoBase: "Apresentar quem ou o que conduz a transformação",
    foco: "propostas e agentes",
    hookModelo: "Conte um mini caso onde o protagonista encara uma barreira e reage.",
    transicaoModelo: "Convide o público a conhecer o plano de ação completo.",
    visualModelo: "Planos médios mostrando expressões, slides com frameworks ou roadmaps."
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Plano de ação em etapas",
    objetivoBase: "Detalhar a jornada de transformação passo a passo",
    foco: "metodologia",
    hookModelo: "Use uma metáfora que ilustre a progressão do plano.",
    transicaoModelo: "Feche com uma prévia dos resultados esperados ao executar cada etapa.",
    visualModelo: "Infográficos horizontais, storyboards ou quadros numerados." 
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Conflito elevado",
    objetivoBase: "Apresentar obstáculos críticos que testam o plano",
    foco: "tensão dramática",
    hookModelo: "Mostre o risco de não agir, com uma consequência palpável.",
    transicaoModelo: "Prepare o terreno para a virada, avisando que um recurso inesperado surge a seguir.",
    visualModelo: "Contraste de luzes, gráficos comparativos ou cena de dilema emocional." 
  },
  {
    fase: "Desenvolvimento",
    tituloModelo: "Virada decisiva",
    objetivoBase: "Mostrar a superação do conflito e consolidar aprendizagens",
    foco: "clímax",
    hookModelo: "Apresente o momento em que tudo poderia dar errado, mas algo muda a favor.",
    transicaoModelo: "Encerre destacando que as consequências positivas serão aprofundadas nos próximos blocos.",
    visualModelo: "Cortes rápidos com celebração contida, gráficos ascendentes ou tela dividida antes/depois." 
  },
  {
    fase: "Encerramento",
    tituloModelo: "Resultados concretos",
    objetivoBase: "Evidenciar ganhos e impactos tangíveis",
    foco: "prova social",
    hookModelo: "Traga depoimentos ou métricas que consolidem a vitória da narrativa.",
    transicaoModelo: "Introduza o caminho para o público replicar ou adaptar o resultado.",
    visualModelo: "Comparativos visuais, depoimentos em on-screen ou telas com indicadores." 
  },
  {
    fase: "Encerramento",
    tituloModelo: "Chamado à ação transformador",
    objetivoBase: "Convocar o público para uma atitude concreta",
    foco: "CTA inspirador",
    hookModelo: "Pergunte diretamente: 'O que você fará a partir de agora com {tema}?'",
    transicaoModelo: "Projete a visão de futuro que aguarda quem aceitar o convite.",
    visualModelo: "Close no apresentador, callout destacado ou cena aspiracional." 
  },
  {
    fase: "Encerramento",
    tituloModelo: "Epílogo memorável",
    objetivoBase: "Deixar eco emocional e síntese final",
    foco: "legado e reflexão",
    hookModelo: "Utilize uma frase de efeito curta que possa ser repetida pelo público.",
    transicaoModelo: "Indique materiais extras ou próximos passos para manter a jornada viva.",
    visualModelo: "Fade-out elegante, assinatura visual ou quote em tipografia marcante." 
  }
];

function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function craftObjective(tema: string, blueprint: (typeof partBlueprints)[number], formato: NarrativeFormat): string {
  const nuance =
    formato === "apresentacao"
      ? "Transformar dados em narrativa convincente"
      : formato === "aula"
        ? "Guiar a aprendizagem com clareza e aplicabilidade"
        : formato === "video"
          ? "Manter ritmo visual e emocional cativante"
          : "Gerar imersão literária com descrições envolventes";
  return `${blueprint.objetivoBase} ao conectar ${tema} com ${blueprint.foco}, garantindo ${nuance.toLowerCase()}.`;
}

function craftTopics(tema: string, blueprint: (typeof partBlueprints)[number]) : string[] {
  const base = [
    `Contexto específico de ${tema} focado em ${blueprint.foco}`,
    `Perguntas orientadoras que o público deve responder mentalmente`,
    `Referências culturais ou dados que reforcem a relevância`
  ];
  if (blueprint.fase === "Desenvolvimento") {
    base.push(`Como ${tema} se transforma nesta etapa da jornada`);
  }
  if (blueprint.fase === "Encerramento") {
    base.push(`Conexão com o legado final que ${tema} entrega`);
  }
  return base;
}

function injectTheme(text: string, tema: string, audiencia: string): string {
  return text.replace("{tema}", tema).replace("{audiencia}", audiencia);
}

function craftDetails(tema: string, blueprint: (typeof partBlueprints)[number], formato: NarrativeFormat): string {
  const { linguagem } = formatLabels[formato];
  return `Narrar com linguagem ${linguagem} destacando por que ${tema.toLowerCase()} é indispensável neste momento da jornada, alternando entre fatos e emoção para reforçar o ${blueprint.foco}.`;
}

function craftCharacters(tema: string, formato: NarrativeFormat): CharacterProfile[] {
  const personas = [
    {
      nome: "Lia Monteiro",
      papelNarrativo: "Mentora estratégica",
      tracosChave: ["Visão sistêmica", "Tom acolhedor", "Capacidade analítica"],
      arco: `Sai da observação para conduzir o público a dominar ${tema}.`,
      referenciasVisuais: "Roupas em tons azuis, tablet nas mãos, expressão confiante."
    },
    {
      nome: "Caio Valentim",
      papelNarrativo: "Protagonista em transformação",
      tracosChave: ["Curiosidade", "Resiliência", "Vulnerabilidade"],
      arco: `Enfrenta obstáculos pessoais até aplicar ${tema} e compartilhar conquistas tangíveis.`,
      referenciasVisuais: "Look casual moderno, notebook com adesivos criativos, olhar determinado."
    },
    {
      nome: "Dr. Sofia Ramos",
      papelNarrativo: "Especialista convidada",
      tracosChave: ["Autoridade técnica", "Didática", "Visão de futuro"],
      arco: `Valida a jornada com dados e projeta os próximos passos para expandir ${tema}.`,
      referenciasVisuais: "Blazer estruturado, hologramas ou slides futuristas ao redor."
    }
  ];

  if (formato === "apresentacao") {
    personas[0].referenciasVisuais = "Apresenta-se à frente de um telão minimalista com infográficos elegantes.";
  }

  if (formato === "video") {
    personas[1].referenciasVisuais = "Cenas em movimento com câmera na mão acompanhando seu cotidiano.";
  }

  return personas;
}

export function generateScript(temaOriginal: string, formato: NarrativeFormat): GeneratedScript {
  const tema = titleCase(temaOriginal.trim());
  const { audiencia, chamada } = formatLabels[formato];

  const promessaCentral = `Entregar uma experiência que deixa claro como ${tema.toLowerCase()} sustenta uma jornada memorável do começo ao fim.`;
  const mensagemPrincipal = `Cada parte reforça que uma boa estrutura narrativa mantém a atenção do ${audiencia} e facilita a compreensão.`;

  const partes: ScriptPart[] = partBlueprints.map((blueprint, index) => {
    const titulo = `${index + 1}. ${titleCase(blueprint.tituloModelo)} de ${tema}`;

    return {
      id: index + 1,
      fase: blueprint.fase,
      titulo,
      objetivoNarrativo: craftObjective(tema, blueprint, formato),
      topicos: craftTopics(tema, blueprint),
      detalhesCena: craftDetails(tema, blueprint, formato),
      gancho: injectTheme(blueprint.hookModelo, tema, audiencia),
      transicao: injectTheme(`${blueprint.transicaoModelo} ${chamada}`, tema, audiencia),
      sugestaoVisual: blueprint.visualModelo
    };
  });

  const personagens = craftCharacters(tema, formato);

  return {
    tema,
    formato,
    promessaCentral,
    mensagemPrincipal,
    partes,
    personagens
  };
}
