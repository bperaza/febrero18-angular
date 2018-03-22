import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  // Preview de la Imagen que vamos a cargar
  imagenTemp: string; 

  constructor(public  usuarioServ: UsuarioService) {
    
    this.usuario = this.usuarioServ.usuario;
   }

  ngOnInit() {
  }

  cambiarImagen() {

    this.usuarioServ.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

  seleccionImagen( archivo: File ) {

    if (! archivo ) {
      return; 
    }
      
    // console.log(archivo);
    if (archivo.type.indexOf('image')) {
      swal({
        type: 'error',
        title: 'Solo Imagenes',
        text: 'El Archivo seleccionado No es una Imagen',
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
      
  }
  guardar(user: Usuario) {
    // console.log(usuario);
    this.usuario.nombre = user.nombre;

    if (!this.usuario.google) {
      this.usuario.email = user.email;
    }
    this.usuarioServ.actualizarUsuario(this.usuario)
        .subscribe( (resp) => {
         
          console.log(resp);
          
        });
  }

}
