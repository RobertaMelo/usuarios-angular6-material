import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuarioLogado: UsuarioDTO;
  title = '';
  icon = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/usuario') {
          this.title = 'Cadastro de Usuários'; 
          this.icon = 'perm_identity';
          return;
        }
        
        this.title = 'Lista de Usuários';
        this.icon = 'home';
      }
    });
  }

  ngOnInit() {
    this.usuarioLogado = this.storageService.getLocalUser();
    if (this.usuarioLogado == null) {
      this.router.navigate(['login']);
    }

  }

  logout() {
    this.authService.logout();
  }
  
}
