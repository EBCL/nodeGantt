var mongodb = require('./db');

function Task(projectUser) {
	//this.projectId = projectId;
	this.user = projectUser;
}


module.exports = Task;
//存储任务信息
//存储项目信息
Task.prototype.save = function(callback) {
  //要存入数据库的项目信息文档
  var task = {
    user: this.user,
   // "_id":this.projectId
  };

  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 task 集合
    db.collection('task', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }


      //将项目数据插入 task 集合
      collection.insert(task, {
        safe: true
      }, function(err, task) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, task[0]); //成功！err 为 null，并返回存储后的项目文档
      });
    });
  });
}

//读取该项目所用任务信息
// Task.get = function(projectId, callback) {
// 	//打开数据库
//   mongodb.open(function(err, db) {
// 	    if (err) {
// 	      return callback(err); //错误，返回 err 信息
// 	    }
// 		//读取task集合
// 		db.collection('task', function(err, colection) {
// 			if (err) {
// 				mongodb.close();
// 				return callback(err);
// 			}
// 			collection.find({
// 				projectId: projectId
// 			}, {
// 				"projectId": 1
// 			}).sort({
// 				time: -1
// 			}).toArray(function(err, tasks) {
// 				mongodb.close();
// 				if (err) {
// 					return callback(err);
// 				}
// 				callback(null, projects);
// 			});
// 		});
// 	});
// }