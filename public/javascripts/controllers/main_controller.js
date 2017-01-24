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
                templateUrl : '../views/pools/list.html'
            })
            .when( '/cabins', {
                templateUrl : '../views/cabins/list.html'
            })
            .when( '/areas', {
                templateUrl : '../views/areas/list.html'
            })
            // area types
            .when( '/areatypes/edit/:id', {
                templateUrl : '../views/areatypes/edit.html'
            })
            .when( '/areatypes/detail/:id', {
                templateUrl : '../views/areatypes/detail.html'
            })
            .when( '/areatypes/new/', {
                templateUrl : '../views/areatypes/new.html'
            })
            .when( '/areatypes', {
                templateUrl : '../views/areatypes/list.html'
            })
            // cabin types
            .when( '/cabintypes/edit/:id', {
                templateUrl : '../views/cabintypes/edit.html'
            })
            .when( '/cabintypes/detail/:id', {
                templateUrl : '../views/cabintypes/detail.html'
            })
            .when( '/cabintypes/new/', {
                templateUrl : '../views/cabintypes/new.html'
            })
            .when( '/cabintypes', {
                templateUrl : '../views/cabintypes/list.html'
            })
            // cabins
            .when( '/cabins/edit/:id', {
                templateUrl : '../views/cabins/edit.html'
            })
            .when( '/cabins/detail/:id', {
                templateUrl : '../views/cabins/detail.html'
            })
            .when( '/cabins/new/', {
                templateUrl : '../views/cabins/new.html'
            })
            .when( '/cabins', {
                templateUrl : '../views/cabins/list.html'
            })
            // pools
            .when( '/pools/edit/:id', {
                templateUrl : '../views/pools/edit.html'
            })
            .when( '/pools/detail/:id', {
                templateUrl : '../views/pools/detail.html'
            })
            .when( '/pools/new/', {
                templateUrl : '../views/pools/new.html'
            })
            // areas
            .when( '/areas/edit/:id', {
                templateUrl : '../views/areas/edit.html'
            })
            .when( '/areas/detail/:id', {
                templateUrl : '../views/areas/detail.html'
            })
            .when( '/areas/new/', {
                templateUrl : '../views/areas/new.html'
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
                AuthRepository.setMenu();
            }).error( function( error ) {
                console.log( "There was an error" );
            });
        };

    }])
    .controller( 'menu-cotroller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {
        AuthRepository.setMenu();
    }])
    .controller( 'main-controller', [ '$scope', function( $scope ) {
        $scope.title = "Main View";
        $scope.message = "This is a message!";
    }])
    .filter( 'dateTimeFilter', function() {
        return function( date ) {
            var d = new Date( date );
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return "Date : " + d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear() + " Time : " + (d.getHours() < 10 ? ("0"+d.getHours()) : d.getHours() ) + ":" + (d.getMinutes()<10?("0"+d.getMinutes()):d.getMinutes());
        };
    })
    .filter( 'dateFilter', function() {
        return function( date ) {
            var d = new Date( date );
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
        };
    });
