define(['ko', 'underscore'], function (ko, _) {

    _.extend(Array.prototype, {
        sortByProperty: function(property, direction) {
            this.sort(function(obj1, obj2) {
                var val1 = obj1[property],
                    val2 = obj2[property];
                
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
        }
    });
});