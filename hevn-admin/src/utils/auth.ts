import { TOKEN_TIME, TOKEN_TIME_VALUE } from "./constant";
import storage from '@/utils/storage'
import { login } from '@/store'

// 登录时设置时间
export const setTokenTime = () => {
  const currentTime: any = Date.now();
  storage.setItem('tokenTime', currentTime);
};

// 获记录的登录时间
export const getTokenTime = () => {
  return storage.getItem('tokenTime');
};

// 是否已经过期
export const diffTokenTime = () => {
  const useLogin: any = login()
  let { token, expiresIn } = useLogin
  const currentTime = Date.now();
  const tokenTime: any = getTokenTime();
  return currentTime - tokenTime > expiresIn;
};
//后端已经设置了过期时间，前端也设置，这样可以在前端进行与用户的交互，优化体验。
