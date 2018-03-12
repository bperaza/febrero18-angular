import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  porcentaje: number= 50;
  progressMsg: string = 'Progress Mesaje ';
  progressNum: number = 30;
  constructor() { }

  ngOnInit() {
  }

  actualizar( event: number) {
    console.log('Event: ', event );
    this.porcentaje = event;
  }
}
