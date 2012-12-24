<!DOCTYPE html>
<html lang="es">
    <head>
        <title>richistron.com | Otro dude más en el interwebs</title>
        <meta charset="utf-8" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="description" content="El blog del richistron">
        <meta name="keywords" content="richistron">
        <meta name="author" content="Ricardo Rivas">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="img/favicon.ico" />
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <link href="css/customized.css" rel="stylesheet" media="screen">
    </head>
    <body>        
        <div class="container-fluid">
            <!-- header -->
            <div id="header">
                header
            </div><!-- header -->
            <!-- secciones -->
            <div class="accordion" id="secciones">
                <div class="accordion-group">
                    <div class="accordion-heading seccionTitle">
                        <button class="btn btn-large btn-block" type="button" data-toggle="collapse" data-parent="#secciones" href="#blogs">
                            <h2>
                                Blogs
                            </h2>                         
                            <small>
                                bloggeros recomendados en temas diversos
                            </small>
                        </button>
                    </div>
                    <div id="blogs" class="accordion-body collapse">
                        <div class="accordion-inner">
                            Contenido de blogs
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">                    
                        <button class="btn btn-large btn-block" type="button" data-toggle="collapse" data-parent="#secciones" href="#comunidades">
                            <h2>
                                Comunidades
                            </h2>                         
                            <small>
                                Comunidades de apasionadeos a la tecnologia
                            </small>
                        </button>
                    </div>
                    <div id="comunidades" class="accordion-body collapse">
                        <div class="accordion-inner">
                            Contenido comunidades
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">                    
                        <button class="btn btn-large btn-block" type="button" data-toggle="collapse" data-parent="#secciones" href="#noticias">
                            <h2>
                                Noticias
                            </h2>                         
                            <small>
                                Sigue a los mejores sitios de tecnologia
                            </small>
                        </button>
                    </div>
                    <div id="noticias" class="accordion-body collapse">
                        <div class="accordion-inner">
                            Noticias
                        </div>
                    </div>
                </div>
            </div><!-- secciones -->
        </div>        
        <!-- javascript -->
        <script src="js/jquery.js"></script>
        <script src="js/feeds.js"></script>
        <script src="js/bootstrap.js"></script>
        <script src="js/front.js"></script>                    
        <script>            
            $(document).ready(function(){
            });
        </script><!-- javascript -->
    </body>
</html>