import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuarioLogado: UsuarioDTO;
  sub: any;
  form : FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private storageService: StorageService
  ) {
    
  }

  ngOnInit() {
    this.usuarioLogado = this.storageService.getLocalUser();
    if (this.usuarioLogado.tipo == 'U') {
      this.router.navigate(['home']);
    }
    this.iniciaForm();
    this.iniciaNovoUsuario();
    this.sub = this.route.params.subscribe((usuario: UsuarioDTO) => {
      this.selecionaUsuario(usuario);
    });
  }

  iniciaForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
      senha: ['', Validators.required],
      tipo: ['U', Validators.required],
      ativo: [true, Validators.required]
    });
  }

  iniciaNovoUsuario() {
    this.resetForm();
    this.form.controls.ativo.setValue(true);
    this.form.controls.tipo.setValue('U');
  }

  selecionaUsuario(usuario : UsuarioDTO) {
    if (usuario.id == undefined) {
      return;
    }

    this.form.controls.id.setValue(usuario.id);
    this.form.controls.name.setValue(usuario.name);
    this.form.controls.email.setValue(usuario.email);
    this.form.controls.senha.setValue(usuario.senha);
    this.form.controls.tipo.setValue(usuario.tipo == 'U' ? false : true);
    this.form.controls.ativo.setValue(usuario.ativo.toString() == 'false' ? false : true);
  }

  salvaUsuario() {
    /*if (!this.form.valid) {
      return; - verificar dados vazios
    } */

    this.form.controls.tipo.setValue(this.form.controls.tipo.value ? 'A' : 'U');
    if (this.form.controls.id.value == null) {
      this.usuarioService.salva(this.form.value)
      .subscribe(() => {
       console.log('Salvo com sucesso!');
        this.iniciaNovoUsuario();
      }, error => {
        console.log(error);
      });
      return;
    } 
    
    this.usuarioService.altera(this.form.value)
    .subscribe(() => {
      console.log('Alterado com sucesso!');
      this.iniciaNovoUsuario();
    }, error => {
      console.log(error);
    });
  }

  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null)
    });
  }
  
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
