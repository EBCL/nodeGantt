var mongodb = require('./db'),
  ObjectID = require('mongodb').ObjectID;


function Project(user, project) {
  this.user = user;
  this.name = project.name;
}

module.exports = Project;

//存储项目信息
Project.prototype.save = function(callback) {
  //要存入数据库的项目信息文档
  var projectId = new ObjectID();
  var project = {
    user: this.user,
    name: this.name,
    "_id":projectId
  };

  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 project 集合
    db.collection('project', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }


      //将项目数据插入 project 集合
      collection.insert(project, {
        safe: true
      }, function(err, project) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, project[0]); //成功！err 为 null，并返回存储后的项目文档
      });
    });
  });
}

//读取该用户所有项目列表信息
Project.get = function(projectUser, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 project 集合
    db.collection('project', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      collection.find({
        user: projectUser
      }, {
        "user": 1,
        "name": 1
      }).sort({
        time: -1
      }).toArray(function(err, projects) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, projects);
      });
    });
  });
}

//根据ID获取一个项目的信息
Project.getOne = function(projectId, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

     //读取project集合
    db.collection('project', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //通过id查找一个项目
      var newObjectId = new ObjectID.createFromHexString(projectId)
      collection.findOne({
        "_id": newObjectId
      }, function(err,oneProject) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        callback(null,oneProject);
      });
    });
  });
}

//删除一个项目
Project.remove = function(id, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    //读取project集合
    db.collection('project', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //通过id删除--浪费一小时研究此问题！！
      var newObjectId = new ObjectID.createFromHexString(id)
      collection.remove({
        "_id": newObjectId
      }, {
        w: 1
      }, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}