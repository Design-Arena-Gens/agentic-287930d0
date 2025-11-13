export type NarrativeFormat = "historia" | "video" | "apresentacao" | "aula";

export interface ScriptPart {
  id: number;
  fase: "Introdução" | "Desenvolvimento" | "Encerramento";
  titulo: string;
  objetivoNarrativo: string;
  topicos: string[];
  detalhesCena: string;
  gancho: string;
  transicao: string;
  sugestaoVisual: string;
}

export interface CharacterProfile {
  nome: string;
  papelNarrativo: string;
  tracosChave: string[];
  arco: string;
  referenciasVisuais: string;
}

export interface GeneratedScript {
  tema: string;
  formato: NarrativeFormat;
  promessaCentral: string;
  mensagemPrincipal: string;
  partes: ScriptPart[];
  personagens: CharacterProfile[];
}
