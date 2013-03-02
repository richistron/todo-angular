<?php
header('Content-Type: application/json');

$feeds['comunidades'][] = array(
		'id' => 'richistron',
		'title' => "El blog del richistron",
		"slogan" => "Un blog de un dude y así",
		"url"  => "http://blog.richistron.com/feeds/posts/default"
	);
$feeds['comunidades'][] = array(
		'id' => 'hg',
		'title' => "HackerGarage",
		"slogan" => "Una comunidad para innovar",
		"url"  => "http://hackergarage.mx/index.php/blog/rss.html"
	);
$feeds['comunidades'][] = array(
		'id' => 'bbhx',
		'title' => "BASILIO BRICEÑO",
		"slogan" => "About Freedom, UNIX, Web Programming, among other stuff",
		"url"  => "http://briceno.mx/feed/"
	);
$feeds['comunidades'][] = array(
		'id' => 'levhita',
		'title' => "RADIO LEVHITA",
		"slogan" => "LA RADIO QUE SÓLO SE LEE PERO AÚN ASÍ SE ESCUCHA…",
		"url"  => "http://blog.levhita.net/"
	);

echo json_encode($feeds);
?>