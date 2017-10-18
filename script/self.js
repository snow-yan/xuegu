var arr_wel=new Array();
arr_wel[0]='widget://image/welcome/1.jpg';
arr_wel[1]='widget://image/welcome/2.jpg';
arr_wel[2]='widget://image/welcome/3.jpg';
//arr_wel[3]='widget://image/welcome/4.jpg';
function start_welcome(callback)
{
	first_start.open(
	{
		rect:{x:0,y:0,w:api.winWidth,h:api.winHeight},
		data:{paths:arr_wel},
		placeholderImg:arr_wel[0],
		contentMode:'scaleToFill',
		interval:10000,
		auto:false,
		loop: false,
		fixedOn:'',
		fixed: true,
		styles:
		{
	        indicator:
	        {
	            align:'center',
	            color:'#393939',
	            activeColor:'#f39915'
	        }
	    },
	},
	function(ret, err)
	{
		if(ret.status)
		{
			if(ret.eventType=='click')
			{
				if(ret.index==(arr_wel.length-1))
				{
					start_group();
				}
			}
		}
	});
}
function touch3d()
{
	var obj = api.require('3DTouch');
	obj.setListener(function(ret,err)
	{
		var type=ret.type;
		if (type=='com.zv100.raf.fun')
		{
			open_w('fun','widget://html/fun.html');
		}
		else if (type=='com.zv100.raf.js_fun')
		{
			open_w('js_fun','widget://html/js_fun.html');
		}
		if (type=='com.zv100.raf.instance')
		{
			open_w('instance','widget://html/instance.html');
		}
	});
}
function listener_page(c1,c2)
{
	document.addEventListener("scroll", function(event)
	{
		if(is_define(c1))
		{
			c1(event);
		}
	});
	document.addEventListener("touchmove", function(event)
	{
		if(is_define(c1))
		{
			c1(event);
		}
	});
	document.addEventListener("touchend", function(event)
	{
		if(is_define(c1))
		{
			c1(event);
		}
		if(is_define(c2))
		{
			c2(event);
		}
	});
	document.addEventListener("touchstart", function(event)
	{
		if(is_define(c1))
		{
			c1(event);
		}
	});
}
function share_app()
{

	api.actionSheet({
//		title : '开始分享',
		cancelTitle : '取消',
		buttons : ['QQ好友', 'QQ空间', '微信好友', '微信朋友圈', '新浪微博']
	}, function(ret, err){
			var num=ret.buttonIndex;
			api.download({
			    url: down_app_logo,
			    savePath: 'fs://test.png',
			    report: true,
			    cache: false,
			    allowResume: true
			}, function(ret, err) {
				
			    if (ret.state==1) {
						if(num==1){//QQ好友
							sdk_qq_share_url(down_app_url,"学股网APP下载",share_content,"QFriend");
						}
						if(num==2){//QQ空间
							sdk_qq_share_url(down_app_url,"学股网APP下载",share_content,"");
						}
						if(num==3){//微信好友
							share_wx("session",down_app_url,"学股网APP下载",share_content);
							
						}
						if(num==4){//微信朋友圈
							share_wx("timeline",down_app_url,"学股网APP下载",share_content);
						}
						if(num==5){//新浪微博
							sdk_wb_share_url("学股网APP下载",down_app_url,"炒股就上学股网，一站式解决炒股烦恼，直播·问股·学股·谈股。",share_content);
						}
			    }
			});
	});
}

