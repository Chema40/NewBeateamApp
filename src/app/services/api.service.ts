//Angular components
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

//External imports
import * as CryptoJS from 'crypto-js';

//Internal imports
import { url, key} from "../../environments/environment"
import { Estados, Tipos, Tareas, Resp} from "../interfaces/ApiResponse.interface"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  encrip: string;

  constructor(private http: HttpClient) {
    let privateKey: string = key;
    let date:Date = new Date();
    let today:string = date.toISOString().split('T')[0].replace(/-/g, '');
    let token: string = privateKey + today;
    this.encrip = CryptoJS.SHA384(token).toString();
  }

  private filtros: Subject<Resp> = new Subject<Resp>();

  fil: Resp = {
    cliente: '',
    estado: [],
    fecha1: '',
    fecha2: '',
    referencia: '',
    tipo: '',
    usuario: '',
  };

  getEstados():Observable<Tareas>{
    let headers = new HttpHeaders()
      .set('funcion', 'getEstados')
      .set('X-Auth', this.encrip);
    
    return this.http.get<Estados>(url, {headers})
  }

  getTipos():Observable<Tareas>{
    let headers = new HttpHeaders()
      .set('funcion', 'getTipos')
      .set('X-Auth', this.encrip); 
    
    return this.http.get<Tipos>(url, {headers})
  }

  getTareas():Observable<Tareas>{
       let headers = new HttpHeaders()
      .set('funcion', 'getTareas')
      .set('X-Auth', this.encrip); 

      return this.http.get<Tareas>(url, {headers})
  }

  getFiltroObservable(){
    return this.filtros.asObservable();
  }

  enviar(filtros:Resp){
    this.filtros.next(filtros);
    this.fil = filtros;
  }

  filtrar(filtros:Resp):Observable<Tareas>{

    //Reseteo de filtros
    if(filtros.fecha1 == null)
    {
      filtros.fecha1 = "";
    }

    if(filtros.fecha2 == null)
    {
      filtros.fecha2 = "";
    }

    if(filtros.referencia == null)
    {
      this.fil.referencia = '';
    }else{
      this.fil.referencia = filtros.referencia;
    }

    if(filtros.cliente == null)
    {
      this.fil.cliente = '';
    }else{
      this.fil.cliente = filtros.cliente;
    }

    if(filtros.usuario == null)
    {
      this.fil.usuario= "";
    }else{
      this.fil.usuario = filtros.usuario;
    }

    if(filtros.tipo === null){
      filtros.tipo = "Todos";
    }else{
      this.fil.tipo = filtros.tipo
    }

    if(filtros.estado === null){
      this.fil.estado[0] = '';
    }else{
      this.fil.estado= filtros.estado;
    }


    let headers = new HttpHeaders()
    .set('funcion', 'getTareas')
    .set('X-Auth', this.encrip); 

    let params = new HttpParams()
    .set("cliente", this.fil.cliente)
    .set("usuario", this.fil.usuario)
    .set("referencia", this.fil.referencia);
  
    if(filtros.fecha1 ==""){
      params = params.set("fecha[inicio]", "")
    }else{
      params = params.set("fecha[inicio]", filtros.fecha1)
    }

    if(filtros.fecha2 ==""){
      params = params.set("fecha[fin]", "")
    }else{
      params = params.set("fecha[fin]", filtros.fecha2)
    }

    if(filtros.tipo == "Todos"){
      params = params.set("tipo","");
    }else{
      params = params.set("tipo", this.fil.tipo );
    }

    if(this.fil.estado === undefined)
    {
      params = params.set("estado[]","");
    }else{
      this.fil.estado.forEach((estado:string)=>{
        params = params.append("estado[]", estado)
      })
    }

    return this.http.get<Tareas>(url,{headers, params})
  }
}
