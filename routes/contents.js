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
* get our company contents
**/
router.get( '/ourcompanycontent', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourcompanycontent/', '' ),
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
* edit our company contents
**/
router.put( '/ourcompanycontent', jsonParser, function( req, res ) {

    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourcompanycontent/edit/', '' ),
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
    );
});

/**
* get our services contents
**/
router.get( '/ourservicescontent', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourservicescontent/', '' ),
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
* edit our services content
**/
router.put( '/ourservicescontent', jsonParser, function( req, res ) {

    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourservicescontent/edit/', '' ),
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
    );
});

/**
* get recomendations contents
**/
router.get( '/recomendations', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'website/recomendations/', '' ),
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
* edit recomendations content
**/
router.put( '/recomendations', jsonParser, function( req, res ) {

    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'website/recomendations/edit/', '' ),
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
    );
});

/**
* get our personal contents
**/
router.get( '/ourpersonalcontent', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourpersonalcontent/', '' ),
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
* edit our personal content
**/
router.put( '/ourpersonalcontent', jsonParser, function( req, res ) {

    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourpersonalcontent/edit/', '' ),
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
    );
});

/**
* get our products contents
**/
router.get( '/ourproductscontent', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourproductscontent/', '' ),
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
* edit our products content
**/
router.put( '/ourproductscontent', jsonParser, function( req, res ) {

    var form_data = req.body;
    var userdata = JSON.parse( req.cookies['userdata'] );

    request(
        {
            url : http_helper.get_api_uri( 'website/ourproductscontent/edit/', '' ),
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
    );
});

module.exports = router;
