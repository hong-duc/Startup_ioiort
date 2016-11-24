import {Router,Response,Request} from 'express';
import path = require('path');
import {YeuCauBan} from '../models/yeucauban.model'
import { YeuCauBanRepo } from '../repositories/yeucauban.repo';
export class YeuCauBanRouter
{
    private _router: Router;
    private _yeucaubanReport:YeuCauBanRepo;
    constructor(){
        this._router=Router();
        this._yeucaubanReport=new YeuCauBanRepo();
    }
    GetRouteYeuCauBan():Router{
        this._router.route('/YeuCauBan/GetOne/:id').get(this.GetOne);
        return this._router;
    }
    GetOne=(req:Request,res:Response)=>{
        let id=req.params.id;
        return this._yeucaubanReport.GetOne(id).then((response)=>{res.status(200).json(<YeuCauBan>response)},(err=>{res.status(500).send(err)}));
    } 
} 