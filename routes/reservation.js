'use strict';

var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var urlLib = require( 'url' );
var request = require( 'request' );
var http_helper = require( '../helpers/http_helper' );
var encryption_system = require( '../helpers/encryption_helper' );
var router = express.Router();
var jsonParser = bodyParser.json();

/**
* reservation list pettition
**/
router.get( '/cabin', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabin/new/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ) {
            if( response ) {
                switch (response.statusCode) {
                    case 200:
                        var data_from_server = encryption_system.decryptLongJSON( body );
                        var jsonData = JSON.stringify({
                            error : false,
                            data : data_from_server.data
                        });
                        res.send( jsonData );
                        break;
                    default:
                        var data_from_server = encryption_system.decryptLongJSON( body );
                        var jsonData = JSON.stringify({
                            error : true,
                            message : data_from_server
                        });
                        res.send( jsonData );
                        break;
                }
            }
        }
    );
});

/**
* reservation create pettition
**/
router.post( '/cabin/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
        form_data = req.body;

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabin/new/', '' ),
            method : 'POST',
            json : true,
            body : encryption_system.encryptLongJSON( form_data ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ) {
            switch( response.statusCode ) {
                case 201 :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : false,
                        data : data_from_server.data
                    });
                    res.send( jsonData );
                    break;
                default :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
            }
        }
    );
});

/**
* change payment status
**/
router.put( '/cabin/paymentstatus/:id', jsonParser, function( req, res ) {

    var id = req.params.id,
        userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabin/paymentstatus/', id ),
            method : 'PUT',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ) {
            switch( response.statusCode ) {
                case 200 :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : false,
                        data : data_from_server.data
                    });
                    res.send( jsonData );
                    break;
                default :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
            }
        }
    );
});

/**
* reservation retrieve pettition
**/
router.get( '/cabin/:id', jsonParser, function( req, res ) {

    var id = req.params.id;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabin/detail/', id ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ) {
            switch (response.statusCode) {
                case 200:
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : false,
                        data : data_from_server.data
                    });
                    res.send( jsonData );
                    break;
                default:
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
            }
        }
    );
});

/**
* reservation update pettition
**/

/**
* reservation delete pettition
**/
router.delete( '/cabin/:id', jsonParser, function( req, res ) {

    var id = req.params.id;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabin/detail/', id ),
            method : 'DELETE',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ) {
            switch (response.statusCode) {
                case 204:
                    var jsonData = JSON.stringify({
                        error : false,
                        message : "Objecto borrado."
                    });
                    res.send( jsonData );
                    break;
                case 400:
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
                default:
                    console.log( error );
                    res.send( "There was an error" );
                    break;
            }
        }
    );
});

/**
* cabins by dates
**/
router.get( '/cabins', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
	var url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reservation/cabins/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ){
            switch (response.statusCode) {
                case 200 :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : false,
                        data : data_from_server.data
                    });
                    res.send( jsonData );
                    break;
                default :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
            }
        }
    );
});

module.exports = router;
