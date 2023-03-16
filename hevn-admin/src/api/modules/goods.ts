import http from "@/api";

//添加商品
export const addGoodsApi = (params: any) => {
	return http.post(`/goods/addGoods`,params);
};
//获取商品列表,可分页
export const goodsListApi = (params: any) => {
	return http.get(`/goods/goodsList`,params);
};
//获取搜索商品
export const searchApi = (params: any) => {
	return http.get(`/goods/searchGoods`,params);
};
//更新商品信息
export const updateGoodsApi = (params: any) => {
	return http.post(`/goods/updateGoods`,params);
};
//删除商品
export const deleteGoodsApi = (params: any) => {
	return http.post(`/goods/deleteGoods`,params);
};
//上传图片
export const upImgApi = (params: any) => {
	return http.post(`/goods/upImg`,params);
};
