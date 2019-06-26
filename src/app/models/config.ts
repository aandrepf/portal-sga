export interface Config {
  urlServer: string;
  urlApplication: string;
  urlAuthentication: string;
  urlFeriado: string;
  urlHub: string;
  urlDownloadXLSX: string;
  urlAzureServer: string;
}
// controle para codigo de erro nos cadastros.
export class ResultAction {
  CodAction: number;
  CodRetorno: number;
  MsgRetorno: string;
}
export class ContentAtivo {
  id: number;
  page: number;
  content: any;
}
