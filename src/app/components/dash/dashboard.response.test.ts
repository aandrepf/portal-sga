import { IDashboardResponse, IDashboard } from '../../models/dashboard.model';
import { ENNivelUnidades } from '../../models/enum';

export default class DashboardResponseTest {

    private _nomeUnidade: any = [];
    private _nomeEmissor: string[];
    private _tme: any = [];
    private _qca: any = [];
    private _paa: any = [];
    private _sts: any = [];
    private _qce: any = [];
    private _qtma: any = [];
    private _qsc: any = [];
    private _totalCritico: any = [];
    private _totalAlerta: any = [];
    private _totalNormal: any = [];
    private _totalOffLine: any = [];
    private _codigoUnidadePai: any = [];
    private _codigoUnidade: any = [];
    private _nivelUnidade: any = [];
    private _uf: any = [];

    constructor() {}

    getResponseTest(nivelUnidade: ENNivelUnidades): IDashboardResponse {


        if (nivelUnidade === ENNivelUnidades.Rede) {

            this._nomeUnidade = ['CENTRO NORTE', 'LESTE', 'NORDESTE', 'SAO PAULO CAPITAL', 'SAO PAULO INTERIOR', 'SUL'];
            this._nomeEmissor = ['', '', '', '', '', ''];
            this._tme = [1800, 120, 1200, 2800, 60, 120];
            this._qca = [5320, 8491, 4853, 6964, 4740, 11040];
            this._paa = [50, 90, 10, 30, 67, 5];
            this._sts = [0, 0, 0, 0, 0, 0];
            this._qce = [1000, 2000, 3000, 4000, 5000, 6000];
            this._qtma = [0, 0, 0, 0, 0, 0];
            this._qsc = [100, 200, 300, 400, 500, 600];
            this._totalCritico = [15, 16, 12, 10, 3, 10];
            this._totalAlerta = [7, 8, 2, 3, 1, 2];
            this._totalNormal = [101, 131, 59, 143, 114, 211];
            this._totalOffLine = [20, 18, 8, 24, 8, 20];
            this._codigoUnidadePai = [0, 0, 0, 0, 0, 0];
            this._codigoUnidade = [1000, 2000, 3000, 4000, 5000, 6000];
            this._nivelUnidade = [2, 2, 2, 2, 2, 2];
            this._uf = ['DF', 'RR', 'AL', 'SP', 'SP', 'RS'];

        } else if (nivelUnidade === ENNivelUnidades.Regional) {

            this._nomeUnidade = ['BRASILIA', 'CAMPO GRANDE', 'CUIABÁ', 'GOIANIA', 'MANAUS', 'RONDONÓPOLIS'];
            this._nomeEmissor = ['', '', '', '', '', ''];
            this._tme = [120, 120, 120, 120, 120, 120];
            this._qca = [871, 617, 813, 1427, 938, 1011];
            this._paa = [100, 50, 76, 30, 66, 20];
            this._sts = [0, 0, 0, 0, 0, 0];
            this._qce = [0, 1, 1, 1, 0, 0];
            this._qtma = [0, 0, 0, 0, 0, 0];
            this._qsc = [0, 2, 2, 2, 0, 0];
            this._totalCritico = [2, 2, 3, 1, 6, 6];
            this._totalAlerta = [0, 0, 1, 0, 1, 3];
            this._totalNormal = [101, 131, 59, 143, 114, 211];
            this._totalOffLine = [21, 20, 17, 21, 8, 11];
            this._codigoUnidadePai = [1000, 2000, 3000, 4000, 5000, 6000];
            this._codigoUnidade = [10, 20, 30, 40, 50, 60];
            this._nivelUnidade = [1, 1, 1, 1, 1, 1];
            this._uf = ['DF', 'RR', 'AL', 'SP', 'SP', 'RS'];

        } else if (nivelUnidade === ENNivelUnidades.Agencia) {

            // tslint:disable-next-line:max-line-length
            this._nomeUnidade = ['ARAGUAINA', 'REDENCAO', 'CENTRO BRASILIA', 'CENTRO BRASILIA', 'FORMOSA', 'GAMA', 'GUARAI', 'GURUPI', 'LUZIANIA', 'NUCLEO BANDEIRANTE', 'PALMAS - TO', 'PARAISO DO TOCANTINS', 'SOBRADINHO', 'URB 504 NORTE', 'URB ASA NORTE', 'URB AV COMERCIAL SUL', 'URB AV COMERCIAL SUL', 'URB LAGO SUL', 'URB LAGO SUL', 'URB SETOR DE INDUSTRIAS', 'URB SUDOESTE', 'URB SUDOESTE', 'URB W3 SUL', 'CENTRO TAGUATINGA', 'PALMAS - TO'];
            // tslint:disable-next-line:max-line-length
            this._nomeEmissor = ['L076LXDZX8TPDMW', 'L076NXDZX8TPCZ9', 'L0768XDZX8SLGMV (G)', 'L076SXDZX8SLFQ4', 'L0762XDZX8SLFJ7', 'L076WXDZX8SLFKC (G)', 'L076MXDZX8SLFVN', 'L076UXDZX8SK626', 'L0761XDZX8TP35V', 'L0762XDZX8SLFK6 (G)', 'L076HXDZX8TL778', 'L0761XDZX8TPD4E', 'L0764XDZX8SLG47 (G)', 'L076NXDZX8SLFEW', 'L076SXDZX8SJGWY', 'L0763XDZX8SLH5U', 'L076DXDZX8SJGZF (G)', 'L0763XDZX8SLFSM', 'L076TXDZX8SLGJZ', 'L076YXDZX8SLFJL (G)', 'L0766XDZX8SLFY8 (G)', 'L076NXDZX8SLFTM', 'L076BXDZX8SLFLJ', 'L076BXDZX8SLFLJ-FUS', 'L076HXDZX8TL778'];
            this._tme = [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120];
            this._qca = [0, 40, 14, 61, 45, 41, 49, 36, 37, 60, 64, 43, 47, 10, 18, 106, 14, 24, 28, 67, 6, 22, 35, 0, 0];
            // tslint:disable-next-line:max-line-length
            this._paa = [0, 7.50, 92.86, 93.44, 60, 100, 100, 100, 97.30, 100, 84.38, 69.77, 55.32, 100, 100, 99.09, 57.14, 83.33, 92.86, 98.51, 83.33, 100, 85.71, 0, 0];
            this._sts = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._qce = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._qtma = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._qsc = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._totalCritico = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._totalAlerta = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._totalNormal = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._totalOffLine = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3];
            this._codigoUnidadePai = [10, 10, 10, 10, 20, 20, 20, 20, 30, 30, 30, 30, 40, 40, 40, 50, 50, 50, 50, 60, 60, 60, 60, 60, 10];
            this._codigoUnidade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
            this._nivelUnidade = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

        }

        const jsonArr = [];

        for (let count = 0; count < this._nomeUnidade.length; count++) {

            jsonArr.push({
                NomeUnidade: this._nomeUnidade[count],
                NomeEmissor: this._nomeEmissor[count],
                TME: this._tme[count],
                QCA: this._qca[count],
                PAA: this._paa[count],
                Status: this._sts[count],
                QCE: this._qce[count],
                QTMA: this._qtma[count],
                QSC: this._qsc[count],
                TotalCritico: this._totalCritico[count],
                TotalAlerta: this._totalAlerta[count],
                TotalNormal: this._totalNormal[count],
                TotalOffLine: this._totalOffLine[count],
                CodigoUnidadePai: this._codigoUnidadePai[count],
                CodigoUnidade: this._codigoUnidade[count],
                NivelUnidade: this._nivelUnidade[count],
                UF: this._uf[count]
            });

        }

        let dashboard: IDashboard[] = [];

        dashboard = jsonArr;

        const dashbordResponse: IDashboardResponse = {
            Dashboard: dashboard,
            error: ''
        };

        return dashbordResponse;


    }

}
