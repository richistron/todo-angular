/* functions */

var richistron = {
    init: function(){
        this.loadFeeds();
        this.setListeners();
    },

    /* loadFeeds */
    loadFeeds: function(){
        $('#richistron').feeds(this.feedPreset({
            feedUrl: 'http://blog.richistron.com/feeds/posts/default',
            logo: 'img/logo120.png',
            Max: 5
        }));
        $('#gabo').feeds(this.feedPreset({
            feedUrl: 'http://feeds.feedburner.com/nethazard?format=xml',
            logo: 'http://www.gravatar.com/avatar/0fd37c4e5227d428aff0f48acd2273d4?s=120',
            Max: 5
        }));
        $('#bbhx').feeds(this.feedPreset({
            feedUrl: 'http://briceno.mx/feed/',
            logo: 'http://briceno.mx/wp-content/uploads/phpmx_box_125x125.png',
            Max: 5
        }));
    },
    /* load preset function */
    feedPreset: function(options){                        
        return {
            feeds: {
                feed: options.feedUrl
            },
            max: options.Max,
            preprocess: function ( feed ) {
            /**/
            },
            entryTemplate: function(entry) {
                return '';
            },
            onComplete: function(entries){                            
                id = $(this).attr('id');
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
                $(this).html(html);
                /* hide elements and display first */
                $('#'+id+' div.thumbnail').hide();
                $('#'+id+' div.thumbnail:eq(0)').show();
                $('#'+id+' .pagination ul li:eq(0)').addClass('active');
                /* carrusel listeners */                
                $('#' + id + ' .pagination a').click(richistron.paginationFeed);
            }
        };
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
        /*
         * Position
         */
        $('#secciones a.accordionBtnA').click(function(){                    
            dest = $(this).attr('href');
            $('html, body').delay(200).animate({
                scrollTop: ($(this).offset().top)
            }, 2000);                    
        });
        /*
         * Modal
         */     
        $('.modalBtn').click(function(){
            $('#modalMenu').modal('hide');                    
            dest = $(this).attr('href');
            $('html, body').delay(200).animate({
                scrollTop: ($(dest).offset().top)
            }, 2000);
        });
    }
};
    
/* DOM ready */
$(document).ready(function(){    
    richistron.init();
});