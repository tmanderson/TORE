define(['backbone'], function(Backbone) {
	'use strict';

	var StateModel = Backbone.Model.extend({
		activeItem: null,
		activeArticle: null
	});

	return new StateModel();
});