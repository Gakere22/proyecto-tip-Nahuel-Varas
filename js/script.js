//credencial api AIzaSyC54deZPxGHOESXOPiXhXoiuwP92CxwiwM
// id cliente 1069233791926-nhsgu033aqos8gli854qggvd128b4sfi.apps.googleusercontent.com

console.log("se crea el objeto")
class Producto{
    id = 0; //_ es para que este protegida en la herencia se puede ver
    nombre = "ninguno";
    precio = 0;
    stock = 0;
    total = this.precio * this.stock;
    contenedorProdDatos = document.createElement("div"); 
    estadoActualizado = 0;
    estadoBd = 0;
    indice = null;

    constructor(id,nombre,precio,cantidad,actualizar, estadoBd){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(cantidad);
        this.estadoActualizado = parseInt(actualizar);
        this.estadoBd = parseInt(estadoBd);
        
    }

    get mostrarId(){
        return this.id;
    }
    get mostrarNombre(){
        return this.nombre;
    }
    get mostrarPrecio(){
        return this.precio;
    }
    get mostrarStock(){
        return this.stock;
    }
    get calculaValorStock(){
        return this.precio * this.stock;
    }

    get mostrarEstadoPub(){
        return this.estadoPub;
    }
    get mostrarEstadoAct(){
        return this.estadoActualizado;
    }
    get mostrarEstadoBd(){
        return this.estadoBd;
    }

    modificarStock(cantidad){
        this.stock = cantidad;
        if(this.stock == 0){
            this.estadoBd = 0;
        }else{
            this.estadoBd = 1;
        }
    }

    modificarPrecio(precio){
        this.precio = precio;
        if (this.precio == 0 ){
            this.estadoBd = 0;
        } else{
            this.estadoBd = 1;
        }
    }
    
    actualizarEstadoAct(estado){
        this.estadoActualizado = parseInt(estado);
    }

    actualizarEstadoPub(estado){
        this.estadoPub = parseInt(estado);
    }

    asignarEstilo(){

        this.contenedorProdDatos.setAttribute("class","estiloProducto");
        
        return true;
    }

    armarHtml(){
        this.contenedorProdDatos.innerHTML= `
            <h4> producto: ${this.nombre}  </h4>
            <h4> precio: ${this.precio}  </h4>
            <h4> unidades disponibles: ${this.stock}  </h4>
            ` 
        return true;
    }

    asignarEvento(){
        this.contenedorProdDatos.addEventListener("click",()=> this.formulario());
        return true;
    }

    formulario(){
        
            let contFormulario = document.getElementById("formularioPro");
            contFormulario.style.visibility = "visible";
            alert("precio" + productos[this.indice].precio + " y stock:" + productos[this.indice].stock);
            console.log("ingresa a formulario");    
            let pre = document.getElementById("editaProPrecio");
            pre.value = "0.0";
            let sto = document.getElementById("editaProStock");
            sto.value = "00";
            contador = this.indice; 
            botonModificar.addEventListener("click", () => capturarDatos(this.indice));
            return true;
        
    }
  

    publicar(index){
        this.indice = index;
        if(this.asignarEstilo()){
            if(this.armarHtml()){
                if(this.asignarEvento(index)){
                    return this.contenedorProdDatos;    
                }else{
                    console.warn("se genero un error en gener evento");    
                }      
            }else{
                console.warn("se genero un erro en el html");
            }    
        }else{
            console.warn("se genero un error en el estilo");
        }
            
    }

}    

 //creo el contenedor de producto y le doy estilo css con la clase
 let contenedorProd = document.getElementById("productos");
 contenedorProd.setAttribute("class", "estiloContenedorProductos");
 //creo el contenedor de un prodcuto y le doy estilo con la clase

let controlPublicar = false;
let prodPublicados = []; 
let bajarProducto = [];
let botonModificar = document.getElementById("botonModificarPro");


function publicar(prod,i){

        if((prod.estadoBd == 1)){ 
            console.log("este es el precio antes de publicar "+ prod.precio)
            contenedorProd.append(prod.publicar(i));

        }else{
            console.log("entro al else de publicar");
           // prod.contenedorProdDatos.remove();
        }
      //recooro el array objeto productos(variable global)
    
        
        //prodPubliElemento.push(producto);
    
}




function cargarProductos(){  
    console.log("entro a cargar producots");  
    prodPublicados = productos;
    productos.forEach((pro,i) => publicar(pro,i));
    
}




function validarNumero(cadena){
    let validar = true;
    let i = 0;
    while((i < cadena.length)&&(validar)){
       if(((cadena[i] > 47)&&( cadena[i] < 58)) || (cadena[i] == 44)){
        validar = false;
       }
       i++;
    }
    return validar;
}






 function capturarDatos(i){
    let validar = false;
    if( contador == i) {
        console.log("ingresa a capturar datos")
        let contFormulario = document.getElementById("formularioPro");
        console.log("viejo precio " + productos [i].precio);
        console.log("viejo stock " + productos [i]. stock);
        let pre = document.getElementById("editaProPrecio");
        console.log ("valor del contenido de campo precio "+ pre.value);
        let valor = null;
        if ((pre.value != "0.0" )){
            if(validarNumero(pre.value)){
                valor = parseFloat(pre.value); 
                if(valor >= 0){
                    productos [i].precio = parseFloat(valor);
                    validar = true;
                }else{
                    alert("el valor del campo cantidad debe ser mayor igual a 0");
                    return true;
                       
                }
            }
        
        }

        let sto = document.getElementById("editaProStock");
        console.log ( sto.value);
        if ((sto.value != "00" ) ){
            if (validarNumero(sto.value)){
                valor = parseInt(sto.value);
                if (valor >= 0){
                    productos [i].modificarStock(parseInt(valor));
                    validar = true;
                }else{
                    alert("el valor del campo cantidad debe ser mayor igual a 0");  
                     return true;
                }
            }
        } 
        console.log("nuevo precio " + productos[i].precio);
        console.log("nuevo stock " + productos[i].stock);

        if (validar){
            alert("se modifico el producto");
            contenedorProd.children[i].innerHTML= `
                <h4> producto: ${productos[i].nombre}  </h4>
                <h4> precio: ${productos [i].precio}  </h4>
                <h4> unidades disponibles: ${productos [i].stock}  </h4>
            `
            ;
            
            editarEnBaseDatos(productos[i]);
            

        }else{
            alert("no se modifico el producto ");
            
        }

        contFormulario.style.visibility = "hidden";
    }
    return validar;

}

let contador = 0;


/*
como lograr que al actualizar no duplique la publicacion
se podria controlar con dos funciones publicar una que se ejecuta
cuando se ingresa, y al ingresar se cargan en un array lo que se publico
la otra cuando se actualiza, pero se compara en el actualizar lo que ya se
publico que estaria en array lo que ya esta publicado no publicar
*/

