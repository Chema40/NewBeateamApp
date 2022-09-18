import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Resp } from 'src/app/interfaces/ApiResponse.interface';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
})
export class FiltroComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    cliente: [''],
    referencia: [''],
    usuario: [''],
    fecha1:[''],
    fecha2:[''],
    tipo:['Todos'],
    estado:new FormArray([]),
  });

   tipos:string[]=[];
   estados:string[]=[];
   filtroReset:Resp = {
    cliente: '',
    estado: [],
    fecha1: '',
    fecha2: '',
    referencia: '',
    tipo: '',
    usuario: '',
   }


  constructor(private fb:FormBuilder,
              private api:ApiService) {}


  ngOnInit(): void {

    this.api.getTipos()
      .subscribe((tipos) => {
          this.tipos = tipos.data;
        });
    
    this.api.getEstados()
      .subscribe((estados) => {
            this.estados = estados.data;
          });

  }

  marcado(event:any){
    const estado:FormArray = this.formulario.get('estado') as FormArray;
  
    if(event.target.checked){
      estado.push(new FormControl(event.target.value));
    }else{
      const index = estado.controls.findIndex(x => x.value === event.target.value);
      estado.removeAt(index);
    }
  }

  //enviar filtros con el servicio
  enviarFiltros(filtros: Resp){
    console.log(filtros);
    this.api.enviar(filtros);
  }

}