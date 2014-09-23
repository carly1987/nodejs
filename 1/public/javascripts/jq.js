define('jq',[],function(){
	var JQ = function(fn){
		var jsdom = require("jsdom");
		var window  = jsdom.jsdom().createWindow(),
        script = window.document.createElement('script');
        jsdom.jQueryify(window, function() {
	        script.src = __dirname + '/jquery.js';
	        script.onload = function() {
	            if (this.readyState === 'complete') {
	                fn(window);
	            }
	        }
	    });
	}
	return JQ;
});

// var $html =JQ(function(window) {
	//     return window.$('#html');
	// });