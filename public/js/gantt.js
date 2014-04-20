jQuery(document).ready(function($) {
	ddc();

	scrollEvent();

	taskList();
});

//时间控件部分
function ddc() {
	var d = new Date();
	this.year = d.getFullYear();
	this.month = d.getMonth() + 1;
	this.day = d.getDate();

	showCC(this.year, this.month);
}


function showCC(year, month) {
	var ddshow = ""; 
	var dcdc = 0;  //计算当前月有多少天
	var preMon = 0;
	var addAllDay = 0; //计算出表格中之前有多少天

	var gridy = "";
	//循环月份
	var cckc=0;
	for (var i = 0; i < 7; i++) {
		var allDayDiv = "";
		dcdc = month + i-1;
		preMon = month + i-2;
		var allDay=getDaysOfMonth(year,dcdc);
		var leftV = addAllDay*23;
		ddshow += '<div class="oneMonthBox" id="month-'+year+'-'+dcdc+'" style="left:'+leftV+'px"><div class="thisMonth" style="width:'+(allDay*23-1)+'px">' + dcdc + '/' + year + '</div><div class="thisMonthDate">';
		addAllDay += allDay;
		//循环日期
		
		for (var j = 1; j < allDay + 1; j++) {
			cckc++;
			var leftB = j*23-23;
			var ckvva = cckc * 23-23-17;
			allDayDiv += '<div class="dateList" style="left:'+leftB+'px">' + j + '</div>';

			gridy += "<div class='gridy' style='margin-left:" + ckvva + "px'></div>";
		}
	
		ddshow += allDayDiv;
		ddshow += '</div></div>'
	}

	//绘制简单的表格部分

	$(".gridlineBox").append(gridy)

	$(".candleTitle").append(ddshow);
}


/*--- 得到指定年，指定月中的天数 ----*/
function getDaysOfMonth(year, month) {
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 2:
			if (year % 4 == 0)
				return 29;
			else
				return 28;
		default:
			return 30;
	}
}

//底部滚动条部分
function scrollEvent(){
	$("#scroll_bar").mousedown(function(event) {
		/* Act on the event */
		$(window).bind("mousemove",function(event) {
			/* Act on the event */
			var cdac = window.event.x-220
			$("#scroll_bar").css({
				marginLeft:cdac
			});
			$(".candlebox").css({
				marginLeft:-cdac
			});

			$(".gridlineBox").css({
				marginLeft:-cdac
			});

			$(".project_chart").css({
				marginLeft:-cdac
			});
		});
	});

	$(window).mouseup(function(event) {
		/* Act on the event */
		$(window).unbind("mousemove");
	});
}

//任务列表功能
var dcvaf="";
/*
任务列表
任务列表和横向条相关联
*/

function taskList(){
	var project_chart_div = ""; //横向div
	$.each(taskListJson, function(i,val) {
		var dcval = '';
		 project_chart_div += '<div group_id="'+taskListJson[i].groupID+'" class="gridx"></div>'; //和组标题对应的横向div
		 project_chart_div +='<div id="group_bar_'+taskListJson[i].groupID+'">';
		 /* iterate through array or object */
		 dcvaf += '<div class="category_title"  group_id="'+taskListJson[i].groupID+'" ><div class="collapse_arrow" arActive="active"></div><div class="titleText">'+taskListJson[i].title+'</div></div><div class="group_target">';
		 $.each(taskListJson[i].group_target, function(index, val) {

		 	//cvaleft 计算开始日期的位置
		 	var cvaleft=$("#month-"+val.startYear+"-"+val.startMonth+"").css("left");
		 		cvaleft = parseInt(cvaleft)-201+val.startDay*23-23;
		 	//结束日期-开始日期=进度条长度  --- 先用一个月进行简单计算
		 	var cvaWidth =(val.overDay-val.startDay)*23+23;
		 	//console.log(cvaWidth);
		   	  dcvaf +=  '<div class="task_title"  task_id="'+val.taskID+'">'+val.task_title+'</div>';
		   	  var rightDrawLeft = cvaleft+cvaWidth-4;
		   	  var dsfcvll = '<div class="gridx" task_id="'+val.taskID+'">'
		   	  +'<div style="left:'+cvaleft+'px" class="drawLeft drawLine"></div>'
		   	  +'<div style="left:'+rightDrawLeft+'px" class="drawRight drawLine"></div>'
		   	  +'<div class="task_div" style="width:'+cvaWidth+'px;left:'+cvaleft+'px"></div></div>';
		   	  project_chart_div += dsfcvll;
		 });
		  project_chart_div +="</div>";
		 dcvaf += '</div>';
	});
	$("#project_target").append(dcvaf);
	$(".project_chart").append(project_chart_div);
	adfaf();
	lalahover();
	drawTaskDiv ();
}

