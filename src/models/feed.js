define(['backbone'], function(Backbone) {
	'use strict';

	var hostregex = /(?:https?:\/\/)?(?:www\.)?(.*?\.\w{2,5}\/)/i;

	return Backbone.Model.extend({
		initialize: function() {
			_.bindAll(this, 'set', 'get', 'parse', 'diff');

			var link = this.get('link');

			this.set('host', (link.match(hostregex)[1] || link));
		},

		diff: function(entries) {
			var cache = this.get('entries');

			return _.filter(entries, function(entry) {
				return !(_.findWhere(cache, { link: entry.link }));
			});
		},

		fetch: function() {
			var p = $.Deferred();

			this.feed = new google.feeds.Feed(this.get('url'));
			this.feed.includeHistoricalEntries();
			this.feed.setNumEntries(20);
			
			this.feed.load(
				_.compose(
					p.resolve,
					_.partial(this.set, 'entries'),
					_.partial(_.union, (this.get('entries') || []) ),
					this.diff,
					_.property('entries'),
					_.property('feed')
				)
			);

			return p;
		}
	});
});