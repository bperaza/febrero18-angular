import { NgModule } from '@angular/core';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/Router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule, PipesModule]
  ,
  declarations: [
    PagenotfoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    PagenotfoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