//学股网精彩问答
function forward_info(url)
{
	api.actionSheet({
//		title : '开始分享',
		cancelTitle : '取消',
		buttons : ['QQ好友', 'QQ空间', '微信好友', '微信朋友圈', '新浪微博']
	}, function(ret, err){
			var num=ret.buttonIndex;
			api.download({
			    url: down_app_logo,
			    savePath: 'fs://test.png',
			    report: true,
			    cache: false,
			    allowResume: true
			}, function(ret, err) {
			    if (ret.state==1) {
						if(num==1){//QQ好友
							sdk_qq_share_url(url,ret.savePath,"学股网精彩问答",share_content,"QFriend");
						}
						if(num==2){//QQ空间
							sdk_qq_share_url(url,ret.savePath,"学股网精彩问答",share_content,"");
						}
						if(num==3){//微信好友
							share_wx("session",url,"学股网精彩问答",share_content,ret.savePath);
						}
						if(num==4){//微信朋友圈
							share_wx("timeline",url,"学股网精彩问答",share_content,ret.savePath);
						}
						if(num==5){//新浪微博
							sdk_wb_share_url("学股网精彩问答",ret.savePath,url,"炒股就上学股网，一站式解决炒股烦恼，直播·问股·学股·谈股。",share_content);
						}
			    }
			});
	});
}

function share_living(url,nickname)
{
	api.actionSheet({
//		title : '开始分享',
		cancelTitle : '取消',
		buttons : ['QQ好友', 'QQ空间', '微信好友', '微信朋友圈', '新浪微博']
	}, function(ret, err){
			var num=ret.buttonIndex;
			api.download({
			    url: down_app_logo,
			    savePath: 'fs://test.png',
			    report: true,
			    cache: false,
			    allowResume: true
			}, function(ret, err) {
			    if (ret.state==1) {
						if(num==1){//QQ好友
							sdk_qq_share_url(url,ret.savePath,"学股网的"+nickname+"邀请您来观看直播",share_content,"QFriend");
						}
						if(num==2){//QQ空间
							sdk_qq_share_url(url,ret.savePath,"学股网的"+nickname+"邀请您来观看直播",share_content,"");
						}
						if(num==3){//微信好友
							share_wx("session",url,"学股网的"+nickname+"邀请您来观看直播",share_content,ret.savePath);
						}
						if(num==4){//微信朋友圈
							share_wx("timeline",url,"学股网的"+nickname+"邀请您来观看直播",share_content,ret.savePath);
						}
						if(num==5){//新浪微博
							sdk_wb_share_url("学股网的"+nickname+"邀请您来观看直播",ret.savePath,url,"炒股就上学股网，一站式解决炒股烦恼，直播·问股·学股·谈股。",share_content);
						}
			    }
			});
	});
}

function forwords_living(url,nickname,type){
			api.download({
			    url: down_app_logo,
			    savePath: 'fs://test.png',
			    report: true,
			    cache: false,
			    allowResume: true
			}, function(ret, err) {
			    if (ret.state==1) {
						if(type=="qq"){//QQ好友
							sdk_qq_share_url(url,ret.savePath,"学股网的"+nickname+"邀请您来观看直播",share_content,"QFriend");
						}
						if(type=="QZone"){//QQ空间
							sdk_qq_share_url(url,ret.savePath,"学股网的"+nickname+"邀请您来观看直播",share_content,"");
						}
						if(type=="weixin"){//微信好友
							share_wx("session",url,"学股网的"+nickname+"邀请您来观看直播",share_content,ret.savePath);
						}
						if(type=="pengyouquan"){//微信朋友圈
							share_wx("timeline",url,"学股网的"+nickname+"邀请您来观看直播",share_content,ret.savePath);
						}
						if(type=="weibo"){//新浪微博
							sdk_wb_share_url("学股网的"+nickname+"邀请您来观看直播",ret.savePath,url,"炒股就上学股网，一站式解决炒股烦恼，直播·问股·学股·谈股。",share_content);
						}
			    }
			});
}
/*
 * Zepto扩展
 * 前面的所有兄弟元素
 */
$.fn.prevAll = function(t){
	var prevEls = [];
	var el = this[0];
	if(!el) return $([]);
	while (el.previousElementSibling) {
    	var prev = el.previousElementSibling;
        if (t) {
          if($(prev).is(t)) prevEls.push(prev);
        }
        else prevEls.push(prev);
        el = prev;
    }
    return $(prevEls);
};
 
/*
 * Zepto扩展
 * 后面的所有兄弟元素
 */
