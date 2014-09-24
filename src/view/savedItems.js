define(['backbone', 'view/savedItem'], function(Backbone, SavedItemView) {
	'use strict';

	return Backbone.View.extend({
		views: [],

		initialize: function() {
			_.bindAll(this, 'addItem', 'removeItem');

			this.views = [];

			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'remove', this.removeItem);

			this.collection.each(this.addItem);
		},

		addItem: function(model) {
			this.views.push(
				new SavedItemView({
					model: model
				})
			);

			this.$el.append(
				_.last(this.views).render()
			);
		},

		removeItem: function(model) {
			var view = _.findWhere(this.views, { model: model });
			view.remove();
			this.view.splice(this.views.indexOf(view), 1);
		}
	});
});