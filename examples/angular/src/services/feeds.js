TORE.factory('feeds', ['$http', '$q', '$rootScope', function($http, $q, $app) {
    'use strict';

    var saved = (JSON.parse(localStorage.getItem('tore-feeds') || '[]')),
        results = null;

    saved.forEach(createFeedFromData);

    function createFeedFromData(data) {
        var feed = new google.feeds.Feed(data.url);
        feed.setNumEntries(40);
        feed.load(setUnreadCount.bind(this, data));
    }

    function setUnreadCount(feed, data) {
        feed.entries = data.feed.entries;
        feed.unread = data.feed.entries.length || 0;
        $app.$broadcast('feeds.update');
    }

    function setSearchResults(deferred, data) {
        results = data.entries;
        deferred.resolve(_.cloneDeep(results));
    }

    return {
        search: function(query) {
            var deferred = $q.defer();
            google.feeds.findFeeds(query, setSearchResults.bind(this, deferred));
            return deferred.promise;
        },

        update: function(feed) {
            var deferred = $q.defer();
            feed.load(deferred.resolve);
            deferred.promise.then(setUnreadCount.bind(this, feed));
            return deferred.promise;
        },

        remove: function(feed) {
            feed = _.findWhere(saved, { link: feed.link });
            saved.splice(saved.indexOf(feed), 1);
            this.save();
        },

        save: function(feed) {
            if(feed) {
                feed = _.findWhere(results, { link: feed.link });
                saved.push(feed);
                createFeedFromData(feed);
                $app.$broadcast('feeds.saved');
            }

            localStorage.setItem('tore-feeds', JSON.stringify(saved));
        },

        saved: function() {
            return _.cloneDeep(saved);
        }
    };
}]);