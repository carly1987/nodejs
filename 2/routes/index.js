
/*
 * GET home page.
 */
var user = require('../dbs/user');
var url = require("url");
var qs = require("querystring");
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.register = function(req, res){
  res.render('register', { title: '注册' });
};
exports.login = function(req, res){
  res.render('login', { title: '登录' });
};
exports.list = function(req, res, next){
	user.list(function (err, list) {
		if (err) {
				return next(err);
		}
		res.render('list', { 
			title: '用户列表',
			list: list
		});
	});
  
};
exports.edit = function(req, res){
	var id = url.parse(req.url).query;
	id = qs.parse(id);
	var name=id["name"];
	id = id["_id"];
  res.render('edit', { 
  	title: '编辑',
  	name:name,
  	id:id
  });
};
exports.del = function(req,res,next){
	var id = url.parse(req.url).query;
	id = qs.parse(id);
	id = id["_id"];
	user.del({_id:id},function(err,doc){
		if(err){
      res.redirect('/');
    }
    if(doc){
      res.redirect('list');
    }
	});
}