import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Datos, Resp } from '../../interfaces/ApiResponse.interface';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
})
export class TablaComponent implements OnInit{

  aux: Datos [] = [];
  datos: Datos[] = [];
  linea: number = 0;
  config: any;
  tooltip: string =''

  constructor(private api:ApiService) {
      this.config = {
      itemsPerPage: 14,
      currentPage: 1,
      totalItems: this.datos.length,
    };
   }

  ngOnInit(): void {
    this.api.getFiltroObservable().subscribe(filtros => this.filtrar(filtros));

    this.api.getTareas().subscribe(datos =>{
            // this.aux = datos.data; 
            // this.datos = this.aux;
            this.datos = datos.data;
            this.linea=this.aux.length;
          });

  }

  filtrar(filtros:Resp){
            this.api.filtrar(filtros).subscribe(data => {
                    this.datos = data.data;
                    this.linea = this.datos.length;
            });
    
  }

  getTooltipText(dato:any){
    return `Obs. linea: ${dato.observacion}
            Obs. pedido:
            Pedido por: ${dato.usuario}`
  }
}