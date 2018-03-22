import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  usuario: Usuario;

  constructor(
    private router: Router, 
    public usuarioServ: UsuarioService) { 

    }

  ngOnInit() {
    this.usuario = this.usuarioServ.usuario;
  }

}
