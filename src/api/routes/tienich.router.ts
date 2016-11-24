import { Router, Response, Request } from 'express';
import {TienIch} from '../models/tienich.model'
import path = require('path');
import { TienIchRepo } from '../repositories/tienich.repo';
export class TienIchRouter {
    private _router: Router;
    private _tienichReport:TienIchRepo;
    constructor(){
        this._router=Router();
        this._tienichReport=new TienIchRepo();
    }
    GetRouteTienIch():Router{
        this._router.route('/TienIch/GetAll').get(this.GetListTienIch);
        return this._router;
    }
    GetListTienIch=(req:Request,res:Response)=>{
        this._tienichReport.GetListTienIch().then(result=>res.status(200).json(result),(err=>{res.status(500).send(err)}));
    }
}