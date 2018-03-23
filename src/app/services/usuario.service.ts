import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/Router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { UploadService } from './upload.service';

// import * as swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( 
      public router: Router,
      public http: HttpClient,
      public uploadServ: UploadService ) {
      
        // console.log('Service Usuario OK!!');
        this.cargarLocalStorage();

   }



  cargarLocalStorage() {
    if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  } 

  guardarLocalStorage (id: string, token: string, user: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));

    this.usuario = user;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    // localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post ( url, {token: token})
        .map ( (res: any) => {
          this.guardarLocalStorage(res.id, res.token, res.usuario);
          return res;
          // return true;
        });

  }

  login (usuario: Usuario, recordar: boolean= false) {
    let url = URL_SERVICIOS + '/login';
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    }else {
      localStorage.removeItem('email');
    }

    // Regresamos un Observador al actual nos podremos Subscribir
    return this.http.post( url, usuario )
      .map ( (resp: any) => {
          /*
            localStorage.setItem('id', resp.id);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            */
            this.guardarLocalStorage(resp.id, resp.token, resp.usuario);

            // Puedo regresar lo que sea
            return resp;
            // return true;
      }); 
  }   
  
  crearUsuario (usuario: Usuario) {
      let url = URL_SERVICIOS + '/usuario';
      // Regresamos un Observador al actual nos podremos Subscribir
      return this.http.post( url, usuario )
        .map ((resp: any) => {

          swal({
            position: 'center',
            type: 'success',
            title: 'Usuario Creado',
            showConfirmButton: false,
            timer: 1500
          });

            // swal ('Usuario Creado', usuario.email, 'success');
            return resp.usuario;
        });
   }

   actualizarUsuario (usuario: Usuario) {
     
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' +  this.token;

     return this.http.put(url, usuario)
         .map((resp: any) => {
          console.log('usuario', usuario);
          // this.usuario._id Usuario Logeado Actualmente
          if (usuario._id === this.usuario._id) {  
            this.guardarLocalStorage(this.usuario._id, this.token, usuario);
          }
          swal({
              position: 'center',
              type: 'success',
              title: 'Usuario Actualizado',
              showConfirmButton: false,
              timer: 1500
            });
          return true;       
     } ) ;

   }

   cambiarImagen( file: File, id: string ) {
      this.uploadServ.subirArchivo(file, 'usuarios', id)
          .then ( (resp: any) => {
              console.log(resp);
              this.usuario.img = resp.usuario.img;   
              swal({
                position: 'center',
                type: 'success',
                title: 'Imagen de Usuario Actualizada',
                showConfirmButton: false,
                timer: 1500
              });
               this.guardarLocalStorage(this.usuario._id, this.token, this.usuario);
          })
          .catch ( resp => {
              console.log(resp);
          });
   }


   cargarUsuarios(desde: number = 0) {
      let url = URL_SERVICIOS + '/usuario?desde=' + desde;

      return this.http.get( url );
   }

   buscarUsuarios (termino: string ) {
    let url = URL_SERVICIOS +  '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
        .map ( (resp: any) =>  resp.usuarios );
   }

   borrarUsuario (id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
     url += '?token=' +  this.token;
     return this.http.delete(url).map ( (resp) => {
        swal(
            'Borrado!',
            'El registro ha sido corrado',
            'success'
            );
        return true;
     } );
   }



}
