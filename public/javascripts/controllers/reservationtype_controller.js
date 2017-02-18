app
    .factory( 'ReservationTypeRepository', [ '$http', function( $http ) {
        return({
            getAll : function() {
                return $http({
                    url : 'reservationtype',
                    method : 'GET'
                });
            },
            add : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/reservationtype',
                    method : 'POST',
                    data : jsonData
                });
            },
            getById : function( id ) {
                return $http({
                    url : '/reservationtype/' + id,
                    method : 'GET'
                });
            },
            update : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/reservationtype',
                    method : 'PUT',
                    data : jsonData
                });
            },
            delete : function( id ) {
                return $http({
                    url : '/reservationtype/' + id,
                    method : 'DELETE'
                });
            },
            validateData : function( data, scope ) {
                var ban = true;
                scope.errors = "";
                if( data.name.length < 1 || data.name.length > 100 ) {
                    ban = false;
                    scope.errors += "Por favor escriba un nombre correcto.";
                }
                if( data.description.length < 1 || data.description.length > 200 ) {
                    ban = false;
                    scope.errors += "Por favor escriba una descripción correcta.";
                }
                if( data.value == 0 ) {
                    ban = false;
                    scope.errors += "Por favor seleccione un valor correcto.";
                }
                return ban;
            }
        });
    }])
    .controller( 'reservationtype-controller',
                [   '$scope',
                    '$location',
                    '$routeParams',
                    '$mdDialog',
                    'AuthRepository',
                    'ReservationTypeRepository',
                    function(
                        $scope,
                        $location,
                        $routeParams,
                        $mdDialog,
                        AuthRepository,
                        ReservationTypeRepository ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = "Tipos de Reservación";

            var getAllReservationTypes = function() {
                ReservationTypeRepository.getAll().success( function( data ) {
                    if( !data.error ) {
                        var the_data = data.data;
                        $scope.reservationtypes = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            if( $routeParams.id ) {

                ReservationTypeRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.reservationtype = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function() {
                    if( ReservationTypeRepository.validateData( $scope.reservationtype, $scope ) ) {
                        ReservationTypeRepository.update( $scope.reservationtype ).success( function( data ) {
                            if( !data.error ) {
                                $scope.reservationtype = data.data;
                                $location.path( '/reservationtypes/detail/' + $scope.reservationtype.id );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                };

            } else {

                getAllReservationTypes();

                $scope.reservationtype = {
                    name : "",
                    description : "",
                    value : 0
                };

                $scope.add = function() {
                    if( ReservationTypeRepository.validateData( $scope.reservationtype, $scope ) ) {
                        ReservationTypeRepository.add( $scope.reservationtype ).success( function( data ) {
                            if( !data.error ) {
                                $scope.reservationtype = data.data;
                                $location.path( '/reservationtypes' );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                }

            }

            $scope.delete = function( e, id ){

                var confirm = $mdDialog.confirm()
                    .title('¿Desea borrar el registro?')
                    .textContent("Después de borrar esto no podrá ser recuperado.")
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Borrar Tipo de Reservación')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function() {
                    ReservationTypeRepository.remove( id ).success( function( data ) {
                        if( !data.error ) {
                            $location.path( "/reservationtypes" );
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