import request from "@/request/request.js";
import storeList from "@/util/stores.js";
import produstList, { rGoods } from "@/util/products.js";
import typeDict from "@/util/typeDict.js";
//登录
export function login(data) {
  return request({
    url: "/app/login",
    method: "POST",
    useToken: false,
    data,
  });
}

// 退出登录
export function logout() {
  return request({
    url: "/app/out",
    method: "GET",
  });
}

// 获取当前用户信息
export function getUser() {
  return request({
    url: "/sys/user/getLoginUser",
    method: "GET",
  });
}

// 通过id获取用户信息
export function getUserById(userId) {
  return request({
    url: "/sys/user/findByUserId/" + userId,
    method: "GET",
  });
}

// 修改用户信息
export function editUSer(data) {
  return request({
    url: "/sys/user/edit",
    method: "PUT",
    data,
  });
}

// 修改用户头像
export function editAvatar(data) {
  return request({
    url: "/sys/user/editAvatar",
    method: "PUT",
    data,
  });
}

// 发表评论
export function postComment(data) {
  return request({
    url: "/coffee/comment/postComment",
    method: "POST",
    data,
  });
}

// 回复评论
export function postReply(data) {
  return request({
    url: "/coffee/comment/replyComment",
    method: "POST",
    data,
  });
}

// 查询店铺评论
export function getComment(data) {
  return request({
    url: "/coffee/comment/findCommentByStoreId",
    method: "GET",
    data,
  });
}

// 查询店铺评论详情
export function getCommentDetail(commentId) {
  return request({
    url: "/coffee/comment/findFirstCommentById/" + commentId,
    method: "GET",
  });
}

// 打卡
export function starStore(data) {
  return request({
    url: "/coffee/achievement/achieve",
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 查询已打卡店铺
export function getStarStore(userId) {
  return request({
    url: "/coffee/achievement/findHasAchieve/" + userId,
    method: "GET",
  });
}

// 下面数据使用本地数据，模拟请求返回

// 获取店铺信息
export function getStore() {
  return new Promise((res, rej) => {
    res({
      code: 200,
      data: storeList,
    });
  });
}

// 获取指定店铺信息
export function getStoreById(storeId) {
  return new Promise((res, rej) => {
    res({
      code: 200,
      data: storeList.find((i) => i.id == storeId),
    });
  });
}

// 获取类型列表
export function getTypeDict() {
  return new Promise((res, rej) => {
    res({
      code: 200,
      data: typeDict,
    });
  });
}

// 根据店铺id获取产品
export function getProduct(storeId, len) {
  return new Promise((res, rej) => {
    const filterData = produstList
      .filter((i) => i.storeId == storeId)
      .sort((a, b) => b.sort - a.sort);
    const result = {
      code: 200,
      data: filterData,
      rdata: null,
    };
    if (Number.isInteger(len)) {
      const types = typeDict.map((i) => i.value);
      function randomOne(arr) {
        if (!Array.isArray(arr)) return;
        return arr[Math.floor(Math.random() * arr.length)];
      }
      const rdata = [];
      for (let i = 0; i < len; i++) {
        rdata.push({
          ...randomOne(rGoods),
          type: randomOne(types),
          storeId,
		  sort:len-i,
        });
      }
      result.rdata = rdata;
    }
    res(result);
  });
}
