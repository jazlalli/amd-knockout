define(['jquery', 'ko', 'underscore', 'viewModels/baseViewModel', 'viewModels/cardsViewModel', 'shared/messageBus'],
    function ($, ko, _, BaseViewModel, CardsViewModel, messageBus) {
        var CardsTableViewModel = function () {
            this.selectedCategory = null;

            this.BalanceTransfer = false;
            this.BalanceTransferFee = false;
            this.Purchase = false;
            this.OfferDetails = false;
            this.Savings = false;
            this.Eligibility = false;
            this.Apr = false;

            this.CardsViewModel = null;

            BaseViewModel.apply(this, arguments);
        };

        var setColumns = function () {
            var self = this;

            switch (self.selectedCategory()) {
                case 'CreditCard':
                case 'Combined':
                    self.BalanceTransfer(true);
                    self.BalanceTransferFee(false);
                    self.Purchase(true);
                    self.OfferDetails(false);
                    self.Savings(false);
                    self.Eligibility(true);
                    self.Apr(false);
                    break;
                case 'BalanceTransfer':
                    self.BalanceTransfer(true);
                    self.BalanceTransferFee(true);
                    self.Purchase(false);
                    self.OfferDetails(false);
                    self.Savings(true);
                    self.Eligibility(true);
                    self.Apr(false);
                    break;
                case 'Purchase':
                    self.BalanceTransfer(false);
                    self.BalanceTransferFee(false);
                    self.Purchase(true);
                    self.OfferDetails(false);
                    self.Savings(true);
                    self.Eligibility(true);
                    self.Apr(false);
                    break;
                case 'Cashback':
                case 'Rewards':
                    self.BalanceTransfer(false);
                    self.BalanceTransferFee(false);
                    self.Purchase(false);
                    self.OfferDetails(true);
                    self.Savings(true);
                    self.Eligibility(true);
                    self.Apr(false);
                    break;
                case 'PoorCredit':
                    self.BalanceTransfer(false);
                    self.BalanceTransferFee(false);
                    self.Purchase(false);
                    self.OfferDetails(true);
                    self.Savings(false);
                    self.Eligibility(true);
                    self.Apr(true);
                    break;
                default:
                    break;
            }
        };

        _.extend(CardsTableViewModel.prototype, BaseViewModel.prototype, {
            initialize: function (options) {
                var self = this;
                self.selectedCategory('CreditCard');
                self.CardsViewModel = new CardsViewModel();

                setColumns.call(self);

                messageBus.data.subscribe('category.changed', function (category) {
                    self.selectedCategory(category);
                    setColumns.call(self);
                });
            },

            sortByBalanceTransfer: function (data, e) {
                var self = this;

                if (self.BalanceTransfer()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'DurationofBalRateM',
                            sortByDirection: 'desc'
                        }
                    });
                }
            },
            
            sortByBalanceTransferFee: function (data, e) {
                var self = this;
                
                if (self.BalanceTransferFee()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'IntroBalanceTfrFee',
                            sortByDirection: 'asc'
                        }
                    });
                }
            },
            
            sortByPurchase: function (data, e) {
                var self = this;
                
                if (self.Purchase()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'DurationofPurchRateM',
                            sortByDirection: 'desc'
                        }
                    });
                }
            },
            
            sortBySavings: function (data, e) {
                var self = this;
                
                if (self.Savings()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'SavingAmount',
                            sortByDirection: 'desc'
                        }
                    });
                }
            },
            
            sortByEligibility: function (data, e) {
                var self = this;
                
                if (self.Eligibility()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'Score',
                            sortByDirection: 'desc'
                        }
                    });
                }
            },
            
            sortByApr: function (data, e) {
                var self = this;
                
                if (self.Apr()) {
                    messageBus.data.publish({
                        topic: 'sort',
                        data: {
                            sortByProperty: 'RepresentativeAPR',
                            sortByDirection: 'asc'
                        }
                    });
                }
            }
        });

        return CardsTableViewModel;
    });