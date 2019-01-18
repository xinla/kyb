require.config({
    waitSeconds: 0,
    paths:{
        "util":"js/util"
    },
    shim:{

    }
});

define(["util"],function (util) {
    var controller = CONST.server+"/user";
    var service = {};
    const userid = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // 获取手机验证码
    service.getCode = function(mobile,call){
        let params ={mobile};
        util.ajax(controller+"/getCode",params,call);
    };

    // 手机号登录
    service.loginByMobile = function(mobile,code,call){
        let params = {mobile,code};
        util.ajax(controller+"/loginByMobile",params,call);
    };

    // 微信登录
    service.loginByWx = function(params,call){
      if(call){
          util.ajax(controller+'/loginByWx',params,call);
          return;
      }
      let data = util.ajaxAsync(controller+'/loginByWx',params);
      return data;
    };

    // QQ登录
    service.loginByQQ = function(params,call){
        if(call){
            util.ajax(controller+'/loginByQQ',params,call);
            return;
        }
        let data = util.ajaxAsync(controller+'/loginByQQ',params);
        return data;
    };

    // 新浪登录
    service.loginByXl = function(params,call){
        if(call){
            util.ajax(controller+'/loginByXl',params,call);
            return;
        }
        let data = util.ajaxAsync(controller+'/loginByXl',params);
        return data;
    };


    // 获取用户信息
    service.getUserById = function(targetuserid,call){
        let params = {
            token:token || 13,
            userid:userid || 13,
            targetuserid,
        };
        if(call){
            util.ajax(controller+'/getUserById',params,call);
            return;
        }
        let data = util.ajaxAsync(controller+'/getUserById',params);
        return data;
    };

    // 更新用户信息
    service.updateUser = function(user){
        let params = {
            token,
            userid,
            record: JSON.stringify(user)
        };
        let data = util.ajaxAsync(controller+"/updateUser",params);
        return data;
    };
    service.getCurentUser = function(call){
        let data = service.getUserById(userid,call);
        return data;
    };

    // 用户退出
    service.logOut = function(){
      let logid = localStorage.getItem('logid');
      let params = {logid, token, userid};
      let data = util.ajaxAsync(controller+"/logOut",params);
      return data;
    };
    return service;
});













