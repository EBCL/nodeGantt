var mongodb = require('./db');

function Task (projectId,projectUser){
	this.projectId = projectId;
	this.user = projectUser;
}

//存储任务信息

Task.prototype.save = function(callback){
	//要存入数据库的任务信息
	var task = {
		project:
	}

}