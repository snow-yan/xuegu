function sdk_live_init(pushUrl,callback)
{
	live_net.requestMediaCapturerAccess(function(ret, err)
	{
    	if(ret.status)
    	{
    		live_net.pushLiveInit(
    		{
			    x: 0,
			    y: 0,
			    w: api.winWidth,
			    h: api.winHeight,
			    fixedOn: api.frameName,
			    fixed: true,
			    orientation: 1,//1 PORTRAIT 2 UPDOWN 3 RIGHT 4 LEFT
			    cameraPosition: 1,//1 FRONT 2 BACK
			    bitrate: 500000,//码率
			    fps: 24,//帧率
			    streamingQuality: 3,//1 LOW低清 352*288 2 MEDIUM标清 480*360 3 HIGH高清 640*480 4 SUPER高清 960*540 5 SUPER_HIGH 超高清 (1280*720)
			    videoRenderMode:1,//1 采集多大分辨率，则显示多大分辨率 2设置为16:9模式
			    pushUrl:pushUrl,
			    filterOn: true //是否开启滤镜
			},
			function(rets, errs)
			{
			    if(rets.status)
			    {
			    	sdk_live_start(callback);
//			    	ue_script_f('root','live','showSwiper();setPageInfo()');
			    }
			});
    	}
	});
}
function sdk_live_start(callback)
{
	live_net.startLive(function(ret, err)
	{
		if(is_define(callback))
		{
			callback(ret);
		}
	});
}
function sdk_live_close(callback)
{
	live_net.closeLive(function(ret, err)
	{
		if(is_define(callback))
		{
			callback(ret);
		}
	});
}
function sdk_live_stop(callback)
{
	live_net.stopLive(function(ret, err)
	{
		if(is_define(callback))
		{
			callback(ret);
		}
	});
}
function sdk_live_camera(callback)
{
	live_net.switchCamera(function(ret, err)
	{
		if(is_define(callback))
		{
			callback();
		}
	});
}
function sdk_live_flash(callback)
{
	live_net.switchFlash(function(ret, err)
	{
		if(is_define(callback))
		{
			callback();
		}
	});
}
function sdk_live_beauty(callback)
{
	live_net.filterType({
	    filter:"美颜"
	},function(ret, err) {
	    if(is_define(callback))
		{
			callback();
		}
	});
}