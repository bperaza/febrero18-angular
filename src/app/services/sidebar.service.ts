import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    { 
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimeinto',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Medicos', url: '/medicos'},
        {titulo: 'Hospitales', url: '/hospitales'}
    ]

    }
  ];

  constructor() { }

}
