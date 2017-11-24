import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsModule } from './contacts/contacts.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material.module';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { AuthLoginService } from './shared/auth.service';
import { LoginService } from './login/shared/login.service';
import { LayoutComponent } from './layout/layout.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ContactsModule,
    FlexLayoutModule,
    AsyncLocalStorageModule,
    AppRouting
  ],
  providers: [
    AuthLoginService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
