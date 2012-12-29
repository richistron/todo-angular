# Fancy feed plugin 
# by @richistron on twitter
# under MIT License http://opensource.org/licenses/MIT
jQuery ($) ->
	$.loadRss = (elementID) ->
		elements = $("#{elementID} div.rssItem")
		$.each elements , (index,element) ->			
			elementID = $(element).attr('id')
			elementID = "##{elementID}"
			url = $(elementID).data('feedurl')
			logo = $(elementID).data('feedlogo')
			elementPreset = presetFeed(url,3 , logo)
			$(elementID).feeds(elementPreset)

	# Functions	
	presetFeed = (url,max,logo)->		
		confObj = 
			feeds:
				feed: url
			max: max
			loadingTemplate: '<div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div>'
			preprocess: (feed) ->
			entryTemplate: (entry) ->
			onComplete: (entries) ->
				$(@).fadeOut('fast', ->					
					$(@).html( widgetTmpl(entries,logo,@) ).carruselPagination().fadeIn(2000)
				)
		return confObj

	#pagination listeners
	$.fn.carruselPagination = ->
		return $(@).each ->      		
			id = $(@).attr('id')
			parentID = "##{id}"
			#hide all and show fisrt
			$("#{parentID} .thumbnail-feed").hide()
			$("#{parentID} .thumbnail-feed:eq(0)").show()
			# add class active
			$("#{parentID} .pagination ul li:eq(0)").addClass('active')
			# pagination linkBehavior
			$("#{parentID} .pagination ul li a").click(linkBehavior)

	linkBehavior = (e) ->		
		e.preventDefault()		
		# return if click active
		if $(@).parent().hasClass('active') then return
		parent = $(@).attr('href')
		item = $(@).text()
		item = parseInt(item) - 1		
		# toggleClass
		$("#{parent} .pagination ul li").removeClass('active')
		$(@).parent().addClass('active')
		# toggleContent		
		selector = "#{parent} .thumbnail-feed:eq(#{item})"
		allSelector = "#{parent} .thumbnail-feed"
		#$('html, body').animate
		#	scrollTop: $(parent).offset().top
		#	600
		$(parent).fadeOut('slow', ->			
			$(allSelector).hide()
			$(selector).show()
			$(@).fadeIn('slow')
		)

	# Templates jQuery tmpl	
	widgetTmpl = (entries,logo,element) ->
		parent = $(element).attr('id');		
		feeds = []
		pages = []
		$.each entries , (index,item) ->
			tmpl = "<div class=\"row-fluid thumbnail thumbnail-feed\">
			<img src=\"#{logo}\" data-src=\"holder.js/120x120\" class=\"pull-left\" alt=\"#{item.author}\"/>
			<h3>#{item.title}</h3><p>#{item.contentSnippet}</p>
			</div>"
			index = index + 1
			pag = "<li><a href=\"##{parent}\">#{index}</a></li>"
			pages.push(pag)
			feeds.push( tmpl )
		items = feeds.join(' ')	
		pages = pages.join(' ')
		pagination = "<div class=\"pagination pagination-large\"><ul>#{pages}</ul></div>"
		conteiner = "<div class=\"row-fluid\">#{items} #{pagination}</div>"
		return conteiner
	return