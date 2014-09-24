define([
	'backbone',
	'collections/feeds',
	'collections/saved',
	'view/search',
	'view/savedItems',
	'view/savedItemEntries'
], function(Backbone, Feeds, SavedFeeds, SearchView, SavedItemsView, SavedItemEntriesView) {
	'use strict';

	var feeds = new Feeds(),
		saved = new SavedFeeds(),
		views = {};

	new SearchView({
		el: $('aside header'),
		collection: feeds
	});

	new SavedItemsView({
		el: $('aside .saved'),
		collection: saved
	});

	new SavedItemEntriesView({
		el: $('main'),
		collection: saved
	});
	
	feeds.on('save', function(model) {
		saved.add(model);
	});
});