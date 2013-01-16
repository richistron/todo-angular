<!DOCTYPE html>
<html lang="es">
    <head>        
        <meta charset="UTF-8">
        <meta name="description" content="El blog del richistron">
        <meta name="keywords" content="richistron">
        <meta name="author" content="Ricardo Rivas">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="img/favicon.ico">
        <link href="css/style.css" rel="stylesheet/less" media="screen">
        <title>richistron.com | Otro dude más en el interwebs</title>
    </head>
    <body>  
        <header class="mainheader">
            <h1>Richistron.com</h1>
            <p>Otro dude más en el interwebs</p>
            <a href="#" class="logo">http://richistron.com/</a>
        </header>
        <nav>
            <ul>
                <li><a href="#">Comunidades</a></li>                
                <li><a href="#">Noticias</a></li>
                <li><a href="#">Blogs</a></li>                
            </ul>                                
        </nav>
        <div id="container">
            <section id="sitios">
                <div class="box">
                    <article>
                        <header>                            
                            <h1>
                                <a href="#">
                                    10 PHP code quality tools to avoid a mess in your projects
                                </a>
                            </h1>
                        </header>                        
                        <div class="thumb">
                            <img src="/img/cats/120x120.jpg" alt="logo"/>
                        </div>
                        <p>
                            When programming in any language there are certain common errors that everyone makes as they mature and evolve their ...
                            <a href="#" class="readmore">Leer más</a>
                        </p>                        
                        <span class="author"> Author: <strong> Fulanito </strong> | <time datetime="2011-01-26">Monday, January 26,2011</time></span>
                    </article>
                </div>
            </section>            
        </div>                    
        <footer>Footer</footer>
        <script src="js/libs.js"></script>
        <script src="js/backbone.js"></script>
        <script>
            /* Models */
            var ItemLi = Backbone.Model.extend({
                url: '/feeds.php'
            });                          
            /* items */
            var itemLi = new ItemLi({
                feedUrl: 'http://blog.richistron.com/feeds/posts/default',
                feedText: 'El blog del richistron'
            });
            /* views  */
            var ItemLiView = Backbone.View.extend({
                render: function(){
                    var htmlStr = "<li>" + this.model.get('feedUrl') + "</li>";
                    $(this.el).html(htmlStr);
                }
            });
            var itemLiView = new ItemLiView({
                model: itemLi
            });
            itemLiView.render();
            console.log(itemLiView.el);
            //console.log(itemLi.get('feedUrl'));
            //itemLi.save();
            // lvl 1 , min 5
        </script>        
    </body>
</html>