export class persona{
    id : Number;
    nombre : String;
    apellido : String;
    img : String;
    titulo : String;
    info : String;

    constructor(id : Number ,nombre : String, apellido : String, img : String, titulo : String, info : String){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.titulo = titulo;
        this.info = info;
    }
}