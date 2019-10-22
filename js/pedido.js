function inicio(){
	productos();
}

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

    var IdCliente =sessionStorage.getItem("idcliente");
    var Id =sessionStorage.getItem("Id","["+id+"]");
    var Cantidad = sessionStorage.getItem("Cantidad",document.getElementById("txtcantidad"+"["+id+"]").value);
    var Precio = sessionStorage.getItem("Precio",precio);
 
    
    $.ajax({
        url: 'php/agregar.php',
        dataType: 'text',
        type: 'post',
        data: { 'idusuario':IdCliente,'id':"["+id+"]", 'cantidad':Cantidad, 'precio':precio },
        success: function( data ){
            console.log(data);
            
            var datos = JSON.parse(data);
            sessionStorage.setItem("idcliente",datos.idcliente);
            sessionStorage.setItem("Id",datos.id);
            sessionStorage.setItem("Cantidad",datos.Cantidad);
            sessionStorage.setItem("Precio",datos.Precio);
           
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}