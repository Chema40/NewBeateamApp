import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { Datos, Filtro, Respuesta, Consulta } from '../interfaces/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private consulta:Consulta = {};

  constructor() { }

  getParams(filtro:Filtro):Consulta{
    console.log(filtro);

    this.consulta.cliente = filtro.cliente;
    this.consulta.estado = filtro.estados;
    this.consulta.referencia = filtro.referencia;
    this.consulta.tipo = filtro.tipo;
    this.consulta.usuario = filtro.usuario;

    return this.consulta;
  }

}
