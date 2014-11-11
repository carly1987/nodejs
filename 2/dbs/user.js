var db = require('./db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var UserScheme = new Schema({
    name:String,
    pass:String
});

mongoose.model('User', UserScheme);
var User = mongoose.model('User');

exports.add  = function(options,callback) {
    var newDb = new User();
    newDb.name = options.name;
    newDb.pass = options.pass;
    newDb.save(function(err){
        if(err){
            util.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });

}
exports.list = function(callback) {
    User.find({}, callback);
}
exports.findOne = function(phone,callback){
    User.findOne({phone:phone},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });

}
exports.updatePass = function(options,callback){
    User.findOne({_id:options._id},function(err,doc){
        if (err) {
            util.log('FATAL '+ err);
            callback(err, null);
        }
        doc.pass = options.pass;
        doc.save(function(err){
            if(err){
              util.log("FATAL"+err);
            }else{
              callback(null, doc);
            }
        });
    });
}