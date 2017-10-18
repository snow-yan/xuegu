function d_db_open(name,path,callback)//path为空的时候将自动建立数据库，另外只能访问fs目录下的数据库，widget的数据库是操作不了的
{
	if(is_define(path))
	{
		var path=path;
	}
	else
	{
		var path="";
	}
	db.openDatabase(
	{
	    name:name,
	    path:path
	},
	function(ret,err)
	{
	    if(ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback();
	    	}
	    	else
	    	{
	        	$toast("数据库打开成功");
	        }
	    }
	    else
	    {
	        $toast("数据库打开失败");
	    }
	});
}
function d_db_close(name)
{
	db.closeDatabase(
	{
	    name:name
	}, function(ret, err)
	{
	    if(ret.status)
	    {
	        $toast("数据库关闭成功");
	    }
	    else
	    {
	        $toast("数据库关闭失败");
	    }
	});
}
function d_db_select(database,sql,callback)
{
	db.selectSql({
	    name:database,
	    sql: sql
	}, function(ret,err)
	{
	    if(ret.status)
	    {
	    	if(is_define(callback))
	    	{
	    		callback(ret);
	    	}
	    	else
	    	{
	    		$alert(ret.data);
	    	}
	    }
	    else
	    {
	    	$toast("查询失败");
	    }
	});
}
function d_db_sql(database,sql)
{
	db.executeSql(
	{
	    name:database,
	    sql: sql
	},
	function(ret,err)
	{
	    if(ret.status)
	    {
	    	$toast("执行SQL成功");
	    }
	    else
	    {
	        $toast("执行SQL失败");
	    }
	});
}