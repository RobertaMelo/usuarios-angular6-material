import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { TableUsuariosDataSource } from './table-usuarios-datasource';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioDTO } from '../../../models/usuario.dto';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-table-usuarios',
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.css']
})
export class TableUsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableUsuariosDataSource;
  usuarios: UsuarioDTO[] = [];
  filtro = '';

  usuarioLogado: UsuarioDTO;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'ativo', 'tipo'];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private storageService: StorageService) {
      
    }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.buscaUsuarios();
    this.usuarioLogado = this.storageService.getLocalUser();
    if (this.usuarioLogado.tipo == 'A') {
      this.displayedColumns.push('altera');
      this.displayedColumns.push('exclui');
    }
  }

  buscaUsuarios() {
    this.usuarioService.buscaTodos()
    .subscribe(response => {
      this.usuarios = response;
      this.dataSource = new TableUsuariosDataSource(this.paginator, this.sort, this.usuarios);
    }, error => {
      console.log('Não foram encontrados usuarios [' + error + '].');
    });
  }

  editaUsuario(usuario: UsuarioDTO) {
    this.router.navigate(['usuario', usuario]);
  }

  excluiUsuario(usuario: UsuarioDTO) {
    this.usuarioService.exclui(usuario.id)
    .subscribe(response => {
      console.log('Excluido com sucesso!');
      this.buscaUsuarios();
    }, error => {
      console.log(error);
    });
  }

  filtraUsuarios() {
    if (this.filtro == '') {
      this.dataSource = new TableUsuariosDataSource(this.paginator, this.sort, this.usuarios);
      return;
    }
    
    let usuariosFilter = this.usuarios.filter(usuario => usuario.name.toLowerCase().includes(this.filtro.toLowerCase()));
    this.dataSource = new TableUsuariosDataSource(this.paginator, this.sort, usuariosFilter);
  }

}
