describe( 'security-system', function() {

    beforeEach( angular.mock.module( 'BALPRES-ADMIN' ) );

    var $controller, AuthRepository, $httpBackend;

    beforeEach( inject( function( _$controller_, _AuthRepository_, _$httpBackend_ ) {
        $controller = _$controller_;
        AuthRepository = _AuthRepository_;
        $httpBackend = _$httpBackend_;

    }));

    describe( 'Auth controller', function() {

        $scope = {};

        var controller, mock_response;

        it( 'Valid login', function() {

            controller = $controller( 'auth-controller', { $scope : $scope } );

            mock_response = JSON.stringify({
                error : false,
                message : "Credenciales Correctas."
            });

            $httpBackend.when( 'GET', '../views/main.html' ).respond(200, {});

            $httpBackend.expectPOST( 'auth/login/' ).respond( 200, mock_response );

            $scope.login();

            $httpBackend.flush();

            expect( $scope.message ).toEqual( 'Credenciales Correctas.' );

        });

        it( 'Invalid login credentials', function() {

            controller = $controller( 'auth-controller', { $scope : $scope } );

            mock_response = JSON.stringify({
                error : true,
                message : "Su usuario o Contraseña es incorrecto."
            });

            $httpBackend.when( 'GET', '../views/main.html' ).respond(200, {});

            $httpBackend.expectPOST( 'auth/login/' ).respond( 200, mock_response );

            $scope.login();

            $httpBackend.flush();

            expect( $scope.errors ).toEqual( 'Su usuario o Contraseña es incorrecto.' );

        });

        it( 'Invalid login permission', function() {

            controller = $controller( 'auth-controller', { $scope : $scope } );

            mock_response = JSON.stringify({
                error : true,
                message : "Este usuario no tiene los permisos."
            });

            $httpBackend.when( 'GET', '../views/main.html' ).respond(200, {});

            $httpBackend.expectPOST( 'auth/login/' ).respond( 200, mock_response );

            $scope.login();

            $httpBackend.flush();

            expect( $scope.errors ).toEqual( 'Este usuario no tiene los permisos.' );

        });

    });

});
