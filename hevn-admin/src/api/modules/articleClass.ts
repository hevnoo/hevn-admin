import http from "@/utils/request/index";

//添加类别
export const addArticleClassApi = (data: any) => {
	return http.post(`/articleClass/addArticleClass`, data);
};
//获取类别，分页
export const getArticleClassApi = (data: any) => {
	return http.get(`/articleClass/getArticleClass`, { params: {page: data} });
};
//获取所有类别
export const getAllArticleClassApi = () => {
	return http.get(`/articleClass/getAllArticleClass`);
};
//更新类别
export const upArticleClassApi = (data: any) => {
	return http.post(`/articleClass/upArticleClass`, data);
};
//删除类别
export const deleArticleClassApi = (data: any) => {
	return http.post(`/articleClass/deleArticleClass`, data);
};

