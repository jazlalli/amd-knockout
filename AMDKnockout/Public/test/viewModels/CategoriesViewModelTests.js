define(['underscore', 'viewModels/CategoriesViewModel'], function(_, CategoriesViewModel) {

    describe('CategoriesViewModel', function() {
        var vm;

        beforeEach(function() {
            vm = new CategoriesViewModel();
        });

        describe('initialization', function () {
            it('should return an object', function() {
                expect(_.isObject(vm)).toBe(true);
            });

            it('should have a category property', function() {
                expect(vm.category).toBeDefined();
            });
            
            it('should convert category to observableArray function', function () {
                expect(_.isFunction(vm.category)).toBe(true);
            });

            it('should have a selectedCategory property', function() {
                expect(vm.selectedCategory).toBeDefined();
            });
            
            it('should convert selectedCategory to observable function', function () {
                expect(_.isFunction(vm.selectedCategory)).toBe(true);
            });
        });
    });
});