//点击收缩任务栏
function adfaf(){
	$(".collapse_arrow").click(function(){
		var groupID = $(this).parent().attr("group_id");
		//console.log(groupID);
		var active = $(this).attr("arActive");
		if( active == "active"){
			$(this).parent().next(".group_target").slideUp(100);
			$("#group_bar_"+groupID+"").slideUp(100);
			$(this).attr("arActive","");
		}else{
			$(this).parent().next(".group_target").slideDown(100);
			$("#group_bar_"+groupID+"").slideDown(100);
			$(this).attr("arActive","active");
		}
	})
}

//鼠标经过时事件
function lalahover(){
	$(".gridx").mousemove(function(event) {
		/* Act on the event */
		$(this).addClass('active');
		var groupId = $(this).attr("group_id");
		var taskId = $(this).attr("task_id");
		
		$(".category_title[group_id="+groupId+"]").addClass('active');
		$(".task_title[task_id="+taskId+"]").addClass('active');
	});
	$(".gridx").mouseout(function(event) {
		/* Act on the event */
		$(this).removeClass('active');
		var groupId = $(this).attr("group_id");
		var taskId = $(this).attr("task_id");
		$(".category_title[group_id="+groupId+"]").removeClass('active');
		$(".task_title[task_id="+taskId+"]").removeClass('active');
	});

	$(".category_title").mousemove(function(event) {
		/* Act on the event */
		$(this).addClass('active');
		var groupId = $(this).attr("group_id");
		$(".gridx[group_id="+groupId+"]").addClass('active');
	});
	$(".category_title").mouseout(function(event) {
		/* Act on the event */
		$(this).removeClass('active');
		var groupId = $(this).attr("group_id");
		$(".gridx[group_id="+groupId+"]").removeClass('active');
	});

	$(".task_title").mousemove(function(event) {
		/* Act on the event */
		$(this).addClass('active');
		var taskId = $(this).attr("task_id");
		$(".gridx[task_id="+taskId+"]").addClass('active');
	});
	$(".task_title").mouseout(function(event) {
		/* Act on the event */
		$(this).removeClass('active');
		var taskId = $(this).attr("task_id");
		$(".gridx[task_id="+taskId+"]").removeClass('active');
	});
}


//拖拽任务条

function drawTaskDiv (){
	var dd; //y轴坐标
	var dc; //x轴坐标
	var yuandc; //x轴原坐标
	$(".drawLeft").mousedown(function(event) {
		var drawThis = $(this);
		yuandc = event.clientX-201;
		var myDDWidth = $(this).parent().find(".task_div").width();
		$(".project_chart").bind('mousemove', function(event) {
			dc = event.clientX-201;
			if ((dc - yuandc) < myDDWidth) {
				$(drawThis).parent().find(".task_div").css({
					left: dc,
					width: myDDWidth - (dc - yuandc)
				});

				$(drawThis).css({
					left: dc,
				});
			}
		});
	});

	$(".drawRight").mousedown(function(event) {
		var drawThis = $(this);
		yuandc = event.clientX-201;
		var myDDWidth =$(this).parent().find(".task_div").width();
		$(".project_chart").bind('mousemove', function(event) {
			dc = event.clientX-201;
			if ((dc - yuandc) > -myDDWidth) {
				$(drawThis).parent().find(".task_div").css({
					width: myDDWidth + (dc - yuandc),
				});

				$(drawThis).css({
					left: dc,
				});
			}
		});
	});

	$(".project_chart").mouseup(function(event) {
		$(".project_chart").unbind('mousemove');

	});
}



//构造数据

var taskListJson = [
	{
		"groupID":12314,
		"title":"第一组任务",
		"group_target":[
							{	"taskID":2235,
								"task_title":"任务1",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"1",
								"overDay":"3",
							},
							{	"taskID":1235,
								"task_title":"任务2",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"3",
								"overDay":"10",
							},
							{	"taskID":78882,
								"task_title":"任务3",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"5",
								"overDay":"10",
							},
						]
	},
	{
		"groupID":455,
		"title":"第二组任务",
		"group_target":[
							{	"taskID":45488,
								"task_title":"任务1",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"23",
								"overDay":"29",
							},
							{	"taskID":9633,
								"task_title":"任务2",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"15",
								"overDay":"24",
							},
							{	"taskID":2314,
								"task_title":"任务3",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"11",
								"overDay":"25",
							},
						]
	},
	{
		"groupID":78878,
		"title":"第三组任务",
		"group_target":[
							{	"taskID":5646,
								"task_title":"任务1",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"2",
								"overDay":"15",
							},
							{	"taskID":8978,
								"task_title":"任务2",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"15",
								"overDay":"16",
							},
							{	"taskID":1213,
								"task_title":"任务3",
								"startYear":"2014",
								"overYear":"2014",
								"startMonth":"4",
								"overMonth":"4",
								"startDay":"25",
								"overDay":"30",
							},
						]
	},
]