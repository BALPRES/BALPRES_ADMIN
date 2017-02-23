app
    .factory( 'ContentsRepository', [ '$http', function( $http ) {
        return({
            getOurCompanyContents : function(){
                return $http({
                    method : 'GET',
                    url : 'contents/ourcompanycontent/'
                });
            },
            getOurServicesContents : function() {
                return $http({
                    method : 'GET',
                    url : 'contents/ourservicescontent/'
                });
            },
            getRecomendationsContents : function() {
                return $http({
                    method : 'GET',
                    url : 'contents/recomendations/'
                });
            },
            getOurPersonalContents : function() {
                return $http({
                    method : 'GET',
                    url : 'contents/ourpersonalcontent/'
                });
            },
            getOurProductsContents : function() {
                return $http({
                    method : 'GET',
                    url : 'contents/ourproductscontent/'
                });
            },
            editOurCompanyContent : function( data ) {
                return $http({
                    method : 'PUT',
                    url : 'contents/ourcompanycontent/',
                    data : JSON.stringify( data )
                });
            },
            editOurServicesContent : function( data ) {
                return $http({
                    method : 'PUT',
                    url : 'contents/ourservicescontent/',
                    data : JSON.stringify( data )
                });
            },
            editRecomendationsContent : function( data ) {
                return $http({
                    method : 'PUT',
                    url : 'contents/recomendations/',
                    data : JSON.stringify( data )
                });
            },
            editOurPersonalContent : function( data ) {
                return $http({
                    method : 'PUT',
                    url : 'contents/ourpersonalcontent/',
                    data : JSON.stringify( data )
                });
            },
            editOurProductsContent : function( data ) {
                return $http({
                    method : 'PUT',
                    url : 'contents/ourproductscontent/',
                    data : JSON.stringify( data )
                });
            }
        });
    }])
    .controller( 'contents-controller',
                    [   '$scope',
                        '$location',
                        'ContentsRepository',
                        'AuthRepository',
                        function(   $scope,
                                    $location,
                                    ContentsRepository,
                                    AuthRepository ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = "Contenidos del sitio";
            // load contents
            ContentsRepository.getOurCompanyContents().success( function( data ) {
                if( !data.error ) {
                    $scope.ourcompanycontents = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            ContentsRepository.getOurServicesContents().success( function( data ) {
                if( !data.error ) {
                    $scope.ourservicescontents = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            ContentsRepository.getRecomendationsContents().success( function( data ) {
                if( !data.error ) {
                    $scope.recomendationscontents = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            ContentsRepository.getOurPersonalContents().success( function( data ) {
                if( !data.error ) {
                    $scope.ourpersonalcontents = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            ContentsRepository.getOurProductsContents().success( function( data ) {
                if( !data.error ) {
                    $scope.ourproductscontents = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            // edit nuestra compañía
            // edit nuestros servicios
            // edit recomendaciones
            // edit nuestro personal
            // edit nuestros productos
        }
    }]);
