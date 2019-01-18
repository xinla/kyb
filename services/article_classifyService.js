require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util"
    },
    shim: {
    },
});
define(["util"],function(util){
    let controller = CONST.server+"/article_classify";
    let service = {};

    service.getArticleClassifyList=function (call) {
      let params = {};
      if(call){
          util.ajax(controller+'/getArticleClassifyList',params,call);
          return;
      }
      let data = util.ajaxAsync(controller+'/getArticleClassifyList',params);
      return data;
    };
    return service;
});
