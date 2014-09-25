define(['backbone', 'view/savedItemEntry'], function(Backbone, EntryView) {
	'use strict';

	return Backbone.View.extend({
		events: {
			'click section': 'selectItem'
		},

		initialize: function() {
			_.bindAll(this, 'renderEntries', 'removeItems');
		},

		renderEntries: function(savedItemModel) {
			this.removeItems();

			if(savedItemModel === this.model) {	
				this.model = null;
				return;
			}

			this.model = savedItemModel;

			this.views = _.map(this.model.get('entries'), function(entry) {

				entry.host = savedItemModel.get('host');

				return new EntryView({
					model: new Backbone.Model(entry)
				});
			});

			this.$el.append(
				_.pluck(this.views, '$el')
			);
		},

		removeItems: function() {
			_.each(this.views, function(view) {
				view.remove();
			});

			this.$el.empty();
		},

		selectItem: function(e) {
			var index = $(e.target).closest('section').index();
			this.$el.trigger('select', this.model.getEntry(index));
			return false;
		}
	});
});