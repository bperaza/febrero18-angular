import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    this.contarTres().then( () => {
      console.log('Terminío Promesa');
    } ).catch( (error) => {
      console.error ('Error en la Promesa', error);
    });

   }

  ngOnInit() {
      
  }

  contarTres(): Promise<Boolean> {

    return new Promise ( (resolve, reject) => {
        
      let contador = 0;

      let inter = setInterval ( () => {

            contador += 1;   
           
            console.log(contador);
                   
            if (contador === 3) {
              // resolve('OK Promesa');
              reject (false);
              clearInterval(inter);
            }
      }, 1000);
    });  
  

  }

}
