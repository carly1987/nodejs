requirejs.config({
  baseUrl: '/public/javascripts',
  paths: {
  	"zepto": 'zepto'
    transitions: 'transitions',
    b: 'b'
  }
});
require([
	'zepto',
    'transitions',
    'b'
],function(zepto,Transitions,b){
    $('[data-transition="left"]').click(function(){
    	Transitions.left();
    });
});