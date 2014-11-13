
/**
 * Module dependencies.
 */

var views = require('co-views');
var swig  = require('swig');
// setup views mapping .html
// to the swig template engine

module.exports = views(__dirname + '/../views', {
  map: { html: 'swig' }
});