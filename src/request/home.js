import requests from './index';
export const getSwiper = () => requests({url:'/banner?type=2',method:'GET'})
export const getMusicContent =() => requests({url:'/personalized?limit=10',method:"GET"})
//搜索
export const getSearchMusic = (data) => requests({url:`/search?keywords=${data}`,method:'GET'})
//登录
export const getPhoneLogin = (data) => requests({url:`/login/cellphone?phone=${data.phone}&password=${data.password}`,method:'GET'})
//获取用户详情
export function getLoginUser(data){
    return requests({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}
