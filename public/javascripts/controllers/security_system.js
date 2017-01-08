app
    .factory( 'AuthRepository', [ '$http', '$cookies', function( $http, $cookies ) {
        return {
            // validateLogin : validates the username password on the api
            validateLogin : function( username, password ) {
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
            }
        }
    }]);
