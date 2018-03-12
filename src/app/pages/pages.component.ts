import { Component, OnInit } from '@angular/core';

// Mandar llamar libreria externa jQuery del Template
declare function init_plugins();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Mandar llamar libreria externa jQuery del Template
    init_plugins();
  }

}
