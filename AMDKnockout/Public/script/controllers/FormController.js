define(['knockout',
        'underscore',
        'viewModels/UserViewModel',
        'shared/messageBus'],
    function (ko, _, UserViewModel, messageBus) {

        var FormController = function () {
            var self = this;

            self.initialize.call(self);
        };

        _.extend(FormController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new UserViewModel();
                self.setupSubscriptions.call(self);
            },
            
            setupSubscriptions: function () {
                var self = this;

                messageBus.data.subscribe('', function (data) {
                    
                });
            }
        });

        return FormController;
    });