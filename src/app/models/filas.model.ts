export class FilaUnica {
  idFilaUnica: number;
  nomeFila: string;
  operation: number;
  closedPage: boolean;
}
export class GrupoFilas {
  idGrupoFila: number;
  idFilaUnica: number;
  idCategoria: number;
  nomeFila: string;
}
export class Filas {
  idCategoria: number;
  nomeFila: string;
}
