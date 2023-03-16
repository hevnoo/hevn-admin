import http from "@/api";

//添加类别
export const addClassApi = (params: any) => {
	return http.post(`/goodsClass/addClass`,params);
};
//获取所有类别
export const allClassApi = () => {
	return http.get(`/goodsClass/allClass`);
};
//更新类别
export const upClassApi = (params: any) => {
	return http.post(`/goodsClass/upClass`,params);
};
//删除类别
export const deleClassApi = (params: any) => {
	return http.post(`/goodsClass/deleClass`,params);
};