$.fn.nextAll = function (t) {
    var nextEls = [];
    var el = this[0];
    if (!el) return $([]);
    while (el.nextElementSibling) {
    	var next = el.nextElementSibling;
        if (t) {
          	if($(next).is(t)) nextEls.push(next);
        }
        else nextEls.push(next);
        el = next;
    }
    return $(nextEls);
};
/*
 *获取6位随机数 
 */
function MathRand(callback)
{
	var Num="";
	for(var i=0;i<6;i++)
	{
	Num+=Math.floor(Math.random()*10);
	}
	if(callback){
		return Num ;
	}
}; 
//计算几天以前/几个小时以前/几分钟以前/传参格式 2016-8-15 12:00:00
//function getTimeDifference(oldTime) {
//	//获取当前时间毫秒数
//	var currentTime = new Date().getTime();
//	//格式转换
////	var date1 = oldTime.replace(new RegExp("-", "gm"), "/");
//	//获取毫秒数
////	var date2 = (new Date(date1)).getTime();
//	//计算时间毫秒差
//	var date3 = currentTime - oldTime*1000;
//	//计算出相差天数
//	var days = Math.floor(date3 / (24 * 3600 * 1000))
//	//计算出小时数
//	var leave1 = date3 % (24 * 3600 * 1000)//计算天数后剩余的毫秒数
//	var hours = Math.floor(leave1 / (3600 * 1000))
//	//计算相差分钟数
//	var leave2 = leave1 % (3600 * 1000)//计算小时数后剩余的毫秒数
//	var minutes = Math.floor(leave2 / (60 * 1000))
//	//计算相差秒数
//	var leave3 = leave2 % (60 * 1000)//计算分钟数后剩余的毫秒数
//	var seconds = Math.round(leave3 / 1000)
//	//			alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");
//	var result;
//	if (days > 0) {
//		if (days == 1) {
//			result = "昨天";
//			return result;
//		}
//		if (days > 1) {
//			result = days + "天前";
//			return result;
//		}
//	} else {
//		if (hours > 0) {
//			result = hours + "小时" + minutes + "分钟前";
//			return result;
//		} else {
//			if (minutes < 1) {
//				result = "刚刚";
//				return result;
//			} else {
//				result = minutes + "分钟前";
//				return result;
//			}
//		}
//	}
//}
function getTime(t){
	var T = new Date(t*1000);
	var Y = T.getFullYear();
	var M = parseInt(T.getMonth())+1;
	if(M<10){
		M = '0'+M;
	}
	var D = T.getDay();
	if(D<10){
		D = '0'+D;
	}
	var H = T.getHours();
	if(H<10){
		H = '0' +H;
	}
	var m = T.getMinutes();
	if(m<10){
		m = '0'+m;
	}
	var time = Y+'-'+M+'-'+D+' '+H+':'+m;
	return time;
}
//加载到最低
function scrollBottom(callbak) {
	api.addEventListener({
		name : 'scrolltobottom',
		extra : {
			threshold : 0 //设置距离底部多少距离时触发，默认值为0，数字类型
		}
	}, function(ret, err) {
		if (callbak) {
			callbak();
		}
	})
}
function is_login(callback){
	var uid = get_local('uid');
	if(is_define(uid)){
		return true;
	}else{
		return false;
	}
}
function no_data_more(id){
	var html = '<div class="h25e umh25 tx-c c-wh ubtb ub-e0e0e0">';
	html +='<span class="t-545454 ftz08">没有更多信息了</span>';
	html +='</div>';
	$("#"+id).append(html);
}
function firstPage_no_data(id){

	var html = '<div class="h25e umh25 tx-c c-wh ubtb ub-e0e0e0">';
	html +='<span class="t-545454 ftz08">暂无数据</span>';
	html +='</div>';
	//alert(html)
	$("#"+id).append(html);
}
 function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
}

