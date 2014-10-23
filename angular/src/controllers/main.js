TORE.controller('MainController', ['$sce', '$sceDelegate', 'feeds', function($sce, $sceDelegate) {
    'use strict';

    this.activeFeeds = [];
    this.entry = null;

    this.toggleFeed = function(feed) {
        var active = _.findWhere(this.activeFeeds, { link: feed.link });

        if(active) {
            this.activeFeeds.splice(this.activeFeeds.indexOf(active), 1);
        }
        else {
            this.activeFeeds.push(feed);
        }

        _.each(feed.entries, function(entry) {
            if(typeof entry.title === 'string') entry.title = $sce.trustAsHtml(entry.title);
            if(typeof entry.link === 'string') entry.link = $sceDelegate.trustAs('resourceUrl', entry.link);
            if(typeof entry.publishedDate === 'string') entry.publishedDate = moment(entry.publishedDate).fromNow();
        });
    };
}]);