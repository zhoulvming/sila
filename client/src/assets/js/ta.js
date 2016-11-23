function setCookie(name,value,days,domain){
	try{
		var exp = new Date();
		exp.setTime(exp.getTime() + days*24*60*60*1000);
		document.cookie = name + "=" + value + ";" + "expires=" + exp.toGMTString()+";path=/;" + (domain ? ("domain=" + domain + ";") : "");
	}catch(e){}
}
function getCookie(name) {
	try{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return arr[2];
        else
            return null;
	}catch(e){}
}
function delCookie(name,domain){
	try{
        var date = new Date();
        date.setDate(date.getDate() - 100000);
        document.cookie = name + "=a; expires=" + date.toGMTString() + ";path=/" +";" + (domain ? ("domain=" + domain + ";") : "");
	}catch(e){}
}
function uuid() {
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}

(function() {
  var start = new Date();
  var strStart = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate() + " " +
    start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds();
  var len = 0;
  var end;
  var status = "in";
  var second = 30;

  function revive() {
    if (status == "out") {
      start = new Date();
      status = "in";
    }
    second = 30;
  }
  window.setInterval(function () {
    second -= 1;
    if (0 == second) {
      end = new Date();
      len += (end.getTime() - start.getTime()) / 1000;
      status = "out";
    }
  }, 1000);
  $('body').click(function () {
    revive();
  });
  $('body').mousedown(function () {
    revive();
  });
  $('body').mouseup(function () {
    revive();
  });
  $('body').mousemove(function () {
    revive();
  });
  //(Firefox)
  $('body').bind('DOMMouseScroll', function () {
    revive();
  });
  //(IE,Google)
  $('body').bind('mousewheel', function () {
    revive();
  });
  $('body').keydown(function (e) {
    revive();
  });
  $('body').keyup(function (e) {
    revive();
  });
  $('body').keypress(function (e) {
    revive();
  });
  window.onbeforeunload = function () {
    end = new Date();
    var strEnd = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate() + " " +
      end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds();
    len += (end.getTime() - start.getTime()) / 1000;
    var img = new Image();
    var args = 'stayTime=' + len + '&strStart=' + strStart + '&lastDate=' + strEnd;
    img.src = 'http://localhost:3000/sila/setData?' + args;
  };


  ///////////////////////////////////////////////////////////////////////////////////////
  //解析_maq配置
  var params = {};
	if (_maq) {
		for (var i in _maq) {
			switch (_maq[i][0]) {
				case '_account':
					params.account = _maq[i][1];
					break;
        case '_button':
          var btnAry = _maq[i][1];
          for(var k in btnAry){
            var btnId = btnAry[k];
            var s = 
              "$(document).ready(function(){"
              + "$('#" + btnId + "').on('click', function(){"
              + "var img = new Image();"
              + "var args = 'buttonId=" + btnId + "&account=" + params.account + "&page_url=" + window.location.href + "';"
              + "img.src = 'http://localhost:3000/sila/buttonClick?' + args;"
              + "});"
              + "});";
            var ta = document.createElement('script');
            ta.type = 'text/javascript';
            ta.async = true;
            ta.innerHTML = s;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ta, s);
          }
          break;
				default:
					break;
			}
		}
	}


  /////////////////////////////////// 页面访问数据 ////////////////////////////////////////////////
  	
  // 第三方接口获取本地信息（下面这段脚本执行后会返回window.returnCitySN这样的对象，由于有ajax请求，所以放在setTimeout函数中来延时获取）
	var setLocalIpJS = function(){
    var ma = document.createElement('script'); ma.type = 'text/javascript'; ma.async = true;
    ma.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ma, s);
	}();

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
		var sh = window.screen.height || 0;
		var sw = window.screen.width || 0;
		var cd = window.screen.colorDepth || 0;
    params.window_screen = sh + ';' + sw + ';' + cd;
	}
	//navigator对象数据
	if (navigator) {
		params.lang = navigator.language || '';
	}

  setTimeout(function() {
    if (window.returnCitySN) {
			params.cid = window.returnCitySN.cid;
			params.cip = window.returnCitySN.cip;
			params.cname = window.returnCitySN.cname;
		}
    params.url = window.location.href;

    // 设置 用户唯一标识
    var silaUuid = getCookie('__sila_uuid');
    if ( !silaUuid ) {
      silaUuid = uuid();
      setCookie('__sila_uuid', silaUuid, 1);
    }
    params.uuid = silaUuid;

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
    img.src = 'http://localhost:3000/sila/visterLog?' + args;
  }, 500);


})();