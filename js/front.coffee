richistron  = 
	init: ->
		this.setListeners()
	setListeners: ->
		$('#secciones a.accordionBtnA').click(this.mainNav)
		$('a.modalBtn').click(this.modalNav)
		$('#secciones a.accordionBtnA').click(richistron.loadContent)
	loadContent: ->
		tabID = $(@).attr('href')
		$.loadRss(tabID)
		$(@).unbind('click',richistron.loadContent)
	mainNav: (e) ->
		id = $(@).attr 'href'
		$( $(@).data('parent') + ' .collapse.in').collapse('hide')
		$(id).collapse('show')
		$('html, body').animate( scrollTop: $(id).offset().top , 600)
	modalNav: (e) ->
		$($(@).data('parent') + ' .collapse.in').collapse('hide')
		$( $(@).attr('href') ).collapse('show')
		$('html, body').animate( scrollTop: $($(@).attr('href')).offset().top, 600)
$(document).ready ->
	richistron.init()