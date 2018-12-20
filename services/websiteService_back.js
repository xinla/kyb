import config from '../configs/config'
import requestUtil from '../utils/requestUtil'
const controller = config.successServer+'/website';
export default {
	/**
	 * 添加资讯
	 * @param {[type]} title     [标题]
	 * @param {[type]} content   [内容]
	 * @param {[type]} imagepath [图片路径]
	 * @param {[type]} creatorid [创建人id]
	 * @return {status:"success"}
	 */
	setInformation(title,content,imagepath,creatorid){
		let params = {
			title,
			content,
			imagepath,
			creatorid
		}
		let res = requestUtil.ajaxSync(controller + '/setInformation',params)
	},

	/**
	 * 获取最新资讯
	 * @return	{
			status:"success",
			recordList:[
				{id:"标识","title":"标题",content:"内容", imagepath:"图片路径"}
			]
		}
	 *
	 */
	getNewInformation(call){
		// let params = {}
		requestUtil.ajax(controller + '/getNewInformation',{},call)
	},
	
	/**
	 * 获取资讯分页
	 * @param  {[type]} page [当前页]
	 * @param  {[type]} size [分页大小]
	 * @return {
				status:"success",
				recordPage:{
					list:[
						{id:"标识","title":"标题",content:"内容", imagepath:"图片路径"}
					]
				}
			}
	 */
	getInformationPage(page,size){
		let params = {
			page,
			size
		}
		requestUtil.ajax(controller + '/getInformationPage',params,call)
	}
}