var mongodb = require('./db');

function Projcet(user,project){
  this.user = user;
  this.name = project.name;
}

module.exports = Projcet;

//存储项目信息
Projcet.prototype.save = function(callback) {
  //要存入数据库的项目信息文档
  var project = {
      user:this.user,
      name: this.name,
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 project 集合
    db.collection('project', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将项目数据插入 project 集合
      collection.insert(project, {
        safe: true
      }, function (err, project) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, project[0]);//成功！err 为 null，并返回存储后的项目文档
      });
    });
  });
};

//读取项目信息
Projcet.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 project 集合
    db.collection('project', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找项目名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, project) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, project);//成功！返回查询的项目信息
      });
    });
  });
};
