/* global google */
define(['backbone', 'models/feed'], function(Backbone, FeedModel) {
	'use strict';

	return Backbone.Collection.extend({
		query: null,

		model: FeedModel,

		initialize: function() {
			_.bindAll(this, 'search', 'parse', 'add', 'trigger');
			window.processSearchResults = this.resolve;
		},

		parse: function(data) {
			return data.entries;
		},

		search: function(query) {
			var p;
			
			if(!this.query && !query) return;

			if(this.models.length) this.reset();

			p = $.Deferred();
			google.feeds.findFeeds(this.query||query, p.resolve);

			return p.done(_.compose(
						_.partial(this.trigger, 'sync'),
							this.add,
								this.parse));
		},

		addResult: function(index) {

		}
	});
});