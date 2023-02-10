import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/Components/login/login.component';
import { NotfoundComponent } from 'src/Components/notfound/notfound.component';
import { ProfileComponent } from 'src/Components/profile/profile.component';
import { RegisterComponent } from 'src/Components/register/register.component';
import { AuthGuard } from 'src/Gaurds/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'register',component:RegisterComponent,title:'Registeration'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent,title:'Profile'},
  {path:'**',component:NotfoundComponent,title:'Page Not Found'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
