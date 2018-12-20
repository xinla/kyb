require.config({
	waitSeconds:0,
	paths:{
	},
	shim: {
    },
});
define([],function(){
	let DateUtil = {
		
	};
	
	let dateMap = {
		"01":"Jan.",
		"02":"Feb.",
		"03":"Mar.",
		"04":"Apr.",
		"05":"May.",
		"06":"June.",
		"07":"July.",
		"08":"Aug.",
		"09":"Sept.",
		"10":"Oct.",
		"11":"Nov.",
		"12":"Dec.",
		
	}
	
	DateUtil.toDateObj = function(date){
		
		let  ymd = date.substring(0,10);
		let dateArr = ymd.split("-");
		let obj ={
			year:dateArr[0],
			mounth:dateMap[dateArr[1]],
			day:dateArr[2]
		}
		return obj;
	}
	
	
	return DateUtil;
	
});