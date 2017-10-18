//断开融云链接
var RongYunTokenInterface = "http://www.zv100.com/rongyun_xgzx";
function rongDisconnect(callback)
{
	// 之前调用 init 和 connect 的代码省略
	rong.disconnect({
		isReceivePush : false
	}, function(ret, err)
	{
		alert(json2str(ret));
		if ('success' == ret.status)
		{
			if (callback)
			{
				callback(ret);
			}
		}
	});
	// 断开，且不再接收 Push
}

function rongLogout(callback) {
	var rongyunToken = get_local("rongyunToken");
	//	rongInit(function() {
	//		rongConnect(function() {
	//			var rongyunToken = get_local("rongyunToken");
	//			var rong = api.require('rongCloud2');
	//			rong.logout(function(ret, err) {
	//				if (callback) {
	//					callback(ret);
	//				}
	//			});
	//		});
	//	});
	rong.logout(function(ret, err)
	{
		if (callback)
		{
			callback(ret);
		}
	});

	// 断开，且不再接收 Push
}

function rongInit(callback) {
	rong.init(function(ret, err) {
		if (callback) {
			callback(ret);
		}
	});
}

function rongConnect(callback) {
	var rongyunToken = get_local("rongyunToken");
	//alert(rongyunToken);
	rong.connect({
		token : rongyunToken
	}, function(ret, err) {
		if (ret.status == 'success') {
			if (callback) {
				callback(ret);
			}
		} else {
			//$toast("融云链接失败，错误代码：" + json2str(err) + "正在尝试重新链接");
			rongConnect(callback);
		}
	});
}

//删除群组，移除群组
function delGroup(userId, groupId, callback)
{
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 120,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				token : get_local("token"),
				userId : userId,
				groupId : groupId,
				act : 'delGroup'
			}
		}
	}, function(ret, err) {
		if (ret) {
			if (callback) {
				callback(ret);
			}
		} else {
		}
	});
}

//加入群组
function joinGroup(userId, groupId, groupName, callback) {
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 120,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				//token : get_local("token"),
				userId : userId,
				groupId : groupId,
				groupName : groupName,
				act : 'joinGroup'
			}
		}
	}, function(ret, err) {
		//alert(json2str(err));
		if (ret) {
			if (callback) {
				callback(ret);
			}
		} else {
		}
	});
}

//创建群组
function createGroup(userId, groupId, groupName, callback) {
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 120,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				//token : get_local("token"),
				userId : userId,
				groupId : groupId,
				groupName : groupName,
				act : 'createGroup'
			}
		}
	}, function(ret, err) {
//		console.log(json2str(ret));
//		console.log(json2str(err));
		if (ret) {
			if (callback) {
				callback(ret);
			}
		}
	});
}

//刷新群组名称
function refreshGroup( groupId, groupName, callback) {
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 120,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				token : get_local("token"),
				groupId : groupId,
				groupName : groupName,
				act : 'refreshGroup'
			}
		}
	}, function(ret, err) {
		if (ret) {
			if (callback) {
				callback(ret);
			}
		}
	});
}

//退出群
function quitGroup(userId, groupId,callback) {
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 120,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				token : get_local("token"),
				userId : userId,
				groupId : groupId,
				act : 'quitGroup'
			}
		}
	}, function(ret, err) {
		if (ret) {
			if (callback) {
				callback(ret);
			}
		} else {
		}
	});
}

//获取融云token
function rongGetToken(uid, uname, face, callback) {
	//alert(RongYunTokenInterface+'/demo/rongyun/api.php');
	api.ajax({
		url : RongYunTokenInterface + '/api.php',
		method : 'post',
		timeout : 30,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				uid : get_local("uid"),
				userId : uid,
				uname : uname,
				face : face,
				act : 'getToken'
			}
		}
	}, function(ret, err)
	{
		if (ret)
		{
			if (ret.code == 200)
			{
				var rongyunToken = ret.token;
				if (callback)
				{
					callback(rongyunToken);
				}
			}
			else
			{
				//$alert("通讯模块Token获取失败");
			}
		}
		else
		{
			//$alert("通讯模块Token获取失败");
		}
	});
}

//发送图片消息
function sendImageMessage(targetId, conversationType, extra,path, callback) {
	// 之前调用 init 和 connect 的代码省略
	rong.sendImageMessage({
		conversationType : conversationType,
		targetId : targetId,
		imagePath : path,
		extra : extra
	}, function(ret, err) {
		if (callback) {
			callback(ret);
		}
	});
}

