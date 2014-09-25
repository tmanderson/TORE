define([
	'backbone',
	'view/search',
	'view/savedItems'
], function(Backbone, SearchView, SavedItemsView) {
	'use strict';

	return Backbone.View.extend({
		events: {
			'click footer button' 			: 'toggleSettings',
			'click .result' 				: 'saveItem',
			'click .saved div' 				: 'selectItem',
			'click .saved .settings button' : 'removeItem'
		},

		initialize: function() {
			new SearchView({
				el: this.$('header'),
				collection: this.collection.feeds
			});

			new SavedItemsView({
				el: this.$('.saved'),
				collection: this.collection.saved
			});
		},

		toggleSettings: function() {
			this.$el.toggleClass('settings');
		},

		saveItem: function(e) {
			var modelIndex = $(e.target).closest('.result').index();
			this.$el.trigger('save', this.collection.feeds.at(modelIndex));
		},

		selectItem: function(e) {
			var id = $(e.target).closest('div[data-id]').attr('data-id');
			this.$el.trigger('select', this.collection.saved.get(id));
			return false;
		},

		removeItem: function(e) {
			var $target = $(e.target).closest('div[data-id]'),
				id = $target.attr('data-id');
			
			if($target.is('.active')) this.selectItem(e);

			this.$el.trigger('remove', this.collection.saved.get(id));
			if(!this.collection.saved.length) this.toggleSettings();
			return false;
		}
	});

});