import {Router,Response,Request} from 'express';
import path = require('path');
import {Contact} from '../models/contact.model'
import { ContactRepo } from '../repositories/contact.repo';
export class ContactRouter
{
    private _router: Router;
    private _contactReport:ContactRepo;
    constructor(){
        this._router=Router();
        this._contactReport=new ContactRepo();
    }
    GetRouteContact():Router{
        this._router.route('/Contact/Login').post(this.Login);
        this._router.route('/Contact/ForgetPass').post(this.CheckMail);
        return this._router;
    }
    Login=(req:Request,res:Response)=>{
        let userR=req.body.user;
        let passR=req.body.pass;
        this._contactReport.CheckLogin(userR,passR).then(response=>res.status(200).json(response)).catch(err=>res.status(500).send(err));
    }
    CheckMail=(req:Request,res:Response)=>{
        let mail=req.body.email;
        this._contactReport.CheckMail(mail).then((response)=>{res.status(200).send(response)}).catch(err=>res.status(500).send(err));
    }
}