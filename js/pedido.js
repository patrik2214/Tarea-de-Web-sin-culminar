function inicio(){
	productos();
}

//  Creamos un Arreglo de Pedidos 
var listaPedidos = []

function productos(){
	$.ajax({
        url: 'php/productos.php',
        dataType: 'text',
        type: 'post',
        data: { },
        success: function( data ){
            $("#divlista").html(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function agregar(id,precio){
    
    //Obtenemos los datos 
    var cantidad = parseInt(document.getElementById("txtcantidad"+"["+id+"]").value)
    var IdCliente = sessionStorage.getItem('idcliente')
    var importe = cantidad * parseFloat(precio)

    //Ingresamos los datos dentro de un objeto
    var producto = {
        idProducto: id,
        precioProducto: precio,
        cantidadProducto: cantidad,
        importe:importe
    }

    //Agregamos el Objeto a la lista de pedidos
    listaPedidos.push(producto)

    //Lo convertimos a cadena 
    sessionStorage.setItem('pedidos', JSON.stringify(listaPedidos))
    
    //
    console.log(JSON.parse(sessionStorage.getItem('pedidos')))
}