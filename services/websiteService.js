require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util"
    },
    shim: {
    },
});
define(["util"],function(util){
	var controller = CONST.server+"/website"

    var service = {};



	// 发布留言
    service.saveOnlinemessage = function(membername,mobile,content){
        let params = {
            membername:membername,
            mobile:mobile,
            content:content
        };

        let resMap = util.ajaxAsync(controller+'/saveOnlinemessage',params);
    };

    /*获取最新资讯*/
	service.getNewInformation = function(call){
		util.ajax(controller + '/getNewInformation',{},call)
	};

	/*获取资讯分页*/

    service.getInformationPage = function(params,call){
        if(!call) {
            let resMap = util.ajaxAsync(controller+'/getInformationPage',params);
            return resMap;
        }
        util.ajax(controller+'/getInformationPage',params,function (data) {
            call(data);
        })
    };

    // 搜索资讯列表
    service.searchInfoPage = function(page,size,keyword){
        let params = {page,size,keyword};
        let data  = util.ajaxAsync(controller+"/getInformationPage",params);
        return data;
    };


    /*获取新闻详情*/
    service.getInformationById = function(recordid,call){
        let params = {
            recordid:parseInt(recordid),
        };
        if(!call) {
            let resMap = util.ajaxAsync(controller+'/getInformationById',params);
            return resMap;
        }
        util.ajax(controller+'/getInformationById',params,function (data) {
            call(data);
        })
    };

    /*获取下一条新闻*/
    service.getNextInformation = function(curentid,call){
        let params = {
            curentid:curentid,
        };
        if(!call) {
            let resMap = util.ajaxAsync(controller+'/getNextInformation',params);
            return resMap;
        }
        util.ajax(controller+'/getNextInformation',params,function (data) {
            call(data);
        })
    };
    /*获取上一条新闻*/
    service.getLastInformation = function(curentid,call){
        let params = {
            curentid:curentid,
        };
        if(!call) {
            let resMap = util.ajaxAsync(controller+'/getLastInformation',params);
            return resMap;
        }
        util.ajax(controller+'/getLastInformation',params,function (data) {
            call(data);
        })
    };
    return service;
});




