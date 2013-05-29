define(["knockout",
        "underscore",
        "viewModels/baseViewModel",
        "knockoutvalidation"],
    function(ko, _, BaseViewModel) {
        var User = function() {
            this.title = '';
            this.firstName = '';
            this.lastName = '';
            this.dobDate = '';
            this.dobMonth = '';
            this.dobYear = '';

            this.house = '';
            this.postcode = '';
            this.timeAtAddressYears = '';
            this.timeAtAddressMonths = '';

            this.annualIncome = '';
            this.bank = '';
            this.residentialStatus = '';
            this.employmentStatus = '';

            this.initialize();

            BaseViewModel.apply(this, arguments);
        };

        _.extend(User.prototype, BaseViewModel.prototype, {
            initialize: function() {
            },

            initializeValidation: function(validationData) {
                var self = this,
                    valAttr = '',
                    valObj;

                ko.validation.configure({
                    insertMessages: false,
                    messagesOnModified: false,
                    parseInputAttributes: true,
                    registerExtenders: true,
                });

                ko.validation.init();


                // maps validation parameters sent down from server to ko.validation
                for (valAttr in validationData) {
                    valObj = {};

                    if (validationData.hasOwnProperty(valAttr)) {

                        if (validationData[valAttr].valRequired)
                            valObj.required = validationData[valAttr].valRequired;

                        if (validationData[valAttr].valLengthMin)
                            valObj.minLength = validationData[valAttr].valLengthMin;

                        if (validationData[valAttr].valLengthMax)
                            valObj.maxLength = validationData[valAttr].valLengthMax;
                        
                        if (validationData[valAttr].valRangeMin)
                            valObj.min = validationData[valAttr].valRangeMin;

                        if (validationData[valAttr].valRangeMax)
                            valObj.max = validationData[valAttr].valRangeMax;

                        if (validationData[valAttr].valRegexPattern) {
                            valObj.pattern = {};
                            valObj.pattern.message = validationData[valAttr].valRegex;
                            valObj.pattern.params = validationData[valAttr].valRegexPattern;
                        }
                    }

                    self[valAttr].extend(valObj);
                }
                
                ko.validatedObservable(self);
            }
        });

        return User;
    });