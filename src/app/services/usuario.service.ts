import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/Router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';

// import * as swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( 
      public router: Router,
      public http: HttpClient ) {
      
        console.log('Service Usuario OK!!');
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
            position: 'top-end',
            type: 'success',
            title: 'Usuario Creado',
            showConfirmButton: false,
            timer: 1500
          });

            // swal ('Usuario Creado', usuario.email, 'success');
            return resp.usuario;
        });
   }

}
