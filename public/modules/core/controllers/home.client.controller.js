'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                
                $scope.stats = [
                    {
                        icon:'glyphicon-user',
                        color:'btn-success',
                        total:'20,300',
                        description:'TOTAL CUSTOMERS'
                    }, 
                    {
                        icon:'glyphicon-calendar',
                        color:'btn-primary',
                        total:'4,100',
                        description:'UPCOMING EVENTS'
                    }, 
                    {
                        icon:'glyphicon-edit',
                        color:'btn-success',
                        total:'635',
                        description:'NEW CUSTOMERS IN 2014'
                    }, 
                    {
                        icon:'glyphicon-record',
                        color:'btn-info',
                        total:'74,200',
                        description:'EMAILS SENT'
                    }, 
                    {
                        icon:'glyphicon-eye-open',
                        color:'btn-warning',
                        total:'205',
                        description:'FOLLOW UPS REQUESTED'
                    },
                    {
                        icon:'glyphicon-flag',
                        color:'btn-danger',
                        total:'7346',
                        description:'REFERRALS TO MODERATES'
                    }
                ];
	}
]);