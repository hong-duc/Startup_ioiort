import { RepoBase } from './repositories.base';
import {DonViGia} from '../models/donvigia.model'
import { Pool, QueryResult } from 'pg';
export class DonViGiaRepo extends RepoBase {
    public GetAll():Promise<DonViGia[]>{
        let queryText ='select * from public."ioh_DonViGia"';
        let ReqResult=this._pgPool.query(queryText);
        return ReqResult
        .then((result)=>{return <DonViGia[]>result.rows})
        .catch(err=>{return err});
    }
}