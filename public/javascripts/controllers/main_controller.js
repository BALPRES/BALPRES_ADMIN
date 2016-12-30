var app = angular.module( 'BALPRES-ADMIN', [ 'ngRoute', 'ngCookies', 'ngMaterial' ] )
    .config([ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl : '../views/main.html'
            })
            .otherwise({
                redirectTo : '/404'
            });
    }])
    .controller( 'dummy-controller', [ '$scope', function( $scope ) {
        console.log( "This is dummy-controller call" );
    }])
    .controller( 'navbar-controller', [ '$scope', function( $scope ) {
        $scope.project_name = "BALPRES-ADMIN";
    }])
    .controller( 'main-controller', [ '$scope', function( $scope ) {
        console.log( "This is main controller" );
        $scope.title = "Main View";
        $scope.message = "This is a message!";
    }]);
