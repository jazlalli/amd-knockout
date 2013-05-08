define(['underscore', 'viewModels/CalculatorViewModel'], function (_, CalculatorViewModel) {

    describe('CalculatorViewModel', function () {
        var vm;

        beforeEach(function () {
            vm = new CalculatorViewModel();
        });

        describe('initialization', function () {
            it('should return an object', function() {
                expect(_.isObject(vm)).toBe(true);
            });

            it('should have a balance property', function() {
                expect(vm.balance).toBeDefined();
            });
            
            it('should convert balance to observable function', function () {
                expect(_.isFunction(vm.balance)).toBe(true);
            });
            
            it('should default balance to 2000', function () {
                expect(vm.balance()).toBe(2000);
            });
            
            it('should have a monthlyRepayment property', function () {
                expect(vm.monthlyRepayment).toBeDefined();
            });

            it('should convert monthlyRepayment to observable function', function () {
                expect(_.isFunction(vm.monthlyRepayment)).toBe(true);
            });

            it('should default monthlyRepatment to 400', function () {
                expect(vm.monthlyRepayment()).toBe(400);
            });
            
            it('should have a clearBalance property', function () {
                expect(vm.clearBalance).toBeDefined();
            });

            it('should convert clearBalance to observable function', function () {
                expect(_.isFunction(vm.clearBalance)).toBe(true);
            });

            it('should default clearBalance to true', function () {
                expect(vm.clearBalance()).toBe(true);
            });
            
            it('should have a monthlySpend property', function () {
                expect(vm.monthlySpend).toBeDefined();
            });

            it('should convert monthlySpend to observable function', function () {
                expect(_.isFunction(vm.monthlySpend)).toBe(true);
            });

            it('should default monthlySpend to 1000', function () {
                expect(vm.monthlySpend()).toBe(1000);
            });
            
            it('should have a higherFirstMonthSpend property', function () {
                expect(vm.higherFirstMonthSpend).toBeDefined();
            });

            it('should convert higherFirstMonthSpend to observable function', function () {
                expect(_.isFunction(vm.higherFirstMonthSpend)).toBe(true);
            });

            it('should default higherFirstMonthSpend to false', function () {
                expect(vm.higherFirstMonthSpend()).toBe(false);
            });
        });
    });
});