define(['backbone', 'text!view/savedItemEntry.html'], function(Backbone, template) {
	'use strict';

	return Backbone.View.extend({
		tagName: 'section',

		template: _.template(template),

		initialize: function() {
			this.render();
		},

		render: function() {
			return this.$el.html( this.template(this.model.toJSON()) );
		},

		remove: function() {
			this.$el.remove();
			this.stopListening();
		}
	});
});