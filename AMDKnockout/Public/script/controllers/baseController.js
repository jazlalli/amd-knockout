define(['ko', 'underscore'], function (ko, _) {
    var BaseController = function (options) {
        this.initialize.call(this, options);
    };

    _.extend(BaseController.prototype, {
        initialize: function () {
            
        }
    });

    return BaseController;
});