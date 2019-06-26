import { ENNivelUnidades } from './../models/enum';

export class IDashboard {

    codigoUnidade: number;
    codigoUnidadePai: number;
    emissorID: number;
    endereco: string;
    latitude: string;
    longitude: string;
    municipio: string;
    nivelUnidade: number;
    nomeEmissor: string;
    nomeUnidade: string;
    paa: number;
    qca: number;
    qce: number;
    qsc: number;
    qtma: number;
    status: number;
    tme: number;
    totalAlerta: number;
    totalChamadas: number;
    totalCritico: number;
    totalNormal: number;
    totalOffLine: number;
    uf: string;

}

export interface IDashboardResponse {
    Dashboard: IDashboard[];
    error: string;
}

export interface IDashboardRequest {
    CodigoUnidadePai: number;
    FiltroCor: number;
    NivelUnidade: number;
}

export class DashboardCalcs {
    TotalChamadas: number;
    QCA: number;
    MediaPrazo: number;
    PorcPrazo: number;
    Unidades: number;
    MaiorTE: number;

    constructor() {
        this.TotalChamadas = 0;
        this.QCA = 0;
        this.MediaPrazo = 0;
        this.PorcPrazo = 0;
        this.Unidades = 0;
        this.MaiorTE = 0;
    }

}

export class DashboardNavNU {
    Titulo: string;
    NivelUnidade: number;
    NivelUnidadePai: number;
    Nome: string;
}

export class NivelUnidadePai {
    codigoUnidadePai: number;
    nivelunidade: number;
    nome: string;
}

export interface IDashboardBrazilStatesDataVectorMap {
    uf: string;
    tme: number;
    id: number;
    qca: number;
}

export class DashboardRegionsVectorMap {
    data: IDashboardRegionsVectorMap[];
    constructor() {
        this.data = [
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'ac' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'am' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'ap' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'pa' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'ro' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'rr' },
            { regionDesc: 'Região Norte', regionId: 1, regionUf: 'to' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'al' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'ba' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'ce' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'ma' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'pb' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'pe' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'pi' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'rn' },
            { regionDesc: 'Região Nordeste', regionId: 2, regionUf: 'se' },
            { regionDesc: 'Região Centro-Oeste', regionId: 3, regionUf: 'df' },
            { regionDesc: 'Região Centro-Oeste', regionId: 3, regionUf: 'go' },
            { regionDesc: 'Região Centro-Oeste', regionId: 3, regionUf: 'ms' },
            { regionDesc: 'Região Centro-Oeste', regionId: 3, regionUf: 'mt' },
            { regionDesc: 'Região Sudeste', regionId: 4, regionUf: 'es' },
            { regionDesc: 'Região Sudeste', regionId: 4, regionUf: 'mg' },
            { regionDesc: 'Região Sudeste', regionId: 4, regionUf: 'rj' },
            { regionDesc: 'Região Sudeste', regionId: 4, regionUf: 'sp' },
            { regionDesc: 'Região Sul', regionId: 5, regionUf: 'pr' },
            { regionDesc: 'Região Sul', regionId: 5, regionUf: 'rs' },
            { regionDesc: 'Região Sul', regionId: 5, regionUf: 'sc' }
        ];
    }
}

export interface IDashboardRegionsVectorMap {
    regionId: number;
    regionDesc: string;
    regionUf: string;
}
