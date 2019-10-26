<?php
require_once("conexion.php");
$idusuario = $_POST['idusuario'];
//enviamos la lista de pedidos
$pedidos =$_POST['pedidos'];

$resp=1;

try
{
	$cnx->beginTransaction();

	$a=$cnx->prepare("INSERT INTO pedido (idcliente,fechahora) VALUES (:idusuario,now())");
	$a->bindParam(":idusuario",$idusuario);
	$a->execute();

	$rs = $cnx->query("SELECT max(idpedido) as ultimo FROM pedido")  or $resp=0;
	$reg = $rs->fetchObject();
	$idpedido = $reg->ultimo;


	
	foreach($pedidos as $pedido){
		//
		$b=$cnx->prepare("INSERT INTO detalle (idpedido, idproducto, cantidad, precio, importe)	VALUES(:idpedido,:idproducto,:cantidad,:precio,:importe)");
		$total=$total+$pedido->importe;
		$b->bindParam(":idpedido",$idpedido);
		$b->bindParam(":idproducto",$pedido->idProducto);
		$b->bindParam(":cantidad",$pedido->cantidadProducto);
		$b->bindParam(":precio",$pedido->precioProducto);
		$b->bindParam(":importe",$pedido->importe);
		$b->execute();
	}

	//Actualizar el total
	$c=$cnx->prepare("UPDATE pedido SET total=:total WHERE idpedido=:idpedido");
	$c->bindParam(":total",$total);
	$c->bindParam(":idpedido",$idpedido);
	$c->execute();



	$cnx->commit();
} catch(PDOException $x) { 
	$cnx->rollBack();
	$resp=0; 
}
echo $resp;
?>