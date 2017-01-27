app
    .factory( 'AuthRepository', [ '$http', '$cookies', '$location', '$rootScope', function( $http, $cookies, $location, $rootScope ) {
        return {
            login : function( username, password ) {
                var jsonData = JSON.stringify({
                    username : username,
                    password : password
                });
                return $http({
                    method : 'POST',
                    url : 'auth/login/',
                    data : jsonData
                });
            },
            logout : function( ) {
                return $http({
                    method : 'POST',
                    url : 'auth/logout'
                });
            },
            isSessionSet : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? false : true;
            },
            getSession : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? undefined : JSON.parse(userCookie);
            },
            removeSession : function() {
                $cookies.remove( 'userdata' );
            },
            getFullAuthData : function(){
                return this.getSession().auth_data;
            },
            getFullJSONHeader : function(){
                return({
                    'Content-Type' : 'application/json',
                    'Authorization' : this.getFullAuthData()
                });
            },
            viewVerification : function() {

                if( !this.isSessionSet() ) {
                    $rootScope.isLoggedIn.show_app = false;
                    $rootScope.isLoggedIn.show_auth = true;
                    $location.path( '/' );
                    return false;
                } else {
                    $rootScope.isLoggedIn.show_app = true;
                    $rootScope.isLoggedIn.show_auth = false;
                    return true;
                }

            },
            getUserCat : function() {
                return $http({
                    url : 'auth/usercat/',
                    method : 'GET'
                });
            },
            setMenu : function() {
                $rootScope.snd_menu_items = {
                    general : {
                        overview : {
                            name : 'Overview',
                            icon : 'fa fa-eye',
                            status : 'active',
                            link : '#/overview'
                        },
                        tasks_super_admin : {
                            name : 'Tareas',
                            icon : 'fa fa-calendar-check-o',
                            status : '',
                            link : '#/tasks_super_admin'
                        },
                        tasks_admin : {
                            name : 'Tareas',
                            icon : 'fa fa-calendar-check-o',
                            status : '',
                            link : '#/tasks_admin'
                        },
                        tasks_general : {
                            name : 'Tareas',
                            icon : 'fa fa-calendar-check-o',
                            status : '',
                            link : '#/tasks_general'
                        }
                    },
                    objects : {
                        cabains : {
                            name : 'Cabañas',
                            icon : 'fa fa-bed',
                            status : '',
                            link : '#/cabins'
                        },
                        pools : {
                            name : 'Albercas',
                            icon : 'fa fa-bath',
                            status : '',
                            link : '#/pools'
                        },
                        areas : {
                            name : 'Áreas',
                            icon : 'fa fa-puzzle-piece',
                            status : '',
                            link : '#/areas'
                        }
                    },
                    sales : {
                        pos : {
                            name : 'Punto de venta',
                            icon : 'fa fa-credit-card',
                            status : '',
                            link : '#/pos'
                        },
                        sales : {
                            name : 'Ventas',
                            icon : 'fa fa-money',
                            status : '',
                            link : '#/sales'
                        },
                        reports : {
                            name : 'Reportes',
                            icon : 'fa fa-bar-chart',
                            status : '',
                            link : '#/reports'
                        }
                    },
                    settings : {
                        areatypes : {
                            name : 'Tipos de Área',
                            icon : 'fa fa-list-alt',
                            status : '',
                            link : '#/areatypes'
                        },
                        cabintypes : {
                            name : 'Tipos de Cabaña',
                            icon : 'fa fa-list-alt',
                            status : '',
                            link : '#/cabintypes'
                        },
                        contents : {
                            name : 'Contenidos',
                            icon : 'fa fa-align-left',
                            status : '',
                            link : '#/contents'
                        },
                        site : {
                            name : 'Sitio',
                            icon : 'fa fa-globe',
                            status : '',
                            link : 'http://balneariolaspalmas.co/'
                        }
                    }
                };

                var session_o = this.getSession();

                if( session_o ) {
                    switch (session_o.rol.value) {
                        case 1:
                            delete $rootScope.snd_menu_items.general.tasks_admin;
                            delete $rootScope.snd_menu_items.general.tasks_general;
                            break;
                        case 2:
                            delete $rootScope.snd_menu_items.general.tasks_super_admin;
                            delete $rootScope.snd_menu_items.general.tasks_general;
                            delete $rootScope.snd_menu_items.settings.areatypes;
                            delete $rootScope.snd_menu_items.settings.cabintypes;
                            break;
                        case 3:
                            delete $rootScope.snd_menu_items.general.tasks_super_admin;
                            delete $rootScope.snd_menu_items.general.tasks_admin;
                            delete $rootScope.snd_menu_items.objects;
                            delete $rootScope.snd_menu_items.settings;
                            delete $rootScope.snd_menu_items.sales.reports;
                            break;
                    }
                }
            },
            testTest : function() {
                return true;
            }
        }
    }])
    .controller( 'auth-controller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {

        $scope.login = function() {
            AuthRepository.login( $scope.username, $scope.password ).success( function( data ) {
                if( data.error ) {
                    $scope.errors = data.message;
                } else {
                    $scope.message = data.message;
                    AuthRepository.viewVerification();
                    AuthRepository.setMenu();
                }
            }).error( function( error ) {
                console.log( error );
            });
        };
    }]);
