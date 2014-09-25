define(['backbone', 'text!view/article.html'], function(Backbone, html) {
	'use strict';

	return Backbone.View.extend({
		template: _.template(html),

		events: {
			'click': 'close'
		},

		close: function(e) {
			if(e.target.tagName === 'ARTICLE') {
				//	trigger CSS animation
				var $iframe = this.$('iframe').css('opacity', 0);

				setTimeout(_.compose(
					_.debounce(
						_.bind(this.$el.removeClass, this.$el, 'active'),
						250
					), // delayed function call to remove the active class and trigger close animation
					_.bind($iframe.remove, $iframe)
				), 250);
			}
		},

		render: function(model) {
			this.model = model;
			this.$el.html(this.template(this.model.toJSON()));
			setTimeout(_.bind(this.$el.addClass, this.$el, 'active'), 250);
		}
	});
});