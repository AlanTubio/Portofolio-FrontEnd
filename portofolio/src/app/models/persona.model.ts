export class persona{
    id? : Number;
    nombre : String;
    apellido : String;
    img : String;
    titulo : String;
    info : String;

    constructor(nombre : String, apellido : String, img : String, titulo : String, info : String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.titulo = titulo;
        this.info = info;
    }
}