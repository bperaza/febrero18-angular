import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/Router';
import { Observable } from 'rxjs/Observable';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  
  // propiedad
  label: string = '';

  constructor(
      public title: Title,
      public meta: Meta,
      private router: Router) {
      
          this.getDataRoute().subscribe( (data) => {
            // console.log(data);    
            this.label = data.titulo;
            this.title.setTitle (this.label);
            
            let metaTag: MetaDefinition = {
                name: 'description',
                content: this.label
            };

            this.meta.updateTag(metaTag);
          });
   }

  ngOnInit() {
  }
  // metodos 
  getDataRoute() {
    return this.router.events
      .filter( (evento) => {
        if (evento instanceof ActivationEnd) {
          return true;
        } else {
          return false;
        }  
        // .filter (evento => evento instanceof ActivationEnd  )
      })
      .filter ( (evento: ActivationEnd) => {
        if (evento.snapshot.firstChild === null) {
          return true;          
        }else {
          return false;
        } 
        // .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
      })
      .map ((evento: ActivationEnd) => {
          return evento.snapshot.data;
        // .map ( (evento: ActivationEnd) => evento.snapshot.data )
      });
       /* 
       return this.router.events
      .filter( evento => evento instanceof ActivationEnd )
      .filter ( (evento: ActivationEnd) =>  evento.snapshot.firstChild === null)
      .map ((evento: ActivationEnd) => evento.snapshot.data );
       */
  }
}
