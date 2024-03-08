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
    idContenedorHijo = null;

    constructor(id,nombre,precio,cantidad,actualizar, estadoBd){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(cantidad);
        this.estadoActualizado = parseInt(actualizar);
        this.estadoBd = parseInt(estadoBd);
        this.total = parseFloat(precio) *  parseInt(cantidad);
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
            let nombre = document.getElementById("editaProNombre");
            nombre.value = "nombre";
            let pre = document.getElementById("editaProPrecio");
            pre.value = "0.0";
            let sto = document.getElementById("editaProStock");
            sto.value = "00";
            contador = this.indice; 
            contador1 = this.indice;
            botonModificar.addEventListener("click", () => capturarDatos(this.indice));
            botonBaja.addEventListener("click", () => eliminarProducto(this.indice));
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
let botonAlta = document.getElementById("botonAltaPro");
botonAlta.addEventListener("click", capturarDatosAlta);
let botonSalir = document.getElementById("signout_button");
botonSalir.addEventListener("click",salirProductos);
let botonBaja = document.getElementById("botonBajaPro");

let mensajeSalir = null;
//contenedro mensaje salida
mensajeSalir = document.createElement("div");
mensajeSalir.setAttribute("class","mensajeSalida")
mensajeSalir.innerHTML = `
    <h1 id= "titulaSalida" > Gracias por tu gestion </h1>
    `
contenedorProd.insertAdjacentElement("beforebegin", mensajeSalir);
mensajeSalir.style.display = "none";

let tituloSalida1 = document.getElementById("tituloSalida1");
let contador = 0;
let contador1 = 0; 



function publicar(prod,i){

        if((prod.estadoBd == 1)){ 
            console.log("este es el precio antes de publicar "+ prod.precio)
            contenedorProd.appendChild(prod.publicar(i));
            let idHijo = contenedorProd.children.length - 1;
            prod.idContenedorHijo = idHijo;
        }else{
            console.log("entro al else de publicar");
        }
    
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
    console.log("se recibe el indice "+ i);
    let validar = false;
    if( contador == i) {
        console.log("entra con el indice "+ i);
        //console.log("ingresa a capturar datos")
        let contFormulario = document.getElementById("formularioPro");
        let pre = document.getElementById("editaProPrecio");
        //console.log ("valor del contenido de campo precio "+ pre.value);
        let nom = document.getElementById("editaProNombre");
        let valor = null;
        if ((nom.value != "nombre")){
            productos[i].nombre = nom.value;
            validar = true;
        }
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
    
        if (validar){
            alert("se modifico el producto");
            //console.log("el indice sigue siendo " + i);
            //console.log("el largo del array es de "+ productos.length);
            let idHijo = productos[i].idContenedorHijo;
          //  console.log("el indice del hijo es "+ idHijo);
            //console.log("el largo del array de hijos es de "+ contenedorProd.children.length);
            contenedorProd.children[idHijo].innerHTML= `
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


function capturarDatosAlta(){
    let validar = false;
    if( validar == false) {
        //console.log("ingresa a capturar datos")
        let contFormulario = document.getElementById("formularioPro");
        let pre = document.getElementById("editaProPrecio");
        //console.log ("valor del contenido de campo precio "+ pre.value);
        let nom = document.getElementById("editaProNombre");
        let valor = null;
        let nombre = null;
        let precio = null;
        let cantidad = null;
        if ((nom.value != "nombre")){
            nombre = nom.value;
            validar = true;
        }
        if ((pre.value != "0.0" )){
            if(validarNumero(pre.value)){
                valor = parseFloat(pre.value); 
                if(valor >= 0){
                    precio = parseFloat(valor);
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
                    cantidad = (parseInt(valor));
                    validar = true;
                }else{
                    alert("el valor del campo cantidad debe ser mayor igual a 0");  
                     return true;
                }
            }
        } 
       
        if (validar){
            alert("se dio de alta el producto");
            idNuevoPro = productos.length + 1; 
            console.log("idNuevoProducto = "+idNuevoPro);   
            const producto = new Producto(idNuevoPro,nombre,precio,cantidad,1,1);
            productos.push(producto);
            let indice = idNuevoPro - 1;
            contenedorProd.appendChild(producto.publicar(indice));
            let idHijo = contenedorProd.children.length - 1;
            idNuevoPro = idNuevoPro - 1;
            productos[idNuevoPro].idContenedorHijo = idHijo;
            console.log("id de hijo en nuevo producto " +productos[idNuevoPro].idContenedorHijo);
            console.log("id del producot es" + productos[idNuevoPro].id);
            console.log("id del indice es" + productos[idNuevoPro].indice);
            altaEnBaseDatos(producto);
            

        }else{
            alert("no se dio de alta el producto ");
            
        }

        contFormulario.style.visibility = "hidden";
    }
    return validar;

}

function salirProductos(){
    contenedorProd.style.visibility = "hidden";  
    mensajeSalir.style.display = "block";
    tituloSalida1.style.visibility = "hidden";
    setTimeout(function(){
        mensajeSalir.style.display = "none";
        tituloSalida1.style.visibility = "visible";
    },  3000);
    
}






/*
como lograr que al actualizar no duplique la publicacion
se podria controlar con dos funciones publicar una que se ejecuta
cuando se ingresa, y al ingresar se cargan en un array lo que se publico
la otra cuando se actualiza, pero se compara en el actualizar lo que ya se
publico que estaria en array lo que ya esta publicado no publicar
*/

