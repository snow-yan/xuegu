function sdk_mkx_auth(callback)
{
	var obj = api.require('maketionCardReader');
	obj.auth(function(ret, err)
	{
	    if(ret.status)
	    {
	        if(is_define(callback))
	        {
	        	callback(ret.uid);
	        }
	    }
	    else
	    {
	        $toast(err.msg);
	    }
	});
}
function sdk_mkx_is_auth(callback)
{
	var obj = api.require('maketionCardReader');
	obj.isAuth(function(ret, err)
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
	        $toast("验证失败");
	    }
	});
}
function sdk_mkx_del_auth(callback)
{
	var obj = api.require('maketionCardReader');
	obj.clearAuth(function(ret, err)
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
	        $toast("验证失败");
	    }
	});
}
function sdk_mkx_open(callback)
{
	var obj = api.require('maketionCardReader');
	obj.open(function(ret, err)
	{
		if(ret.state=="err")
		{
			//$toast("上传失败");
			//上传失败再次调用上传
			if(is_define(ret.uuid))
			{
				obj.uploadImg(function(rets, errs)
				{
					if(rets.state=="err")
					{
						$toast("上传失败");
					}
					else if(rets.state=="uploaded")
					{
						if(is_define(callback))
						{
							callback(rets.uuid);
						}
					}
				});
			}
		}
		else if(ret.state=="uploaded")
		{
			if(is_define(callback))
			{
				//注意正常我们直接调用callback(ret.uuid);我这里因为是要显示出来用户的数据，这里脉可寻需要云端识别时间，所以我延迟了10秒以后执行
				setTimeout(function(){callback(ret.uuid)},5000);
			}
		}
	});
}
function sdk_mkx_get(uuid)
{
	uuids=new Array();
	uuids.push(uuid);
	var obj = api.require('maketionCardReader');
	obj.getDataWithUuid(
	{
	    uuids:uuids
	},function(ret, err)
	{
	    if(ret.status)
	    {
	        $alert(ret.datas);
	    }
	    else
	    {
	    	$toast(err.msg);
	    }
	});
}