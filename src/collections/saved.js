define(['backbone', 'models/feed'], function(Backbone, FeedModel) {
	'use strict';

	return Backbone.Collection.extend({
		model: FeedModel,

		initialize: function() {
			_.bindAll(this, 'add');

			this.load();

			this.on('add', this.save);
			this.on('remove', this.save);
			this.on('change', this.save);
		},

		save: function() {
			localStorage.setItem('tore-feeds', JSON.stringify(this.toJSON()));
		},

		load: function() {
			var data = JSON.parse(localStorage.getItem('tore-feeds') || '[]');
			this.add(data);
			// this.models[0].set('entries', []);
			// this.save();
		},

		activate: function(model) {
			if(!this.active || this.active && this.active !== model) {
				this.active = model;
				this.trigger('activate', model);
			}
		}
	});
});