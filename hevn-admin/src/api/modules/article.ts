import http from "@/utils/request/index";

//新增文章接口
export const addArticleApi = (data: any) => {
	return http.post(`/article/addArticle`, data);
};
//获取所有文章
export const getAllArticleApi = (data:any) => {
	return http.get(`/article/getAllArticle`, { params: {page: data} });
};
//获取搜索搜索文章
export const searchArticleApi = (data: any) => {
	return http.get(`/article/searchArticle`, { params: data });
};
//获取我的文章
export const getMyListApi = (data: any) => {
	return http.get(`/article/getAllArticle`, { params: {page: data} });
};
//根据id获取文章详情页
export const getArticleDetailApi = (data: any) => {
	return http.get(`/article/getArticleDetail`, { params: {id: data} });
};
//更新文章
export const upArticleApi = (data: any) => {
	return http.post(`/article/upArticle`, data);
};
//删除文章
export const deleArticleApi = (data: any) => {
	return http.post(`/article/deleArticle`, data);
};
//上传图片
export const upCoverImgApi = (data: any) => {
	return http.post(`/article/upCoverImg`, data);
};
