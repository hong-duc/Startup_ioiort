import { Injectable } from '@angular/core';
import {Contact} from '../models/contact';
import {Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable()
export class DepartmentService{
    constructor(private _http:Http)
    {}
    CheckLogin(username:string,password:string):Observable<Contact>
    {
        console.log(username,password);
        return this._http.post('/Contact/Login',{username,password})
        .map((response:Response)=>console.log(response))
        .do(data=>console.log(data))
        .catch(this.HandeError);
    }
    private HandeError(error:Response){
            console.warn(error);
            return Observable.throw(error.json().error||"server error");
    }
}