<?php
header('Content-Type: application/json');

// comunidades
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
		'id' => 'geekchick',
		'title' => "geekchick.mx",
		"slogan" => "Tecnología para chicas",
		"url"  => "http://geekchick.mx/",
		"urlFeed"  => "http://geekchick.mx/feed/",
		"author" => "@geekchickmx",
		"logo" => "/img/geekchick_.png"
	);
$feeds['comunidades'][] = array(
		'id' => 'tequila',
		'title' => "Tequila Valley",
		"slogan" => "Es una comunidad abierta al desarrollo de contenidos y creación de nuevos medios, orientados al beneficio y crecimiento tecnológico del país.",
		"url"  => "http://www.tequilavalley.com/",
		"urlFeed"  => "http://www.tequilavalley.com/feed/",
		"author" => "@tequilavalley",
		"logo" => "/img/logotqv.png"
	);
$feeds['comunidades'][] = array(
		'id' => 'ruby',
		'title' => "Rails Mx",
		"slogan" => "Una comunidad de desarrolladores mexicanos e hispanohablantes. Un punto de encuentro para compartir experiencias y mejores prácticas sobre el mundo de rails.",
		"url"  => "http://rails.mx/",
		"urlFeed"  => "http://feeds.feedburner.com/railsmx",
		"author" => "@railsmx",
		"logo" => "/img/ruby-logo.png"
	);
$feeds['comunidades'][] = array(
		'id' => 'phpmx',
		'title' => "PHP México",
		"slogan" => "Twitter us hashtag!! #phpmx RT @phpmx",
		"url"  => "http://phpmexico.mx/",
		"urlFeed"  => "http://phpmexico.mx/rss.xml",
		"author" => "@phpmx",
		"logo" => "/img/phpmx300.png"
	);
// blogs
$feeds['blogs'][] = array(
		'id' => 'richistron',
		'title' => "El blog del richistron",
		"slogan" => "Un blog de un dude y así",
		"url"  => "http://blog.richistron.com",
		"urlFeed"  => "http://blog.richistron.com/feeds/posts/default",
		"author" => "@richistron",		
		"logo" => "/img/logo120.png"
	);
$feeds['blogs'][] = array(
		'id' => "mich",
		'title' => "Michelle Torres",
		"slogan" => "Escritos y publicaciones de una chica geek mexicana acerca de tecnología y software libre",
		"url"  => "http://michelle.slmx.org/",
		"urlFeed"  => "http://michelle.slmx.org/feed/",
		"author" => "@nmicht",
		"logo" => "/img/mich.png"
	);
$feeds['blogs'][] = array(
		'id' => 'gabo',
		'title' => "Gabriel Saldaña",
		"slogan" => "AEmacs, Web Development, free software, photography & lifestyle",
		"url"  => "http://feeds2.feedburner.com/nethazard",
		"urlFeed"  => "http://feeds2.feedburner.com/nethazard",
		"author" => "@gabrielsaldana",
		"logo" => "/img/gabo.jpeg"
	);
$feeds['blogs'][] = array(
		'id' => 'levhita',
		'title' => "RADIO LEVHITA",
		"slogan" => "LA RADIO QUE SÓLO SE LEE PERO AÚN ASÍ SE ESCUCHA…",
		"url"  => "http://blog.levhita.net/",
		"urlFeed"  => "http://blog.levhita.net/feed/",
		"author" => "@levhita",
		"logo" => "/img/levhita_logo.png"
	);
$feeds['blogs'][] = array(
		'id' => 'odiseo',
		'title' => "Odiseo.net",
		"slogan" => "Like rats building a maze from which later we'll try to escape",
		"url"  => "http://odiseo.net/",
		"urlFeed"  => "http://odiseo.net/feed",
		"author" => "@odiseo42",
		"logo" => "/img/monkey.png"
	);
$feeds['blogs'][] = array(
		'id' => 'bbhx',
		'title' => "BASILIO BRICEÑO",
		"slogan" => "About Freedom, UNIX, Web Programming, among other stuff",
		"url"  => "http://briceno.mx/",
		"urlFeed"  => "http://briceno.mx/feed/",
		"author" => "@bbhx",
		"logo" => "/img/cats/logo120.jpg"
	);
// noticias
$feeds['noticias'][] = array(
		'id' => 'sopitas',
		'title' => "Sopitas.com",
		"slogan" => "Un tipo muy afortunado! | Noticias, Deportes, Música, Tecnología",
		"url"  => "http://www.sopitas.com/",
		"urlFeed"  => "http://www.sopitas.com/site/feed/",
		"author" => "@Microsiervos",
		"logo" => "/img/sopitas.jpg"
	);
$feeds['noticias'][] = array(
		'id' => 'alt1040',
		'title' => "alt1040.com",
		"slogan" => "En Hipertextual creemos que es bueno compartir y apoyamos ampliamente el desarrollo y uso de las licencias Creative Commons, por tal razón los hemos apoyado en todo lo que nos ha sido posible. Hipertextual está asociado a Creative Commons México.",
		"url"  => "http://alt1040.com/",
		"urlFeed"  => "http://alt1040.com/feed",
		"author" => "Hipertextual",
		"logo" => "/img/hptx-logo-footer.png"
	);
$feeds['noticias'][] = array(
		'id' => 'conectica',
		'title' => "conecti.ca",
		"slogan" => "Android Aplicaciones Apple Apps BlackBerry CES Curiosidades Eventos Facebook Gadgets Geek Google Internet Ios Ipad IPhone Lanzamiento Microsoft México Móvil Música Negocios Nokia Noticias Redes Sociales RIM Rumores Samsung Seguridad Smartphones ",
		"url"  => "http://conecti.ca/",
		"urlFeed"  => "http://feeds.feedburner.com/feedconectica",
		"author" => "conecti.ca",
		"logo" => "/img/conecti.png"
	);
$feeds['noticias'][] = array(
		'id' => 'microsiervos',
		'title' => "microsiervos.com",
		"slogan" => "un blog de divulgación sobre tecnología, ciencia, informática y muchas cosas má",
		"url"  => "http://www.microsiervos.com/",
		"urlFeed"  => "http://feeds2.feedburner.com/microsiervos",
		"author" => "@Microsiervos",
		"logo" => "/img/logo-microsiervos-li.png"
	);

// empleos
$feeds['empleos'][] = array(
		'id' => 'hjobs',
		'title' => "Hacker Jobs",
		"slogan" => "Trabajos para hackers",
		"url"  => "http://jobs.hackergarage.mx/",
		"urlFeed"  => "http://jobs.hackergarage.mx/rss/all/all/",
		"author" => "@HackerGarage",
		"logo" => "/img/hg.png"
	);
if(isset($_GET['section'])){
	$section = $_GET['section'];
	echo json_encode($feeds[$section]);
}else{
	echo json_encode($feeds);
}
?>