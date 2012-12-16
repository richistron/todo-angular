/*
 * Author @richistron
 */
(function ($) {   
    
    $.fn.richistron = function (options) {
        /* options */
        options = $.extend({}, $.fn.richistron.config, options);                
        /* return */
        return this.each(function () {                                     
            $.fn.richistron.loading(this);
            $.fn.richistron.loadRss(this);
            return;
        });
    };
    
    $.fn.richistron.config = {                 
        maxFeeds: 10,
        loadingHtml: '<div class="progress progress-striped active span11"><div class="bar" style="width: 100%;"></div></div>' 
    };
    
    $.fn.richistron.token = function(){
        var rand = function() {
            return Math.random().toString(36).substr(2);
        };
        var token = function() {
            return 'richistron_element_' + rand();
        };        
        return token();
    };    
    
    
    $.fn.richistron.loading = function(element){
        html = $.fn.richistron.config.loadingHtml;
        $(element).append(html);
    };
    
    $.fn.richistron.loadRss = function(element){
        $(element).attr('id',$.fn.richistron.token());        
        id = $(element).attr('id');        
        title = $('#'+id+' dl dt').text();
        url = $('#'+id+' dl dd a').attr('href');
        $('#'+id).append('<div class="trash"></div>');
        $('#'+id+' div.trash').feeds({
            feeds: {
                feed1: url                
            },
            onComplete: function (entries) {
                $.fn.richistron.parse(this,entries);
            },            
            entryTemplate: '<div></div>',
            onComplete: function(entries){
                $.fn.richistron.parse(this,entries);
            },
            max: $.fn.richistron.config.maxFeeds
        });
    };
    
    $.fn.richistron.parse = function(element,entries){
        ani = 1000
        parent = $(element).parent();        
        $(parent).animation($.fn.richistron.template(entries));
    };
    
    $.fn.richistron.template = function(entries){
        html = '',links = '',tabs = '';        
        html = '<h2 class="brand">'+entries[0].feedTitle+'</h2>';
        $.each(entries,function(index,item){            
            (index == 0)? active = 'active' : active = ' ';
            id = $.fn.richistron.token();
            links += '<li class="'+active+' tablink"><a href="#'+id+'">'+item.title+'</a></li>';
            tabs += '<div id="'+id+'" class="tab-pane '+active+'">'+item.content+'</div>';
        });
        html += '<ul class="nav nav-list span4 pull-right">'+links+'</ul>'+
        '<div class="tab-content span7">'+tabs+'</div>';
        html = '<div class="span11 row">'+html+'</div>';
        return html;
    };
    
    $.fn.animation = function(html){        
        $(this).delay(2000).fadeOut(400, function() {
            $(this).html(html).setListeners();
            $(this).fadeIn(400);                        
        });
    };
    
    $.fn.setListeners = function(){
        $('li.tablink a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('a.goTop').click(function(){
            $(document).scrollTop(0);
        });
        $('a.goBot').click(function(){
            $(document).scrollTop($(document).height());
        });
    };

}(window.jQuery));