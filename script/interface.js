

function open_drag_layer()
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+50;
	api.openFrame({
		name : 'drag_layer',
		url : '../pub_html/drag_layer.html',
		rect : {
			x : 0,
			y : header_h,
			w : 'auto',
			h :'auto',
		},
		bounces : false,
		allowEdit : true,
		bgColor : 'rgba(0,0,0,0)',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true,
		reload : false
	});
}
function open_drag_layer_c(h)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.openFrame({
		name : 'drag_layer_c',
		url : '../pub_html/drag_layer_c.html',
		rect : {
			x : 0,
			y : header_h,
			w : 'auto',
			h :'auto',
		},
		opaque : true,
		bounces : true,
		allowEdit : true,
		bgColor : '#ffffff',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true,
		reload : false
	});
}
function set_drag_layer(h)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.setFrameAttr(
	{
		name: 'drag_layer',
		rect:
		{
			x:0,
			y:header_h,
			w:'auto',
			h:'auto'
		}
	});
}
function set_drag_layer_c(h)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.setFrameAttr(
	{
		name: 'drag_layer_c',
		rect:
		{
			x:0,
			y:header_h,
			w:'auto',
			h:'auto'
		},
		bounces: true,
		bgColor: '#fff',
		vScrollBarEnabled:true,
		hScrollBarEnabled:true
	});
}
function drag_layer_an(h)
{
    var duration = 200;
	api.animation (
	{
	    name: 'drag_layer',
	    delay: 0,
	    duration: duration,
	    curve: 'ease_in',
	    repeatCount: 0,
	    autoreverse: false,
	    translation:
	    {
	        x: 0,
	        y: h
	    }
	}, function()
	{
	});
	api.animation (
    {
        name: 'drag_layer_c',
        delay: 0,
        duration: duration,
        curve: 'ease_in',
        repeatCount: 0,
        autoreverse: false,
        translation:
        {
            x: 0,
            y: h
        }
    }, function()
    {
    });
}
function search_bar(callback)
{
	var obj = api.require('UISearchBar');
	obj.open({
	    placeholder: '请输入搜索关键字',
	    historyCount: 10,
	    showRecordBtn: true,
	    texts: {
	        cancelText: '取消',
	        clearText: '清除搜索记录'
	    },
	    styles: {
	        navBar: {
	            bgColor: '#FFFFFF',
	            borderColor: '#ccc'
	        },
	        searchBox: {
	            bgImg: '',
	            color: '#000',
	            height: 32
	        },
	        cancel: {
	            bg: 'rgba(0,0,0,0)',
	            color: '#D2691E',
	            size: 16
	        },
	        list: {
	            color: '#696969',
	            bgColor: '#FFFFFF',
	            borderColor: '#eee',
	            size: 16
	        },
	        clear: {
	            color: '#000000',
	            borderColor: '#ccc',
	            size: 16
	        }
	    }
	},function(ret)
	{
		if(is_define(callback))
		{
			if(ret.eventType=='search'||ret.eventType=='history')
			{
				callback(ret.text);
			}
		}
	});
}
function bottom_comment(callback)
{
	var obj = api.require('inputField');
	obj.open(
	{
		bgColor:'#23aec3',
		lineColor:'#f2f2f2',
		fileBgColor:'#ffffff',
		borderColor:'#f2f2f2',
		placeholder:'请输入评论内容',
		maxLines:5,
		sendImg:'widget://image/sdk/send_bg.png'
	},function(ret,err)
	{
		if(is_define(ret.msg)&&is_define(callback))
		{
			callback(ret.msg);
			obj.close();
		}
		else
		{
			$toast('请输入评论内容');
		}
	})
}
function chat_form(callback)
{
	UIChatBox.open(
	{
	    placeholder:'请输入',
	    autoFocus:false,
	    maxRows: 4,
	    emotionPath: 'widget://image/sdk/chat/emotion',
	    texts: {
	        sendBtn:{
	            title:"发送"
	        }
	    },
	    styles: {
	        inputBar: {
	            borderColor: '#d9d9d9',
	            bgColor: '#f2f2f2'
	        },
	        inputBox: {
	            borderColor: '#B3B3B3',
	            bgColor: '#FFFFFF'
	        },
	        emotionBtn: {
	            normalImg: 'widget://image/sdk/chat/smile.png'
	        },
	        keyboardBtn: {
	            normalImg: 'widget://image/sdk/chat/keyword.png'
	        },
	        indicator: {
	            target: 'both',
	            color: '#c4c4c4',
	            activeColor: '#9e9e9e'
	        },
	        sendBtn: {
	            titleColor: '#737373',
	            bg: '#f3f3f3' ,
	            activeBg: '#999999',
	            titleSize: 14
	        }
	    }
	}, function( ret, err )
	{
		if (ret.eventType=='send')
		{
			if(is_define(callback))
			{
				if (is_define(ret.msg))
				{
					callback(ret,'0');
				}
				else
				{
					$toast("至少说点什么吧");
				}
			}
		}
		else if(ret.eventType=="show")
		{
			UIChatBox.popupKeyboard();
			listener_chat_form();
		}
	});
}
function listener_chat_form()
{
	UIChatBox.addEventListener(
	{
		target : 'inputBar',
		name : 'move'
	}, function(ret, err)
	{
		if(ret.panelHeight==0)
		{
			UIChatBox.close();
		}
	});
}
function scroll_to_here(id)
{
	var elem = document.getElementById(id);
	var scrollPos = elementPosition(elem).y;
	scrollPos = scrollPos - document.documentElement.scrollTop;
	var remainder = scrollPos % 50;
	var repeatTimes = (scrollPos - remainder) / 50;
	scrollSmoothly(scrollPos, repeatTimes);
	window.scrollBy(0, remainder);
}

function elementPosition(obj)
{
	var curleft = 0, curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while ( obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return {
		x : curleft,
		y : curtop
	};
}

var repeatCount = 1;
var cTimeout;
var timeoutIntervals = new Array();
var timeoutIntervalSpeed;
function scrollSmoothly(scrollPos, repeatTimes) {
	if (repeatCount < repeatTimes) {
		window.scrollBy(0, 50);
	} else {
		repeatCount = 1;
		clearTimeout(cTimeout);
		return;
	}
	repeatCount++;
	cTimeout = setTimeout("scrollSmoothly('" + scrollPos + "','" + repeatTimes + "')", 0);
}