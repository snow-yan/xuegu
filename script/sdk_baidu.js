function open_drag_layer()
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+50;
	api.openFrame({
		name : 'baidu',
		url : '../pub_html/baidu.html',
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
		name : 'baidu_c',
		url : '../pub_html/baidu_c.html',
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
		name: 'baidu',
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
		name: 'baidu_c',
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
	    name: 'baidu',
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
        name: 'baidu_c',
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
function sdk_m_open(callback)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h;
	var map = api.require('bMap');
	map.open(
	{
		rect:
		{
			x: 0,
			y: header_h
		},
		zoomLevel: 10,
		showUserLocation: true,
		fixedOn: '',
		fixed: true
	},function(ret)
	{
		if(ret.status&&is_define(callback))
		{
			callback();
		}
	});
	//以下是为了我让我这里的弹出的两个界面至于到地图之上，具体自己使用的时候看情况
	api.bringFrameToFront(
	{
	    from:'baidu'
	});
	api.bringFrameToFront(
	{
	    from:'baidu_c'
	});
}
function sdk_m_get_location(callback)
{
	var location= new Object();
	location.lat="";
	location.lon="";
	var bMap = api.require('bMap');
	bMap.getLocation(
	{
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	},function(ret, err)
	{
	    if(ret.status&&is_define(callback))
	    {
			callback(ret.lat,ret.lon);
	    }
	    else
	    {
	        $toast("位置获取失败");
	    }
	});
}
function sdk_m_set_center(lat,lon,callback)
{
	var map = api.require('bMap');
	map.setCenter(
	{
	    coords: {
	        lon: lon,
	        lat: lat
	    }
	});
}
function sdk_m_set_level(v)
{
	var map = api.require('bMap');
	map.setZoomLevel(
	{
	    level:v
	});
}
function sdk_m_add_point(lat,lon,id,callback)
{
	if(!is_define(id))
	{
		var id=0;
	}
	var map = api.require('bMap');
	ids_arr=new Array(id);
	map.removeAnnotations({ids:ids_arr});
	map.addAnnotations(
	{
	    annotations:[{"id":id,"lon":lon,"lat":lat}]
	}, function(ret)
	{
	    if(ret&&is_define(callback))
	    {
	    	callback(ret.id);
	    }
	});
}
function sdk_m_is_point(id,callback)
{
	var map = api.require('bMap');
	map. annotationExist(
	{
	    id:id
	},function(ret)
	{
	    if(ret.status)
	    {
	        if(is_define(callback))
	        {
	        	callback();
	        }
	    }
	    else
	    {
	    	$toast('标注不存在');
	    }
	});
}
function sdk_m_del_listener(name)
{
	var map = api.require('bMap');
	map.removeEventListener(
	{
	    name:name
	});
}
function sdk_m_add_listener(name,callback)
{
	var map = api.require('bMap');
	map.addEventListener(
	{
	    name:name
	},function(ret)
	{
	    if(ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback(ret.lat,ret.lon);
	    	}
	    }
	});
}
function sdk_m_set_bubble(id,title,subTitle,callback,icon,bgimg)
{
	if(!is_define(icon))
	{
		var icon="";
	}
	if(!is_define(bgimg))
	{
		var bgimg="";
	}
	var map = api.require('bMap');
	map.setBubble(
	{
	    id:id,
	    bgImg:bgimg,
	    content: {
	        title:title,
	        subTitle:subTitle,
	        illus:icon
	    },
	    styles:
	    {
	        titleColor: '#000',
	        titleSize: 16,
	        subTitleColor: '#999',
	        subTitleSize: 12,
	        illusAlign: 'left'
	    }
	},function(ret)
	{
	    if(ret&&is_define(callback))
	    {
	    	callback(ret.id);
	    }
	});
}
function sdk_m_get_nfl(lat,lon,callback)
{
	var map = api.require('bMap');
	map.getNameFromCoords(
	{
	    lon:lon,
	    lat:lat
	},function(ret,err)
	{
	    if(ret.status&&is_define(callback))
	    {
	    	callback(json2str(ret));
	    }
	});
}
function sdk_m_get_lfn(city,adress,callback)
{
	var map = api.require('bMap');
	map.getCoordsFromName(
	{
	    city: city,
	    address: adress
	},function(ret,err)
	{
	    if(ret.status&&is_define(callback))
	    {
			callback(ret.lat,ret.lon)
	    }
	});
}
function sdk_m_get_dis(lat,lon,lat1,lon1,callback)//两点之间的距离
{
	var map = api.require('bMap');
	map.getDistance(
	{
	    start:{
	        lon:lon,
	        lat:lat
	    },
	    end: {
	        lon:lon1,
	        lat:lat1
	    }
	},function(ret)
	{
	    if(ret.status)
	    {
	        alert(ret.distance);
	    }
	});
}
function sdk_m_set_heat()//设置热力图
{
	var map = api.require('bMap');
	map.setHeatMap(
	{
	    heatMap: true
	});
}
function sdk_m_set_traffic()//设置交通状况
{
	var map = api.require('bMap');
	map.setTraffic(
	{
	    traffic: true
	});
}
function sdk_m_change_to_baidu(type,lat,lon,callback)
{
	var map = api.require('bMap');
	map.transCoords(
	{
	    type: "gps",
	    lon: 116.351,
	    lat: 39.283,
	    mcode: '76:7B:F2:AC:51:42:3A:55:93:97:F1:B6:93:FB:7A:70:96:6F:53:D9;com.apicloud.A6971592675963'
	},function(ret, err)
	{
	    if(ret.status&&is_define(callback))
	    {
	    	callback(ret.lat,ret.lon);
	    }
	});
}