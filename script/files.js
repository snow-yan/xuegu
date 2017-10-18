function d_f_add_dir(path,callback)//如果目录已经存在则不能创建
{
	var fs=api.require('fs');
	fs.createDir(
	{
	    path:path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('创建目录成功');
	    	}
	    }
	    else
	    {
	    	$toast("创建目录失败");
	    }
	});
}
function d_f_del_dir(path,callback)
{
	var fs = api.require('fs');
	fs.rmdir(
	{
	    path:path
	},
	function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('删除目录成功');
	    	}
	    }
	    else
	    {
	    	$toast("删除目录失败");
	    }
	});
}
function d_f_add_file(path,callback)//如果文件已经存在则不能创建
{
	var fs=api.require('fs');
	fs.createFile(
	{
	    path:path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('创建文件成功');
	    	}
	    }
	    else
	    {
	    	$toast("创建文件失败");
	    }
	});
}
function d_f_del_file(path,callback)
{
	var fs = api.require('fs');
	fs.remove(
	{
	    path:path
	},
	function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('删除文件成功');
	    	}
	    }
	    else
	    {
	    	$toast("删除文件失败");
	    }
	});
}
function d_f_copy(old_path,now_path,callback)//old_path可以是文件路径也可以是文件夹
{
	var fs = api.require('fs');
	fs.copyTo(
	{
	    oldPath:old_path,
	    newPath:now_path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('拷贝成功');
	    	}
	    }
	    else
	    {
	    	$toast("拷贝失败");
	    }
	});
}
function d_f_move(old_path,now_path,callback)//old_path只能是文件，不能是文件夹
{
	var fs = api.require('fs');
	fs.moveTo(
	{
	    oldPath:old_path,
	    newPath:now_path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('移动成功');
	    	}
	    }
	    else
	    {
	    	$toast("移动失败");
	    }
	});
}
function d_f_rename(old_path,now_path,callback)//old_path，now_path都支持文件和文件夹
{
	var fs = api.require('fs');
	fs.rename(
	{
	    oldPath:old_path,
	    newPath:now_path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	    		$toast('命名成功');
	    	}
	    }
	    else
	    {
	    	$toast("命名失败");
	    }
	});
}
function d_f_dir(path,callback)
{
	var fs = api.require('fs');
	fs.readDir(
	{
	    path:path
	},function(ret,err)
	{
		if(ret.status)
		{
			if(ret.data)
			{
				if(is_define(callback))
		    	{
		    		callback(ret.data);
		    	}
		    }
		    else
		    {
		    	$toast('目录为空');
		    }
		}
		else
		{
			$toast('目录不存在');
		}
	});
}
function d_f_read(file,callback)//old_path，now_path都支持文件和文件夹
{
	var fs = api.require('fs');
	fs.open(
	{
	    path:file,
    	flags: 'read_write'//read-只读write-只写read_write-读写
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	fs.read(
	    	{
			    fd:ret.fd,
			    offset:0,
			    length:0
			},
			function(rets,errs)
			{
			    if (rets.status)
			    {
			    	if(is_define(callback))
			    	{
			    		callback(rets.data);
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
	    	$toast("打开失败");
	    }
	});
}
function d_f_attr(path,callback)//path可以是一个文件，也可以是一个文件夹
{
	var fs = api.require('fs');
	fs.getAttribute(
	{
	    path:path
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback(ret.attribute);
	    	}
	    	else
	    	{
	    		if(ret.attribute.type=="folder")
	    		{
	    			$alert("创建时间:"+timetostr(ret.attribute.creationDate)+",文件夹大小:"+ret.attribute.size+",最后修改时间:"+timetostr(ret.attribute.modificationDate),'文件夹属性');
	    		}
	    		else if(ret.attribute.type=="file")
	    		{
	    			$alert("创建时间:"+timetostr(ret.attribute.creationDate)+",文件夹大小:"+ret.attribute.size+",最后修改时间:"+timetostr(ret.attribute.modificationDate),'文件属性');
	    		}
	    	}
	    }
	    else
	    {
	        api.alert({msg:err.msg});
	    }
	});
}
function d_f_exist(path,callback)//path可以是一个文件，也可以是一个文件夹
{
	var obj = api.require('fs');
	obj.exist(
	{
	    path:path
	},function(ret,err)
	{
	    if(ret.exist)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{	
	        	if(ret.directory)
	        	{
	        		$toast("文件夹存在");
	        	}
	        	else
	        	{
	        		$toast("文件存在");
	        	}
	    	}
	    }
	    else
	    {
	        $toast("文件不存在");
	    }
	});
}
function d_f_substr(path,start,len,callback)
{
	var fs = api.require('fs');
	fs.readByLength(
	{
	    path:path,
	    substring:
	    {
	      start:start,
	      length:len
	    }
	},function(ret,err)
	{
	    if (ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback(ret.content);
	    	}
	    }
	    else
		{
			$toast(err.msg);
	    }
	});
}