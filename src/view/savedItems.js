define(['backbone', 'view/savedItem'], function(Backbone, SavedItemView) {
	'use strict';

	return Backbone.View.extend({
		views: [],

		initialize: function() {
			_.bindAll(this, 'addItem', 'removeItem');

			this.views = [];

			this.listenTo(this.collection, 'add', this.addNewItem);
			this.listenTo(this.collection, 'remove', this.removeItem);

			this.collection.each(this.addItem);
		},

		addNewItem: function(model) {
			this.addItem(model).click();
		},

		addItem: function(model) {
			this.views.push(
				new SavedItemView({
					model: model
				})
			);

			return _.last(this.views).render().appendTo(this.$el);
		},

		removeItem: function(model) {
			var view = _.findWhere(this.views, { model: model });
			view.remove();
			this.views.splice(this.views.indexOf(view), 1);
		}
	});
});