import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { forEach } from '@angular/Router/src/utils/collection';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
                public _ajustes: SettingsService) {
                  
                  
                  this.colocarCheck();
  }

  ngOnInit() {

  }

  cambiarColorTema (tema: string, link: any) {
    this.aplicarCheck( link);
    this._ajustes.aplicarTema(tema);
   
  }

  aplicarCheck(link: any ) {
    const selectores: any  = this._document.getElementsByClassName('selector');

    for ( const item  of selectores){
        item.classList.remove ('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any  = this._document.getElementsByClassName('selector');
    
    let tema = this._ajustes.ajustes.tema;
   
    for ( let item  of selectores){
        console.log(item.getAttribute('data-theme'));
        if (item.getAttribute('data-theme') === tema) {        
            item.classList.add('working');
            break;
        }
    }
  }
}
