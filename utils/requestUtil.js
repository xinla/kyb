export default {
	//异步
	ajax(url,params,call){
		$.post(url,params,function(data){
			call && call(data)
		},"json");
	},
	//同步
	ajaxAsync(url,params){
		let res = {};
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: params,
			async:false,
			success:function(data){
				res = data;
			}
		})
		return res;
	}
}