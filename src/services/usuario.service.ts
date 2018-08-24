import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario.dto';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioLogado: UsuarioDTO;  

  constructor(
    private http: HttpClient,
    ) { 
    
  }

  salva(usuario: UsuarioDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/users`, 
        usuario,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
  }

  altera(usuario: UsuarioDTO) {
    return this.http.put(
        `${API_CONFIG.baseUrl}/users/${usuario.id}`,
        usuario,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
  }

  exclui(id: number) {
    return this.http.delete(
        `${API_CONFIG.baseUrl}/users/${id}`, 
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
    
}

  buscaTodos(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/users`);
  }

  buscaUsuarioLogin(email: string, senha: string) {
    return new Promise((resolve, error) => {
        this.buscaTodos().subscribe(response => {
            let usuariosFilter: UsuarioDTO[] = response.filter((usuario: UsuarioDTO) => usuario.email == email && usuario.senha == senha);
            if (usuariosFilter.length <= 0) {
                error('Usuário ou senha inválidos');
            }
            let usuarioEncontrado = usuariosFilter[0];
            if (usuarioEncontrado && !usuarioEncontrado.ativo) {
                error('Usuário inativo');
            }
            resolve(usuarioEncontrado);
        })
    });
  }

}

