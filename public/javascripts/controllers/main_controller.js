var app = angular.module( 'BALPRES-ADMIN', [ 'ngRoute', 'ngCookies', 'ngMaterial' ] )
    .run( [ '$rootScope', '$location', 'AuthRepository', function( $rootScope, $location, AuthRepository ) {
        $rootScope.isLoggedIn = {
            show_app : true,
            show_auth : false
        };
        if( !AuthRepository.isSessionSet() ) {
            $rootScope.isLoggedIn.show_app = false;
            $rootScope.isLoggedIn.show_auth = true;
            $location.path( '/' );
        } else {
            $rootScope.isLoggedIn.show_app = true;
            $rootScope.isLoggedIn.show_auth = false;
        }
    }])
    .config([ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl : '../views/main.html'
            })
            .when( '/overview', {
                templateUrl : '../views/overview.html'
            })
            .when( '/dummy', {
                templateUrl : '../views/dummy.html'
            })
            // Albercas
            .when( '/pools', {
                templateUrl : '../views/pools/index.html'
            })
            .when( '/cabains', {
                templateUrl : '../views/cabains/index.html'
            })
            .otherwise({
                redirectTo : '/404'
            });
    }])
    .controller( 'navbar-controller', [ '$scope', 'AuthRepository', function( $scope, AuthRepository ) {
        $scope.project_name = "BALPRES-ADMIN";
        $scope.logout = function() {
            AuthRepository.logout().success( function( data ) {
                AuthRepository.viewVerification();
            }).error( function( error ) {
                console.log( "There was an error madafaka" );
            });
        };

    }])
    .controller( 'menu-cotroller', [ '$scope', '$rootScope', function( $scope, $rootScope ) {
        $rootScope.snd_menu_items = {
            cabains : {
                name : 'Cabañas',
                icon : 'fa fa-bed',
                status : '',
                link : '#/cabains'
            },
            pools : {
                name : 'Albercas',
                icon : 'fa fa-bath',
                status : '',
                link : '#/pools'
            }
        };
    }])
    .controller( 'main-controller', [ '$scope', function( $scope ) {
        $scope.title = "Main View";
        $scope.message = "This is a message!";
    }]);
