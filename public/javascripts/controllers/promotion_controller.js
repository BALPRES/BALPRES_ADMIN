app
    .factory( 'PromotionRepository', [ '$http', function( $http ) {
        return({
            getAll : function() {
                return $http({
                    url : '/promotion',
                    method : 'GET'
                });
            },
            add : function( data ){
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/promotion',
                    method : 'POST',
                    data : jsonData
                });
            },
            getById : function( id ) {
                return $http({
                    url : '/promotion/' + id,
                    method : 'GET'
                });
            },
            update : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/promotion/' + data.id,
                    method : 'PUT',
                    data : jsonData
                });
            },
            remove : function( id ) {
                return $http({
                    url : '/promotion/' + id,
                    method : 'DELETE'
                });
            },
            validateData : function( data, scope ) {
                var ban = true;
                scope.errors = "";
                if( data.name.length < 1 || data.name.length > 100 ) {
                    ban = false;
                    scope.errors += "Por favor escriba un nombre válido. \n";
                }
                if( data.description.length < 1 || data.description.length > 200 ) {
                    ban = false;
                    scope.errors += "Por favor escriba una descripción válida. \n";
                }
                if( data.date_start.length < 1 || data.date_start.length > 200 ) {
                    ban = false;
                    scope.errors += "Por favor escriba una descripción válida. \n";
                }
                if( data.date_end.length < 1 || data.date_end.length > 200 ) {
                    ban = false;
                    scope.errors += "Por favor escriba una descripción válida. \n";
                }
                if( data.value < 0 ) {
                    ban = false;
                    scope.errors += "Por favor aregue un valor válido.";
                }
                return ban;
            }
        });
    }])
    .controller( 'promotion-controller',
                [   '$scope',
                    '$location',
                    '$routeParams',
                    '$mdDialog',
                    'PromotionRepository',
                    'AuthRepository',
                    function(   $scope,
                                $location,
                                $routeParams,
                                $mdDialog,
                                PromotionRepository,
                                AuthRepository ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = "Promociones";

            var allPromotions = function() {
                PromotionRepository.getAll().success( function( data ) {
                    if (!data.error) {
                        var the_data = data.data;
                        $scope.promotions = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            if( $routeParams.id ) {

                PromotionRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.promotion = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function() {
                    if( PromotionRepository.validateData( $scope.promotion, $scope ) ) {
                        PromotionRepository.update( $scope.promotion ).success( function( data ) {
                            if( !data.error ) {
                                $scope.promotion = data.data;
                                $location.path( '/promotions/detail/' + $scope.promotion.id );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                };

            } else {

                allPromotions();

                $scope.promotion = {
                    name : "",
                    description : "",
                    discount : 0,
                    date_start : "",
                    date_end : ""
                };

                $scope.add = function() {

                    $scope.promotion.date_start = document.getElementById( 'date_start' ).value;
                    $scope.promotion.date_end = document.getElementById( 'date_end' ).value;

                    if( PromotionRepository.validateData( $scope.promotion, $scope ) ) {
                        PromotionRepository.add( $scope.promotion ).success( function( data ) {
                            if( !data.error ) {
                                $location.path( "/promotions" );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                };
                $scope.searchChange = function() {
                    console.log( $scope.search_text );
                };
            }

            $scope.delete = function( e, id ){

                var confirm = $mdDialog.confirm()
                    .title('¿Desea borrar el registro?')
                    .textContent("Después de borrar esto no podrá ser recuperado.")
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Borrar Promoción')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function() {
                    PromotionRepository.remove( id ).success( function( data ) {
                        if( !data.error ) {
                            allPaymentStatus();
                            $location.path( "/promotions" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function(error) {
                        $scope.errors =  "Ha habido un error.";
                    });
                }, null );
            };
        }
    }]);
