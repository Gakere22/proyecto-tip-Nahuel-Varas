
console.log("se crea el objeto")
class Producto{
    id = 0; 
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
            
            Swal.fire({
                position: "top-center",
                icon: "info",
                title: "Seleccionaste el roducto "+ productos [this.indice].nombre +" podes modificarlo o eliminarlo",
                showConfirmButton: false,
                timer: 2000
              });
           
           // alert("precio" + productos[this.indice].precio + " y stock:" + productos[this.indice].stock);
               
            let nombre = document.getElementById("editaProNombre");
            let pre = document.getElementById("editaProPrecio");          
            let sto = document.getElementById("editaProStock");
            nombre.value = "nombre";
            pre.value = "0.0";
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

let nom = document.getElementById("editaProNombre");
nom.addEventListener("focus", (event) => {
    event.target.style.background = "grey";
  });
nom.addEventListener("blur", ()=>localStorage.setItem("nombre", nom.value));
nom.addEventListener("blur", (event) => {
    event.target.style.background = "";
  });

let pre = document.getElementById("editaProPrecio");
pre.addEventListener("focus", (event) => {
    event.target.style.background = "grey";
  });
pre.addEventListener("blur", ()=> localStorage.setItem("precio", pre.value));
pre.addEventListener("blur", (event) => {
    event.target.style.background = "";
  });
let sto = document.getElementById("editaProStock");
sto.addEventListener("focus", (event) => {
    event.target.style.background = "grey";
  });
sto.addEventListener("blur", ()=>localStorage.setItem("stock", sto.value));
sto.addEventListener("blur", (event) => {
    event.target.style.background = "";
  });

function publicar(prod,i){
        contenedorProd.style.visibility = "visible";
        if((prod.estadoBd == 1)){ 
            contenedorProd.appendChild(prod.publicar(i));
            let idHijo = contenedorProd.children.length - 1;
            prod.idContenedorHijo = idHijo;
        }else{
            console.warn("producto con no con borrado logico");
        }
    
}


function cargarProductos(){    
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
        let contFormulario = document.getElementById("formularioPro");
        let pre = document.getElementById("editaProPrecio");
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
                    Swal.fire({
                        icon: "error",
                        title: "el valor del campo precio debe ser mayor igual a 0",
                      });
                  
                    return true;                       
                }
            }
        
        }

        let sto = document.getElementById("editaProStock");
    
        if ((sto.value != "00" ) ){
            if (validarNumero(sto.value)){
                valor = parseInt(sto.value);
                if (valor >= 0){
                    productos [i].modificarStock(parseInt(valor));
                    validar = true;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "el valor del campo cantidad debe ser mayor igual a 0",
                      });
                     
                     return true;
                }
            }
        } 
    
        if (validar){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Se modifico el producto",
                showConfirmButton: false,
                timer: 1500
              });        
            let idHijo = productos[i].idContenedorHijo;
                    
            contenedorProd.children[idHijo].innerHTML= `
                <h4> producto: ${productos[i].nombre}  </h4>
                <h4> precio: ${productos [i].precio}  </h4>
                <h4> unidades disponibles: ${productos [i].stock}  </h4>
            `
            ;
            
            editarEnBaseDatos(productos[i]);
            

        }else{
            Swal.fire({
                icon: "error",
                title: "No se Modifico el producto",
              });
        }

        contFormulario.style.visibility = "hidden";
    }
    return validar;

}


function capturarDatosAlta(){
    let validar = false;
    if( validar == false) {
       
        let contFormulario = document.getElementById("formularioPro");
        let pre = document.getElementById("editaProPrecio");
       
        let nom = document.getElementById("editaProNombre");
        let valor = null;
        let nombre = null;
        let precio = null;
        let cantidad = null;
        if ((nom.value != "nombre")){
            localStorage.setItem("nombre", nom.value);
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
                    Swal.fire({
                        icon: "error",
                        title: "el valor del campo precio debe ser mayor igual a 0",
                      });
                    
                    return true;                       
                }
            }
        
        }

        let sto = document.getElementById("editaProStock");
        
        if ((sto.value != "00" ) ){
            if (validarNumero(sto.value)){

                valor = parseInt(sto.value);
                if (valor >= 0){
                    cantidad = (parseInt(valor));
                    validar = true;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "el valor del campo cantidad debe ser mayor igual a 0",
                      });
                      
                     return true;
                }
            }
        } 
       
        if (validar){
           
            idNuevoPro = productos.length + 1;   
            const producto = new Producto(idNuevoPro,nombre,precio,cantidad,1,1);
            productos.push(producto);
            let indice = idNuevoPro - 1;
            contenedorProd.appendChild(producto.publicar(indice));
            let idHijo = contenedorProd.children.length - 1;
            idNuevoPro = idNuevoPro - 1;
            productos[idNuevoPro].idContenedorHijo = idHijo;
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Se dio de alta el producto",
                showConfirmButton: false,
                timer: 1500
              });
            altaEnBaseDatos(producto);
            

        }else{
            Swal.fire({
                icon: "error",
                title: "No se dio de alta el producto",
              });
            
        }

        contFormulario.style.visibility = "hidden";
    }
    return validar;

}

function salirProductos(){
    let contFormulario = document.getElementById("formularioPro");
    contenedorProd.style.visibility = "hidden";
    contFormulario.style.visibility = "hidden";  
    mensajeSalir.style.display = "block";
    tituloSalida1.style.visibility = "hidden";
    setTimeout(function(){
        mensajeSalir.style.display = "none";
        tituloSalida1.style.visibility = "visible";
    },  3000);
    localStorage.clear();
    
}







