function inicio(){
	detalle();
}

function detalle(){
	var idusuario = sessionStorage.getItem("idcliente");
	$.ajax({
        url: 'php/detalle.php',
        dataType: 'text',
        type: 'post',
        data: { 'idusuario': idusuario },
        success: function( data ){
            $("#detalle").html(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}