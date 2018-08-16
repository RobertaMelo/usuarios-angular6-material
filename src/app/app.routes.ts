import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },

    { path: '', component: TemplateComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'usuario', component: UsuarioComponent}
        ]
    },

    { path: '**', redirectTo: '' }
];