define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.View.extend({
		tagName: 'div',

		events: {
			'click': 'activate'
		},

		initialize: function() {
			_.bindAll(this, 'render', 'activate');
		},

		render: function() {
			return this.$el.html(this.model.get('title'));

		},

		activate: function() {
			this.model.collection.activate(this.model);
		}
	});
});