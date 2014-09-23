define('url', [], function(){
	var Url = {
		init : function(){
			var $hash = location.hash;
			return $hash;
		}
	}
	return Url;
});