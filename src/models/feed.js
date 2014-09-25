define(['backbone'], function(Backbone) {
	'use strict';

	var hostregex = /(?:https?:\/\/)?(?:www\.)?(.*?\.\w{2,5}\/)/i;

	return Backbone.Model.extend({
		defaults: {
			unread: 0
		},

		initialize: function() {
			_.bindAll(this, 'set', 'get', 'parse', 'diff');

			var link = this.get('link');

			this.set('id', _.uniqueId('feed'));
			this.set('host', (link.match(hostregex)[1] || link));

			this.on('change:entries', this.setUnreadCount);
		},

		diff: function(entries) {
			var cache = this.get('entries'),
				newEntries;

			newEntries = _.filter(entries, function(entry) {
				return !(_.findWhere(cache, { link: entry.link }));
			});

			this.set('unread', (this.get('unread') || 0) + newEntries.length);
			return newEntries;
		},

		fetch: function() {
			var p = $.Deferred();

			if( +new Date() - new Date(this.get('last_updated')) < 60000*20 ) {
				return p.resolve(this);
			}

			this.set('last_updated', +new Date());

			this.feed = new google.feeds.Feed(this.get('url'));
			this.feed.includeHistoricalEntries();
			this.feed.setNumEntries(20);
			
			this.feed.load(
				_.compose(
					p.resolve, // resolve our promise
					_.partial(this.set, 'entries'), // set the new value
					_.partial(_.union, (this.get('entries') || []) ), // join the new items with our current
					this.diff, // filter out items we already have
					_.property('entries'), // get the entries property
					_.property('feed') // get the feed property
				)
			);

			return p;
		},

		getEntry: function(index) {
			this.set('unread', Math.max(0, this.get('unread') - 1));
			return new Backbone.Model(this.get('entries')[index]);
		}
	});
});