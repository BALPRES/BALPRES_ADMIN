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
* reservation type list pettition
**/
router.get( '/', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'reservationtype/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

/**
* reservation type create pettition
**/
router.post( '/', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    request(
        {
            url : http_helper.get_api_uri( 'reservationtype/new/', '' ),
            method : 'POST',
            json : true,
            body : encryption_system.encryptLongJSON( req.body ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

/**
* reservation type retrieve pettition
**/
router.get( '/:id', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'reservationtype/detail/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

/**
* reservation type update pettition
**/
router.put( '/:id', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'reservationtype/detail/', req.params.id ),
            method : 'PUT',
            json : true,
            body : encryption_system.encryptLongJSON( req.body ),
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

/**
* reservation type delete pettition
**/
router.delete( '/:id', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'reservationtype/detail/', req.params.id ),
            method : 'DELETE',
            json : true,
            headers : {
                'Authorization' : http_helper.get_basic_auth_w_token( encryption_system.decryptCookie( userdata.auth_data ) )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_deleted( error, response, body ) ) }
    );
});

module.exports = router;
