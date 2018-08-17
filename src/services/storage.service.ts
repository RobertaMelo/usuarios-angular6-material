import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    localUserKey = 'localUserCD';

    getLocalUser() : UsuarioDTO {
        let localUser = localStorage.getItem(this.localUserKey);
        if (localUser == null) {
            return null;
        }
        return JSON.parse(localUser);
    }

    setLocalUser(localUser : UsuarioDTO) {
        if (localUser == null) {
            localStorage.removeItem(this.localUserKey);
            return;
        }
        localStorage.setItem(this.localUserKey, JSON.stringify(localUser));
    }

}