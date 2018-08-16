import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {

  title = '';
  icon = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/usuario') {
          this.title = 'Cadastro de Usuários'; 
          this.icon = 'perm_identity';
          return;
        }
        
        this.title = 'Home';
        this.icon = 'home';
      }
    });
  }
  
}
