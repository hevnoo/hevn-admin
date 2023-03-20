import http from "@/api";

// * 用户登录接口
export const loginApi = (data: any) => {
	return http.post('/user/login', data, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
};

// * 用注册接口
export const registerApi = (data: any) => {
	return http.post('/user/register', data); // 正常 post json 请求  ==>  application/json
};

// * 获取菜单
export const getMenuApi = (data: any) => {
	return http.get('/user/getMenu', data); // 正常 post json 请求  ==>  application/json
};

// * 刷新token
export const refreshTokenApi = (data: any) => {
	return http.post('/user/refreshToken', data); // 正常 post json 请求  ==>  application/json
};
