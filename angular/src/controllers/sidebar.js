TORE.controller('SidebarController', ['$sce', '$rootScope', '$scope', 'feeds', function($sce, $app, $scope, $feeds) {
    'use strict';

    this.searching = false;
    this.loading = false;
    this.query = '';
    this.feeds = [];
    this.searchResults = [];
    this.editing = false;

    $app.$on('feeds.update', function() {
        this.loading = false;
        
        this.feeds = _.map($feeds.saved(), function(feed) {
            feed.title = $sce.trustAsHtml(feed.title);
            return feed;
        });

        $scope.$digest();

    }.bind(this));

    this.search = function(e) {
        var self = this;

        $feeds.search(this.query).then(function(results) {
            self.searchResults = results.map(function(entry) {
                entry.title = $sce.trustAsHtml(entry.title);
                return entry;
            });
        });
    };

    this.saveFeed = function(feed) {
        this.loading = true;
        $feeds.save(feed);
    };

    this.resetQuery = function() {
        this.query = '';

        //  for animation to complete
        setTimeout(function() {
            this.searchResults = [];
        }.bind(this), 250);
    };

    this.toggleSearch = function(fixed) {
        this.searching = fixed || !this.searching;
    };

    this.removeFeed = function(feed) {
        this.feeds.splice(this.feeds.indexOf(feed), 1);
        $feeds.remove(feed);
    };
}]);