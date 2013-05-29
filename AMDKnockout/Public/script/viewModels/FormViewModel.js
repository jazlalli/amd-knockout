define(["jquery",
        "knockout",
        "underscore",
        'models/User',
        "viewModels/BaseViewModel"],
    function ($, ko, _, User, BaseViewModel) {
        'use strict';

        var FormViewModel = function () {
            this.User = null;

            BaseViewModel.apply(this, arguments);
        };

        _.extend(FormViewModel.prototype, BaseViewModel.prototype, {
            initialize: function() {
                var self = this;

                // scrape the form DOM element to get all inputs and extract
                // the validation parameters into the validationRulse object
                var i,
                    validationRules = {},
                    hdform = document.getElementById("hdform"),
                    inputs = hdform.getElementsByTagName("input"),
                    selects = hdform.getElementsByTagName("select");

                for (i = 0; i < inputs.length; i += 1) {
                    validationRules[$(inputs[i])[0].name] = $(inputs[i]).data();
                }

                for (i = 0; i < selects.length; i += 1) {
                    validationRules[$(selects[i])[0].name] = $(selects[i]).data();
                }

                // instantiate the model and send in the validation params
                self.User(new User());
                self.User().initializeValidation(validationRules);

                // setup the dynamic validation css classes
                self.initializeValidationCss.call(self);
            },
            
            initializeValidationCss: function () {
                var self = this;

                // need to bypass validation on first page load
                var firstLoad = true;

                for (var prop in self.User()) {
                    if (self.User().hasOwnProperty(prop)) {

                        // excluding properties that ko.validation adds to the model
                        if (prop !== 'errors' && prop !== 'isValid' && prop !== 'isAnyMessageShown') {

                            var propClassKey = prop + 'Class';

                            // uses a generator function to produce the function that is passed to computed
                            self[propClassKey] = ko.computed(function(modelProperty) {
                                return function () {

                                    // HACKY HACK HACK
                                    // this computed doesn't get executed until the viewmodel property it
                                    // depends on is accessed, so i'm accessing it here to force it to run
                                    modelProperty();

                                    if (modelProperty.isValid() === true) {

                                        if (firstLoad === false) {
                                            return 'valid';
                                        } else {
                                            return 'default';
                                        }
                                        
                                    } else {

                                        if (firstLoad === false) {
                                            return 'error';
                                        } else {
                                            return 'default';
                                        }
                                        
                                    }
                                };
                            }(self.User()[prop]), self);
                        }
                    }
                }
                
                // switching validation on
                firstLoad = false;
            }
        });

        return FormViewModel;
    });