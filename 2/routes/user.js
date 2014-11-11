
/*
 * GET users listing.
 */
var user = require('../dbs/user');
exports.register = function(req, res, next){
  var name = req.body.name || '';
  var pass = req.body.pass || '';
  user.add({name:name, pass:pass},function(){
  	res.redirect('/');
  });
};
exports.edit = function(req, res, next){
	var id = req.body.id || '';
	var name = req.body.name || '';
  var pass = req.body.pass || '';
  user.updatePass({_id:id, pass:pass}, function(){
  	res.redirect('/');
  });
}