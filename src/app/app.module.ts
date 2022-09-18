import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {FormsModule} from "@angular/forms/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
//NGX-Bootstrap
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerModule, BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxPaginationModule } from 'ngx-pagination';


import { MatTooltipModule } from '@angular/material/tooltip';

//Internal Services
import { TareaService } from './services/tarea.service';
import { ApiService } from './services/api.service';
import { FiltroComponent } from './components/filtro/filtro.component';
import { TablaComponent } from './components/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltroComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    NgxPaginationModule,
    PaginationModule,
    PopoverModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    TareaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private localeService:BsLocaleService){
    this.localeService.use('es');
  }
}
