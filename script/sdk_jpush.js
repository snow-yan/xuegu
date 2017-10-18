function sdk_j_init() {
	if (api.systemType == 'ios') {//ios系统不需要进行加载自动就加载了，但是需要 进行点击消息事件的监听
		sdk_j_msg_click();
	} else {
		sdk_j_load();//非ios系统需要进行加载
	}
	sdk_j_msg_set();//进行消息监听，也就是说当应用在前台的时候，也能够接收消息且进行逻辑处理
	//以下是绑定设备为别名，这里需要解释一下，我们后面后端程序进行推送消息的时候是通过别名来进行推送的，所以需要绑定一下，我们这里是绑定的设备唯一识别码，如果你是按照用户名等等的绑定这里可以不要调用。在需要绑定的地方执行sdk_j_uid_set(deviceId);
	var osid=get_osid();
	sdk_j_uid_set(osid);
}

function sdk_j_load() {//加载jpush
	var ajpush = api.require('ajpush');
	ajpush.init(function(ret) {
		sdk_j_msg();
	});
}

function sdk_j_msg() {//针对非IOS系统的消息点击
	api.addEventListener({
		name : 'appintent'
	}, function(ret, err) {
		sdk_j_msg_send(ret.appParam.ajpush);
		clickNews(ret.appParam.ajpush);
	})
}

function sdk_j_msg_click() {//针对IOS系统的消息点击
	api.addEventListener({
		name : 'noticeclicked'
	}, function(ret, err) {
		sdk_j_msg_send(ret.value);
		clickNews(ret.value);
	})
}

function sdk_j_msg_set() {//消息监听，即应用在前台的时候的监听
	var ajpush = api.require('ajpush');
	ajpush.setListener(function(ret) {
		sdk_j_msg_send(ret);
	});
}

function sdk_j_clear() {//清除消息通知，一般用不到，不用管
	var ajpush = api.require('ajpush');
	var param = {
		id : -1
	};
	ajpush.clearNotification(param, function(ret)
	{
		if (ret && ret.status){
			//success
		}
	});
}
function sdk_j_num_set()//针对ios系统的清楚角标提醒数字，只要执行了就设置为空
{
	var ajpush = api.require('ajpush');
	ajpush.setBadge({badge:0});
}
function sdk_j_uid_set(id) {//绑定别名
	var param = {
		alias : id,
		tags : ['tag_' + id, 'coolfull']
	};
	var ajpush = api.require('ajpush');
	ajpush.bindAliasAndTags(param, function(ret) 
	{
		var statusCode=ret.statusCode;
		if (statusCode=='6002') 
		{
			sdk_j_uid_set();
		}
	});
}
function sdk_j_msg_send(ret){//统一的消息逻辑处理
	refreshNews();
	if (api.systemType == 'ios')
	{
		if(ret.extra)
		{
			var extra=ret.extra;
		}
		else if(ret.extras)
		{
			var extra=ret.extras;
		}
		sdk_j_num_set();//清除角标
	}
	else
	{
		var extra=str2json(ret.extra);
	}
//	switch (extra.type){
//	case 1:
//		open_w('my_dynamics','widget://user/my_dynamics.html');
//		break;
//	case 2:
//		open_w('my_dynamics','widget://user/my_dynamics.html');
//		break;
//	case 3:
//		open_w('my_dynamics','widget://user/my_dynamics.html');
//		break;
//	case 5:
//		api.execScript({
//			name :'root',
//			frameName : 'user',
//			script : 'AuthenticationInfo()'
//		});
//		api.execScript({
//			name :'root',
//			script : 'randomSwitchBtn("'+4+'");'
//		});
//		break;
//	default :
//		
//	}
}
function clickNews(ret){
	if (api.systemType == 'ios')
	{
		if(ret.extra)
		{
			var extra=ret.extra;
		}
		else if(ret.extras)
		{
			var extra=ret.extras;
		}
//		sdk_j_num_set();//清除角标
	}
	else
	{
		var extra=str2json(ret.extra);
	}
	switch (extra.type){
	case 1:
		open_w('my_dynamics','widget://user/my_dynamics.html');
		break;
	case 2:
		open_w('my_dynamics','widget://user/my_dynamics.html');
		break;
	case 3:
		open_w('my_dynamics','widget://user/my_dynamics.html');
		break;
	case 5:
		api.execScript({
			name :'root',
			frameName : 'user',
			script : 'AuthenticationInfo()'
		});
		api.execScript({
			name :'root',
			script : 'randomSwitchBtn("'+4+'");'
		});
		break;
	case 6:
		api.execScript({
			name :'root',
			frameName : 'live',
			script : 'showSwiper();setPageInfo()'
		});
	}
}