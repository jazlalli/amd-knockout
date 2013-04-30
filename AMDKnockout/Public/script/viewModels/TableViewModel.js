define(['knockout', 'underscore', 'viewModels/BaseViewModel'],
    function (ko, _, BaseViewModel) {
        var CardsTableViewModel = function () {
            this.cards = [];
            
            this.selectedCategory = null;
            this.sortBy = 'DisplayOrder';
            this.sortByDirection = 'asc';
            this.pageSize = 10;
            this.currentPage = 1;
           
            BaseViewModel.apply(this, arguments);
        };

        _.extend(CardsTableViewModel.prototype, BaseViewModel.prototype, {
            initialize: function (options) {
                var self = this;
                self.selectedCategory('CreditCard');

                self.BalanceTransfer = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'CreditCard':
                        case 'Combined':
                        case 'BalanceTransfer':
                            return true;
                        case 'Purchase':
                        case 'Cashback':
                        case 'Rewards':
                        case 'PoorCredit':
                            return false;
                        default:
                            return false;
                    }
                }, self);
                
                self.BalanceTransferFee = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'BalanceTransfer':
                            return true;
                        case 'CreditCard':
                        case 'Combined':
                        case 'Purchase':
                        case 'Cashback':
                        case 'Rewards':
                        case 'PoorCredit':
                            return false;
                        default:
                            return false;
                    }
                }, self);
                
                self.Purchase = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'CreditCard':
                        case 'Combined':
                        case 'Purchase':
                            return true;
                        case 'BalanceTransfer':
                        case 'Cashback':
                        case 'Rewards':
                        case 'PoorCredit':
                            return false;
                        default:
                            return false;
                    }
                }, self);
                
                self.OfferDetails = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'Cashback':
                        case 'Rewards':
                        case 'PoorCredit':
                            return true;
                        case 'CreditCard':
                        case 'Combined':
                        case 'Purchase':
                        case 'BalanceTransfer':
                            return false;
                        default:
                            return false;
                    }
                }, self);
                
                self.Savings = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'BalanceTransfer':
                        case 'Purchase':
                        case 'Cashback':
                        case 'Rewards':
                            return true;
                        case 'CreditCard':
                        case 'Combined':
                        case 'PoorCredit':
                            return false;
                        default:
                            return false;
                    }
                }, self);
                
                self.Eligibility = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'BalanceTransfer':
                        case 'Purchase':
                        case 'Cashback':
                        case 'Rewards':
                        case 'CreditCard':
                        case 'Combined':
                        case 'PoorCredit':
                            return true;
                        default:
                            return false;
                    }
                }, self);
                
                self.Apr = ko.computed(function () {
                    switch (self.selectedCategory()) {
                        case 'PoorCredit':
                            return true;
                        case 'BalanceTransfer':
                        case 'Purchase':
                        case 'Cashback':
                        case 'Rewards':
                        case 'CreditCard':
                        case 'Combined':
                            return false;
                        default:
                            return false;
                    }
                }, self);
            }
        });

        return CardsTableViewModel;
    });