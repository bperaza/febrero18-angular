import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';

// Services
import { SettingsService } from './services/settings.service';
import { SidebarService } from './services/sidebar.service';
import { UsuarioService } from './services/usuario.service';
import { LoginGuardGuard } from './services/login-guard.guard';
import { UploadService } from './services/upload.service';
import { ModalUploadService } from './components/modal-upload/modal-upload.service';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';








// rutas
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    PipesModule
  ],
  providers: [
    SettingsService, 
    SidebarService, 
    UsuarioService, 
    UploadService,
    ModalUploadService,  
    LoginGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
