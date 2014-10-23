define(['backbone', 'text!view/html/savedItemEntry.html'], function(Backbone, EntryHtml) {
	'use strict';

	return Backbone.View.extend({
		feeds: null,

		entryTemplate: _.template(EntryHtml),

		events: {
			'click section': 'selectItem'
		},

		initialize: function() {
			_.bindAll(this, 'renderEntries', 'selectItem');
			this.feeds = [];
			this.$section = $('<section />');
		},

		renderEntries: function(savedItemModel) {
			var activeIndex = _.indexOf(this.feeds, savedItemModel),
				url = savedItemModel.get('url'),
				$section;

			if(activeIndex >= 0) {
				this.$('section[data-url="' + url + '"]').remove();
				this.feeds.splice(_.indexOf(this.feeds, savedItemModel));
			}
			else {
				this.feeds.push(savedItemModel);	
			}

			if(!this.feeds.length) {
				this.$el.html('<section class="no-feeds"><h2>NO FEEDS SELECTED</h2></section>');
			}
			else {
				this.$('.no-feeds').remove();
			}

			//	activeIndex >= 0 						--> We removed a section
			//	activeIndex >= 0 && !this.feeds.length 	--> First feed section added
			if(activeIndex >= 0 || activeIndex >= 0 && !this.feeds.length) return;

			$section = this.$section.clone().attr('data-url', url);

			this.$el.append(
				$section.html(
					_.map(_.last(this.feeds).get('entries'), function(entry) {
						entry.host = savedItemModel.get('host');
						return this.entryTemplate(entry);
					}, this).join('')
				)
			);
		},

		selectItem: function(e) {
			var index = $(e.target).closest('section').index();
			this.$el.trigger('select', this.feeds[index].getEntry(index));
			return false;
		}
	});
});