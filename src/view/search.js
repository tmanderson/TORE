define(['backbone', 'view/searchItem'], function(Backbone, SearchItem) {
	'use strict';

	return Backbone.View.extend({
		events: {
			'click button' 	: 'handleButton',
			'keyup input'  	: 'handleKey',
			'click .result' : 'closeMenu'
		},

		initialize: function() {
			this.views = [];

			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'sync', this.showResults);
			this.listenTo(this.collection, 'reset', this.handleReset);
		},

		addItem: function(model) {
			this.views.push(
				new SearchItem({ model: model })
			);

			this.$('menu').append(_.last(this.views).$el);
		},

		handleReset: function() {
			var views = this.views.concat([]);

			this.$('menu').removeClass('results');

			_.each(views, function(view) {
				view.remove();
			});
		},

		showResults: function() {
			this.$('menu').addClass('results');
		},

		handleButton: function(e) {
			var $btn = $(e.target).toggleClass('active');
			if($btn.is('.active')) $btn.siblings('input').wait(250).focus();
		},

		handleKey: function(e) {
			switch(e.which) {
				case 13: this.collection.search(e.target.value); break;
				case 27: e.target.blur();
			}

			this.$('menu').removeClass('results');
		},

		closeMenu: function() {
			var $results = this.$('menu');
			setTimeout(_.bind($results.removeClass, $results, 'results'), 250);
		}
	});
});