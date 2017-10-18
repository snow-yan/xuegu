$(function() {
	"use strict";
	$('#content').artEditor({
		imgTar: '#imageUpload',
		limitSize: 10,   // 兆
		showServer: true,
		uploadUrl: 'http://www.xueguwang.cn/?/app_interface/newMobile/uploadImg/',
		data: {},
		uploadField: 'image',
		placeholader: '<p>填写内容...</p>',
		validHtml: ["<br/>","<div></div>","<p></p>","<span></span>"],
		formInputId: 'target',
		uploadSuccess: function(res) {
			//alert(JSON.stringify(res))
			
            // json转成数组
           //var result = JSON.parse(res);
            // 这里返回服务端返回的图片路径，编辑框就可显示图片
            return res.data;
		},
		uploadError: function(res) {
			// something error
//			alert(JSON.stringify(res));
		}
	});
});
