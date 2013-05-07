define(['underscore'], function (_) {
    _.extend(Array.prototype, {

        // sorts array of objects by the specified property, in the specified direction
        sortByProperty: function (property, direction) {
            this.sort(function(obj1, obj2) {
                var val1 = obj1[property],
                    val2 = obj2[property];
                
                if (direction === 'desc') {
                    if (val1 === val2)
                        return 0;
                    else if (val1 < val2)
                        return 1;
                    else
                        return -1;
                } else {
                    if (val1 === val2)
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