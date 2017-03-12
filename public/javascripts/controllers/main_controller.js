var app = angular.module( 'BALPRES-ADMIN', [ 'ngRoute', 'ngCookies', 'ngMaterial', 'ng-fusioncharts', 'ui.router', 'ui.calendar', 'ui.bootstrap', 'image-service', 'document-service', 'naif.base64' ] )
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
            .when( '/pools', {
                templateUrl : '../views/pools/list.html'
            })
            .when( '/cabins', {
                templateUrl : '../views/cabins/list.html'
            })
            .when( '/areas', {
                templateUrl : '../views/areas/list.html'
            })
            .when( '/tasks_super_admin', {
                templateUrl : '../views/tasks/list_sa.html'
            })
            .when( '/tasks_admin', {
                templateUrl : '../views/tasks/list_a.html'
            })
            .when( '/tasks_general', {
                templateUrl : '../views/tasks/list_g.html'
            })
            .when( '/reservationtypes', {
                templateUrl : '../views/reservationtypes/list.html'
            })
            .when( '/paymentstatus', {
                templateUrl : '../views/paymentstatus/list.html'
            })
            .when( '/promotions', {
                templateUrl : '../views/promotions/list.html'
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
            // reservationtypes
            .when( '/reservationtypes/edit/:id', {
                templateUrl : '../views/reservationtypes/edit.html'
            })
            .when( '/reservationtypes/detail/:id', {
                templateUrl : '../views/reservationtypes/detail.html'
            })
            .when( '/reservationtypes/new/', {
                templateUrl : '../views/reservationtypes/new.html'
            })
            // reservations
            .when( '/reservations/', {
                templateUrl : '../views/reservations/pos.html'
            })
            .when( '/reservations/cabin/new', {
                templateUrl : '../views/reservations/new_cabin.html'
            })
            .when( '/reservations/cabin/detail/:id', {
                templateUrl : '../views/reservations/detail_cabin.html'
            })
            .when( '/reservations/cabin/', {
                templateUrl : '../views/reservations/reservation_cabin.html'
            })
            .when( '/reservations/area/', {
                templateUrl : '../views/reservations/reservation_area.html'
            })
            .when( '/reservations/pool/', {
                templateUrl : '../views/reservations/reservation_pool.html'
            })
            // Payment status
            .when( '/paymentstatus/edit/:id', {
                templateUrl : '../views/paymentstatus/edit.html'
            })
            .when( '/paymentstatus/detail/:id', {
                templateUrl : '../views/paymentstatus/detail.html'
            })
            .when( '/paymentstatus/new/', {
                templateUrl : '../views/paymentstatus/new.html'
            })
            // Promotion status
            .when( '/promotions/edit/:id', {
                templateUrl : '../views/promotions/edit.html'
            })
            .when( '/promotions/detail/:id', {
                templateUrl : '../views/promotions/detail.html'
            })
            .when( '/promotions/new/', {
                templateUrl : '../views/promotions/new.html'
            })
            // general
            .when( '/settings/alertnumbers', {
                templateUrl : '../views/general/edit_alertnumbers.html'
            })
            .when( '/settings/alertemails', {
                templateUrl : '../views/general/edit_alertemails.html'
            })
            .when( '/settings/contactemail', {
                templateUrl : '../views/general/edit_contactemail.html'
            })
            .when( '/settings/ticketprices', {
                templateUrl : '../views/general/edit_ticketprices.html'
            })
            .when( '/settings/signature', {
                templateUrl : '../views/general/edit_signature.html'
            })
            .when( '/settings/', {
                templateUrl : '../views/general/settings.html'
            })
            // website
            .when( '/contents/ourcompany/', {
                templateUrl : '../views/website/edit_ourcompany.html'
            })
            .when( '/contents/ourservices/', {
                templateUrl : '../views/website/edit_ourservices.html'
            })
            .when( '/contents/recomendations/', {
                templateUrl : '../views/website/edit_recomendations.html'
            })
            .when( '/contents/ourpersonal/', {
                templateUrl : '../views/website/edit_ourpersonal.html'
            })
            .when( '/contents/ourproducts/', {
                templateUrl : '../views/website/edit_ourproducts.html'
            })
            .when( '/contents/', {
                templateUrl : '../views/website/contents.html'
            })
            .otherwise({
                redirectTo : '/404'
            });
    }])
    .controller( 'navbar-controller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {

        $scope.project_name = "BALPRES-ADMIN";
        $rootScope.user_info = AuthRepository.getSession();
        $scope.logout = function() {
            AuthRepository.logout().success( function( data ) {
                AuthRepository.viewVerification();
                AuthRepository.setMenu();
            }).error( function( error ) {
                $scope.errors = error;
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
            month[0] = "Enero";
            month[1] = "Febrero";
            month[2] = "Marzo";
            month[3] = "Abril";
            month[4] = "Mayo";
            month[5] = "Junio";
            month[6] = "Julio";
            month[7] = "Agosto";
            month[8] = "Septiembre";
            month[9] = "Octubre";
            month[10] = "Noviembre";
            month[11] = "Diciembre";
            return d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear() + " " + ( d.getHours() < 10 ? ("0"+d.getHours()) : d.getHours() ) + ":" + (d.getMinutes()<10?("0"+d.getMinutes()):d.getMinutes());
        };
    })
    .filter( 'dateFilter', function() {
        return function( date ) {
            var d = new Date( date );
            var month = new Array();
            month[0] = "Enero";
            month[1] = "Febrero";
            month[2] = "Marzo";
            month[3] = "Abril";
            month[4] = "Mayo";
            month[5] = "Junio";
            month[6] = "Julio";
            month[7] = "Agosto";
            month[8] = "Septiembre";
            month[9] = "Octubre";
            month[10] = "Noviembre";
            month[11] = "Diciembre";
            return ( d.getDate() + 1 ) + " " + month[d.getMonth()] + " " + d.getFullYear();
        };
    })
    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
                });
            }
        };
    });
