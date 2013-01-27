<?php
header('Content-Type: application/json');

$feeds['blogs'][] = array(
		'title' => "todo item",
		"content" => "kajdlkasjdlkasj askdjalkjdla ksajdlkasjdaljd ...",
		"clicks"  => 0
	);
$feeds['blogs'][] = array(
		'title' => "todo item 2",
		"content" => "adasdad...",
		"clicks"  => 0
	);

echo json_encode($feeds['blogs']);
?>