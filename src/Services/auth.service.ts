import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BaseUrl='https://sticky-note-fe.vercel.app/';

  userData=new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken'))
    {
     this.saveUserData();
    }
   }
 
  saveUserData()
  {
    let encodeToken=localStorage.getItem('userToken');
    let decodeToken:any=jwtDecode(JSON.stringify(encodeToken));
    this.userData.next(decodeToken);
    
  }
  signUp(formData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}signup`,formData);
  }
  
  signIn(formData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}signin`,formData);
  }
  logOut()
  {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}


