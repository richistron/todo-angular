<?php
header('Content-Type: application/json');

$feeds['comunidades'][] = array(
		'id' => 'richistron',
		'title' => "El blog del richistron",
		"slogan" => "Un blog de un dude y así",
		"url"  => "http://blog.richistron.com",
		"urlFeed"  => "http://blog.richistron.com/feeds/posts/default",
		"author" => "@richistron",		
		"logo" => "/img/logo120.png"
	);
$feeds['comunidades'][] = array(
		'id' => 'hg',
		'title' => "HackerGarage",
		"slogan" => "Una comunidad para innovar",
		"url"  => "http://hackergarage.mx/",
		"urlFeed"  => "http://hackergarage.mx/index.php/blog/rss.html",
		"author" => "@HackerGarage",
		"logo" => "/img/hg.png"
	);
$feeds['comunidades'][] = array(
		'id' => 'bbhx',
		'title' => "BASILIO BRICEÑO",
		"slogan" => "About Freedom, UNIX, Web Programming, among other stuff",
		"url"  => "http://briceno.mx/",
		"urlFeed"  => "http://briceno.mx/feed/",
		"author" => "@bbhx",
		"logo" => "/img/cats/logo120.jpg"
	);
$feeds['comunidades'][] = array(
		'id' => 'levhita',
		'title' => "RADIO LEVHITA",
		"slogan" => "LA RADIO QUE SÓLO SE LEE PERO AÚN ASÍ SE ESCUCHA…",
		"url"  => "http://blog.levhita.net/",
		"urlFeed"  => "http://blog.levhita.net/feed/",
		"author" => "@levhita",
		"logo" => "/img/levhita_logo.png"
	);

echo json_encode($feeds);
?>