import request from '../utils/request'
import commonConfig from '../config/config'
//获取菜单列表
export const getMenuList = async () => {
    return request('get', `${commonConfig.SERVICE_API.INDEX_API}/accountInfo/getMenueTreeList`, '', false);
}

//获取用户身份
export const getUserIdentity = async () => {
    return request('get', `${commonConfig.SERVICE_API.INDEX_API}/accountInfo/jedgeIsOwner`, '', false);
}

//获取用户授权项目列表
export const getProjectList = () => {
    return request('get', `${commonConfig.SERVICE_API.INDEX_API}/accountInfo/getProjectList`, '', false);
}

//获取用户授权项目列表
export const getButtonPermissions = () => {
    return request('get', `${commonConfig.SERVICE_API.INDEX_API}/accountInfo/getButtons`, '', false);
}
////设置后端项目选择缓存
export const setProjectCache = (params:any) => {
    return request('get', `${commonConfig.SERVICE_API.INDEX_API}/accountInfo/setProjectCache`, '', false);
}
