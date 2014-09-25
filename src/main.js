define([
	'backbone',
	'app',

	'collections/feeds',
	'collections/saved',
	
	'view/sidebar',
	'view/savedItemEntries',
	'view/article'
], function(Backbone, app, Feeds, SavedFeeds, SidebarView, SavedItemEntriesView, ArticleView) {
	'use strict';

	var App = Backbone.View.extend({
		events: {
			'save aside'	: 'addFeed',
			'select aside' 	: 'viewFeed',
			'remove aside'	: 'removeFeed',
			'select main'	: 'viewArticle'
		},

		initialize: function() {
			this.feeds = new Feeds();
			this.saved = new SavedFeeds();

			this.sidebar = new SidebarView({
				el: this.$('aside'),
				collection: {
					feeds: this.feeds,
					saved: this.saved 
				}
			});

			this.feed = new SavedItemEntriesView({
				el: this.$('main'),
				collection: this.saved
			});

			this.article = new ArticleView({
				el: this.$('article')
			});
		},

		addFeed: function(e, model) {
			this.saved.add(model.toJSON());
		},

		removeFeed: function(e, model) {
			this.saved.remove(model);
			return false;
		},

		viewFeed: function(e, model) {
			model.fetch().done(
				_.bind(this.feed.renderEntries, model)
			);
			return false;
		},

		viewArticle: function(e, model) {
			this.article.render(model);
		}
	});

	new App({
		el: document.body
	});
});