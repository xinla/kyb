require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util"
    },
    shim: {
    },
});
define(["util"],function(util){
    var controller = CONST.server+"/search"
    var service = {};
    const userid = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // 保存关键字
    service.addSearchRecord = function(keyword,call){
        let params = {token, userid, keyword};
        util.ajax(controller+"/addSearchRecord",params,call);
    };
    /*根据输入的关键字获取关键字列表*/
    service.getKeywordList = function(keyword,call){
        let params = {keyword};
        util.ajax(controller+'/getKeywordList',params,call);
    };
    /*获取最热关键字*/
    service.getHotKeyword = function(call){
        let params = {};
        if (call) {
            util.ajax(controller+'/getHotKeyword',params,call);
            return;
        }
    };

    return service;
});




