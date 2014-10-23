define(['backbone', 'text!view/html/savedItem.html'], function(Backbone, html) {
	'use strict';

	return Backbone.View.extend({
		template: _.template(html),

		events: {
			'click': 'toggleActive'
		},

		initialize: function() {
			_.bindAll(this, 'render');
			this.$el.attr('data-id', this.model.id);
			
			this.listenTo(this.model, 'change:unread', this.render);
			this.listenTo(this.model, 'remove', this.remove);
		},

		render: function() {
			return this.$el.html(
				this.template(this.model.toJSON())
			);
		},

		toggleActive: function(e) {
			if($(e.target).closest('.settings').length) return;

			this.$el.toggleClass('active');
		}
	});
});