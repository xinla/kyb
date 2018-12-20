const pageUtil = {};

	pageUtil.getPageObj = function(size) {
		if(!size) {
			size = 10;
		}
		var pageObj = {
			page: 1,
			size: size,
			reset: function() {
				pageObj.page = 1;
			},
			next: function() {
				this.page++;
			}

		}
		return pageObj;
	}

export default pageUtil;