//发送文字消息
function sendTextMessage(targetId, conversationType,extra,txt,callback) {
	var rong = api.require('rongCloud2');
	rong.sendTextMessage({
		conversationType : conversationType,
		targetId : targetId,
		text : txt,
		extra : extra
	}, function(ret, err) {
//		console.log(json2str(ret));
//		console.log(json2str(err));
		if (callback) {
			if(ret){
				callback(ret);
//				console.log(json2str(ret))
			}else{
				callback(err);
//				console.log(json2str(err))
			}
		}
	});
	// 之前调用 init 和 connect 的代码省略
	//	rongInit(function() {
	//		rongConnect(function() {
	//
	//		});
	//	});
}


//发送命令消息
function sendCommandNotificationMessage(targetId, conversationType,name, data,callback) {

	var rong = api.require('rongCloud2');
	rong.sendCommandNotificationMessage({
		conversationType : conversationType,
		targetId : targetId,
		name : name,
		data : data
	}, function(ret, err) {
		if (callback) {
			callback(ret);
		}
	});
	// 之前调用 init 和 connect 的代码省略
	//	rongInit(function() {
	//		rongConnect(function() {
	//
	//		});
	//	});
}



function sendVoiceMessage(targetId, conversationType,extra, voicePath,duration, callback) {

	var rong = api.require('rongCloud2');
	rong.sendVoiceMessage({
		conversationType : conversationType,
		targetId : targetId,
		voicePath : voicePath,
		duration:duration,
		extra : extra
	}, function(ret, err) {
		//$alert(json2str(ret));
		if (callback) {
			callback(ret);
		}
	});
}

//发送位置消息
function sendLocationMessage(targetId, conversationType,extra,poi,imagePath,latitude,longitude, callback) {

	var rong = api.require('rongCloud2');
	rong.sendLocationMessage({
		conversationType : conversationType,
		targetId : targetId,
		imagePath : imagePath,
		poi : poi,
		latitude : latitude,
		longitude : longitude,
		extra : extra
	}, function(ret, err) {
		if (callback) {
			callback(ret);
		}
	});
	// 之前调用 init 和 connect 的代码省略
	//	rongInit(function() {
	//		rongConnect(function() {
	//
	//		});
	//	});
}
function getLatestMessages(targetId, conversationType,num,callback) {

	// 之前调用 init 和 connect 的代码省略
	rongInit(function() {
		rongConnect(function() {
			var rong = api.require('rongCloud2');
			rong.getLatestMessages({
				conversationType : conversationType,
				targetId : targetId,
				count : num
			}, function(ret, err) {
				if(callback)
				{
					callback(ret);
				}
				//alert("getLatestMessages=" + json2str(ret));

			})
		});
	});
}

function setOnReceiveMessageListener(callback) {
	var rong = api.require('rongCloud2');
	rongInit(function() {
		rong.setOnReceiveMessageListener(function(ret, err) {
			if (callback) {
				callback(ret);
			}
		})
	});
}
function getConversation(targetId, callback) {
	rongInit(function() {
		rongConnect(function() {
			var rong = api.require('rongCloud2');
			rong.getConversation({
				conversationType : 'PRIVATE',
				targetId : targetId
			}, function(ret, err) {
				if (callback) {
					callback(ret);
				}
			})
		});
	});
}

function getHistoryMessage(targetId, conversationType, oldestMessageId, callback) {
	rongInit(function() {

		rongConnect(function() {
			var rong = api.require('rongCloud2');
			rong.getHistoryMessages({
				conversationType : conversationType,
				targetId : targetId,
				oldestMessageId : oldestMessageId,
				count : 10
			}, function(ret, err) {
				if (callback) {
					callback(ret)
				}
			})
		});
	});
}

