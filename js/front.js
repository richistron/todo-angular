/* JQuery plugins */

// Fancy Rss plugin
(function($){
    $.loadRss = function(tab){
        /* set feeds to load dynamically */
        var tab = tab;
        $.each(rssItems,function(index,section){
            if(tab == ('#' + index)){
                $.each(section,function(indexB,item){
                    var fedConf = feedPreset({
                        feedUrl: item.feedUrl,
                        logo: item.logo,
                        Max: item.Max
                    });                        
                    $('#' + indexB).feeds(fedConf);                      
                });
            }
        });
    };
    var rssItems = {
        'blogs' : {
            'richistron': {
                feedUrl: 'http://blog.richistron.com/feeds/posts/default',
                logo: 'img/logo120.png',
                Max: 5
            },
            'gabo': {
                feedUrl: 'http://feeds.feedburner.com/nethazard?format=xml',
                logo: 'img/cats/120x120.jpg',
                Max: 5
            },
            'bbhx': {
                feedUrl: 'http://briceno.mx/feed/',
                logo: 'img/cats/120x120.jpg',
                Max: 5
            },            
            'bbhx': {
                feedUrl: 'http://briceno.mx/feed/',
                logo: 'img/cats/120x120.jpg',
                Max: 5
            },
            'levhita': {
                feedUrl: 'http://blog.levhita.net/feed/',
                logo: 'img/cats/120x120.jpg',
                Max: 5
            }
        }
    };
    /* load preset function */
    var feedPreset = function(options){                        
        return {
            feeds: {
                feed: options.feedUrl
            },
            loadingTemplate: '<div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div>',
            max: options.Max,
            preprocess: function ( feed ) {
                
            },
            entryTemplate: function(entry) {
                return '';
            },
            onComplete: function(entries){                            
                var id = $(this).attr('id');                
                html = '';
                html += '<div class="pagination">'+
                '<ul>';
                $.each(entries,function(index,item){                    
                    i = index + 1;
                    html += '<li><a href="#'+id+'">'+i+'</a></li>';
                });
                html += '</ul>'+
                '</div>';
                var html = html;
                console.log(entries);
                $(this).fadeOut('fast',function(){
                    $(this).html($.tmpl( itemTemplate(options), entries )).append(html).fadeIn('fast');
                    /* hide elements and display first */
                    $('#'+id+' div.thumbnail').hide();
                    $('#'+id+' div.thumbnail:eq(0)').show();
                    $('#'+id+' .pagination ul li:eq(0)').addClass('active');
                    /* carrusel listeners */                
                    $('#' + id + ' .pagination a').click(paginationFeed);
                });                
            }
        };
    };   
    var paginationFeed = function(e){                    
        e.preventDefault();
        idParen = $(this).attr('href');
        $(idParen + ' .pagination li').removeClass('active');
        $(this).parent().addClass('active'); 
        $(idParen + ' div.thumbnail').hide();
        $(idParen + ' div.thumbnail:eq(' + (parseInt($(this).text()) - 1) + ')').show();        
        $(idParen + ' .pagination li a').bind('click',paginationFeed);
        $(this).unbind('click',paginationFeed);
    };
    var itemTemplate = function(options){
        return '<div class="thumbnail thumbnail-feed">'+
                    '<img src="' + options.logo + '" data-src="holder.js/120x120" class="pull-left" alt="${author}"/>'+
                    '<h3>${title}</h3>'+
                    '<p>${contentSnippet}</p>'+ 
                '</div>';
    };
})(jQuery);

/* functions */

var richistron = {
    init: function(){
        this.setListeners();
    },        
    setListeners: function(){
        $('#secciones a.accordionBtnA').click(this.mainNav);
        $('a.modalBtn').click(this.modalNav);
        /* runs once */        
        $('#secciones a.accordionBtnA').click(richistron.loadContent);
    },
    loadContent: function(){
        tabID = $(this).attr('href');
        $.loadRss(tabID);
        $(this).unbind('click',richistron.loadContent);
    },
    mainNav: function(e){
        e.preventDefault();        
        $($(this).data('parent') + ' .collapse.in').collapse('hide');                
        $($(this).attr('href')).collapse('show');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    },
    modalNav: function(e){
        $($(this).data('parent') + ' .collapse.in').collapse('hide'); 
        $($(this).attr('href')).collapse('show');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    }
};
    
/* DOM ready */
$(document).ready(function(){    
    richistron.init();
});