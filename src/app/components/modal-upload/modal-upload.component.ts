import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UploadService } from '../../services/upload.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit { 

  // oculto: string = '';

  imagenSubir: File;
  // Preview de la Imagen que vamos a cargar
  imagenTemp: string; 

  constructor( public _uploadServ: UploadService,
              public _modalUploadServ: ModalUploadService ) { 
     console.log('modal listo'); 
  }

  ngOnInit() {
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

  subirImagen() {
    // console.log('subir Imagen');

    this._uploadServ.subirArchivo(this.imagenSubir, this._modalUploadServ.tipo, this._modalUploadServ.id)
          .then ( resp => {
            console.log(resp);
            
             this._modalUploadServ.notificacion.emit(resp);
             this._modalUploadServ.ocultarModal();   
          })
          .catch( err => {
            console.log('Error al SubirImagen');
            
          });
    
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadServ.ocultarModal();
     
  }
}
