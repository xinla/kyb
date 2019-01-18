require.config({
    waitSeconds:0,
    paths:{
    },
    shim: {
    },
});

define([],function(){
    let tool = {};
    //输入区内容合法验证
    tool.checkInput = function (val) {
        if(!val){return false};
        val = String(val);
        let reg = /(script|href|on|iframe|frameset)/gi;
        return !reg.test(val); //合法返回true
    };
    //手机号识别并返回
    tool.isPhoneNumber = function (num) {
        if(!num){return false;}
        let str = num.toString();
        let val = str.replace(/[^0-9]/ig, "");
        if (val.length !== 11) { return false };
        let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/;
        if (!myreg.test(val)) { return false } else { return val }
    };
    // 非法字符替换
    tool.replaceNo = function (val) {
        let reg = /(script|href|on|iframe|frameset)/gi;
        return String(val).replace(reg,""); //返回替换后合法的字串
    };
    /**
     * 发布时间格式化
     * @dateString:"2018-1-6 15:25:42"
     */
    tool.publishTimeFormat = function (dateString) {
        if (typeof dateString !== "string") {return;}
        let pubDate = new Date(dateString.replace(/-/g,'/')),
            curDate = new Date(),
            pubMillis = +pubDate,
            pubYear = pubDate.getFullYear(),
            curMillis = +curDate,
            curYear = curDate.getFullYear(),
            difference = curMillis - pubMillis;
        if (difference < 4.32e+7) { //12小时内
            if (difference < 3.6e+6) { //60分钟内
                if (difference < 60000) { //60秒内
                    dateString = "刚刚";
                } else {
                    dateString = Math.floor(difference/60000) + "分钟前";
                }
            } else {
                dateString = Math.floor(difference/3600000) + "小时前";
            }
        }else if (pubYear == curYear) {
            dateString = dateString.substr(5);
        }
        return dateString
    };

    //图片格式判断
    tool.checkPic = function (str) {
        if ( typeof str !== "string" ) {retrun;}
        let reg = /\.(jpg|png|jpeg|gif)$/i;
        return reg.test(str);
    };

    //视频格式判断
    tool.checkVideo = function (str) {
        if ( typeof str !== "string" ) {retrun;}
        let reg = /\.(mp4)$/i;
        return reg.test(str);
    };

    /**提取图片
     * @str 图文内容
     * @num 图片最大数量
     */

    tool.extractImg = function (str, num = 3) {
        if ( typeof str !== "string" ) {retrun;}
        // 提取含img标签的src 路径
        let reg = /<img[^(img)]*src=[\'\"]?([^\'\"]*)[\'\"]?/gi,
            arr = str.match(reg),
            srcList = [];
        if (arr && arr.length) {
            arr.length > num && (arr.length = num)
            arr.forEach((item,index)=>{
                // 提取src 路径并替换amp转义字符
                srcList.push(item.replace(/<img.*src=[\'\"]|[\'\"]|amp;/ig,""));
            })
        }
        return srcList;
    };
    return tool;

});
