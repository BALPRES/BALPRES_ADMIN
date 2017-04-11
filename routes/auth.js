var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var urlLib = require( 'url' );
var request = require( 'request' );
var http_helper = require( '../helpers/http_helper' );
var encryption_system = require( '../helpers/encryption_helper' );
var router = express.Router();
var jsonParser = bodyParser.json();

/**
* login function, requires username and password
**/
router.post( '/login', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'login/', '' ),
            method : 'POST',
            json : true,
            body :  encryption_system.encryptJSON( req.body ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            switch (response.statusCode) {
                case  400:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : "There was a BE connection error."
                    });
                    res.send( jsonData );
                    break;
                case 403:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : "There was an application error."
                    });
                    res.send( jsonData );
                    break;
                case 401 :
                    var data_from_server = encryption_system.decryptJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
                case 200 :
                    var data_from_server = encryption_system.decryptJSON( body ),
                        jsonData = JSON.stringify({
                            error : false,
                            message : data_from_server.message
                        }),
                        user_data = JSON.stringify({
                            username : req.body.username,
                            full_name : data_from_server.data['full_name'],
                            rol : data_from_server.data['rol'],
                            auth_data : encryption_system.encryptCookie( http_helper.get_user_basic_auth( req.body.username, req.body.password ) )
                        });
                    res.cookie( 'userdata', user_data );
                    res.send( jsonData );
                    break;
                default :
                    res.send( error );
                    break;
            }
        }
    );
});

/**
* logout function, this destroys the user cookie with the token and shit
**/
router.post( '/logout', jsonParser, function( req, res ) {
    try {
        res.clearCookie( 'userdata' );
        res.send( 204 );
    } catch( err ) {
        res.send( err );
    }
});

/**
* user catalog
**/
router.get( '/usercat', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    request(
        {
            url : http_helper.get_api_uri( 'usercat/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

module.exports = router;
