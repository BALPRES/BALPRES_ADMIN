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
* reports by month
**/
router.get( '/bymonth', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/bymonth/', '?date=' + url_parts.query.date ),
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
* reports by year
**/
router.get( '/byyear', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/byyear/', '?year=' + url_parts.query.year ),
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
* pending reports by month
**/
router.get( '/pendingbymonth', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/pendingbymonth/', '?date=' + url_parts.query.date ),
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
* payed reports by month
**/
router.get( '/payedbymonth', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/payedbymonth/', '?date=' + url_parts.query.date ),
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
* payed reports by year
**/
router.get( '/payedbyyear', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/payedbyyear/', '?year=' + url_parts.query.year ),
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
* payed reports by month
**/
router.get( '/payedbydates', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/payedbydates/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
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
* payed reports by month
**/
router.get( '/bydates', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/bydates/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
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
* payed reports by month
**/
router.get( '/pendingbydates', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/pendingbydates/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
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
* payed reports by month
**/
router.get( '/bydates', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/bydates/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
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
* cabin reports by dates
**/
router.get( '/cabinsbydates', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/cabinsbydates/', '?d1=' + url_parts.query.d1 + '&d2=' + url_parts.query.d2 ),
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
* cabin reports by month
**/
router.get( '/cabinsbymonth', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/cabinsbymonth/', '?date=' + url_parts.query.date ),
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
* cabin reports by month
**/
router.get( '/cabinsbyyear', jsonParser, function( req, res ) {

    var userdata = JSON.parse( req.cookies[ 'userdata' ] ),
	    url_parts = urlLib.parse(req.url, true);

    request(
        {
            url : http_helper.get_api_uri( 'reports/cabinsbyyear/', '?year=' + url_parts.query.year ),
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

module.exports = router;
