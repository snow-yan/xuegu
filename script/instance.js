
function select_area_self(callback)
{
	var data = "{values :{service:'interface',act:'list_area'}}";
	var over_select_html='<div id="over_select_button" onclick="close_select_area_self()" tapmode="" class="umh15 tx-r tx-r pstnf absl0 umh2 c-999 w10 ubt" style="bottom:120px;background-color:#f0f1f2;border-color:#929599"><p class="pdr05">完成</p></div>';
	$("body").append(over_select_html);
	api.parseTapmode();
	r_ajax(serverURL,data,function(ret)
	{
		var obj = api.require('UILinkedPicker');
		obj.open(
		{
			rect:{
				x: 0,
				y: api.frameHeight-120, 
				w: api.frameWidth, 
				h: 120  
			},
			styles:
			{
				bg: '#d2d5db',  
				text:
				{                  
					size: 14,             
					selected: '#999',     
					normal: '#333'        
				},
				item:
				{                   
					w: parseInt(api.frameWidth/3),                
					h: 24,                
					normal: 'rgba(0,0,0,0)',    
					selected: 'rgba(0,0,0,0)',  
					zoomIn: 1.2        
		        }
			},
			rows:5,
			indexs:[0,0,0],
			bounce:true,
			fixedOn:api.frameName,
			fixed:true,
			data:ret.data
		}, function(ret) 
		{
			if(is_define(callback))
			{
				callback(json2str(ret));
			}
		});
	});
}
function close_select_area_self()
{
	$("#over_select_button").remove();
	var obj = api.require('UILinkedPicker');
	obj.hide();
}
//图像浏览
function view_img(img_arr,index) {
	if(!is_define(index))
	{
		var index=0; 
	}
	var obj = api.require('imageBrowser');
	obj.openImages(
	{
		imageUrls:img_arr,
		showList:false,
		activeIndex:index
	});
}
function select_img_more(callback)
{
	var obj = api.require('UIMediaScanner');
	obj.open({
	    type:'picture',
	    column: 4,
	    classify: true,
	    max: 9,
	    sort: {
	        key: 'time',
	        order: 'desc'
	    },
	    texts: {
	        stateText: '已选择*项',
	        cancelText: '取消',
	        finishText: '完成'
	    },
	    styles: {
	        bg: '#fff',
	        mark: {
	            icon: '',
	            position: 'bottom_left',
	            size: 20
	        },
	        nav: {
	            bg: '#eee',
	            stateColor: '#000',
	            stateSize: 18,
	            cancelBg: 'rgba(0,0,0,0)',
	            cancelColor: '#000',
	            cancelSize: 18,
	            finishBg: 'rgba(0,0,0,0)',
	            finishColor: '#000',
	            finishSize: 18
	        }
	    }
	},function(ret)
	{
	    if(ret)
	    {
	    	for(i=0;i<ret.list.length;i++)
	    	{
	    		alert(ret.list[0].thumbPath);
	    	}
	    }
	});
}
function location2address(lat,lon)
{
	var baidu_url="http://api.map.baidu.com/geocoder/v2/";//百度服务端接口地址
	var data = "{values :{ak:'eUdorifLUUXVV9FMINfsTbTx',location:'"+lat+","+lon+"',output:'json',pois:'0'}}";
	r_ajax(baidu_url,data,function(ret)
	{
		alert(json2str(ret));
	})
}