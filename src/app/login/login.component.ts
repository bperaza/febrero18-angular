import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
// Mandar llamar libreria externa jQuery del Template
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public _router: Router) { }

  ngOnInit() {
    // Mandar llamar libreria externa jQuery del Template
    init_plugins();
  }

  ingresar() {
    console.log('Ingresando');
    this._router.navigate(['/dashboard']);
    
  }
}
