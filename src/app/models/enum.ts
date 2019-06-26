export enum ENOperation {
  create = 1,
  edit = 2,
  delete = 3,
  read = 4,
  preview = 5
}
export enum ENMetaAtdtSts {
  CRITICO = 0,
  ALERTA = 1,
  NORMAL = 2
}
export enum ENDashVmapDataScaleType {
  QCA = 0,
  TME = 1
}
export enum ENNivelUnidades {
  Matriz = 0,
  Rede = 2,
  Regional = 1,
  Agencia = 9
}


"/api/Dashboard/{nivelUnidade}/{codUnidadePai}/-1";

"nivelUnidade = 1/codUnidadePai = 2";
[
  {
    "emissorID": 0,
    "nomeUnidade": "REGIONAL",
    "nivelUnidade": 1,
    "codigoUnidade": 3,
    "codigoUnidadePai": 2,
    "nomeEmissor": "EMISSOR PADRÃO",
    "tme": 10388,
    "qca": 41,
    "paa": 29.2683,
    "totalCritico": 0,
    "totalAlerta": 0,
    "totalNormal": 2,
    "totalOffLine": 0,
    "totalChamadas": 0,
    "status": 99,
    "qce": 5,
    "qtma": 4,
    "qsc": 31,
    "endereco": "CARGA INICIAL",
    "municipio": "SAO PAULO(CAPITAL)",
    "uf": "SP",
    "latitude": "",
    "longitude": ""
  }
]

"nivelUnidade = 2/codUnidadePai = 1";
[
  {
    "emissorID": 0,
    "nomeUnidade": "REDE",
    "nivelUnidade": 2,
    "codigoUnidade": 2,
    "codigoUnidadePai": 1,
    "nomeEmissor": "EMISSOR PADRÃO",
    "tme": 10388,
    "qca": 41,
    "paa": 29.2683,
    "totalCritico": 0,
    "totalAlerta": 2,
    "totalNormal": 6,
    "totalOffLine": 1,
    "totalChamadas": 0,
    "status": 100,
    "qce": 5,
    "qtma": 4,
    "qsc": 31,
    "endereco": "CARGA INICIAL",
    "municipio": "SAO PAULO(CAPITAL)",
    "uf": "SP",
    "latitude": "",
    "longitude": ""
  }
]

"nivelUnidade = 9/codUnidadePai = 0";
[
  {
    "emissorID": 5,
    "nomeUnidade": "CTO ITAU",
    "nivelUnidade": 9,
    "codigoUnidade": 6,
    "codigoUnidadePai": 3,
    "nomeEmissor": "MININT-KHPVD74",
    "tme": 2262,
    "qca": 3,
    "paa": 66.6667,
    "totalCritico": 0,
    "totalAlerta": 0,
    "totalNormal": 1,
    "totalOffLine": 0,
    "totalChamadas": 0,
    "status": 2,
    "qce": 5,
    "qtma": 3,
    "qsc": 1,
    "endereco": "RUA DONA ANA NERI 368",
    "municipio": "SAO PAULO(CAPITAL)",
    "uf": "SP",
    "latitude": "",
    "longitude": ""
  },
  {
    "emissorID": 6,
    "nomeUnidade": "DEVARIS",
    "nivelUnidade": 9,
    "codigoUnidade": 5,
    "codigoUnidadePai": 3,
    "nomeEmissor": "ARIS-PC1",
    "tme": 10388,
    "qca": 38,
    "paa": 26.3158,
    "totalCritico": 0,
    "totalAlerta": 0,
    "totalNormal": 1,
    "totalOffLine": 0,
    "totalChamadas": 0,
    "status": 2,
    "qce": 0,
    "qtma": 1,
    "qsc": 30,
    "endereco": "ARUANA 452",
    "municipio": "SANTOS",
    "uf": "SP",
    "latitude": "",
    "longitude": ""
  }
]

"nivelUnidade = 9/codUnidadePai = 1";
[]
