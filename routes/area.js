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
* area list pettition
**/
router.get( '/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'area/', '' ),
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
                            data : data_from_server
                        });
                        res.send( jsonData );
                        break;
                    default:
                        var data_from_server = encryption_system.decryptJSON( body );
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
* area create pettition
**/
router.post( '/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    var form_data = req.body;

    request(
        {
            url : http_helper.get_api_uri( 'area/new/', '' ),
            method : 'POST',
            json : true,
            body : encryption_system.encryptLongJSON( form_data ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ){
            switch (response.statusCode) {
                case 400 :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        message : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
                case 201 :
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : false,
                        data : data_from_server.data
                    });
                    res.send( jsonData );
                    break;
                default :
                    res.send( "Well 500 :(" );
                    break;
            }
        }
    );
});

/**
* area retrieve pettition
**/
router.get( '/:id', jsonParser, function( req, res ) {
    var id = req.params.id;
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'area/detail/', id ),
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
                    res.send( "This is response" );
                    break;
            }
        }
    );
});

/**
* area update pettition
**/
router.put( '/:id', jsonParser, function( req, res ) {

    var id = req.params.id;
    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'area/detail/', id ),
            method : 'PUT',
            json : true,
            body : encryption_system.encryptLongJSON( form_data ),
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
                case 400:
                    var data_from_server = encryption_system.decryptLongJSON( body );
                    var jsonData = JSON.stringify({
                        error : true,
                        data : data_from_server.message
                    });
                    res.send( jsonData );
                    break;
                default :
                    console.log( error );
                    res.send( "This is response" );
                    break;
            }
        }
    );
});

/**
* area  delete pettition
**/
router.delete( '/:id', jsonParser, function( req, res ) {

    var id = req.params.id;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'area/detail/', id ),
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

module.exports = router;
