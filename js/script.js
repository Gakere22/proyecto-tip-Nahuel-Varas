//import { clientes } from "./bdClientes";

//----------------------------------
// variables
//array de clientes

class Persona {
    #nombre;
    #apellido;
    #telefono;
    #mail;
    #tarjeta;
    #edadActual;
    #edadRetiro;
    #montoObjetivo;
    #perfil;
    
    
    constructor(nombre, apellido, telefono, mail, tarjeta, edadActual, edadRetiro, montoObjetivo, perfil){
        this.#nombre = nombre.toUpperCase();
        this.#apellido = apellido.toUpperCase();
        this.#telefono = telefono;
        this.#mail = mail;
        this.#tarjeta = tarjeta;
        this.#edadActual = parseInt(edadActual);
        this.#edadRetiro = parseInt(edadRetiro);
        this.#montoObjetivo = parseFloat(montoObjetivo);
        this.#perfil = perfil.toUpperCase();
       
    }



    get mostrarNombre(){
        return   this.#nombre;
    }
    get mostrarApellido(){
        return this.#apellido;
    }

    get mostrarCuota(){
        return this.#calcularCuota();
    }

    

    get mostrarPerfilRiesgo(){
        return this.#perfil;
    }

    get mostrarMontoObjetivo (){
        return this.#montoObjetivo;
    }

    set modificarMontoObjetivo (monto){
        this.#montoObjetivo = parseFloat(monto);
    }

    set modificarApellido(apellido){
        this.#apellido = apellido.toUpperCase();
    }

    set modificarNombre(nombre){
        this.#nombre = nombre.toUpperCase();
    }

    set modificarTelefono(telefono){
        this.#telefono = telefono;
    }
    
    set modificarMail(mail){
        this.#mail = mail;
    }
    
    set modificarTarjeta(tarjeta){
        this.#tarjeta = tarjeta;
    }
    
    set modificarEdadAct(eA){
        this.#edadActual = parseInt(edadActual);
    }
    
    set modificarEdadRet(eR){
        this.#edadRetiro = parseInt(eR);
    }
    
    set modificarEdadAct(eA){
        this.#montoObjetivo = parseFloat(montoObjetivo);
    }
    
    set modificarPerfil(per){
        this.#perfil = per.toUpperCase();
    }


