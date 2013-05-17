define(["knockout",
        "underscore",
        "viewModels/BaseViewModel",
        "knockoutvalidation"],
    function (ko, _, BaseViewModel) {
        'use strict';

        var UserViewModel = function () {
            this.firstName = null;
            this.lastName = null;
            this.dobDate = null;
            this.dobMonth = null;
            this.dobYear = null;

            this.house = null;
            this.postcode = null;
            this.timeAtAddressYears = null;
            this.timeAtAddressMonths = null;

            this.annualIncome = null;
            this.bank = null;

            BaseViewModel.apply(this, arguments);
        };

        _.extend(UserViewModel.prototype, BaseViewModel.prototype, {
            initialize: function () {
                var self = this;

                ko.validation.configure({
                    registerExtenders: true,
                    messagesOnModified: false,
                    insertMessages: true,
                    parseInputAttributes: true
                });

                ko.validation.init();

                self.firstName.extend({ required: true });
                self.lastName.extend({ required: true });
                //self.dobDate.extend({ required: true });
                //self.dobMonth.extend({ required: true });
                //self.dobYear.extend({ required: true });

                //self.house.extend({ required: true, message: 'TELL ME WHERE YOU LIVE' });
                //self.postcode.extend({ required: true, message: 'TELL ME WHERE YOU LIVE' });
                //self.timeAtAddressMonths.extend({ required: true, message: 'How long have you lived at this address?' });
                //self.timeAtAddressYears.extend({ required: true, message: 'How long have you lived at this address?' });
                //self.annualIncome.extend({ required: true, message: 'This field is required' });
                //self.bank.extend({ required: true, message: 'This field is required' });

                ko.validatedObservable(self);
            }
        });

        return UserViewModel;
    });