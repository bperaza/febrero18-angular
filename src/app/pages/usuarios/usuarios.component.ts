import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( 
    public usuarioServ: UsuarioService, 
    public _modalUploadServ: ModalUploadService) { }
 
  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadServ.notificacion.subscribe( resp => {
        this.cargarUsuarios();
    });
  }

  cargarUsuarios () {
    this.cargando = true;
    this.usuarioServ.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {

            this.totalRegistros = resp.totalRegistro;
            this.usuarios = resp.usuarios;
           console.log(resp);
            this.cargando = false;
        });
  }

  cambiarDesde(valor: number = 2) { 
    let desde = this.desde + valor ;

      

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario (termino: string) {
    
    if (termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    // console.log(termino);
    this.usuarioServ.buscarUsuarios(termino)
      .subscribe ( (usuariosRecibidos: Usuario[]) => {
          // console.log('User Recibidos' , usuariosRecibidos);
          this.usuarios = usuariosRecibidos;
          this.cargando = false;
          
      });
    
  }

  borrarUsuario(user: Usuario) {
    // console.log(user);
    if ( user._id === this.usuarioServ.usuario._id ) {
      // this.usuarioServ.usuario._id Es el Usuario Logeado en la APP
      swal({
        position: 'center',
        type: 'error',
        title: 'No puede borrar usuario',
        text: 'No se puede borrar a si mismo' 
      });
      return;
    }
    
    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' + user.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioServ.borrarUsuario(user._id)
            .subscribe( ( borrado: boolean) => {
              // lo de regresa el Map es un True o False
              console.log(borrado);
              // refresh de la Table
              this.cargarUsuarios();
              /*swal(
                'Borrado!',
                'El registro ha sido corrado',
                'success'
              );*/              
        });

        
      }
    });    
  }


  guardarUsuario(user: Usuario) {
    console.log(user);
    
    this.usuarioServ.actualizarUsuario(user)
        .subscribe();

  }

  mostrarModal(id: string) {
      this._modalUploadServ.mostrarModal('usuarios', id);
  }

}
