import http from "@/api";

//添加商品
export const addGoodsApi = (data: any) => {
	return http.post(`/goods/addGoods`, data);
};
//获取商品列表,可分页，参数是基本数据类型时的写法
export const goodsListApi = (data:any) => {
	return http.get(`/goods/goodsList`, { params: {page: data} });
};
//获取搜索商品,可分页，参数是引用数据类型
export const searchApi = (data: any) => {
	return http.get(`/goods/searchGoods`, { params: data });
};
//更新商品信息
export const updateGoodsApi = (data: any) => {
	return http.post(`/goods/updateGoods`, data);
};
//删除商品
export const deleteGoodsApi = (data: any) => {
	return http.post(`/goods/deleteGoods`, data);
};
//上传图片
export const upImgApi = (data: any) => {
	return http.post(`/goods/upImg`, data);
};
