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
* task list pettition
**/
router.get( '/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'task/', '' ),
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
                        var jsonData = JSON.stringify({
                            error : false,
                            data : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                    default:
                        var jsonData = JSON.stringify({
                            error : true,
                            message : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                }
            }
        }
    );
});

/**
* task create pettition
**/
router.post( '/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'task/', '' ),
            method : 'POST',
            json : true,
            body : encryption_system.encryptLongJSON( req.body ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ){
            switch (response.statusCode) {
                case 400 :
                    var jsonData = JSON.stringify({
                        error : true,
                        message :  encryption_system.decryptLongJSON( body ).data
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
* task update pettition
**/
router.put( '/:id', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'task/', req.params.id ),
            method : 'PUT',
            json : true,
            body : encryption_system.encryptLongJSON( req.body ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ){
            switch (response.statusCode) {
                case 400 :
                    var jsonData = JSON.stringify({
                        error : true,
                        message : encryption_system.decryptLongJSON( body ).message
                    });
                    res.send( jsonData );
                    break;
                case 200 :
                    var jsonData = JSON.stringify({
                        error : false,
                        data : encryption_system.decryptLongJSON( body ).data
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
* delete task
**/
router.delete( '/:id', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
        id = req.params.id;

    request(
        {
            url : http_helper.get_api_uri( 'task/', id ),
            method : 'DELETE',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        function( error, response, body ){
            switch (response.statusCode) {
                case 204:
                    var jsonData = JSON.stringify({
                        error : false,
                        message : "Objecto borrado."
                    });
                    res.send( jsonData );
                    break;
                default:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : encryption_system.decryptLongJSON( body ).message
                    });
                    res.send( jsonData );
                    break;
            }
        }
    );
});

/**
* get assigned tasks
**/
router.get( '/assigned/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'task/assigned/', '' ),
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
                        var jsonData = JSON.stringify({
                            error : false,
                            data : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                    default:
                        var jsonData = JSON.stringify({
                            error : true,
                            message : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                }
            }
        }
    );
});

/**
* get tasks not done by due date
**/
router.get( '/notdonebydue/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'task/notdonebydue/', '' ),
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
                        var jsonData = JSON.stringify({
                            error : false,
                            data : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                    default:
                        var jsonData = JSON.stringify({
                            error : true,
                            message : encryption_system.decryptLongJSON( body ).data
                        });
                        res.send( jsonData );
                        break;
                }
            }
        }
    );
});

module.exports = router;
