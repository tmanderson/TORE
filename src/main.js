define(['backbone', 'collections/feeds', 'view/search'], function(Backbone, Feeds, SearchView) {
	var feeds = new Feeds();

	new SearchView({
		el: $('aside header'),
		collection: feeds
	});
});