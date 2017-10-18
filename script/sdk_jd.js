function sdk_jd_login()
{
	var jd = api.require('jd');
	jd.login({
	    appKey: '7F5DFDB2E92B610D294738DA8A2E50C2',
	    appSecret: '8e2c9bf40ab744e7b21d83b52257292c',
	    redirectUri: 'https://intpaypos.com/jd/login.php',
	    naviColor: '#666666'
	}, function(ret, err) {
	    if (ret) {
	        alert(JSON.stringify(ret));
	    } else {
	        alert(JSON.stringify(err));
	    }
	});
}