function set_disturb(type,target,status)
{
	rongInit(function() {
		rongConnect(function() {
			var rong = api.require('rongCloud2');
			rong.setConversationNotificationStatus(
			{
		        conversationType:type,
		        targetId:target,
		        notificationStatus:status
		    }, function (ret, err)
		    {
		    	Loading(-1);
		        if (ret.status == 'success')
		        {
		        	if(ret.result.code==0)
		        	{
		        		$toast("免打扰已开启");
		        	}
		        	else if(ret.result.code==1)
		        	{
		        		$toast("免打扰已关闭");
		        	}
		        }
		        else
		        {
		            api.toast({ msg: err.code });
		        }
			})
		});
	});
}
function cmd_msg_group(ret,group_id,group_name)
{
	if(ret.status=='prepare')
	{
		var message=ret.result.message;
		var content = message.content.data;//消息内容
		var content_arr=content.split("★");
		var cmd_content=content_arr[1];
		var name = message.content.name;//消息方法
		var fromUserId = message.senderUserId;
		var targetId = message.targetId;
		var messageId = message.messageId;
		var sentTime = message.sentTime;
		var receivedTime = message.receivedTime;
		var objectName = message.objectName;
		var groupName="";
		var fromUserName="";
		var toUserName="";
		var duration="";
		var toUserId = targetId;
		var isRead=1;
		var showTime=sentTime;
		dbInit(function()
		{
			var sql="select * from chatlist where conversationType='GROUP' and toUserId='"+group_id+"' order by ID desc LIMIT 0,1";
			getData(sql, function(ret) {
				var row = ret.data;
				if (row.length > 0)
				{
					var LastTime = row[0].sentTime;
					var differTime = sentTime - LastTime;
					var minute = differTime / 1000 / 60;
					if (parseInt(minute) >= 2)
					{
						showTime = sentTime;
					}
					else
					{
						showTime = "";
					}
				}
				else
				{
					showTime = sentTime;
				}
				var sql = "INSERT INTO chatList(isRead,fromUserId,fromUserName,toUserName,toUserId,messageId,content,showTime,sentTime,receivedTime,msgType,status,objectName,conversationType)";
				sql += " VALUES('" + isRead + "',";
				sql += "'" + fromUserId + "',";
				sql += "'" + fromUserName + "',";
				sql += "'" + toUserName + "',";
				sql += "'" + toUserId + "',";
				sql += "'" + messageId + "',";
				sql += "'" + cmd_content + "',";
				sql += "'" + showTime + "',";
				sql += "'" + sentTime + "',";
				sql += "'" + receivedTime + "',";
				sql += "'send',";
				sql += "'prepare',";
				sql += "'" + objectName + "',";
				sql += "'GROUP')";
				query(sql,function(ret)
				{
					if(ret.status)
					{
						exScriptFrame("chat","chat_c","get_all_msg("+messageId+")");
						getData("select * from chatList where conversationType='GROUP' and isRead='0' and toUserId='"+group_id+"'",function(rets)
						{
							var no_read_num=rets.data.length;
							query("DELETE FROM chatNotice where type='group' and action_id='"+group_id+"'",function(rets)
							{
								if(rets.status)
								{
									var sql_n = "INSERT INTO chatNotice(title,content,face,action_id,type,num,msg_id,status,show_time)";
									sql_n += " VALUES('" + group_name + "',";
									sql_n += "'" + cmd_content + "',";
									sql_n += "'',";
									sql_n += "'" + group_id + "',";
									sql_n += "'group',";
									sql_n += "'"+no_read_num+"',";
									sql_n += "'" + messageId + "',";
									sql_n += "'prepare',";
									sql_n += "'" + sentTime + "')";
									query(sql_n,function(retss)
									{
										exScriptFrame("root","news_c","get_list()")
									})
								}
							})
						})
					}
				});
			})
		});
	}
	else if(ret.status=="success")
	{
		if(isDefine(ret.result))
		{
			var messageId = ret.result.message.messageId;
			setTimeout(function()
			{
				var sql = "UPDATE chatList SET status='success' WHERE messageId='" + messageId + "' and conversationType='GROUP' and toUserId='"+group_id+"'";
				query(sql,function(rets)
				{
					if(rets.status)
					{
						query("UPDATE chatNotice SET status='success' WHERE type='group' and action_id='"+group_id+"'",function(retss)
						{
							if(retss.status)
							{
								exScriptFrame("root","news_c","get_list()")
							}
						});
					}
				});
			},500);
		}
	}
	else if(ret.status=="error")
	{
		if(isDefine(ret.result))
		{
			var messageId = ret.result.message.messageId;
			setTimeout(function()
			{
				var sql = "UPDATE chatList SET status='error' WHERE messageId='"+messageId+"' and conversationType='GROUP' and toUserId='"+group_id+"'";
				query(sql,function(rets)
				{
					if(rets.status)
					{
						query("UPDATE chatNotice SET status='error' WHERE type='group' and action_id='"+group_id+"'",function(retss)
						{
							if(retss.status)
							{
								exScriptFrame("root","news_c","get_list()")
							}
						});
					}
				});
			},500);
		}
	}
}