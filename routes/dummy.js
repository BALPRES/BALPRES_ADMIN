var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var cookieParser = require('cookie-parser');
var urlLib = require( 'url' );
var request = require( 'request' );
var http_helper = require( '../helpers/http_helper' );
var encryption_system = require( '../helpers/encryption_helper' );
var router = express.Router();
var jsonParser = bodyParser.json();

/**
* front end simple connection to the server side
**/
router.post( '/fesimpleconn', jsonParser, function( req, res ) {

    console.log( "front end simple connection; data:" );
    console.log( req.body );

    res.send( 'Front end simple connection was sended (this message is from the server side of the front end).' );

});

/**
* back end simple connection (no security)
**/
router.post( '/besimpleconn', jsonParser, function( req, res ) {

    var jsonData = req.body;

    request(
        {
            url : http_helper.get_api_uri( 'sbec/', '' ),
            method : 'POST',
            json : true,
            body : jsonData
        },
        function( error, response, body ){
            res.send( body.message );
        }
    );

});

/**
* basic authentication connection example
**/
router.post( '/basicauthtest', jsonParser, function( req, res ) {

    var jsonData = req.body;

    request(
        {
            url : http_helper.get_api_uri( 'baec/', '' ),
            method : 'POST',
            json : true,
            body : jsonData,
            headers : {
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            res.send( body.message );
        }
    );

});

/**
* encryption system example
**/
router.post( '/encrypttest', jsonParser, function( req, res ) {

    var en_data = encryption_system.encryptJSON( req.body );

    request(
        {
            url : http_helper.get_api_uri( 'esec/', '' ),
            method : 'POST',
            json : true,
            body : en_data,
            headers : {
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if( response.statusCode != 400 && response.statusCode != 403 ) {
                var data_from_server = encryption_system.decryptJSON( body );
                res.send( data_from_server.message );
            } else {
                res.status( 403 );
                res.send( "There was an error" );
            }
        }
    );

});

router.post( '/cookietest', jsonParser, function( req, res ) {
    res.send( 'This is sended by the front end server side on the cookie test.' );
});

module.exports = router;
