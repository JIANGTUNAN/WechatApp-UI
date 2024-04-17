// 请求地址
var baseUrl = "https://ngrok.tolan.top:5082";
// 请求函数封装
const request = function(options = {}) {
	// 请求地址拼接
	options.url = baseUrl + options.url;
	// 获取 登录 token
	const token = uni.getStorageSync('token')
	// 配置post请求默认参数格式
	if (options.method == "POST" && !options.header['Content-Type']) {
		options.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		}
	}
	//判断token 是否有值
	if (token) {
		// 有token,加上token
		options.header = {
			...options.header,
			'Authorization': 'Bearer ' + token
		}
	} else {
		//无token,检查请求是否需要token（ps:登录不用token）
		if (!options.useToken) {
			// 请求需要token,跳转至登录页面
			uni.navigateTo({
				url: "/pages/login/login"
			})
		}
	}
	// 返回封装的请求函数
	return uni.request(options).then(res => {
		// 小程序返回偶尔会变成[null,res]的情况，加上验证以防万一
		if (Array.isArray(res)) {
			res = res[1];
		}
		// 拿自定义的返回体
		res = res?.data||res;
		// 检查返回码
		if (res.code === 401) {// token过期
			uni.removeStorageSync('token') // 清空 token
			uni.showToast({
				icon: "none",
				title: '登录凭证过期，请重新登陆'
			})
			//跳转到登录，不显示登录页面的登录提示
			uni.navigateTo({
				url: "/pages/login/login",
				hideTip: true,
			})
		}
		// 返回处理后的响应体
		return res;
	})
}
// 导出封装的请求函数
export default request;
