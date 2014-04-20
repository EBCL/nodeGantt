var mongodb = require('./db');

function Task(projectId, projectUser) {
	this.projectId = projectId;
	this.user = projectUser;
}

//存储任务信息
Task.prototype.save = function(callback) {
	//要存入数据库的任务信息
	var task = {
		projectId: this.projectId,
		taskGroupTitle: "fad",
		taskGroupId: 23546,
		groupTarget: [{
			"taskID": 1213,
			"task_title": "任务3",
			"startYear": "2014",
			"overYear": "2014",
			"startMonth": "4",
			"overMonth": "4",
			"startDay": "25",
			"overDay": "30",
		}],
	};

	//打开数据库
	db.collection('task', function(err, collection) {
		if (err) {
			mongodb.close();
			return callback(err);
		}

		//将任务信息插入task集合
		collection.insert(task, {
			safe: true
		}, function(err, task) {
			mongodb.close();
			if (err) {
				return callback(err);
			}
			callback(null, task[0]);
		});
	});
}

//读取该项目所用任务信息
Task.get = function(projectId, callback) {
	//打开数据库
	mongodb.open(function {
		err, db
	} {
		if (err) {
			return callback(err);
		}
		//读取task集合
		db.collection('task', function(err, colection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({
				projectId: projectId
			}, {
				"projectId": 1
			}).sort({
				time: -1
			}).toArray(function(err, tasks) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, projects);
			});
		});
	});
}