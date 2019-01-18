require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util",
        text : "js/text"
    },
    shim: {
    },
});
define(["util","text!json/video.json"],function(util,videoObjStr){
    var controller = "../../json/video.json";
    var service = {};
    service.getVideoList = function () {
        let videoObj = $.parseJSON(videoObjStr);
        let videoArr = videoObj.videoArr;
        return videoArr;
    };
    return service;
});



