requirejs.config({
  baseUrl: '/javascripts/',
  paths: {
    transitions: 'transitions'
  }
});
require([
    'transitions'
],function(Transitions){
    Transitions.init();
    $('[data-transition="slide"]').click(function(e){
    	Transitions.slide(e);
    });
});