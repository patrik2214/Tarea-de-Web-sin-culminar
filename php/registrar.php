<?php
require_once("conexion.php");
$idusuario = $_POST['idusuario'];

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


	
	while($reg=$rs->fetchObject()){
		$b=$cnx->prepare("INSERT INTO detalle (idpedido, idproducto, cantidad, precio, importe)	VALUES(:idpedido,:idproducto,:cantidad,:precio,:importe)");
		$total=$total+$reg->importe;
		$b->bindParam(":idpedido",$idpedido);
		$b->bindParam(":idproducto",$reg->idproducto);
		$b->bindParam(":cantidad",$reg->cantidad);
		$b->bindParam(":precio",$reg->precio);
		$b->bindParam(":importe",$reg->importe);
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