import { TOKEN_TIME, TOKEN_TIME_VALUE } from "./constant";

// 登录时设置时间
export const setTokenTime = () => {
  const currentTime: any = Date.now();
  localStorage.setItem(TOKEN_TIME, currentTime);
};

// 获取
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME);
};

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now();
  const tokenTime: any = getTokenTime();
  return currentTime - tokenTime > TOKEN_TIME_VALUE;
};
//后端已经设置了过期时间，前端也设置，这样可以在前端进行与用户的交互，优化体验。
