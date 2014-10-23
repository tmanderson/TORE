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
			var $btn = $(e.target).closest('button').toggleClass('active'),
				$input = $btn.siblings('input');

			if($btn.is('.active')) setTimeout(_.bind($input.focus, $input), 250);
		},

		handleKey: function(e) {
			var $menu = this.$('menu');

			switch(e.which) {
				case 13: this.collection.search(e.target.value); break;
				case 27: 
					if($menu.is('.results')) {
						this.closeMenu();
					}
					else {
						this.$('input').blur()
							.parent().find('button').toggleClass('active');
					}
			}	
		},

		closeMenu: function() {
			var $results = this.$('menu');
			setTimeout(_.bind($results.removeClass, $results, 'results'), 250);
		}
	});
});