import cellGroup from "uview-ui/libs/config/props/cellGroup";

//公共路径
var baseUrl = "http://www.kangliuyong.com:10002";

if (process.env.NODE_ENV === "production") {
	//生产环境
	baseUrl = "http://www.kangliuyong.com:10002" + '/washer'
} else {
	//开发环境
	baseUrl = "https://ngrok.tolan.top:5082"
}
const request = function(options = {}) {
	const {
		url,
		data = {},
		method,
		header = {},
		useToken = true
	} = options;
	//拼接接口
	options.url = baseUrl + options.url
	// 判断 data 是否 是对象类型
	options.data = options.data || {}
	// 设置 appkey
	options.data.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
	//配置 请求头
	if (options.method == "POST") {
		options.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	}
	//每个接口 加上一个 假数据
	options.data.tokenString = ''
	// 获取 登录 token
	const token = uni.getStorageSync('token')
	//判断token 是否有值
	if (token) {
		if(options.header){
			options.header['Authorization'] = token
		}else{
			options.header = {'Authorization':token}
		}
		options.data.tokenString = token
	} else {
		if (!useToken) {
			uni.navigateTo({
				url: "/pages/login/login"
			})
		}
	}

	return uni.request(options)
}
export default request;
