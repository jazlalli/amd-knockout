define(['underscore', 'viewModels/TableViewModel'], function (_, TableViewModel) {

    describe('TableViewModel', function () {
        var vm,
            options;

        describe('initialization', function () {

            beforeEach(function () {
                options = {};
                vm = new TableViewModel(options);
            });

            it('should return an object', function() {
                expect(_.isObject(vm)).toBe(true);
            });

            it('should have a cards property', function() {
                expect(vm.cards).toBeDefined();
            });
            
            it('should convert cards to observableArray function', function () {
                expect(_.isFunction(vm.cards)).toBe(true);
            });

            it('should have a pageSize property', function() {
                expect(vm.pageSize).toBeDefined();
            });
            
            it('should convert pageSize to observable function', function () {
                expect(_.isFunction(vm.pageSize)).toBe(true);
            });
            
            it('should default pageSize to 10', function () {
                expect(vm.pageSize()).toBe(10);
            });
            
            it('should have a currentPage property', function () {
                expect(vm.currentPage).toBeDefined();
            });

            it('should convert currentPage to observable function', function () {
                expect(_.isFunction(vm.currentPage)).toBe(true);
            });

            it('should default currentPage to 1', function () {
                expect(vm.currentPage()).toBe(1);
            });
            
            it('should have a selectedCategory property', function () {
                expect(vm.selectedCategory).toBeDefined();
            });

            it('should convert selectedCategory to observable function', function () {
                expect(_.isFunction(vm.selectedCategory)).toBe(true);
            });

            it('should default selectedCategory to null', function () {
                expect(vm.selectedCategory()).toBe(null);
            });
            
            it('should have a sortBy property', function () {
                expect(vm.sortBy).toBeDefined();
            });

            it('should convert sortBy to observable function', function () {
                expect(_.isFunction(vm.sortBy)).toBe(true);
            });

            it('should default sortBy to DisplayOrder', function () {
                expect(vm.sortBy()).toBe('DisplayOrder');
            });
            
            it('should have a sortByDirection property', function () {
                expect(vm.sortByDirection).toBeDefined();
            });

            it('should convert sortByDirection  to observable function', function () {
                expect(_.isFunction(vm.sortByDirection)).toBe(true);
            });

            it('should default sortByDirection  to asc', function () {
                expect(vm.sortByDirection()).toBe('asc');
            });
        });

        describe('initialization with options provided', function () {
            
            beforeEach(function () {
                options = {
                    selectedCategory: 'BalanceTransfer',
                    sortBy: 'SavingAmount',
                    sortDirection: 'desc'
                };

                vm = new TableViewModel(options);
            });

            it('should default selectedCategory to the value passed in', function () {
                expect(vm.selectedCategory()).toBe(options.selectedCategory);
            });
            
            it('should default sortBy to the value passed in', function () {
                expect(vm.sortBy()).toBe(options.sortBy);
            });
            
            it('should default sortByDirection to the value passed in', function () {
                expect(vm.sortByDirection()).toBe(options.sortDirection);
            });
        });
    });
});