define(['underscore', 'shared/resourceManager'], function (_, resourceManager) {
    'use strict';

    var _root = '/SavingsCalculator';
    var _keys = [
        '/CalculateBalanceTransferSavingAmounts',
        '/CalculatePurchaseSavingAmounts',
        '/CalculateCashbackSavingAmounts',
        '/CalculateRewardsSavingAmounts'
    ];

    var _getSavings = function (data) {
        var _savings = [];

        //find the right key from array above
        var _key = _.find(_keys, function (key) {
            return key.indexOf(data.category) > -1;
        });

        if (_key) {
            resourceManager.get(_root + _key, data, function(result) {
                _savings = result;
            });

            _savings.sort(function (a, b) {
                return a.SavingAmount < b.SavingAmount
                    ? 1
                    : -1;
            });
        }

        return _savings;
    };

    return {
        getSavings: function (data) {
            return _getSavings(data);
        }
    };
});