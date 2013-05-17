define(['jquery',
        'knockout',
        'underscore',
        'viewModels/UserViewModel',
        'shared/messageBus',
        'jqueryui',
        'knockoutvalidation'],
    function ($, ko, _, UserViewModel, messageBus) {

        var FormController = function () {
            var self = this;

            self.initialize.call(self);
        };

        _.extend(FormController.prototype, {
            initialize: function () {
                var self = this;

                self.viewModel = new UserViewModel();
                self.$formContainer = $(".form-container");
                
                self.$formContainer.dialog({
                    autoOpen: false,
                    modal: true,
                    resizable: false,
                    width: 960,
                    position: ['middle', 40],
                    show: {
                        effect: "fade",
                        duration: 250
                    },
                    hide: {
                        effect: "explode",
                        duration: 250
                    }
                });
            },
            
            openForm: function (data, e) {
                App.Form.$formContainer.dialog('open');
                e.preventDefault();
            },
            
            submit: function () {
                var self = this;

                console.log('submitted form');

                if (self.Form.isValid()) {
                    alert('shimmy shimmy yah shimmy yam shimmy yay');
                    App.Form.$formContainer.dialog('close');
                } else {
                    return self.Form.isValid();
                }
            }
        });

        return FormController;
    });