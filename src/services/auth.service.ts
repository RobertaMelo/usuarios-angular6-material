import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { StorageService } from './storage.service';
import { UsuarioDTO } from '../models/usuario.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private storageService: StorageService,
        private usuarioService: UsuarioService,
        private route: Router) {
    }

    authenticate(email: string, senha: string) {
        return new Promise((resolve, reject) => {
            this.usuarioService.buscaUsuarioLogin(email, senha).then((response: UsuarioDTO) => {
                this.storageService.setLocalUser(response);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }

    logout() {
        this.storageService.setLocalUser(null);
        this.route.navigate(['login']);
    }

}

