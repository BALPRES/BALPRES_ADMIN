'use strict';

var fs = require( 'fs' );
var ursa = require( 'ursa' );
var crt, server_pub_key, client_pub_key, client_priv_key, msg;

server_pub_key = ursa.createPublicKey( fs.readFileSync( './certs/server_rsa.pub' ) );
client_pub_key = ursa.createPublicKey( fs.readFileSync( './certs/client_admin_balpres.pub' ) );
client_priv_key = ursa.createPrivateKey( fs.readFileSync( './certs/client_admin_balpres.key.pem' ) );

/**
* encrypt data sended as json format
**/
var encrypt_json_msg = function( data ) {
    msg = server_pub_key.encrypt( JSON.stringify( data ), 'utf8', 'base64' );
    return msg;
};

/**
* decrypt data and return it as json
**/
var descrypt_json_msg = function( data ) {
    msg = client_priv_key.decrypt( data, 'base64', 'utf8', ursa.RSA_PKCS1_OAEP_PADDING );
    return JSON.parse( msg );
};

/**
* encrypt cookie token
**/
var encrypt_cookie_token = function( token ) {
    var en_token = client_pub_key.encrypt( token, 'utf8', 'base64' );
    return en_token;
};

/**
* decrypt an encrypted cookie token
**/
var decrypt_cookie_token = function( en_token ) {
    var token = client_priv_key.decrypt( en_token, 'base64', 'utf8' );
    return token;
};

module.exports.encryptJSON = encrypt_json_msg;
module.exports.decryptJSON = descrypt_json_msg;

module.exports.encryptCookie = encrypt_cookie_token;
module.exports.decryptCookie = decrypt_cookie_token;
