define(['underscore', 'viewModels/UserViewModel'], function (_, UserViewModel) {

    describe('UserViewModel', function () {
        var vm;

        beforeEach(function () {
            vm = new UserViewModel();
        });

        describe('initialization', function () {
            it('should return an object', function () {
                expect(_.isObject(vm)).toBe(true);
            });

            it('should have a firstName property', function () {
                expect(vm.firstName).toBeDefined();
            });

            it('should convert firstName to observable function', function () {
                expect(_.isFunction(vm.firstName)).toBe(true);
            });

            it('should have a lastName property', function () {
                expect(vm.lastName).toBeDefined();
            });

            it('should convert lastName to observable function', function () {
                expect(_.isFunction(vm.lastName)).toBe(true);
            });
            
            it('should have a house property', function () {
                expect(vm.house).toBeDefined();
            });

            it('should convert house to observable function', function () {
                expect(_.isFunction(vm.house)).toBe(true);
            });
            
            it('should have a postcode property', function () {
                expect(vm.postcode).toBeDefined();
            });

            it('should convert postcode to observable function', function () {
                expect(_.isFunction(vm.postcode)).toBe(true);
            });
        });
    });
});