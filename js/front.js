/* functions */

var richistron = {
    init: function(){
        this.setFeeds();
        this.setListeners();
    },    
    /* set feeds to load dynamically */
    setFeeds: function(tab){
        var tab = tab;
        $.each(this.rssItems,function(index,section){
            if(tab == ('#' + index)){
                $.each(section,function(indexB,item){
                    var fedConf = richistron.feedPreset({
                        feedUrl: item.feedUrl,
                        logo: item.logo,
                        Max: item.Max
                    });                        
                    $('#' + indexB).feeds(fedConf);                      
                });
            }
        });
    },
    /* load preset function */
    feedPreset: function(options){                        
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
                $.each(entries,function(index,item){
                    html += '<div class="thumbnail">'+
                    '<img src="'+options.logo+'" data-src="holder.js/120x120" class="pull-left" alt="">'+
                    '<h3>'+item.title+'</h3>'+
                    '<p>'+item.contentSnippet+'</p>'+
                    '</div>';
                });
                html += '<div class="pagination">'+
                '<ul>';
                $.each(entries,function(index,item){                    
                    i = index + 1;
                    html += '<li><a href="#'+id+'">'+i+'</a></li>';
                });
                html += '</ul>'+
                '</div>';
                var html = html;
                $(this).fadeOut('fast',function(){
                    $(this).html(html).fadeIn('fast');
                    /* hide elements and display first */
                    $('#'+id+' div.thumbnail').hide();
                    $('#'+id+' div.thumbnail:eq(0)').show();
                    $('#'+id+' .pagination ul li:eq(0)').addClass('active');
                    /* carrusel listeners */                
                    $('#' + id + ' .pagination a').click(richistron.paginationFeed);
                });                
            }
        };
    },
    rssItems: {
        'blogs' : {
            'richistron': {
                feedUrl: 'http://blog.richistron.com/feeds/posts/default',
                logo: 'img/logo120.png',
                Max: 5
            },
            'gabo': {
                feedUrl: 'http://feeds.feedburner.com/nethazard?format=xml',
                logo: 'http://www.gravatar.com/avatar/0fd37c4e5227d428aff0f48acd2273d4?s=120',
                Max: 5
            },
            'bbhx': {
                feedUrl: 'http://briceno.mx/feed/',
                logo: 'http://briceno.mx/wp-content/uploads/phpmx_box_125x125.png',
                Max: 5
            },            
            'bbhx': {
                feedUrl: 'http://briceno.mx/feed/',
                logo: 'http://briceno.mx/wp-content/uploads/phpmx_box_125x125.png',
                Max: 5
            },
            'levhita': {
                feedUrl: 'http://blog.levhita.net/feed/',
                logo: 'http://levhita.net/images/levhita_logo.png',
                Max: 5
            }
        }
    },
    paginationFeed: function(e){                    
        e.preventDefault();
        idParen = $(this).attr('href');
        $(idParen + ' .pagination li').removeClass('active');
        $(this).parent().addClass('active'); 
        $(idParen + ' div.thumbnail').hide();
        $(idParen + ' div.thumbnail:eq(' + (parseInt($(this).text()) - 1) + ')').show();        
        $(idParen + ' .pagination li a').bind('click',richistron.paginationFeed);
        $(this).unbind('click',richistron.paginationFeed);
    },    
    setListeners: function(){
        $('#secciones a.accordionBtnA').click(this.mainNav);
        $('a.modalBtn').click(this.modalNav);
        /* runs once */        
        $('#secciones a.accordionBtnA').click(richistron.loadContent);
    },
    loadContent: function(){
        tabID = $(this).attr('href');
        richistron.setFeeds(tabID);
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
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    }
};
    
/* DOM ready */
$(document).ready(function(){    
    richistron.init();
});