function an_1()
{
	var obj = api.require('scrollRotation');
	obj.open(
	{
		x:0,
		y:20,
		items:[
		{
		    imgPath :"widget://image/welcome/1.jpg",
		    title:"一",
		    fontColor:"#000000",
		    fontSize:"13"
		},
		{
		    imgPath :"widget://image/welcome/2.jpg",
		    title:"二",
		    fontColor:"#000000",
		    fontSize:"13"
		},
		{
		    imgPath :"widget://image/welcome/3.jpg",
		    title:"三",
		    fontColor:"#000000",
		    fontSize:"13"
		},
		{
		    imgPath :"widget://image/welcome/4.jpg",
		    title:"四",
		    fontColor:"#000000",
		    fontSize:"13"
		},
		{
		    imgPath :"widget://image/welcome/5.jpg",
		    title:"五",
		    fontColor:"#000000",
		    fontSize:"13"
		}],
		cornerRadius:50,
		intervalTime:0,//自动播放时间s
		pageControl:
		{
			normalColor:"#ffffff",//默认颜色
			selectedColor:"#000000",//活动颜色，这个测试了一下，没有作用永远是粉色
			heightPercent:100//顶部坐标
		}
	},
	function(ret,err)
	{
	    if(ret.click)
	    {
	        $toast("做了点击操作，即将关闭视图");
	        obj.close();
	    }
	    $alert("第"+ret.index+"张图片到了中间");
	});
}
function an_2()
{
	var MNStack = api.require('MNStack');
	MNStack.open(
	{
		startCoords:
		{
			x:80,
			y:260
		},
		styles:
		{
			bg : 'rgba(0,0,0,0.7)',
			//itemHeight : 50,
			titleColor : '#000',
			direction : 'right_down' //right_up-往右边向上弹出right_down-向右边向下弹出left_up-往左边向上弹出right_down-向左边向下弹出
		},
		items : [
		{
			title : '腾讯',
			icon : 'widget://image/icon/share/qq.png',
			bgColor : "rgba(255,255,0,0.8)",
			highlightColor : "#ffffff"//点击以后的颜色
		},
		{
			title : '新浪',
			icon : 'widget://image/icon/share/sina.png',
			bgColor : "rgba(255,255,255,0.8)",
			highlightColor : "#000000"//点击以后的颜色
		},
		{
			title : '微信',
			icon : 'widget://image/icon/share/wx.png',
			bgColor : "rgba(255,255,255,0.8)",
			highlightColor : "#ff0000"//点击以后的颜色
		}]
	},
	function(ret, err)
	{
		$alert(ret.index);
	});
}
function an_3()
{
	var obj = api.require('actionButton');
	obj.open(
	{
		bg:"rgba(0,0,0,0.8)",
		size:60,
		items:[
		{bgColor:'#56d896',title:'朋友圈',image:'widget://image/icon/share/wxgroup.png',titleColor:"#ffffff"},
		{bgColor:'#48cc50',title:'微信好友',image:'widget://image/icon/share/wx.png',titleColor:"#ffffff"},
		{bgColor:'#ffb027',title:'腾讯微博',image:'widget://image/icon/share/qqsky.png',titleColor:"#ffffff"},
		{bgColor:'#fc7c79',title:'新浪微博',image:'widget://image/icon/share/sina.png',titleColor:"#ffffff"},
		{bgColor:'#45ccd1',title:'短信',image:'widget://image/icon/share/sms.png',titleColor:"#ffffff"}],
	    matrix:{row:2,column:4,bottomMargin:0},
	    clickDisappear:true,//点击子菜单按钮后是否关闭菜单
	    pageControl:{activeColor:'#ffffff',inactiveColor:'#000000'}
	},
	function(ret,err)
	{
		$toast(ret.index);
	});
}
function an_4()
{
	var obj = api.require('circularMenu');
	obj.open(
	{
		centerX:parseInt(api.frameWidth/2),//圆心坐标
		centerY:parseInt(api.frameHeight/2),//圆心坐标
		bgImg:'widget://image/test/circularMenu/bg.png',//整个环的背景
		centerBtnImg:'widget://image/test/circularMenu/center.png',//环中间图片
		indicatorPosition:"right",//默认left,当left的时候，最终的indicatorIndex就是看左边的对应9点钟指针，如果是right就是最终看3点的指针
	    items:[
		{title:'朋友圈',normal:'widget://image/icon/share/wxgroup.png',titleColor:"#ffffff"},
		{title:'微信好友',normal:'widget://image/icon/share/wx.png',titleColor:"#ffffff"},
		{title:'腾讯微博',normal:'widget://image/icon/share/qqsky.png',titleColor:"#ffffff"},
		{title:'新浪微博',normal:'widget://image/icon/share/sina.png',titleColor:"#ffffff"},
		{title:'短信',normal:'widget://image/icon/share/sms.png',titleColor:"#ffffff"}]
	},
	function(ret, err)
	{
		if(ret.click)
		{
			$toast("做了点击操作，即将关闭视图");
			$alert("您点击了:"+ret.index+"按钮");
			obj.close();
		}
		else
		{
			$toast("指针落到了"+ret.indicatorIndex+"按钮");
		}
	});
}
function an_5()
{
	var obj = api.require('pullMenu');
	obj.open(
	{
		type:"down",//取值范围up--从上往下、down--从下往上
		h:parseInt(api.frameHeight/2),
		alpha:0.7,
		bgColor:"#000000",//目前苹果无效
	    btnArray:
	    [{
			normal: 'widget://image/icon/default_face.png',
			highlight: 'widget://image/icon/default_face.png'
	    },{
			normal: 'widget://image/icon/share/wx.png',
			highlight: 'widget://image/icon/share/wx.png'
	    },{
			normal: 'widget://image/icon/share/wxgroup.png',
			highlight: 'widget://image/icon/share/wxgroup.png'
	    },{
			normal: 'widget://image/icon/share/sina.png',
			highlight: 'widget://image/icon/share/sina.png'
	    },{
			normal: 'widget://image/icon/share/qq.png',
			highlight: 'widget://image/icon/share/qq.png'
	    },{
			normal: 'widget://image/icon/share/qqsky.png',
			highlight: 'widget://image/icon/share/qqsky.png'
	    },{
			normal: 'widget://image/icon/share/sms.png',
			highlight: 'widget://image/icon/share/sms.png'
	    }]
	},
	function(ret,err)
	{
		$alert("点击了"+ret.index+"个按钮");
		$toast("做了点击操作，即将关闭视图");
		obj.close();
	});
}
function an_6()
{
	var obj=api.require('arcMenu');
	obj.open(
	{
	    type:"arc",//arc为弧形菜单，straight为直线型菜单
	    mainMenu:
	    {
	        x:140,
	        y:360,
	        w:50,
	        h:50,
	        img: 'widget://image/test/arcMenu/centerImg.png',
	        imgLight: 'widget://image/test/arcMenu/centerImgLight.png'
	    },
	    items:
	    [
	    	{w:40,h:40,img:'widget://image/icon/default_face.png',imgLight:'widget://image/icon/default_face.png'},
	        {w:40,h:40,img:'widget://image/icon/share/wx.png',imgLight:'widget://image/icon/share/wx.png'},
	        {w:40,h:40,img:'widget://image/icon/share/wxgroup.png',imgLight:'widget://image/icon/share/wxgroup.png'},
	        {w:40,h:40,img:'widget://image/icon/share/sina.png',imgLight:'widget://image/icon/share/sina.png'},
	        {w:40,h:40,img:'widget://image/icon/share/qq.png',imgLight:'widget://image/icon/share/qq.png'},
	        {w:40,h:40,img:'widget://image/icon/share/qqsky.png',imgLight:'widget://image/icon/share/qqsky.png'},
	        {w:40,h:40,img:'widget://image/icon/share/sms.png',imgLight:'widget://image/icon/share/sms.png'}
	    ],
	    startAngle:0,//起点角度（12点钟方向为0度，顺时针方向计数）
	    wholeAngle:180,//弧形菜单的角度大小，当type为arc时必传，当type为straight时此参数可不传
	    radius:100,
	    shieldClick:true//点击非菜单区域是否收缩菜单
	},function(ret,err)
	{
		if(is_define(ret.index))
		{
			$alert("点击了"+ret.index+"个按钮");
			$toast("做了点击操作，即将关闭视图");
			obj.close({id:1});
		}
	});
}
function an_7()
{
	var obj = api.require('stackMenu');
	obj.open(
	{
	    items:
	    [
	    	{title:'标题一',icon:'widget://image/icon/share/wx.png'},
	    	{title:'标题二',icon:'widget://image/icon/share/wxgroup.png'},
	    	{title:'标题三',icon:'widget://image/icon/share/qq.png'}
	    ],
	    titleColor:"#ffffff",
	    direction:"right_up"//right_up-往右边向上弹出,right_down-向右边向下弹出,left_up-往左边向上弹出,left_down-向左边向下弹出
	},function(ret,err)
	{
	    $alert("点击了"+ret.index+"个按钮");
	    $toast("做了点击操作，即将关闭视图");
		obj.close();
	});
}
function an_8()
{
	var obj=api.require('bubbleMenu');
	obj.open(
	{
		centerX:100,
		centerY:100,
		style:
		{
			bgColor:"#5e1818",   //菜单按钮背景色，支持rgb,rgba,#,默认#000000，可为空
		   	lightColor:"#8b3939",  //菜单按钮点击色，支持rgb,rgba,#,默认#009ACD，可为空
		   	borderColor:"#5e1818",// 菜单边框色，支持rgb,rgba,#,默认#000000，可为空 
		   	cutLineColor:"#ffffff",// 菜单按钮分割线色，支持rgb,rgba,#,默认#636363，可为空
		   	titleColor:"#ffffff"   //菜单按钮标题色，支持rgb,rgba,#,默认#ffffff，可为空
		},
	    btnArray:[{title:'复制'}, {title:'粘贴'}, {title:'删除'}]
	},function(ret,err)
	{
		$alert("点击了"+ret.index+"个按钮");
	});
}
function an_9()
{
	var obj = api.require('navigationMenu');
	obj.open(
	{
	    btnInfo:
	    [
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'微信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'朋友圈'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'QQ'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'QQ空间'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'新浪微博'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	},
	    	{
	    		normal:'widget://image/test/navigationMenu/icon.png',
	    		highlight:'widget://image/test/navigationMenu/normal.png',
	    		selected:'widget://image/test/navigationMenu/selected.png',
	    		title:'短信'
	    	}
	    ]
	},function(ret,err)
	{
		$alert("点击了"+ret.index+"个按钮");
	});
}
function an_10()
{
	var obj = api.require('sideMenu');
	obj.open(
	{
		type:1,//0代表从左往右弹出，非0代表从右往左弹出，可为空
		startPosition:0,//菜单最上边的第一个按钮的起始位置，可为空
		btnHeight:60,
		interval:10,
		trajectoryColor:"#000000",//弹出的按钮的弹道的颜色，可为空，若为空则不显示弹道
	    btnArray:
		[
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'},
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'},
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'},
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'},
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'},
			{icon:'widget://image/test/sideMenu/icon.png',bgImg:'widget://image/test/sideMenu/bg.png'}
		],
		clickHide:true//点击子按钮后是否隐藏菜单，可为空
	},function(ret,err)
	{
		if(is_define(ret.index))
		{
			$alert("点击了"+ret.index+"个按钮");
			$toast("做了点击操作，即将关闭视图");
		}
	});
}
function an_11()
{
	var obj = api.require('imageFilter');
	obj.open (
	{
	    imgPath: 'widget://image/welcome/1.jpg'
	}, function(ret, err)
	{
	    if(ret.status)
	    {
			alert(ret.id);
			obj.filter(
			{
		   		id:ret.id,
		    	type:"black_white"
			},function(rets,errs)
			{
				return false;
		    	if(rets.status)
		    	{
					api.alert({msg:rets.path});
		    	}
		    	else
		    	{
		        	api.alert({msg:'error'});
		    	}
			});
	    }
	    else
	    {
	        api.alert({msg:err.code});
	    }
	});
}