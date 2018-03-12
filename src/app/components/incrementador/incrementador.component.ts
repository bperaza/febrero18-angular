import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
   
  }

  ngOnInit() {
   
  }

  onChange(newValue: number) {
    
    console.log( newValue );
    
    if ( newValue >= 100 ) {
      this.porcentaje = 100;
    }else if ( newValue <= 0 ) {
      this.porcentaje = 0;
    }else {
      this.porcentaje = newValue;
      this.cambioValor.emit( this.porcentaje );
    }
  }

  cambiarValor(valor: number) {

    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);
    
    if ( this.porcentaje >= 100 ) {
      this.porcentaje = 100;
    }
    if ( this.porcentaje <= 0 ) {
      this.porcentaje = 0;
    }
  }
}
