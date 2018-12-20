require.config({
    waitSeconds:0,
    paths:{
        "util":"js/util",
        text : "js/text"
    },
    shim: {
    },
});
define(["util","text!json/team.json"],function(util,teamObjStr){
    var controller = "../../json/team.json"
    var service = {};
    service.getTeamList = function () {
//          let teamObj = util.ajaxAsync(controller,{});
//          let teamArr = teamObj.teamArr;
//          return teamArr;
	//console.log(teamObj);
		let teamObj = $.parseJSON(teamObjStr);
		let teamArr = teamObj.teamArr;
        return teamArr;
    };

    return service;
});




