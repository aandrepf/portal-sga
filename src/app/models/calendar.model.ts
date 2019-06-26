export class EnviaEventos {
  dia: string;
  evt: any[];
  classe: number;
}

export class ClasseFeriado {
  idClasseferiado: number;
  descricao: string;
}

export class TipoFeriado {
  idTipoferiado: number;
  descricao: string;
}

export class GrabFeriadoByMes {
  IdClasseFeriado: number;
  Mes: string;
}

export class GrabMunicipioByIdUF {
  idEstado: number;
}

export class Feriado {
  idFeriado: number;
  idClasseferiado: number;
  idTipoferiado: number;
  idEstado: number;
  idCodmunic: number;
  meta: number;
  dia: string;
  mes: string;
  descricao: string;
  dataFeriado: string;
}

export class UnidadeFederacao {
  idEstado: number;
  uf: string;
  nome: string;
}

export class MunicipioByEstado {
  idCodmunic: number;
  municipio: string;
  idEstado: number;
}

export class VerifyFeriado {
  idTipoFeriado: number;
  idClasseFeriado: number;
  dia: string;
  mes: string;
  meta: number;
  descricao: string;
  idEstado: number;
  nomeEstado: string;
  idCodMunic: number;
  nomeMunic: string;
}

export class EnviaExportFeriado {
  idClasseFeriado: number;
  idTipoFeriado: number;
  idEstado: number;
  idCodMunic: number;
}
