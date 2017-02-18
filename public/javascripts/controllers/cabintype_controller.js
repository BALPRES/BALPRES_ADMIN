app
    .factory( 'CabinTypeRepository', [ '$http', function( $http ) {
        return({
            getAll : function(  ) {
                return $http({
                    url : '/cabintype',
                    method : 'GET'
                });
            },
            add : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/cabintype',
                    method : 'POST',
                    data : jsonData
                });
            },
            getById : function( id ) {
                return $http({
                    url : '/cabintype/' + id,
                    method : 'GET'
                });
            },
            update : function( data ) {
                var jsonData = JSON.stringify(data);
                return $http({
                    url : '/cabintype/' + data.id,
                    method : 'PUT',
                    data : jsonData
                });
            },
            remove : function( id ) {
                return $http({
                    url : '/cabintype/' + id,
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
                if( data.rooms == 0 ) {
                    ban = false;
                    scope.errors += "Por favor agregué un número de cuartos válido. \n";
                }
                if( data.max_guests == 0 ) {
                    ban = false;
                    scope.errors += "Por favor agregué un Máximo válido. \n";
                }
                if( data.max_extra_guests == 0 ) {
                    ban = false;
                    scope.errors += "Por favor agregué un Extra válido. \n";
                }
                return ban;
            }
        });
    }])
    .controller( 'cabintype-controller',
                [   '$scope',
                    '$rootScope',
                    '$location',
                    '$routeParams',
                    '$mdDialog',
                    'CabinTypeRepository',
                    'AuthRepository',
                    function(
                        $scope,
                        $rootScope,
                        $location,
                        $routeParams,
                        $mdDialog,
                        CabinTypeRepository,
                        AuthRepository ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = "Tipo de cabaña";

            var allCabinTypes = function() {
                CabinTypeRepository.getAll().success( function( data ) {
                    if (!data.error) {
                        var the_data = data.data;
                        $scope.cabintypes = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    console.log( error );
                });
            };

            if( $routeParams.id ) {

                CabinTypeRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.cabintype = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function() {
                    if( CabinTypeRepository.validateData( $scope.cabintype, $scope ) ) {
                        CabinTypeRepository.update( $scope.cabintype ).success( function( data ) {
                            if( !data.error ) {
                                $scope.cabintype = data.data;
                                $location.path( '/cabintypes/detail/' + $scope.cabintype.id );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                };

            } else {

                allCabinTypes();

                $scope.cabintype = {
                    name : "",
                    description : "",
                    rooms : 0,
                    max_guests : 0,
                    max_extra_guests : 0
                };

                $scope.add = function() {

                    if( CabinTypeRepository.validateData( $scope.cabintype, $scope ) ) {
                        CabinTypeRepository.add( $scope.cabintype ).success( function( data ) {
                            if( !data.error ) {
                                $location.path( "/cabintypes" );
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
                    .ok('Borrar Tipo de Cabaña')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function() {
                    CabinTypeRepository.remove( id ).success( function( data ) {
                        if( !data.error ) {
                            allCabinTypes();
                            $location.path( "/cabintypes" );
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
