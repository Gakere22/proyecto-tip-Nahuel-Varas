//import { clientes } from "./bdClientes";

//----------------------------------
// variables
//array de clientes
const clientes = [];

let confirmacion = false;

let edadActual = 0;
let edadRetiro = 0;

let montoObjetivo = 0;
let perfil = "ninguno";

let cuota = 0;

let salir = true;
//--------------------------------------------------------
// FUNCIONES

//calcular tasa
function calcularTasa(per) {
   
    let tasa = 0;
    switch(per){
        case "Alto":
            tasa = parseFloat(((1 + 1)**(1/12))-1);
           
            break;
        case "Moderado":
            tasa = parseFloat(((1+0.75)**(1/12))-1);
           
        break;
        case "Bajo":
            tasa = parseFloat(((1+0.4)**(1/12))-1);
           
        break;
    }
    
    return tasa;
}

// cargar datos de clientes
function cargarDatosCliente(valor, mObjetivo){

    let cliente = {
        nombre: prompt("Ingresa tu nombre"),
        apellido: prompt("Intresa tu apellido"),
        telefono: prompt("Ingresa tu numero de telefono"),
        mail: prompt("Ingresa tu direccion de mail "),
        tarjeta:  prompt("Ingresa el nro de tu tarjeta de credito"),
        vCuota: valor,
        objetivo: mObjetivo,
    }

    return cliente;
}

//calcular cuota
function calcularCuota (per,monto,n){
    let t = calcularTasa(per);
    
    let resultado = ((monto/((((1 + t)**n)-1)/t)));
    console.log("la cuota es " + resultado);
    return resultado;
}




//funcion flecha para el plazo definido en meses
const plazo = ((n1,n2) => (n1-n2)*12);
const vidaPromedio = n1 => 90 - n1;


// PROGRAMA



salir = confirm ("¿Quieres cotizar a un nuevo cliente? Presiona aceptar para continar y cancelar para salir");

while (salir == true){
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