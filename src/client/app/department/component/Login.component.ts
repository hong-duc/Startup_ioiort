import {Component} from '@angular/core';
import {DepartmentService} from '../shared/department.services';
import {Contact} from '../models/contact';
@Component({
    selector:'login',
    templateUrl:'department/component/login.html',
    providers:[DepartmentService]
})
export class LoginComponent{
    public show:boolean=false;
    public _contact:Contact=new Contact;
    public _departmentSer:DepartmentService;
    CheckLogin(username:string,password:string):void
    {
        console.log(`truyen vao luc bam: ${username} va ${password}`);
         this._departmentSer.CheckLogin(username,password).subscribe((response)=>console.log(response),err=>console.log(err));
    }
    ShowForget()
    {
        this.show=!this.show;
    }
}