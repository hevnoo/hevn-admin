import http from "@/api";

// * 用户登录接口
export const loginApi = (params: any) => {
	return http.post('/user/login', params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
};

// * 用注册接口
export const registerApi = (params: any) => {
	return http.post('/user/register', params); // 正常 post json 请求  ==>  application/json
};

// * 获取菜单
export const getMenuApi = (params: any) => {
	return http.get('/user/getMenu', params); // 正常 post json 请求  ==>  application/json
};

