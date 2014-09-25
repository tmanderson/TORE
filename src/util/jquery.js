define(['jquery'], function() {
    "use strict";

    function bindWithArray(fn, context, args) {
        return function() {
            return fn.apply(context, args);
        }
    }

    function pushToQueue(name, fn, args) {
        var args = _.toArray(arguments).slice(2);
        this.data(name, (this.data(name)||[]).concat( bindWithArray(fn, this, args) ) );
    }

    $.fn.wait = function(delay) {
        var methodNames = _.methods(this),
            target      = this,
            proxy       = {};

        _.each(methodNames, function(name) {
            proxy[name] = _.compose(
                _.constant(proxy),
                _.bind(pushToQueue, target, 'wait-queue', target[name])
            );
        });

        if(!target.data('wait-timeout')) {
            target.data('wait-timeout', setTimeout(function() {
                    var queue = target.data('wait-queue');
                    while(queue.length) queue.shift()();
                    target.data('wait-timeout', null);
                }, delay)
            );
        }

        return proxy;
    }
});