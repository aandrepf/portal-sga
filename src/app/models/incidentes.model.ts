export class IncidenteStatus {
  id: number;
  descricao: string;
}
export class Incidentes {
  id: number;
  codUnidade: number;
  idUsuario: string;
  status: string;
  tipoEquipamento: string;
  itemEquipamento: string;
  dataAbertura: string;
  dataFechamento: string;
  descricao: string;
}
export class TipoEquipamento {
  id: number;
  tipoEquipamento: number;
  descricao: string;
}
export class ItemEquipamento {
  id: number;
  tipoEquipamento: number;
  descricao: string;
}
export class Unidades {
  id: number;
  codUnidade: number;
  nome: string;
}
