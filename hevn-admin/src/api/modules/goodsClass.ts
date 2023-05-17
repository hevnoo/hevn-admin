import http from "@/utils/request/index";

//添加类别
export const addGoodsClassApi = (data: any) => {
	return http.post(`/goodsClass/addGoodsClass`,data);
};
//获取所有类别
export const getGoodsClassApi = () => {
	return http.get(`/goodsClass/getGoodsClass`);
};
//更新类别
export const upGoodsClassApi = (data: any) => {
	return http.post(`/goodsClass/upGoodsClass`,data);
};
//删除类别
export const deleGoodsClassApi = (data: any) => {
	return http.post(`/goodsClass/deleGoodsClass`,data);
};

