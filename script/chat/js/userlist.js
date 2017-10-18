function userlist()
/**
 *用户组列表集合
 **/
{
  //用户列表集合
  this.__usersingles = [];
  
  //是否进入单个用户聊天
  this.is_single = false;
  
  //当前用户聊天的username
  this.single_username = '';
}


userlist.prototype.setuser = function(data)
/**
 *添加用户
 *return 用户usersingle对象
 **/
{
  var vUserSingle = new usersingle(data);
  this.__usersingles.push(vUserSingle);
  return vUserSingle;
}

userlist.prototype.getuser = function(pUserName)
/**
 *获取用户usersingle对象
 *return 用户usersingle对象
 **/
{
    for(var vIndex = 0;vIndex < this.__usersingles.length;vIndex++)
    {
        if(this.__usersingles[vIndex] == null) continue;
        if(this.__usersingles[vIndex].username == pUserName)
        {
            return this.__usersingles[vIndex];
        }
    }
    return false;
}

//删除用户
userlist.prototype.unsetuser = function(pUserName)
{
    for(var vIndex = 0;vIndex < this.__usersingles.length;vIndex++)
    {
        if(this.__usersingles[vIndex] == null) continue;
        if(this.__usersingles[vIndex].username == pUserName)
        {
            this.__usersingles[vIndex] = null;
            return;
        }
    }
}

userlist.prototype.GetChatCount = function(pUserName)
//获取消息总数
{
   var count = 0;
   for(var vIndex = 0;vIndex < this.__usersingles.length;vIndex++)
   {
        if(this.__usersingles[vIndex] == null) continue;
        count += this.__usersingles[vIndex].GetChatCount();
   } 
   return count;
}

userlist.prototype.eachuser = function(func)
//循环用户调用函数传入用户对象
{
    for(var vIndex = 0;vIndex < this.__usersingles.length;vIndex++)
    {
        if(this.__usersingles[vIndex] == null) continue;
        func(this.__usersingles[vIndex]);
    }
}