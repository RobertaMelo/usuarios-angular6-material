import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { TableUsuariosComponent } from './home/table-usuarios/table-usuarios.component';
import { UsuarioService } from '../services/usuario.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    UsuarioComponent,
    HomeComponent,
    LoginComponent,
    TableUsuariosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    UsuarioService,
    StorageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
