/**
 * MMe trae los productos desde la hoja de google sheets
 * de esta hoja: https://docs.google.com/spreadsheets/d/16s3hIJy3G1C0VWUrU1EdqBmHpV3adXencfGspQZ6syU/edit
 */


// creo una constante global productos qye luego sera array
const productos = [];

async function getProductos(){
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1pYta3ZsWJXMRpye0sUHxDq6I0EvNhbdADLYQLwWFD24',
            range: 'Productos!A:G',
        });
    } catch (err) {
        console.error(err);
        return;
    }
    const range = response.result; 
    console.log(range);

    if (!range || !range.values || range.values.length == 0) {
        console.warn("No se encontraron valores");
        return;
    }
    console.log(range.values);
    
    if(prodPublicados.length == 0){
        await range.values.forEach((fila) => {
        
            if (isNaN(parseInt(fila[0])) ) return; 
            
            const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
            productos.push(producto);
           
    
          });
         
        }else{
            let identificador = -1;
            let actualizar = -1;
            contadorNuevoProd = 0;
           await range.values.forEach((fila) => {
                
                if (isNaN(parseInt(fila[0])) || fila[6] == 0) return;
                identificador = parseInt(fila[0]);
                actualizar = parseInt(fila[5]);
                let i = 0;
              
                while ((i < prodPublicados.length) && (prodPublicados[i].id != identificador)){
                
                    i++;   
                }
    
                if ((i >= prodPublicados.length)){
                    const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
                    productos.push(producto);
                    contadorNuevoProd++;    
    
                }else{
                    if((prodPublicados[i].id == identificador) && (prodPublicados[i].estadoActualizado != actualizar)){
                        const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
                        producto.estadoActualizado = 1; 
                        console.log(productos[identificador - 1]);
                        productos[identificador - 1].contenedorProdDatos.remove();
                        console.log(producto);
                        productos[identificador - 1] = producto;
                        console.log(productos[identificador - 1]);
                       
                       
                        }    
                    }
                
              });
        }
     
   
 }
 

 async function editarEnBaseDatos(prod){
    try{ 
        let tot = prod.precio * prod.stock;
        let totales = parseInt(tot);             
        String(totales);
        let id = prod.id;
        String(id);
        let precio = parseInt(prod.precio);
        String(precio);
        let stock = prod.stock;
        String(stock);
        let act = prod.estadoActualizado;
        String(act);
        let estado = prod.estadoBd;
        String(estado); 
        const enviar = [
            prod.id,
            prod.nombre,
            prod.precio,
            prod.stock,
            totales,
            prod.estadoActualizado,
            prod.estadoBd,
        ]
        
        id = parseInt(id);
        const filaEditar = (id + 1);

        let response;
        response = await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1pYta3ZsWJXMRpye0sUHxDq6I0EvNhbdADLYQLwWFD24',
            
            range: `Productos!A${filaEditar}:G${filaEditar}`,
            values: [enviar],
            valueInputOption: "USER_ENTERED", 
        });
        
        return response;
    }catch(error){
        console.warn(error);
    }
        
}



async function altaEnBaseDatos(prod){
        try{ 
                let tot = prod.precio * prod.stock;
                let totales = parseInt(tot);             
                String(totales);
                
                let id = prod.id;
                String(id);
                let precio = parseInt(prod.precio);
                String(precio);
                let stock = prod.stock;
                String(stock);
                let act = prod.estadoActualizado;
                String(act);
                let estado = prod.estadoBd;
                String(estado); 
                const enviar = [
                    prod.id,
                    prod.nombre,
                    prod.precio,
                    prod.stock,
                    totales,
                    prod.estadoActualizado,
                    prod.estadoBd,
                ]
               
                id = parseInt(id);
                const filaAlta = (id + 1);
                let response;
                response = await gapi.client.sheets.spreadsheets.values.update({
                    spreadsheetId: '1pYta3ZsWJXMRpye0sUHxDq6I0EvNhbdADLYQLwWFD24',

                    range: `Productos!A${filaAlta}:G${filaAlta}`,
                    values: [enviar],
                    valueInputOption: "USER_ENTERED", 
                });
                
                return response;
            }catch(error){
                console.warn(error);
            }
            
        }


async function eliminarProducto(i){

    try{
        let prod = productos[i];

        if(contador1 == prod.indice){
            productos[i].estadoBd = 0;
            productos[i].contenedorProdDatos.style.display = "none";
            let tot = prod.precio * prod.stock;
            let totales = parseInt(tot);             
            String(totales);
            
            let id = prod.id;
            String(id);
            let precio = parseInt(prod.precio);
            String(precio);
            let stock = prod.stock;
            String(stock);
            let act = prod.estadoActualizado;
            String(act);
            let estado = prod.estadoBd;
            String(estado); 
            const enviar = [
                prod.id,
                prod.nombre,
                prod.precio,
                prod.stock,
                totales,
                prod.estadoActualizado,
                prod.estadoBd,
            ]
            
            id = parseInt(id);
            const filaBaja = (id + 1);
            let response;
            response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: '1pYta3ZsWJXMRpye0sUHxDq6I0EvNhbdADLYQLwWFD24',
                
                range: `Productos!A${filaBaja}:G${filaBaja}`,
                values: [enviar],
                valueInputOption: "USER_ENTERED", 
            });
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Se elimino el producto",
                showConfirmButton: false,
                timer: 2000
              });
            contador1 = 0;
            return response;
        }
            
    }catch(error){
        console.warn(error);
    }
}


    