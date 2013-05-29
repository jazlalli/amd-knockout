define(["jquery",
        "knockout",
        "underscore",
        'models/User',
        "viewModels/BaseViewModel"],
    function ($, ko, _, User, BaseViewModel) {
        'use strict';

        var FormViewModel = function () {
            this.user = null;

            BaseViewModel.apply(this, arguments);
        };

        _.extend(FormViewModel.prototype, BaseViewModel.prototype, {
            initialize: function() {
                var self = this;
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

                self.user(new User());
                self.user().initializeValidation(validationRules);
                self.initializeValidation.call(self);
            },
            
            initializeValidation: function () {
                var self = this,
                    firstLoad = true;

                for (var prop in self.user()) {
                    if (self.user().hasOwnProperty(prop)) {
                        if (prop !== 'errors' && prop !== 'isValid' && prop !== 'isAnyMessageShown') {

                            var propClassKey = prop + 'Class';

                            var computedClassGenerator = function (model, property) {
                                return function () {
                                    if (model[property].isValid() === false) {
                                        if (firstLoad === false) {
                                            return 'error';
                                        } else {
                                            return 'default';
                                        }
                                    } else {
                                        if (firstLoad === false) {
                                            return 'valid';
                                        } else {
                                            return 'default';
                                        }
                                    }
                                };
                            };

                            self[propClassKey] = ko.computed(computedClassGenerator(self.user(), prop), self);
                        }
                    }
                }
                
                firstLoad = false;
            }
        });

        return FormViewModel;
    });