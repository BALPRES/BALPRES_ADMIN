app
    .controller( 'overview-controller', [   '$scope',
                                            'AuthRepository',
                                            function(   $scope,
                                                        AuthRepository ) {
        if( AuthRepository.viewVerification() ){
            $scope.title = "Perfil";
        }
    }]);
