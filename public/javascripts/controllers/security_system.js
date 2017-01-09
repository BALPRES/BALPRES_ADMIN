app
    .factory( 'AuthRepository', [ '$http', '$cookies', '$location', '$rootScope', function( $http, $cookies, $location, $rootScope ) {
        return {
            // validateLogin : validates the username password on the api
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
            // isSessionSet : returns if the session is set on the cookies
            isSessionSet : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? false : true;
            },
            // getSession : returns the cookie session
            getSession : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? undefined : JSON.parse(userCookie);
            },
            // removeSession : removes the session from the cookies
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

            }
        }
    }])
    .controller( 'auth-controller', [ '$scope', 'AuthRepository', function( $scope, AuthRepository ) {
        $scope.login = function() {
            AuthRepository.login( $scope.username, $scope.password ).success( function( data ) {
                if( data.error ) {
                    $scope.errors = data.message;
                } else {
                    AuthRepository.viewVerification();
                }
            }).error( function( error ) {
                console.log( error );
            });
        };
    }]);
