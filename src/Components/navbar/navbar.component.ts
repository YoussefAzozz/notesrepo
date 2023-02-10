import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }

  isLogIn:boolean=false;

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{
        if(this._AuthService.userData.getValue() != null)
        {
          this.isLogIn=true;
        }
        else
        {
          this.isLogIn=false;
        }
      }
    })
  }
  singOut()
  {
    this._AuthService.logOut();
  }

}