    #calcularCuota (){
      //  console.log("ingrese a calcular cuota");
        let n = this.#calcularPlazo();
     //   console.log("ingrese a calcular tiempo  "+ n);
        let t =  this.#calcularTasa();
   //     console.log("ingrese a calcular tasa " + t );
        return ((this.#montoObjetivo/((((1 + t)**n)-1)/t)));
    }

    #calcularPlazo(){
        return  ((this.#edadRetiro - this.#edadActual)*12);
        
    }

    #calcularTasa() {
        let tasa = 0;
        switch(this.#perfil){
            case "ALTO":
                tasa = parseFloat(((1 + 0.75)**(1/12))-1);  
                break;
            case "MODERADO":
                tasa = parseFloat(((1+0.5)**(1/12))-1);
            break;
            case "BAJO":
                tasa = parseFloat(((1+0.25)**(1/12))-1);
            break;

        }
        return tasa;

    }

    mostrarPersona(){
        toString("nombre: " + this.#nombre + "," + "apellido: " + this.#apellido + ", " + "telefono: " + this.#telefono + ", " + "mail: " + this.#mail + ", " + " dado sus objetivos su cuota es: "+ this.cuota);
    }

}


function limpiarFomInv(){
    console.log("ingrese a limpiar form");
    contenedorDatos.remove();
    camposFormInv.style.display = "block";
    terminar = true;
    return true;
}


function cargarCliente(){

    console.log("ingreso a cargar cliente");

    contenedorDatos.remove();
    clientes.push(persona);
    
    let contDatos = document.createElement("div");
    contDatos.setAttribute("class", "titulo");
    contDatos.innerHTML =   
     `   <p class= "titulo"> ${persona.mostrarNombre} se ha dado de alta con exito, gracias por contratar nuestro servicio </p>
    `
    console.log("mostrar mensaje al cliente");

    camposFormInv.insertAdjacentElement("beforebegin", contDatos);
    
    setTimeout(function(){
        camposFormInv.style.display = "block";    
        contDatos.remove();
    }, 5000);


    for (i = 0; i < clientes.length; i++){
        clientes[i].mostrarNombre;
    }

    return true;
}



function mostrarInfo(pers){
    
  //  botonCancelar.addEventListener("clicl", limpiar);
   
    contenedorDatos.setAttribute("class", "titulo");
    contenedorDatos.innerHTML =   
     `      <h3> En base a los datos ingresado le inforamos el valor de la cuota a pagar </h3> 
            <h2 >  ${pers.mostrarNombre} </h2>
            <h2 >  ${pers.mostrarApellido} </h2>
           <h2> cuota: $ ${parseInt(pers.mostrarCuota)} </h2>
           <h3> ¿Confirme si desea  contratar el servicio, cancele en caso contrasio? <h3/>         
            `
    camposFormInv.style.display = "none";
    
    camposFormInv.insertAdjacentElement("beforebegin", contenedorDatos);
    
    console.log("salgo de mostrar datos persna");
    return true;
        
}

//Capturar datoasde persona ---------------------

function capturarFormInv (){
    nombre= document.getElementById("invNombre").value;
    apellido= document.getElementById("invApellido").value;
    telefono= document.getElementById("invTelefono").value;
    mail= document.getElementById("invMail").value;
    tarjeta=  document.getElementById("invTarjeta").value;
    montoObjetivo = document.getElementById("invMonto").value;
    perfil = (document.getElementById("invPerfil").value).toUpperCase();
    edadActual = document.getElementById("invEdadActual").value;
    edadRetiro = document.getElementById("invEdadRetiro").value;   
   
    persona.modificarMontoObjetivo = montoObjetivo;  
    persona.modificarApellido = apellido;
    persona.modificarNombre = nombre;
    persona.modificarMail = mail;
    persona.modificarTelefono = telefono;
    persona.modificarEdadAct = edadActual;
    persona.modificarEdadRet = edadRetiro;
    persona.modificarPerfil = perfil;

   
    return  mostrarInfo(persona);

}






//--------------------------------------------------------
// FUNCIONES


// cargar datos de clientes
//---------------------------------------------------
/*
function cargarDatosCliente(valor, mObjetivo){

    let cliente = {
        nombre: document.getElementById("invNombre"),
        apellido: document.getElementById("invApellido"),
        telefono: document.getElementById("invTelefono"),
        mail: document.getElementById("invMail"),
        tarjeta:  document.getElementById("invTarjeta"),
        vCuota: valor,
        objetivo: mObjetivo,
    }

    return cliente;
}
*/
//valida los datos levantados del formulario 
//-------------------------------------------------
/*
function validarDatos(monto,eAct,eRet, per){
    let confirmar = false;
    if((monto > 0) && (eAct > 0) && (eRet > 0) && (per =! 0)) {
        confirmar = true;
    }

    return confirmar;
    }
*/
//constante


//variables----------------------------
let nombre = "ninguno";
let apellido = "ninguno";
let telefono = 0;
let mail = "ninguno";
let tarjeta = 0;

let confirmacion = false;

let edadActual = 0;
let edadRetiro = 0;

let montoObjetivo = 0;
let perfil = "ninguno";

let mostrar = null;

let terminar = false;

//-------------------------------------------------
// PROGRAMA
const clientes = [];

let camposFormInv = document.getElementById("invCamposForm");

let botonConfirmar = document.getElementById("invConfirmar");
botonConfirmar.addEventListener("click", cargarCliente);

let botonCalcular= document.getElementById("invCalcular");
botonCalcular.addEventListener("click",  capturarFormInv);

let botonCancelar = document.getElementById("invCancelar");
botonCancelar.addEventListener("click", limpiarFomInv);


let contenedorDatos = document.createElement("div");

const persona = new Persona (nombre,apellido,telefono,mail,tarjeta,edadActual,edadRetiro,montoObjetivo,perfil);

 


console.log(persona.mostrarApellido);

/*
const informe = document.createElement("div");

informe.innerHTML = `<h3> "Estimado/a " + ${persona.nombre} </h3>
                    <h2> "El valor de su Cuota es: "+ ${persona.calcularCuota}</h2>
                    <p< Confirme si desea el producot </p>
                    <button> Aceptar </button>  <button> Cancelar </button>
                    `
document.body.append(informe);

*/


/*
salir = confirm ("¿Quieres cotizar a un nuevo cliente? Presiona aceptar para continar y cancelar para salir");

const camposFormulario = document.getElementsByClassName("contenedor-formulario-cotizar");
console.log (camposFormulario);



while (salir == true){ 
    montoObjetivo = document.getElementById("invMonto").innerText;
    perfil = document.getElementById("invPerfil").innerText;
    edadActual = document.getElementById("invEdadActual").innerText;
    edadRetiro = document.getElementById("invEdadRetiro").innerText;    
    
    invBotCalcular = document.getElementById("invCalcular");
    cuota = calcularCuota(perfil,montoObjetivo,plazo(edadRetiro, edadActual));
    
    console.log("Para lograr tu monto objetivo, en base a tu perfil de riesgo y la cantidad de tiempo hasta tu retiro es: "+ "$" + cuota);

    confirmacion = confirm("¿Quires iniciar a cumplir tu objetivo?");

    if (confirmacion == true){

        let cli = cargarDatosCliente(cuota, montoObjetivo);
        clientes.push(cli);
        console.log("Felicitaciones. A iniciado el logro de su objetivos de retiro");
    } else{
        console.log ("Gracias por visitarnos");
    }
    
    salir = confirm ("¿Quieres cotizar a un nuevo cliente? Presiona aceptar para continar y cancelar para salir");
}
















// copia del while------------------------------
while (salir == true){

    montoObjetivo = parseFloat(prompt("Ingresa el monto que quisieras tener a tu retiro"));
    perfil = prompt("Ingrese su perfil de Riesgo. Ingresa una opcion Alto, Moderado, Bajo");
    edadRetiro = parseInt(prompt("Ingresa la edad a la que se quiere retirar"));
    console.log(edadRetiro);
    edadActual = parseInt(prompt("Ingresa tu edad actual"));
    console.log(edadActual);
    montoObjetivo = parseFloat(prompt("Ingresa el monto que quisieras tener a tu retiro"));
    console.log(montoObjetivo);
    cuota = calcularCuota(perfil,montoObjetivo,plazo(edadRetiro, edadActual));
    
    console.log("Para lograr tu monto objetivo, en base a tu perfil de riesgo y la cantidad de tiempo hasta tu retiro es: "+ "$" + cuota);

    confirmacion = confirm("¿Quires iniciar a cumplir tu objetivo?");

    if (confirmacion == true){

        let cli = cargarDatosCliente(cuota, montoObjetivo);
        clientes.push(cli);
        console.log("Felicitaciones. A iniciado el logro de su objetivos de retiro");
    } else{
        console.log ("Gracias por visitarnos");
    }
    
    salir = confirm ("¿Quieres cotizar a un nuevo cliente? Presiona aceptar para continar y cancelar para salir");
}




confirmacion = confirm("¿Desea consultar la lista de cliesnte?");

if (confirmacion == true){
    for(let i = 0; i < clientes.length; i++){
        console.log(clientes[i]);
    };
}
*/