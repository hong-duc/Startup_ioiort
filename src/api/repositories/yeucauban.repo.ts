import { RepoBase } from './repositories.base';
import {YeuCauBan} from '../models/yeucauban.model'
import { Pool, QueryResult } from 'pg';
export class YeuCauBanRepo extends RepoBase {
    public GetOne(id:number):Promise<YeuCauBan>{
        let queryText ='select * from public."ioh_YeuCauBan" where "YeuCauBanID"=$1';
        let ReqResult=this._pgPool.query(queryText,[id]);
        return ReqResult
        .then((result)=>{
            if(result.rows.length>0)
            {
                return <YeuCauBan>result.rows[0];
            }
            else{
                return null;
            }
        })
        .catch(err=>{return err});
    }
}