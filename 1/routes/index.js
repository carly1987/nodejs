
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.slideLeft=function(req, res){
	res.render('index', { title: 'page1' });
}