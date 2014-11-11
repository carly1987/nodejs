
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.transitions=function(req, res){
	res.render('transitions', { title: '转场' });
}
exports.list=function(req, res){
	res.render('list', { 
		title: '列表',
		btns:{
			edit:'编辑',
			add:'添加'
		}
	});
}
