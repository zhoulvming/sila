(function () {

	var params = {};

	/**
	* 设置cookie
	*/

// function setBICookie(name,value,days,domain){
//     try{
//         var exp = new Date();
//         exp.setTime(exp.getTime() + days*24*60*60*1000);
//         document.cookie = name + "=" + value + ";" + "expires=" + exp.toGMTString()+";path=/;" + (domain ? ("domain=" + domain + ";") : "");
//     }catch(e){}
// }
	var setCookie = function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=" + document.domain;
	};

	/**
	 * 获取cookie
	 */
	var getCookie = function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	};

	// 第三方接口获取本地信息
	var setLocalIpJS = function(){
    var ma = document.createElement('script'); ma.type = 'text/javascript'; ma.async = true;
    ma.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ma, s);
	};

	// 从哪个路径跳转过来
	// var setReferrer = function() {
	// 	var _ref = document.referrer || '';
	// 	var _param = _ref.substring(_ref.indexOf('?'), _ref.length);
	// 	var strs = _param.split('&');
	// 	var utm_source = '';
	// 	for (var i = 0; i < strs.length; i++) {
	// 		if (strs[i].indexOf('utm_source')!=-1) {
	// 		}
	// 	}
	// };

	// 调用第三方接口获取本地信息
	setLocalIpJS();

	
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
				default:
					break;
			}
		}
	}

	

	// 延迟加载
	setTimeout(function() {	
		if (window.returnCitySN) {
			params.cid = window.returnCitySN.cid;
			params.cip = window.returnCitySN.cip;
			params.cname = window.returnCitySN.cname;
		}
		
		//页面id,标识唯一一个页面
		var url = window.location.href;

		// 一段时间内，如果用户不断刷新，我们算一次页面请求, 这里设置为 1 秒
		if (getCookie('_utmc' + url)) {
			//说明用户在连续点击刷新页面
			//donothing
			console.log(' 请不要连续刷新页面来骗取pv ');
		} else {
			//setCookie('_utmc' + url, true, 1);

			setCookie('CURRENT_URL', window.location.href);
			var body = document.getElementsByTagName('body');
			body[0].onclick = function() {
				console.log('current is : '  + getCookie('CURRENT_URL'));
				console.log(window.location.href);
			};
			
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
		}

		

	}, 500);
	
	
})();