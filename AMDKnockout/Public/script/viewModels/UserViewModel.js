define(["knockout",
        "underscore",
        "viewModels/BaseViewModel"],
    function (ko, _, BaseViewModel) {
        'use strict';

        var UserViewModel = function () {
            this.firstName = 'Multi';
            this.lastName = 'Balance';
            this.dobDate = 6;
            this.dobMonth = 9;
            this.dobYear = 1969;

            this.house = '1';
            this.postcode = 'SW1A 1AA';
            this.timeAtAddressYears = 15;
            this.timeAtAddressMonths = 10;

            this.annualIncome = 12;
            this.bank = null;

            BaseViewModel.apply(this, arguments);
        };

        _.extend(UserViewModel.prototype, BaseViewModel.prototype, {
            initialize: function () {
            }
        });

        return UserViewModel;
    });