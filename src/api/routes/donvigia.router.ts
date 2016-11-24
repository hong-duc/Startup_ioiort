import {Router,Response,Request} from 'express';
import path = require('path');
import {DonViGia} from '../models/donvigia.model'
import { DonViGiaRepo } from '../repositories/donvigia.repo';
export class DonViGiaRouter
{
    private _router: Router;
    private _donvigiaReport:DonViGiaRepo;
    constructor(){
        this._router=Router();
        this._donvigiaReport=new DonViGiaRepo();
    }
    GetRouteDonViGia():Router{
        this._router.route('/DonViGia/GetAll').get(this.GetAll);
        return this._router;
    }
    GetAll=(req:Request,res:Response)=>{
        return this._donvigiaReport.GetAll().then((response)=>{res.status(200).json(<DonViGia[]>response)},(err=>{res.status(500).send(err)}));
    }
}