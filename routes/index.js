var express = require('express');
var router = express.Router();

/* GET home page. */
router.get( '/', function( req, res, next ) {
    res.render( 'index', { title: 'BALPRES Admin panel project' } );
});

router.get( '/other', function( req, res, next ) {
    res.render( 'other', { title : 'This is other' } );
});

module.exports = router;
