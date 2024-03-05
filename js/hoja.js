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
            spreadsheetId: '16s3hIJy3G1C0VWUrU1EdqBmHpV3adXencfGspQZ6syU',
            range: 'Productos!A:G',
        });
    } catch (err) {
        console.error(err);
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn("No se encontraron valores");
        return;
    }
    console.log(range.values);
    
    if(prodPublicados.length == 0){
        await range.values.forEach((fila) => {
        
            if (isNaN(parseInt(fila[0])) || fila[6] == 0) return;
            /*
            console.log(fila[0]);
            console.log(fila[1]);
            console.log(fila[2]);
            console.log(fila[3]);
            */
            const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
            productos.push(producto);
           
    
          });
          console.log("agrego array en primera vuelta!");
          console.log(productos);
        }else{
            let identificador = -1;
            let actualizar = -1;
            contadorNuevoProd = 0;
           await range.values.forEach((fila) => {
                
                if (isNaN(parseInt(fila[0])) || fila[6] == 0) return;
                identificador = parseInt(fila[0]);
                actualizar = parseInt(fila[5]);
                let i = 0;
                console.log("este es el primer id");
                console.log(prodPublicados[i].id);
                console.log(identificador);
                console.log(prodPublicados.length);
                while ((i < prodPublicados.length) && (prodPublicados[i].id != identificador)){
                    console.log("ENTRO EL WHILE"); 
                    i++;   
                }
                console.log("salgo del while ");
                console.log(prodPublicados[i].id);
                console.log(identificador);
                if ((i >= prodPublicados.length)){
                    const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
                    productos.push(producto);
                    contadorNuevoProd++;    
                    console.log("se cargo producto nuevo");
                }else{
                    if((prodPublicados[i].id == identificador) && (prodPublicados[i].estadoActualizado != actualizar)){
                        const producto = new Producto(fila[0],fila[1],fila[2],fila[3],fila[5],fila[6]);
                        producto.estadoActualizado = 1; //esto se elimina cuando cuando modificao la base de datos desde el codigo
                        console.log(productos[identificador - 1]);
                        productos[identificador - 1].contenedorProdDatos.remove();
                        console.log(producto);
                        productos[identificador - 1] = producto;
                        console.log(productos[identificador - 1]);
                       
                        console.log("se actualizo un producto");
                        //volver a 1 el campo modificado de la base de datos mientras tanto lo igualo desde el estado
                        }    
                    }
                
        
              });
              console.log("agrego producto en actualizacion se agregaron " + contadorNuevoProd);
              console.log(productos);
        }
     
   
 }
 

 async function editarEnBaseDatos(prod){
    try{
        // const total = (prod.precio * prod.stock);
        /*  id: prod.id,
                nombre: prod.nombre,
                precio: prod.precio,
                stock: prod.stock,
                total: tot,
                act: prod.estadoActualizado,
                db: prod.estadoBd,
                */   
            let tot = prod.precio * prod.stock;
            let totales = parseInt(tot);             
            String(totales);
            
            let id = prod.id;
            String(id);
            let precio = parseInt(prod.precio);
            String(precio);
            console.log("precio es string " + prod.precio);
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
            /*
            id,
            prod.nombre,
            precio,
            stock,
            totales,
            act,
            estado, 
            */
            //let valores = JSON.stringify(enviar);
            console.log("id: " + prod.id);
            id = parseInt(id);
            const filaEditar = (id + 1);
            console.log("fila a editar " + filaEditar);
            let response;
            response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: '16s3hIJy3G1C0VWUrU1EdqBmHpV3adXencfGspQZ6syU',
                range: `Productos!A${filaEditar}:G${filaEditar}`,
                values: [enviar],
                valueInputOption: "USER_ENTERED", 
            });
            console.log("ngrese los valore en BD");
            return response;
        }catch(error){
            console.warn(error);
        }
        
    }
