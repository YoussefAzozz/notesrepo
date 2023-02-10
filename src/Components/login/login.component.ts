import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router) { }
  isLoading:boolean=false;
  errorMassage:string='';
 
  logInForm=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.pattern('^[a-z]{1,}$'),Validators.required]),
  });
  submitLogInForm(logInForm:FormGroup)
  {
    this.isLoading=true;
   if(logInForm.valid)
   {
    this._AuthService.signIn(logInForm.value).subscribe({
      next:(response)=> {
        if(response.message == 'success')
        {
          this.isLoading=false;
          this._Router.navigate(['/profile']);
          localStorage.setItem('userToken',response.token);
          this._AuthService.saveUserData();
        }
        else
        {
          console.log(response);
          this.errorMassage=response.message;
          this.isLoading=false;
        }
        
      }
    });
   }
  }
  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
