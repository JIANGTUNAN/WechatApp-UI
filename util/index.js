export function getUserInfo() {
	return uni.getStorageSync('userInfo') || {};
}

export function getUserId() {
	return getUserInfo().userId
}

export function formatDate(date = new Date(), formatStr = "yyyy-MM-dd HH:mm:ss") {
	const initDate = new Date(date);
	const year = initDate.getFullYear();
	const month = initDate.getMonth() + 1;
	const day = initDate.getDate();
	const hour = initDate.getHours();
	const minute = initDate.getMinutes();
	const second = initDate.getSeconds();
	return formatStr
		.replace("yyyy", year.toString())
		.replace("YYYY", year.toString())
		.replace("MM", month.toString().padStart(2, "0"))
		.replace("dd", day.toString().padStart(2, "0"))
		.replace("DD", day.toString().padStart(2, "0"))
		.replace("HH", hour.toString().padStart(2, "0"))
		.replace("hh", hour.toString().padStart(2, "0"))
		.replace("mm", minute.toString().padStart(2, "0"))
		.replace("ss", second.toString().padStart(2, "0"))
		.replace("SS", second.toString().padStart(2, "0"));
};


export default {
	getUserInfo,
	getUserId,
	formatDate
}
