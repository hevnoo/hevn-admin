import http from "@/utils/request/index";

// * 获取用户列表
// export const getUserList = (params: any) => {
// 	return http.post(`api/users/getUserList`, params);
// };
export const getUser = () => {
	return http.get(`/user/getUser`);
};
