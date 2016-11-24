import { RepoBase } from './repositories.base';
import {Contact} from '../models/contact.model'
import { Pool, QueryResult } from 'pg';

export class ContactRepo extends RepoBase {
    public CheckLogin(username,password): Promise<Contact> {
        let queryText ='select * from public."Contacts" where "TaiKhoan"like $1 and "Password" like $2';
        console.info('Excute: ' + queryText);
        let pResult;
         pResult = this._pgPool.query(queryText,[username,password]);
         return pResult.then((result)=>{
             if(result.rows.length>0)
             {
             let contacts=new Contact();
             contacts.TaiKhoan=result.rows[0].TaiKhoan;
             contacts.Password=result.rows[0].Password;
             contacts.HoTen=result.rows[0].HoTen;
             contacts.Email=result.rows[0].Email;
             contacts.Device=result.rows[0].Device;
             contacts.Token=result.rows[0].Token;
             contacts.PhoneNumber=result.rows[0].PhoneNumber;
             contacts.NgayTao=result.rows[0].NgayTao;
             contacts.Facebook=result.rows[0].Facebook;
             contacts.Contact_Tag=result.rows[0].Contact_Tag;
             return contacts;
             }
             return null;
         })
         .catch(err=>{return err});
    }
    public CheckMail(mail:string):Promise<boolean>{
        let queryText ='select count(*) as count from public."Contacts" where "Email" like $1';
        console.info('Excute: ' + queryText);   
        let pResult;
        pResult = this._pgPool.query(queryText,[mail]);
        return pResult.then((result)=>{
            if(result.rows[0].count>0)
            {
                return true
            }
            else{
                return false;
            }
        }).catch(err=>{return err});
    }
}
