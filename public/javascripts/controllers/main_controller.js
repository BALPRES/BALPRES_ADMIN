var app = angular.module( 'BALPRES-ADMIN', [    'ngRoute',
                                                'ngCookies',
                                                'ngMaterial',
                                                'warrior-filters',
                                                'ng-fusioncharts',
                                                'ui.router',
                                                'ui.calendar',
                                                'ui.bootstrap',
                                                'crud-service',
                                                'image-service',
                                                'document-service',
                                                'naif.base64',
                                                'payment-service' ] )
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
                templateUrl : '../views/overview.html'
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
            // reports
            .when( '/sales/', {
                templateUrl : '../views/reports/sales.html'
            })
            .when( '/reports/', {
                templateUrl : '../views/reports/reports.html'
            })
            .when( '/404', {
                templateUrl : '../404.html'
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
        $scope.set_menu_state = function( element ) {
            AuthRepository.setActiveMenu( element );
        };
    }])
    .controller( 'main-controller', [ '$scope', function( $scope ) {
        $scope.title = "Main View";
        $scope.message = "This is a message!";
    }]);
