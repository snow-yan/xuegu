function sdk_speak_record()
{
	var obj = api.require('speechRecognizer');
	obj.record(
	{
		vadbos:5000,
		vadeos:5000,
		rate:16000
	},function(ret,err)
	{
		if(ret.status)
		{
			$toast('录音成功');
		}
		else
		{
			$toast('录音失败');
		}
	});
}
function sdk_speak_read(txt)
{
	var obj = api.require('speechRecognizer');
	obj.read(
	{
	    readStr:txt
	},function(ret,err)
	{
	    if(ret.status) {
	        ret.speakProgress
	    }else{
	        err.msg
	    }
	});
}