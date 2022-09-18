export interface Estados {
    status?: number;
    message?: string;
    data: string[];
}

export interface Tipos {
    status?: number, 
    message?: string,
    data: string[],
}

export interface Tareas {
    status?: number,
    message?: string,
    data: any
}

export interface Filtro {
    cliente: string;
    fecha: Fecha;
    referencia: string;
    usuario: string;
    tipo: string;
    estados?: string[];
}

export interface Fecha{
    inicio: string;
    fin: string;
}

export interface Tarea{
    alias_cliente: string,
    cantidad: number,
    codigo_cliente: string,
    estado: string,
    fecha: string,
    id: number,
    logo: string,
    observacion: string,
    referencia: string,
    tipo: string,
    usuario: string,
}

export interface Consulta{
    fecha?: {
        inicio?: string,
        final?: string,
    },
    referencia?: string,
    cliente?:string,
    usuario?:string,
    estado?: string[],
    tipo?:string,
}

export interface Datos {
    id?:             string;
    referencia?:     string;
    logo?:           string;
    usuario?:        string;
    observacion?:    string;
    cantidad?:       string;
    estado?:         string;
    fecha?:          Date;
    tipo?:           string;
    codigo_cliente?: string;
    alias_cliente?:  string;

}

export interface Respuesta{
    status?: number;
    message?: string;
    data: Datos[];
}

export interface Resp {
    cliente: string;
    estado: string[]
    fecha1: string;
    fecha2: string;
    referencia: string;
    tipo: string;
    usuario: string;
}