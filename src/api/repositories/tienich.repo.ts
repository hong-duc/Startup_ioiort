import { RepoBase } from './repositories.base';
import { TienIch } from '../models/tienich.model'
import { Pool, QueryResult } from 'pg';
import path = require('path');
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
export class TienIchRepo extends RepoBase {
    public GetListTienIch(): Promise<TienIch[]> {
        let queryText = 'select * from public."ioh_TienIch"';
        console.log(queryText);
        let pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then((result) => {
            let tienIchs: TienIch[] = result.rows.map(tam => {
                let tienIch = new TienIch();
                tienIch.TienIchID = tam.TienIchID;
                tienIch.KyHieu = tam.KyHieu;
                tienIch.TenGoi = tam.TenGoi;
                tienIch.BieuTuong = tam.BieuTuong;
                return tienIch;
            })
            return tienIchs;
        }).catch(err => {return err});
    }
}