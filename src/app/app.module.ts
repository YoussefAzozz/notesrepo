import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/Components/login/login.component';
import { NavbarComponent } from 'src/Components/navbar/navbar.component';
import { NotfoundComponent } from 'src/Components/notfound/notfound.component';
import { ProfileComponent } from 'src/Components/profile/profile.component';
import { RegisterComponent } from 'src/Components/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        NavbarComponent,
        NotfoundComponent,
        ProfileComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule, ReactiveFormsModule,
        HttpClientModule, FormsModule,

    ]
})
export class AppModule { }
