<?php
require_once("conexion.php");
$idusuario = $_POST['idusuario'];
$idproducto = $_POST['id'];
$cantidad = $_POST['cantidad'];
$precio = $_POST['precio'];
$importe = $cantidad * $precio;

try
{

	$b->bindParam(":idusuario",$idusuario);
	$b->bindParam(":idproducto",$idproducto);
	$b->bindParam(":cantidad",$cantidad);
	$b->bindParam(":precio",$precio);
	$b->bindParam(":importe",$importe);
	$b->execute();
	$resp=1;
	
} catch(PDOException $x) { 
	$resp=0; 
}
echo $resp;
?>