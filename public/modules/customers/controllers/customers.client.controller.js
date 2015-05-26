'use strict';

// Customers controller
var customerModule = angular.module('customers');
customerModule.controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers', '$modal', '$log',
    function ($scope, $stateParams, $location, Authentication, Customers, $modal, $log) {
        this.authentication = Authentication;

        // Find a list of Customers
        this.customers = Customers.query();

        //Open a modal window to create a new single customer record
        this.modalCreate = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/customers/views/create-customer.client.view.html',
                controller: function ($scope, $modalInstance) {
                    $scope.form = {};
                    $scope.ok = function () {
                        if ($scope.form.customerCreateForm.$valid) {
                            $modalInstance.close();
                        }
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //Open a modal window to update a single customer record
        this.modalUpdate = function (size, selectedCustomer) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/customers/views/edit-customer.client.view.html',
                controller: function ($scope, $modalInstance, customer) {
                    $scope.customer = customer;
                    $scope.form = {};

                    $scope.ok = function () {
                        if ($scope.form.customerUpdateForm.$valid) {
                            $modalInstance.close($scope.customer);
                        }
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    customer: function () {
                        return selectedCustomer;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // Remove existing Customer
        this.remove = function (customer) {
            if (customer) {
                customer.$remove();

                for (var i in this.customers) {
                    if (this.customers [i] === customer) {
                        this.customers.splice(i, 1);
                    }
                }
            } else {
                this.customer.$remove(function () {
                });
            }
        };


    }
]);

customerModule.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
    function ($scope, Customers, Notify) {

        //channel options
        this.channelOptions = [
            'Facebook',
            'Twitter',
            'Email'
        ];

        // Create new Customer
        this.create = function () {
            // Create new Customer object
            var customer = new Customers({
                firstName: this.firstName,
                lastName: this.lastName,
                suburb: this.suburb,
                country: this.country,
                industry: this.industry,
                email: this.email,
                phone: this.phone,
                referred: this.referred,
                channel: this.channel
            });

            // Redirect after save
            customer.$save(function (response) {

                Notify.sendMsg('NewCustomer', {'id': response._id});

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

customerModule.controller('CustomersEditController', ['$scope', 'Customers',
    function ($scope, Customers) {

        //channel options
        $scope.channelOptions = [
            'Facebook',
            'Twitter',
            'Email'
        ];

        // Update existing Customer
        this.update = function (customer) {

            customer.$update(function () {
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

customerModule.directive('customerList', ['Customers', 'Notify', function (Customers, Notify) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'modules/customers/views/list-customers-template.client.view.html',
            link: function (scope, element, attrs) {

                //when a new customer is added, update the customer list
                Notify.getMsg('NewCustomer', function (event, data) {
                    scope.customersCtrl.customers = Customers.query();
                });
            }
        };
    }]);
