import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  
  constructor() {   
    // intentar 2 veces si ocurre un error
    this.subscription = this.regresaObservable()
      .subscribe( 
          numero => console.log ('Subsc', numero),
          error => console.log('Error en el Obs 2 veces', error),
          () => console.log ('El Observador Complete')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe(); 
  }
  

  regresaObservable(): Observable<any> {
    return  new Observable( observer => { 
      let contador = 0;

      let inter = setInterval ( () => {
        contador += 1;

        let salida = {
          valor: contador
        };

        // Es lo que regresa el Observable
        observer.next(salida);
        
        /*if (contador === 3) {
           clearInterval(inter);
           observer.complete();
        }
       
        if ( contador === 2) {
          observer.error ('Auxilio Error');
        }
        */
      }, 500 );
   })
   .retry(2)
   .map( (respuesta: any) => {
      return respuesta.valor;
   })
   .filter( (valor, index) => {   
      // console.log('Filter', valor, index);
      if (valor % 2 === 1) {
        // impar
        return true;
      }else {
        // par Numeros Pares son Ignorados
        return false;
      }
   });

  }

}
