
const CONST={
		// server:"http://212.64.1.189:8585",
		// server:"http://47.101.58.43",
		server:"http://www.kangyoubao.net:8185",
		// server:"http://192.168.168.2.100/zjzx-controller",
		cdnpath:"http://127.0.0.1:8020",
		//cdnpath:"http://47.101.58.43:8888",
		fileServer:"http://47.101.58.43:8081",
		fileRoot:"http://47.101.58.43:8085",
};


/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamicLoadJs() {
	document.write('<script src="'+CONST.cdnpath+'/kyb/js/jquery.js"  type="text/javascript"></script>');
	document.write('<script src="'+CONST.cdnpath+'/kyb/js/require.js"  type="text/javascript"></script>');
}

//dynamicLoadJs();
