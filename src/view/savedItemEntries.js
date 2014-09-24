define(['backbone', 'view/savedItemEntry'], function(Backbone, EntryView) {
	'use strict';

	return Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'fetchEntries', 'renderEntries');
			this.listenTo(this.collection, 'activate', this.fetchEntries);
		},

		fetchEntries: function(savedItemModel) {
			savedItemModel.fetch()
				.then(this.renderEntries);
		},

		renderEntries: function(savedItemModel) {
			var entries = savedItemModel.get('entries');

			this.views = _.map(entries, function(entry) {
				
				entry.host = savedItemModel.get('host');
				return new EntryView({
					model: new Backbone.Model(entry)
				});
			});

			this.$el.append(
				_.pluck(this.views, '$el')
			);
		}
	});
});