import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/Router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  
  constructor (
    public usuarioServ: UsuarioService,
    public router: Router ) {
      
  }

  canActivate(): boolean {
      
      if (this.usuarioServ.estaLogueado()) {
        console.log('Paso por Login Guard');
        return true;
      }else {
        console.log('Bloqueado por Login Guard');
        this.router.navigate(['/login']);
        return false;
      }

  }
}
