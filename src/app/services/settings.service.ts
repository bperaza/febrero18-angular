import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'Default'
  };
  
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustesLocalStorage() {
    localStorage.setItem('ajustes', JSON.stringify (this.ajustes));
    // console.log('Guardado en el LocalStorage');
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse( localStorage.getItem ('ajustes'));
      this.aplicarTema (this.ajustes.tema);
      // console.log('Cargando del LocalStorage');
    }else {
      // console.log('Usando valores de Ajuste por Defualt');
    }
  }
  aplicarTema (tema: string) {
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustesLocalStorage();
  }


}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
