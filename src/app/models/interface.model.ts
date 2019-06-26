/* CLASSES USADAS PARA GERAR O PREWVIEW */
export class GetPreview {
  retCode: number;
  retMsg: string;
  interfaceEmissorPagina: Paginas;
}

/* CLASSES USADAS PARA GERAR A TABELA DAS PÁGINAS CADASTRADAS */
export class GetPaginasEmissor {
  paginasEmissor: Paginas[];
  retCode: number;
  rerMsg: string;
}
export class Paginas {
  btnVoltar: boolean;
  descr: string;
  iconePrioritario: boolean;
  id: number;
  msgExtra: string;
  interfaceEmissorTituloPagina: Titulo[];
  interfaceEmissorLink: Link[];
  interfaceEmissorBotao: Botoes[];
}
export class MantemPagina {
  action: number;
  idEmissorPagina: number;
  descr: string;
  iconePrioritario: boolean;
  btnVoltar: boolean;
  msgExtra: string;
}

/* CLASSES USADAS PARA GERAR A TABELA DOS TITULOS DAS PAGINAS CADASTRADAS */
export class GetTituloPagina {
  titulosPaginaEmissor: Titulo[];
  retCode: number;
  retMsg: string;
}
export class Titulo {
  id: number;
  idEmissorPagina: number;
  negrito: boolean;
  posicaoTexto: number;
  tamanhoFonte: number;
  textoPagina: string;
}
export class MantemTituloPagina {
  action: number;
  id: number;
  idTituloPagina: number;
  idEmissorPagina: number;
  negrito: boolean;
  posicaoTexto: number;
  tamanhoFonte: number;
  textoPagina: string;
}

/* CLASSES USADAS PARA GERAR A TABELA DOS LINKS CADASTRADOS */
export class GetLink {
  retCode: number;
  retMsg: string;
  linksPaginaEmissor: Link[];
}
export class Link {
  descr: string;
  iconePrioritario: boolean;
  id: number;
  idEmissorPagina: number;
  idEmissorPaginasDestino: number;
  interfaceEmissorTituloLink: TituloLink[];
  tamanhoBotaolink: number;
  tipoBotao: number;
}
export class MantemLink {
  action: number;
  descr: string;
  iconePrioritario: boolean;
  idEmissorPagina: number;
  idEmissorPaginasDestino: number;
  idLink: number;
  tamanhoBotaolink: number;
  tipoBotao: number;
}

/* CLASSES USADAS PARA GERAR A TABELA DOS CONTEUDOS DO LINKS CADASTRADOS */
export class GetTituloLink {
  retCode: number;
  retMsg: string;
  titulosLinkPaginaEmissor: TituloLink[];
}
export class TituloLink {
  id: number;
  idEmissorPagina: number;
  idLink: number;
  negrito: boolean;
  posicaoTexto: boolean;
  tamanhoFonte: boolean;
  textoLink: string;
}
export class MantemTituloLink {
  action: number;
  idEmissorPagina: number;
  idLink: number;
  idTituloLink: number;
  negrito: boolean;
  posicaoTexto: number;
  tamanhoFonte: number;
  textoLink: string;
}

/* CLASSES USADAS PARA GERAR A DOS BOTÕES CADASTRADOS */
export class GetBotao {
  retCode: number;
  retMsg: string;
  botoesPaginaEmissor: Botoes[];
}
export class ListBotao {
  retCode: number;
  retMsg: string;
  tbBotoes: Botoes[];
}
export class Botoes {
  descLocalAtendimento: string;
  hasImage: boolean;
  iconePrioritario: boolean;
  id: number;
  idBotao: number;
  idEmissorPagina: number;
  idLocalAtendimento: number;
  nomeImage: string;
  tamanhoBotao: number;
  textoBotao: string;
  tipoBotao: number;
}
export class MantemBotoes {
  action: number;
  descLocalAtendimento: string;
  hasImage: boolean;
  iconePrioritario: boolean;
  idBotao: number;
  idEmissorBotao: number;
  idEmissorPagina: number;
  idLocalAtendimento: number;
  nomeImage: string;
  tamanhoBotao: number;
  textoBotao: string;
  tipoBotao: number;
}
export class InterfaceGrabBotoes {
  DescLocalAtendimento: string;
  HasImage: boolean;
  IconePrioritario: boolean;
  IdBotao: number;
  IdLocalAtendimento: number;
  NomeImage: string;
  TamanhoBotao: number;
  TextoBotao: string;
}
