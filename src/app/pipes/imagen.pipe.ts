import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img/';
    
    if (! img ) { 
      // Sin Imagen
      return url + 'xxxx';
    } 

    
    // Si es una img del Google es https
    if (img.indexOf('https') >= 0) {
      // Se deja la Imagen de Google SignIn
      return img;
    } 
     
    return url + img;
    /*
    if (tipo === 'usuario') {
      return url + '/usuarios/' + img;
    }else if (tipo === 'medico') {
      return url + '/medicos/' + img;
    }else if (tipo === 'hospital') {
      return url + '/hospitales/' + img;
    }*/
  }

}
