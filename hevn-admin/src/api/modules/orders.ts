import http from "@/api";

//添加订单
export const addOrdersApi = (data: any) => {
	return http.post(`/orders/addOrders`, data);
};
//获取订单列表，可分页，参数是基本数据类型时的写法
export const getOrdersApi = (data:any) => {
	return http.get(`/orders/getOrders`, { params: {page: data} });
};
//获取搜索订单列表,可分页
export const searchOrdersApi = (data: any) => {
	return http.get(`/orders/searchOrders`, { params: data });
};
//更新订单
export const upOrdersApi = (data: any) => {
	return http.post(`/orders/upOrders`, data);
};
//删除订单
export const deleOrdersApi = (data: any) => {
	return http.post(`/orders/deleOrders`, data);
};
//stock库存接口,按orders表的商品名称 去goods数据表中找出对应的商品的数量。
export const stockApi = (data: any) => {
	return http.get(`/orders/stock`, { params: data });
};
//与订单响应的goods库存更新。
export const upStockApi = (data: any) => {
	return http.post(`/orders/upStock`, data);
};
//汇总清单
export const getCollectApi = (data: any) => {
	return http.get(`/orders/collect`, { params: {page: data} });
};
