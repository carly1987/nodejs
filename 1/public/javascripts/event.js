define('/javascripts/event.js',['/javascripts/class.js'],function(){
	var Event = Class({
		initialize : function(){
			this._event = window.Zepto ? new window.Zepto.Events : $({});
		}
	});
	var proto = Event.prototype;
});s