function inicio(){
	registrar();
}

function registrar(){
    var idusuario = sessionStorage.getItem("idcliente")

    var pedidos= JSON.parse(sessionStorage.getItem('pedidos'))

	$.ajax({
        url: 'php/registrar.php',
        dataType: 'text',
        type: 'post',
        data: { 'idusuario': idusuario, 'pedidos':pedidos },
        success: function( data ){
            if(data==1){
            	$("#resultado").html("Su pedido fue enviado!!");
            } else {
            	$("#resultado").html("Error al registrar su pedido!!");
            }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}