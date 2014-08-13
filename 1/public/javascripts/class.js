define('/javascripts/class.js',[],function(){
	function init(){
		return function (){
			if(this.initialize){
				this.initialize.apply(this, arguments);
			}
		}
	}
	function extend(protoProps, staticPropos){
		var parent = this;
		var child = init();
		$.extend(child, parent, staticPropos);
		var proto = Object.create(parent.prototype);
		proto.constructor = child;
		child.prototype = proto;
		$.extend(child.prototype, protoProps);
		child.superClass = parent.prototype;
		return child;
	}
	var Class = function(protoProps){
		var cls = init();
		$.extend(cls.prototype, protoProps);
		cls.extend = extend;
		return cls;
	}
	Class.extend = extend;
	return Class;
});