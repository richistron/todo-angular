define ->
	class Tools
		constructor: ->
		log: (msg) -> if window.console? then console.log msg
	return Tools