function stripscript(s) {
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
function Base64() { 
	// private property 
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; 
  
	// public method for encoding 
	this.encode = function (input) { 
		var output = ""; 
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4; 
		var i = 0; 
		input = _utf8_encode(input); 
		while (i < input.length) { 
			chr1 = input.charCodeAt(i++); 
	   		chr2 = input.charCodeAt(i++); 
	   		chr3 = input.charCodeAt(i++); 
	   		enc1 = chr1 >> 2; 
	   		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); 
		   	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); 
		  	enc4 = chr3 & 63; 
		   	if (isNaN(chr2)) { 
		    	enc3 = enc4 = 64; 
		   	} else if (isNaN(chr3)) { 
		    	enc4 = 64; 
		   	} 
		   	output = output + 
		   	_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + 
		   	_keyStr.charAt(enc3) + _keyStr.charAt(enc4); 
	  	} 
	  	return output; 
 	}
 	// public method for decoding 
 	this.decode = function (input) { 
	  	var output = ""; 
	  	var chr1, chr2, chr3; 
	  	var enc1, enc2, enc3, enc4; 
	  	var i = 0; 
	  	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); 
	  	while (i < input.length) { 
	   		enc1 = _keyStr.indexOf(input.charAt(i++)); 
	   		enc2 = _keyStr.indexOf(input.charAt(i++)); 
	   		enc3 = _keyStr.indexOf(input.charAt(i++)); 
	   		enc4 = _keyStr.indexOf(input.charAt(i++)); 
	   		chr1 = (enc1 << 2) | (enc2 >> 4); 
	   		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2); 
	   		chr3 = ((enc3 & 3) << 6) | enc4; 
	   		output = output + String.fromCharCode(chr1); 
	   		if (enc3 != 64) { 
	    		output = output + String.fromCharCode(chr2); 
	   		} 
	   		if (enc4 != 64) { 
	    		output = output + String.fromCharCode(chr3); 
	   		} 
	  	} 
	  	output = _utf8_decode(output); 
	  	return output; 
 	} 
  
 	// private method for UTF-8 encoding 
 	_utf8_encode = function (string) { 
	  	string = string.replace(/\r\n/g,"\n"); 
	  	var utftext = ""; 
	  	for (var n = 0; n < string.length; n++) { 
	   		var c = string.charCodeAt(n); 
	   		if (c < 128) { 
	    		utftext += String.fromCharCode(c); 
	   		} else if((c > 127) && (c < 2048)) { 
	    		utftext += String.fromCharCode((c >> 6) | 192); 
	    		utftext += String.fromCharCode((c & 63) | 128); 
	   		} else { 
	    		utftext += String.fromCharCode((c >> 12) | 224); 
	    		utftext += String.fromCharCode(((c >> 6) & 63) | 128); 
	    		utftext += String.fromCharCode((c & 63) | 128); 
	   		} 
	  	} 
	  	return utftext; 
 	} 
  
 	// private method for UTF-8 decoding 
 	_utf8_decode = function (utftext) { 
  		var string = ""; 
  		var i = 0; 
  		var c = c1 = c2 = 0; 
  		while ( i < utftext.length ) { 
   			c = utftext.charCodeAt(i); 
   			if (c < 128) { 
    			string += String.fromCharCode(c); 
    			i++; 
   			} else if((c > 191) && (c < 224)) { 
    			c2 = utftext.charCodeAt(i+1); 
    			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); 
    			i += 2; 
   			} else { 
    			c2 = utftext.charCodeAt(i+1); 
    			c3 = utftext.charCodeAt(i+2); 
    			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); 
    			i += 3; 
   			} 
  		} 
  		return string; 
 	} 
}
//时间戳转年月日
function timetostr_ymd(str,f)
{
	var t=(f)?parseInt(str):parseInt(str)*1000;
	var datetime=new Date(t);
	var y=datetime.getFullYear();
	var m=num_two(datetime.getMonth()+1);
	var d=num_two(datetime.getDate());
	var hour=num_two(datetime.getHours());
	var min=num_two(datetime.getMinutes());
	var sec=num_two(datetime.getSeconds());
	return y+"-"+m+"-"+d;
}
//计算几天以前/几个小时以前/几分钟以前/传参格式 2016-8-15 12:00:00
function getTimeDifference(oldTime) {
	//获取当前时间毫秒数
	var currentTime = new Date().getTime();
	//格式转换
//	var date1 = oldTime.replace(new RegExp("-", "gm"), "/");
	//获取毫秒数
//	var date2 = (new Date(date1)).getTime();
	//计算时间毫秒差
	var date3 = currentTime - oldTime*1000;
	var y1 = new Date().getFullYear();
	var y2 = new Date(oldTime*1000).getFullYear();
	
	var m1 = new Date().getMonth();
	var m2 = new Date(oldTime*1000).getMonth();
	
	var d1 = new Date().getDate();//获取当前日期
	var d2 = new Date(oldTime*1000).getDate();
	//计算出小时数
	var leave1 = date3 % (24 * 3600 * 1000)//计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000))
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000)//计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000))
	//计算相差秒数
	var leave3 = leave2 % (60 * 1000)//计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000)
	//			alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");
	var result;
	if(y1-y2>0){
		result = (y1-y2) + "年前";
		return result;
	}else{
		if(m1-m2>0){
			result = (m1-m2) + "月前";
			return result;
		}else{
			if(d1-d2>0){
				if( d2-d1 == 1 ){
					result = "昨天";
					return result;
				}else{
					result = (d1-d2) + "天前";
					return result;
				}
			}else{
				if (hours > 0) {
					result = hours + "小时前";
					return result;
				} else {
					if (minutes < 1) {
						result = "刚刚";
						return result;
					} else {
						result = minutes + "分钟前";
						return result;
					}
				}
			}
		}
	}
	
}


