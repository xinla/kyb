require.config({
    waitSeconds: 0,
    paths:{
        "util":"js/util"
    },
    shim:{

    }
});

define(["util"],function (util) {
   var controller = CONST.server+"/article";
   var service = {};
    const userid = localStorage.getItem('id');
    const token = localStorage.getItem('token');


    // 获取用户文章
    service.getArticleByUser = function (userid,page,size,type) {
        let params = {userid,page,size,type};
        let data = util.ajaxAsync(controller+'/getArticleByUser',params);
        return data;
    };

    // 获取视频文章列表
    service.articleVideoPage = function(page,size,classify,type,call){
        let params = {page,size,classify,type,state:3};
        if(call){
            util.ajax(controller+'/articlePage',params,call);
        }
        let data = util.ajaxAsync(controller+'/articlePage',params);
        return data;
    };

    // 搜索文章列表
    service.searchArticlePage = function(page,size,keyword){
      let params = {page,size,keyword,state:"3"};
      let data = util.ajaxAsync(controller+'/articlePage',params);
      return data;
    };
    return service;
});



