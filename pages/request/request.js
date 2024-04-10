//公共路径
var baseUrl = 'http://www.kangliuyong.com:10002';
if (process.env.NODE_ENV==='production'){
	//开发环境
	baseUrl = 'http://www.kangliuyong.com:10002'+'/washer'
}else{
	baseUrl = 'http://www.kangliuyong.com:10002'
}
const request = function(options){
	//拼接接口
	options.url=baseUrl+options.url
	//判断data是否是对象类型
	options.data=options.data||{}
	//设置啊appkey
	options.data.appkey='U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
	//配置 请求头
	if(options.method=='POST'){
		options.header={
			'Content-type':'application/x-www-form-urlencoded;charser=utf-8'
		}
	}
	//获得登录token
	const token=uni.getStorageSync('token')
	options.data.tokenString=token
	console.log('1'+token)
	if(token){
		options.data.tokenString=token||''
	}else{
		console.log(1)
	}
	return uni.request(options)
}
export  default request;