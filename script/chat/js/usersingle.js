function usersingle(
    data
)
/**
 *用户记录
 *data object
 * username 用户名
 * userpic 用户头像
 * client_id 客户id
 **/
{
  //用户client_id
  this.client_id = 0;

  //用户名
  this.username = '';
  
  //用户头像
  this.userpic = '';

  //用户聊天内容保存在localstoreage里的key值
  this.localstoreage_key = 0;

  //数据集合
  this.chatloglist = [];

  this.construct(data);
}

//localstoreage键
window.CONST_USERSINGLE_LOCALSTOREAGE_KEY = 0;

//初始化数据
usersingle.prototype.construct = function(data)
{
    if(data['username'] == '')
    {
        alert("用户名不能为空");
        return;
    }
    
    if(data['userpic'] == '')
    {
        alert("用户头像不能为空");
        return;
    }
    
    if(data['client_id'] == '')
    {
        alert("发生错误,请刷新页面");
        return;
    }

    this.client_id = data['client_id'];
    this.username = data['username'];
    this.userpic = data['userpic'];
    this.localstoreage_key = window.CONST_USERSINGLE_LOCALSTOREAGE_KEY++;
}

usersingle.prototype.addcontent = function(data)
/**
 *添加用户记录
 *data : {
      content //聊天内容
      is_admin //是否是管理员发送
  }
 *return chatlog对象
 **/
{
    var vChatLog = new chatlog(data);
    this.chatloglist.push(vChatLog);
    return vChatLog;
}

//删除用户记录
usersingle.prototype.deletecontent = function()
{

}

usersingle.prototype.GetChatCount = function(pUserName)
//获取消息总数
{
   var count = 0;

   //统计聊天信息
   for(var i = 0;i < this.chatloglist.length;i++)
   {
       var vChatLog = this.chatloglist[i];
       if(vChatLog.is_unread && !vChatLog.is_admin)
        count++;
   }

   return count;
}

function chatlog(data)
/**
 *聊天记录
 **/
{
    //聊天记录时间
    this.datetime = 0;
    
    //聊天内容
    this.content = '';
    
    //是否是管理员发送
    this.is_admin = false;
    
    //消息是否未读
    this.is_unread = true;
    
    this.construct(data);
}

//初始化聊天记录
chatlog.prototype.construct = function(data)
{
    this.datetime = new Date();
    this.content = data['content'];
    this.is_admin = data['is_admin'];
}

//获取消息时间
chatlog.prototype.getDate = function(data)
{
    var date = this.datetime;
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}