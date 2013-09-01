
define ['tools'], (Tools)->
	
	t = new Tools

	class FeedsCollection extends Backbone.Collection
		constructor: -> super
		#model: FeedsModel

	return FeedsCollection