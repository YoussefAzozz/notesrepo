import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router) { }
  isLoading:boolean=false;
  errorMassage:string='';
  isStyleInvalid:object={'background-color':'gray','border-color':'gray'};
  isStyleValid:object={'background-color':'#17a2b8','border-color':'#17a2b8'};
  registerForm=new FormGroup({
    first_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(8),Validators.required]),
    last_name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(8),Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    age:new FormControl(null,[Validators.min(8),Validators.max(100),Validators.required]),
    password:new FormControl(null,[Validators.pattern('^[a-z]{1,}$'),Validators.required]),
  });
  submitRegisterForm(registerForm:FormGroup)
  {
    console.log(registerForm);
    this.isLoading=true;
   if(registerForm.valid)
   {
    this._AuthService.signUp(registerForm.value).subscribe({
      next:(response)=> {
        if(response.message == 'success')
        {
          this.isLoading=false;
          this._Router.navigate(['/login']);
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
    $('#signUp').particleground();
  }

}
