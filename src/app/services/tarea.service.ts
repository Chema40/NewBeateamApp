import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tarea:Tarea = {
    'alias_cliente': '',
    'cantidad': 0,
    'codigo_cliente': '',
    'estado': '',
    'fecha': '',
    'id': 0,
    'logo': '',
    'observacion': '',
    'referencia': '',
    'tipo': '',
    'usuario': '',
  };
  tareas: Tarea[] = [];

  constructor() {}

  setTareas(datos:any[]){
    datos.forEach(t => {
      this.tarea =  {
        'alias_cliente': t.alias_cliente,
        'cantidad': parseInt(t.cantidad),
        'codigo_cliente': t.codigo_cliente,
        'estado': t.estado,
        'fecha': t.fecha,
        'id': parseInt(t.id),
        'logo': t.logo,
        'observacion': t.observacion,
        'referencia': t.referencia,
        'tipo': t.tipo,
        'usuario': t.usuario,
      }
      this.tareas.push(this.tarea);
      console.log(this.tareas);
    });
  }
}
