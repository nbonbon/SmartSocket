<?php
$link = mysqli_connect('localhost','root','bitnami');

if(mysqli_connect_errno($link)) {
	$output = "Failed to connect to MySQL:" . mysqli_connect_error();
	include 'output.html.php';
	exit();
}

if (!$link)
{
	$output = 'Unable to connect to the database server.';
	include 'output.html.php';
	exit();
}

if (!mysqli_set_charset($link, 'utf8'))
{
	$output = 'Unable to set database connection encoding.';
	include 'output.html.php';
	exit();
}

if (!mysqli_select_db($link, 'smartsocket'))
{
	$output = 'Unable to locate the smartsocket database.';
	include 'output.html.php';
	exit();
}

if (isset($_GET['voltage']))
{
	$output = $_GET['voltage'];

	include 'output.html.php';
	exit();
}

$output = 'Database connection established.';
include 'output.html.php';
?>
