require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util"
    },
    shim: {
    },
});
define(["util"],function(util){
    let controller = CONST.server+"/article_file";
    let service = {};

    service.getFileByArticle = function(articleid,call){
        let params = {articleid};
        if (call) {
            util.ajax(controller+'/getFileByArticle',params,call);
            return;
        }
        let data = util.ajaxAsync(controller+'/getFileByArticle',params);

        return data;
    };
    return service;
});
