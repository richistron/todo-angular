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
                    (index==0)? active ='active': active = '';
                    i = index + 1;
                    html += '<li class="'+active+'"><a href="#'+id+'">'+i+'</a></li>';
                });
                html += '</ul>'+
                '</div>';
                $(this).html(html);
                $('#' + id + ' .pagination a').click(function(e){                                
                    e.preventDefault();
                    if(!$(this).parent().hasClass('active')){                                                        
                        selector = $(this).attr('href') + ' .pagination li'; 
                        next = parseInt($(this).text()) - 1;
                        $(selector).removeClass('active');
                        $(this).parent().addClass('active');
                        elements = $(this).attr('href') + ' .thumbnail';
                        elements = $(elements);
                        $.each(elements,function(index,item){
                            if($(item).css('display') == 'block'){
                                $(item).css('display','none');
                            }
                            if(next == index){
                                $(item).css('display','block');
                            }
                        });
                    }                                
                });
            }
        };
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