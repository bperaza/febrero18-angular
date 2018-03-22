import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable()
export class UploadService {

  constructor() { }

  subirArchivo (archivo: File, tipo: string, id: string ) {
    
    return new Promise ( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function () {
        
        if (xhr.readyState === 4) {
         
          // Status =200 OK!
          if (xhr.status === 200) {
            console.log('Imgen Subida'); 
            resolve(JSON.parse(xhr.response) );
          }else {
            console.log('Falló la Subida');
            reject( xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open ('POST', url, true );
      xhr.send(formData);
    } );
  }

}
