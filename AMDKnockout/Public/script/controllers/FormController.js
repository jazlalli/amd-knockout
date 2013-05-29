define(['jquery',
        'knockout',
        'underscore',
        'viewModels/FormViewModel',
        'shared/messageBus',
        'jqueryui'],
    function ($, ko, _, FormViewModel, messageBus) {

        var FormController = function () {
            var self = this;

            self.initialize.call(self);
        };

        _.extend(FormController.prototype, {
            initialize: function () {
                var self = this;
                
                self.viewModel = new FormViewModel();
                
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
                        duration: 300
                    }
                });
            },
            
            openForm: function (data, e) {
                App.Form.$formContainer.dialog('open');
                e.preventDefault();
            },
            
            submit: function () {
                var self = this;

                if (self.Form.user().isValid()) {
                    alert('shimmy shimmy yah shimmy yam shimmy yay');
                    App.Form.$formContainer.dialog('close');
                } else {
                    alert('form is not valid');
                }
            }
        });

        return FormController;
    });