app
    .factory( 'CabinRepository', [ '$http', function( $http ) {
        return({
            getAll : function(  ) {
                return $http({
                    url : '/cabin',
                    method : 'GET'
                });
            },
            add : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/cabin',
                    method : 'POST',
                    data : jsonData
                });
            },
            getById : function( id ) {
                return $http({
                    url : '/cabin/' + id,
                    method : 'GET'
                });
            },
            update : function( data ) {
                var jsonData = JSON.stringify(data);
                return $http({
                    url : '/cabin/' + data.id,
                    method : 'PUT',
                    data : jsonData
                });
            },
            remove : function( id ) {
                return $http({
                    url : '/cabin/' + id,
                    method : 'DELETE'
                });
            },
            validateData : function( data, scope ) {
                var ban = false;
                scope.errors = "";
                if( data.name.length > 1 && data.name.length < 100 ) {
                    ban = true;
                } else {
                    ban = false;
                    scope.errors += "Escriba un nombre válido. \n";
                }
                if( data.description.length > 1 && data.description.length < 500 ) {
                    ban = true;
                } else {
                    ban = false;
                    scope.errors += "Escriba una descripción válida. \n";
                }
                if( data.price > 0 ) {
                    ban = true;
                } else {
                    ban = false;
                    scope.errors += "Agregué un precio válido. \n";
                }
                if( data.cabin_type > 0 ) {
                    ban = true;
                } else {
                    ban = false;
                    scope.errors += "Seleccione un tipo de cabaña. \n";
                }
                return ban;
            }
        });
    }])
    .controller( 'cabin-controller',
                [   '$scope',
                    '$rootScope',
                    '$location',
                    '$routeParams',
                    '$mdDialog',
                    'CabinRepository',
                    'CabinTypeRepository',
                    'AuthRepository',
                    function(
                        $scope,
                        $rootScope,
                        $location,
                        $routeParams,
                        $mdDialog,
                        CabinRepository,
                        CabinTypeRepository,
                        AuthRepository ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = "Cabañas";

            var allCabins = function() {
                CabinRepository.getAll().success( function( data ) {
                    if (!data.error) {
                        var the_data = data.data;
                        $scope.cabins = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            var allCabinTypes = function() {
                CabinTypeRepository.getAll().success( function( data ) {
                    if (!data.error) {
                        var the_data = data.data;
                        $scope.cabintypes = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            if( $routeParams.id ) {

                CabinTypeRepository.getAll().success( function( data ) {

                    if( !data.error ) {

                        var the_data = data.data;
                        $scope.cabintypes = the_data.data;

                        CabinRepository.getById( $routeParams.id ).success( function( d ) {
                            if( !d.error ) {
                                $scope.cabin = d.data;
                                $scope.cabin.price = parseFloat( $scope.cabin.price );
                                $scope.cabin.cabin_type = $scope.cabintypes.find( ct => ct.id == $scope.cabin.cabin_type );
                            } else {
                                $scope.errors = d.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    } else {
                        $scope.errors = data.message;
                    }

                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function() {

                    $scope.cabin.cabin_type = $scope.cabin.cabin_type.id;

                    if( CabinRepository.validateData( $scope.cabin, $scope ) ) {
                        CabinRepository.update( $scope.cabin ).success( function( data ) {
                            if( !data.error ) {
                                $scope.cabin = data.data;
                                $location.path( '/cabins/detail/' + $scope.cabin.id );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function( error ) {
                            $scope.errors = error;
                        });
                    }
                };

            } else {

                allCabins();
                allCabinTypes();

                $scope.cabin = {
                    name : "",
                    description : "",
                    cabin_type : 0,
                    price : 0
                };

                $scope.add = function() {

                    $scope.cabin.cabin_type = $scope.cabin.cabin_type.id;

                    if( CabinRepository.validateData( $scope.cabin, $scope ) ) {
                        CabinRepository.add( $scope.cabin ).success( function( data ) {
                            if( !data.error ) {
                                $scope.cabin = data.data;
                                $scope.cabin.price = parseFloat( $scope.cabin.price );
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
                    .ok('Borrar Cabaña')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function() {
                    CabinRepository.remove( id ).success( function( data ) {
                        if( !data.error ) {
                            allCabins();
                            $location.path( "/cabins" );
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
