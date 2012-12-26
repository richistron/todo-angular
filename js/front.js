/* functions */
var feedPreset = function(options){                        
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
                (index==0)? display ='block': display = 'none';                                
                html += '<div class="thumbnail" style="display:'+display+';">'+
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
};
/* DOM ready */
$(document).ready(function(){
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
});