//七鱼客服在线对话
function to_qiyukf()
		{
			var qiyuSdk = api.require('qiyuSdk');
			var params = {
			    source:{
			        sourceTitle:'学股客服',
			        sourceUrl:'http://www.xueguwang.cn/',
			        sourceCustomInfo:'这里是学股客服，请问有什么可以帮到您？'
			    },
			    commodityInfo:{
			        commodityInfoTitle:'学股网',
			        commodityInfoDesc:'学股网是中国领先的金融在线教育平台，致力于为亿万投资者提供最专业、最全面的金融教育服务，打造国内首家学股、问股、谈股、直播、模拟交易等模块化立体化学习模式，覆盖A股、期货、基金、黄金、外汇、美股、港股、互联网金融，汇聚千余名财经高手通过在线解答、直播等形式为投资者传授和分享炒股经验，与国内多家证券公司、证券投资机构、基金公司、知名高校合作，共建投资者教育大平台',
			        pictureUrl:'http://www.xueguwang.cn/static/xueguwang/images/app_logo.png',
			        commodityInfoUrl:'http://www.xueguwang.cn/',
			        note:'',
			        show:true
			    },
			    sessionTitle:'学股客服',
			    groupId:0,
			    staffId:0
			}
			qiyuSdk.openServiceWindow(params);
}
//加载网页
function loadLink(url) {
	if (api.systemType == 'ios') {
		api.openApp({
			iosUrl : url,
		}, function(ret, err) {

		});
	} else {
		api.openApp({
			androidPkg : 'android.intent.action.VIEW',
			mimeType : 'text/html',
			uri : url
		}, function(ret, err) {

		});
	}
}
function viewImg(img) {
	var obj = api.require('imageBrowser');
	obj.openImages({
		imageUrls : [img],
		showList : false,
		activeIndex : 0
	});
}
function refreshNews(){
		api.execScript({
		    name: 'index',
		    frameName: 'study',
		    script: "is_login1()"
		});
		api.execScript({
		    name: 'root',
		    frameName: 'market',
		    script: "optional_stock()"
		});
		api.execScript({
			name :'root',
			frameName : 'main',
			script : 'Dynamic()'
		});
		api.execScript({
		    name:'class_details',
		    script: "location1();"
		});
		
	}