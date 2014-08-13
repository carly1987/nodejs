
var mongoose = require('mongoose');
var model = require('../modules/model');
var Demo = model.Demo;
mongoose.connect('mongodb://localhost/2');




exports.index = function(req, res){
    //查询所有数据，保存到demos中，在页面循环输出
    Demo.find(function(err,docs){
        res.render('index', {
            title:'Express Demo Example',
            demos:docs,
            parseScript: true
        });
    });

};

//跳转到添加页面
exports.add = function(req, res) {
    console.log('----here');
    res.render('add', {title :'添加 demo list'});
};

//创建新纪录
exports.create = function(req, res){
    var demo = new Demo({
        uid : req.body.uid,
        title: req.body.title,
        content : req.body.content
    });

    console.log('create----');
    demo.save(function(err,doc){
        console.log(doc);
        res.redirect('/');
    });

};

// 根据id删除相应的记录
exports.delById = function(req, res) {

    var id = req.query.id;
    console.log('id = ' + id);

    if(id && '' != id) {
        console.log('----delete id = ' + id);
        Demo.findByIdAndRemove(id, function(err, docs) {
            console.log('delete-----'+ docs);
            res.redirect('/');
        });
    }

};

// 查询对应修改记录，并跳转到修改页面
exports.toModify = function(req, res) {
    var id = req.query.id;
    console.log('id = ' + id);

    if(id && '' != id) {
        console.log('----delete id = ' + id);
        Demo.findById(id, function(err, docs){
            console.log('-------findById()------' + docs);

            res.render('modify',{title:'修改ToDos',demo:docs});
        });
    };
};

//修改相应的值
exports.modify = function(req, res) {

    var demo = {
        uid : req.body.uid,
        title: req.body.title,
        content : req.body.content
    };

    var id = req.body.id; //因为是post提交，所以不用query获取id
    if(id && '' != id) {
        console.log('----update id = ' + id + "," + demo);
        Demo.findByIdAndUpdate(id, demo,function(err, docs) {
            console.log('update-----'+ docs);
            res.redirect('/');
        });
    }

};