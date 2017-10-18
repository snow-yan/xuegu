function sdk_wx_reg()
{
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	    function(ret,err){
	        if (ret.status)
	        {
	            api.alert({msg:''+ret.status});
	        }
	        else
	        {
	            api.alert({msg:err.msg});
	        }
	    }
	);
}
function sdk_wx_share(scene,contentType,title,description,thumbUrl,contentUrl)
{
	//scene:session,timeline,favorite
	//contentType:text,image,music,video,web_page
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	    function(ret,err)
	    {
	        if (ret.status)
	        {
	        	weiXin.sendRequest(
	        	{
				    scene:scene,
				    contentType:contentType,
				    title:title,
				    description:description,
				    thumbUrl:thumbUrl,
				    contentUrl: contentUrl
				},
				function(ret,err)
				{
				    if(ret.status)
				    {
						$toast('发表成功');
				    } else
				    {
						$toast('发表失败');
				    };
				});
	        }
	        else
	        {
	        	$toast(err.msg);
	        }
	    }
	);
}
function sdk_wx_login(callback)
{
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	function(ret,err)
	{
		if (ret.status)
		{
			weiXin.auth(function(rets,errs)
			{ 
				if(ret.status)
				{
					if(is_define(callback))
					{
						callback(rets.token);
			    	}
			 	}
			 	else
			 	{
			    	$toast(errs.msg);
				}
			});
		}
		else
		{
			$toast(err.msg);
		}
	});	
}
function sdk_wx_get_userinfo()
{
	var obj = api.require('weiXin');
	obj.getUserInfo(function(ret,err)
	{
		if (ret.status)
	   	{
			$alert(json2str(ret));
		}
		else
		{
			$toast(err.msg);
		}
	});
}
function sdk_wx_pay()
{
	show_doing();
	api.ajax(
	{
		url : "http://raf.zv100.cn/api/payment/weixin/source/app.php",
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		returnAll : false,
		cache : true
	},
	function(ret, err)
	{
		if (ret)
		{
			var back_info = ret;
			var weiXin = api.require('weiXin');
			weiXin.registerApp(function(ret, err)
			{
				if (ret.status) 
				{
					weiXin.payOrder(
					{
						orderId : back_info.prepayid,
						partnerId : back_info.partnerid,
						nonceStr : back_info.noncestr,
						timeStamp : back_info.timestamp,
						package : back_info.package,
						sign : back_info.sign
					},function(ret, err)
					{
						hide_doing();
						if (ret.status)
						{
							$toast('支付成功');
						}
						else
						{
							$toast(err.msg, 3000);
						}
					});
				}
				else
				{
					hide_doing();
					$toast(err.msg,3000);
				}
			});
		}
		else
		{
			hide_doing();
			net_error();
		}
	});
}


//微信登录授权

function wx_login(){
	var wx = api.require('wx');
	//判断是否安装微信
	wx.isInstalled(function(ret, err) {
    if (ret.installed) {
        wx.auth(function(ret,err){
	        if(ret.status==true){
	            wx_token(ret.code);
	        }
		});
    } else {
       $toast('当前设备未安装微信客户端',1500);
    }
	});
}
//wx获取token
function wx_token(code){
	var wx = api.require('wx');
	wx.getToken({
	    code: code
	}, function(ret, err) {
	    if (ret.status) {
	    	//log(json2str(ret));
	       wx_user_info(ret.accessToken,ret.openId,ret)
	    }
	});
}
function share_wx(scene, url, title, description) {//微信好友和朋友圈
		wx = api.require('wx');
		
		wx.isInstalled(function(ret, err) {
			if (ret.installed) {
				wx.shareWebpage({
					scene : scene,
					title : title,
					description : description,
					thumb :"widget://icon/logo.png",
					contentUrl : url
				}, function(ret, err) {
					if (ret.status) {
						$toast('分享成功', 2000);
					} else {
						$toast('分享失败', 2000);
					}
				});
			} else {
				$toast('当前设备未安装微信客户端，请下载后分享', 2000);
			}
		});
}
