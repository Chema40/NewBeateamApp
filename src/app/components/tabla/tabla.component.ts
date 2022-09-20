import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Datos, Resp } from '../../interfaces/ApiResponse.interface';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
})
export class TablaComponent implements OnInit{

  datos: Datos[] = [];
  linea: number = 0;
  config: any;
  rows: number = 14;
  page: number = 1;
  altoVentana: number = 0;
  numeroFilas: number = 5;
  SD: number = 480;
  QuarterHD: number = 540;
  HD: number = 720;
  FHD: number = 1080;
  QHD: number = 1440;
  UHD: number = 2160;
  UHD8K: number = 4320;

  constructor(private api:ApiService) {
      this.config = {
      itemsPerPage: this.rows,
      currentPage: this.page,
      totalItems: this.datos.length,
    };
   }

  ngOnInit(): void {
    this.api.getFiltroObservable().subscribe(filtros => this.filtrar(filtros));

    this.api.getTareas().subscribe(datos =>{
            this.datos = datos.data;
            this.linea=this.datos.length;
          });
    this.altoVentana = window.innerHeight


  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.altoVentana = window.innerHeight
    this.calcularFilas(this.altoVentana)
  }

  calcularFilas(alturaVentana: number){

    this.config.itemsPerPage = Math.floor(this.altoVentana / this.numeroFilas);      
    
      if(alturaVentana <= this.SD){
        this.config.itemsPerPage = 1;
      }else if(alturaVentana >= this.SD && alturaVentana < this.QuarterHD){
        this.config.itemsPerPage = 10;
      }else if(alturaVentana >= this.QuarterHD && alturaVentana < this.HD){
        this.numeroFilas = 50
        this.config.itemsPerPage = Math.floor(this.altoVentana / this.numeroFilas); 
      }else if (alturaVentana >= this.HD && alturaVentana < this.FHD ){
        this.numeroFilas = 48
        this.config.itemsPerPage = Math.floor(this.altoVentana / this.numeroFilas); 
      }else{
        this.numeroFilas = 47
        this.config.itemsPerPage = Math.floor(this.altoVentana / this.numeroFilas); 
      }
  }

  filtrar(filtros:Resp){
            this.api.filtrar(filtros).subscribe(data => {
                    this.datos = data.data;
                    this.linea = this.datos.length;
                    this.config.currentPage = 1;
            });
    
  }

  getTooltipText(dato:any){
    return `Obs. linea: ${dato.observacion}
            Obs. pedido: 
            Pedido por: ${dato.usuario}`
  }

  onTableSizeChange(event: any): void {
    this.page = event;
  }

}