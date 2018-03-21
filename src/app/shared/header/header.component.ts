import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router, 
    public usuarioServ: UsuarioService) { 

    }

  ngOnInit() {
    
  }

}
