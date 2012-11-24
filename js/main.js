var loadingTemplate = 'Cargando... <img src="/img/loading.gif"/> ';
var rssTemplate = function(entry){
        return ''+
                    '<article>'+                    
                        '<h1><a href="<!=link!>"><!=title!></a></h1>'+
                        '<p><!=contentSnippet!>'+
                        ' <a href="<!=link!>">Leer mas</a>'+
                        '</p>'+
                    '</article>';
    };
var richistron = {        
    feeds:{ 
        '#blog-feed' : 'http://blog.richistron.com/feeds/posts/default',
        '#hacker-feed' : 'http://hackergarage.mx/index.php/blog/rss.html',
        '#github-feed' : 'https://github.com/richistron.atom'
    },
    getFeeds: function(){
        $.each(this.feeds,function(selector,url){            
            $(selector).feeds({
                feeds: {
                    selector: url
                },            
                max: 3,
                loadingTemplate: loadingTemplate,
                entryTemplate: function(entry){                
                    return this.tmpl(rssTemplate(entry), entry);
                }
            });
        });
    },
    init: function(){        
        this.getFeeds();       
    }
};