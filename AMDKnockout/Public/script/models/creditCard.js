define(["ko", "underscore", "viewModels/baseViewModel"], function (ko, _, BaseViewModel) {
    var CreditCard = function (options) {
        this.ProductId = 0;
        this.ProductCode = null;
        this.ImageUrl = null;
        this.Name = null;
        this.Category = null;
        this.DisplayOrder = null;
        this.Url = null;
        this.PurchasesText = null;
        this.BalanceTransferText = null;
        this.Pros = null;
        this.Cons = null;
        this.Features = null;
        this.IntroBalanceTransferRate = null;
        this.IntroBalanceTfrFee = null;
        this.IntroPurchaseRate = null;
        this.MinAge = null;
        this.MinIncome = null;
        this.SavingAmount = null;
        this.Score = null;
        this.BulletsPositive = null;
        this.OfferDetail = null;

        this.initialize();
        
        BaseViewModel.apply(this, arguments);
    };

    _.extend(CreditCard.prototype, BaseViewModel.prototype, {
        initialize: function () {
            var self = this;
            var prop;

            if (_.isFunction(self.OfferDetail)) {
                for (prop in self.OfferDetail()) {
                    if (self.OfferDetail().hasOwnProperty(prop)) {
                        if (self.OfferDetail()[prop]) {
                            self[prop] = self.OfferDetail()[prop];
                        }
                    }
                }

                delete self.OfferDetail;
            }
        }
    });

    return CreditCard;
});