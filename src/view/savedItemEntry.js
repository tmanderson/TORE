define(['backbone', 'moment', 'text!view/html/savedItemEntry.html'], function(Backbone, moment, template) {
	'use strict';

	return Backbone.View.extend({
		tagName: 'section',

		template: _.template(template),

		initialize: function() {
			this.render();
		},

		render: function() {
			return this.$el.html(
				this.template(
					_.extend(this.model.toJSON(), { moment: moment })
				)
			);
		},

		remove: function() {
			this.$el.remove();
			this.stopListening();
		}
	});
});