define(['backbone', 'view/searchItem'], function(Backbone, SearchItem) {
	'use strict';

	return Backbone.View.extend({
		tagName: 'div',

		initialize: function() {
			this.listenTo(this.model, 'remove', this.remove);
			this.render();
		},

		render: function() {
			this.$el.append(
				$('<span />').html(this.model.get('title'))
			);
		}
	});
});