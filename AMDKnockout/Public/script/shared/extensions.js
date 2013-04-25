define(['ko', 'underscore'], function (ko, _) {
    ko.observableArray.fn.sortByProperty = function (prop, direction) {

        if (!direction) {
            direction = 'asc';
        }

        this.sort(function (obj1, obj2) {
            var val1, val2;

            if (_.isFunction(obj1[prop])) {
                val1 = obj1[prop]();
            } else {
                val1 = obj1[prop];
            }

            if (_.isFunction(obj2[prop])) {
                val2 = obj2[prop]();
            } else {
                val2 = obj2[prop];
            }

            if (direction === 'desc') {
                if (val1 == val2)
                    return 0;
                else if (val1 < val2)
                    return 1;
                else
                    return -1;
            } else {
                if (val1 == val2)
                    return 0;
                else if (val1 < val2)
                    return -1;
                else
                    return 1;
            }
        });
    };
    
    ko.pauseableComputed = function (evaluatorFunction, evaluatorFunctionTarget) {
        var _cachedValue = '';
        var _isPaused = ko.observable(false);

        //the computed observable that we will return
        var result = ko.computed(function () {
            if (!_isPaused()) {
                //call the actual function that was passed in
                return evaluatorFunction.call(evaluatorFunctionTarget);
            }
            return _cachedValue;
        }, evaluatorFunctionTarget);

        //keep track of our current value and set the pause flag to release our actual subscriptions
        result.pause = function () {
            _cachedValue = this();
            _isPaused(true);
        }.bind(result);

        //clear the cached value and allow our computed observable to be re-evaluated
        result.resume = function() {
            _cachedValue = '';
            _isPaused(false);
        };

        return result;
    };
});