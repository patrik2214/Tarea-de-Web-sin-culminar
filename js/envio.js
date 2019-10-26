function inicio(){
	detalle();
}

function detalle(){
    var idusuario = sessionStorage.getItem("idcliente");
    
    var listaPedidos = JSON.parse(sessionStorage.getItem('pedidos'))

    var html = ""

    for (let i = 0; i < listaPedidos.length; i++) {
        const producto = listaPedidos[i];
        html += `
        <tr class='bg-warning text-dark'>
            <td>${producto.idProducto}</td>
			<td>${producto.precioProducto}</td>
			<td>${producto.cantidadProducto}</td>
			<td>${producto.importe}</td>
		  </tr>
        `
    }

    $('#detalle').html(html)
}