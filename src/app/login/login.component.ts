import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
// Mandar llamar libreria externa jQuery del Template
declare function init_plugins();

// Google API
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;

  recuerdame: boolean = false;
  email: string;
  constructor( public _router: Router, public usuarioServ: UsuarioService) { }

  ngOnInit() {
    // Mandar llamar libreria externa jQuery del Template
    init_plugins();
    this.googleInit();
    
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
       this.recuerdame = true;
    }



  }

  googleInit() {
    
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '431278450197-59em0bnj79b46r3hnrl84ukntp8dht8e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        }); 
    this.googleSignIn (document.getElementById('btnGoogle'));
    });
  }

  googleSignIn( element ) {

    this.auth2.attachClickHandler (element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this.usuarioServ.loginGoogle ( token )
        .subscribe ( loginOk => {  
          console.log(loginOk);
             
          // this._router.navigate(['/dashboard']); 
          window.location.href = '#/dashboard';

        });
      // console.log(token);
      
    });

  }

  ingresar(forma: NgForm) {

    if (!forma.valid) {
      return;
    }


    console.log('Valida', forma.valid);
    console.log(forma.value);
    
    let usuario = new Usuario (
      null,
      forma.value.email,
      forma.value.password
    );

    this.usuarioServ.login(usuario, this.recuerdame )
        .subscribe( loginCorrecto => {
            console.log(loginCorrecto);
            // En el LocalStorage ya se guardó el Token, ID y Usuario
            this._router.navigate(['/dashboard']);  
        }); 
    
  }
}
