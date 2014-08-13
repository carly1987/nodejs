var requirejs = require('requirejs');
requirejs.config({
  baseUrl: './public/javascripts',
  nodeRequire: require
});
var zepto = requirejs('zepto');
var transitions = requirejs('transitions');
exports.left = function () {
  transitions.left();
};