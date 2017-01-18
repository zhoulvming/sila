(function () {

	// 第三方接口获取本地信息
	var setLocalIpJS = function(){
    var ma = document.createElement('script'); ma.type = 'text/javascript'; ma.async = true;
    ma.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ma, s);
	};

	var params = {};
	//Document对象数据
	if (document) {
		params.domain = document.domain || '';
		params.ip = document.localName || '';
		params.url = document.URL || '';
		params.title = document.title || '';
		params.referrer = document.referrer || '';
	}
	//Window对象数据
	if (window && window.screen) {
		params.sh = window.screen.height || 0;
		params.sw = window.screen.width || 0;
		params.cd = window.screen.colorDepth || 0;
	}
	//navigator对象数据
	if (navigator) {
		params.lang = navigator.language || '';
	}
	//解析_maq配置
	if (_maq) {
		for (var i in _maq) {
			switch (_maq[i][0]) {
				case '_setAccount':
					params.account = _maq[i][1];
					break;
				case '_returnCitySN':
					console.log(_maq[i][1]);
					break;
				default:
					break;
			}
		}
	}

	// 调用第三方接口获取本地信息
	setLocalIpJS();

	// 延迟加载
	setTimeout(function() {	
		params.cid = window.returnCitySN.cid;
		params.cip = window.returnCitySN.cip;
		params.cname = window.returnCitySN.cname;

		//拼接参数串
		var args = '';
		for (var i in params) {
			if (args != '') {
				args += '&';
			}
			args += i + '=' + encodeURIComponent(params[i]);
		}

 		//通过Image对象请求后端脚本
		var img = new Image(1, 1);
		img.src = 'http://localhost:3000/sila/setData?' + args;
	}, 200);
	
	
})();