import React from 'react';
import jwtDecode from 'jwt-decode';
import localforage from 'localforage';

import { useRequest, useMount } from 'ahooks';
import * as services from '../services/layoutServices'


interface basalInfoObj {
    token: string;
    appId: string;
    tenantId: string;
    title: string;
    type: string;
    isSecondJump: boolean;
    userIndentity: string;
    query: any;
    userInfo: Object;
    limitBtns: Array<any>;
    contractList: Array<any>;
}
interface ordinaryObj {
    [propName: string] : any;
}

export const basalInfo: basalInfoObj = {
    token: '',
    appId: '',
    tenantId: '',
    title: '',
    type: '',
    isSecondJump: false,
    userIndentity: '',
    query:{},
    userInfo:{},
    limitBtns:[],
    contractList:[],
}

export const startFun = async () => {
    getUrlInfo()
    getUserInfo((window as any).__TOKEN___)
    await getUserIdentity()

    console.log('----basalInfo---', basalInfo)
    return basalInfo
}

//从跳转连接中解析token/appid/tenantid/title/type/isSecondJump
export const getUrlInfo = () => {
    (window as any).__PARENT_URL__ = document.referrer || sessionStorage.parentUrl;
    const url = decodeURI(decodeURI(window.location.search));
    debugger
    let query = getParamsToObject(url);
    basalInfo.query = query;
    (window as any).__TOKEN___ = basalInfo.token = getUrlParam('token', url) || sessionStorage.token;
    (window as any).__SZ_TOKEN__ = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJhODA5NzQ3OWZhNDc0OTZhYTkzZTU5NTE4ZGQ4YWE1ZSIsImVtYWlsIjoiMTQxMjAwMDAzMzNAcXEuY29tIiwibmFtZSI6Ium7hOaZluS_nSIsInVzZXJuYW1lIjoiaHVpYmFvIiwicGhvbmVOdW1iZXIiOiIxNDEyMDAwMDMzMyIsImFjY291bnRUeXBlIjoiUEVSU09OQUwiLCJ1c2VySWQiOiI2YTUyNTY1NjEzYmM0MjE4ODdhM2M1M2MwNmZjNzAyOCIsImNvbXBhbnlJZCI6IjAzMGIxOTdiZDQ3NTQyZDZiNjg2OTE2Njc4OGI0ZDYyIiwiY29tcGFueU5hbWUiOiLmt7HlnLPluILkuqTpgJrlhaznlKjorr7mlr3lu7rorr7kuK3lv4MiLCJleHAiOjE2MTA1NDM1ODV9.uzJwuveOTfx-r2_4jIdgDHvebb5G4G4KjgXxdFZYEhA";
    (window as any).__APPID__ = basalInfo.appId = getUrlParam('appId', url) || sessionStorage.appId;
    (window as any).__TENANTID__ = basalInfo.tenantId = getUrlParam('tenantId', url) || sessionStorage.tenantId;
    (window as any).__TITLE__ = basalInfo.title = getUrlParam('title', url) || sessionStorage.title || '';
    (window as any).__TYPE__ = basalInfo.type = getUrlParam('type', url) || sessionStorage.type || '';
    (window as any).__IS_SECOND_JUMP__ = basalInfo.isSecondJump = getUrlParam('isSecondJump', url) || sessionStorage.isSecondJump || '';
}

//从token解析用户信息
export const getUserInfo = (params: any) => {
    if (!params) return false;
    let userInfo: any = jwtDecode(params) || {};
    if ((window as any).__SELECT_PROJECT__) {
        userInfo.project = (window as any).__SELECT_PROJECT__
    }
    //存储用户信息
    basalInfo.userInfo = userInfo
    sessionStorage.userInfo = JSON.stringify(userInfo);
    (window as any).__USERINFO__ = userInfo;
}

//从链接参数中获取参数对象
export const getParamsToObject = (serchStr:string) => {
    let arr = serchStr.slice(1,-1).split("&")
    let searchObject:ordinaryObj = {}
    arr.map((item:string)=>{
        let tmpArr = item.split("=")
        searchObject[tmpArr[0]] = tmpArr[1]
    })
    return searchObject
}
//从URL中解析参数
export const getUrlParam = (name: string, href: string) => {
    let ret = '';
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = (href || window.location.search).substr(1).match(reg);
    if (r != null) {
        ret = unescape(r[2]);
        if (!ret || ret == 'undefined' || ret == 'null') {
            ret = '';
        }
    }
    return ret;
}

//判断用户权限身份,即是业主/非业主
export const getUserIdentity = async () => {

    let { tenantId, appId } = basalInfo;
    let userIdentity: any = await services.getUserIdentity();
    console.log('userIdentity---', userIdentity);
    // //存储用户身份是是否为业主
    sessionStorage.userIdentity = (userIdentity.data.type == 'OWNERPORTAL' ? 'owner' : 'notOwner');
    (window as any).__USER_IDENTITY__ = sessionStorage.userIdentity;
    basalInfo.userIndentity = sessionStorage.userIdentity;
    await getProjectList()
    console.log('项目')
    await getButtonPermissions()
    console.log("按钮权限")

    //业主，直接加载菜单
    if (userIdentity.data.type === 'OWNERPORTAL') {
        await getMenuList()
        console.log('菜单')
    }

    // //查询实景地图地址
    // yield put({type: 'queryMap', params: {}});
}

//获取用户授权项目列表
export const getProjectList = async () => {
    let projectList = [];
    const { data } = await services.getProjectList();
    console.log("data---", data)
    if (data != null && data.projectList != null) {
        projectList = data.projectList;
    }
    // //存储项目列表
    localforage.setItem('projectList', projectList);
    (window as any).__PROJECT_LIST__ = projectList;
    (window as any).__ALL_PROJECT_LIST__ = projectList;
    localforage.setItem('allProjectList', projectList)
    getContractList()
    await userNotOwnerHandleProject()
    console.log('非业主')
}

//非业主时对项目合同段进行相应处理
export const userNotOwnerHandleProject = async () => {
    const { token, appId, tenantId, userIndentity, query, userInfo } = basalInfo
    const originProjectId = query.projectId;
    const projectList: any = await localforage.getItem('allProjectList')
    if (projectList && !!projectList.length && projectList.length > 1) {
        let idx = 0
        for (let i = 0; i < projectList.length; i++) {
            const ele = projectList[i];
            if (ele.id == originProjectId) {
                idx = i;
                break
            }
        }

        //存储被选中的项目ID
        sessionStorage.selectPrjId = projectList[idx].id
            (window as any).__SELECT_PROJECT_ID__ = projectList[idx].id

        sessionStorage.selectPrj = JSON.stringify(projectList[idx]);
        (window as any).__SELECT_PROJECT__ = projectList[idx]

        //将项目信息存储到userInfo
        sessionStorage.userInfo = JSON.stringify((window as any).__USERINFO__.project = projectList[idx])

        //发送消息给实景
        let token = (window as any).__TOKEN___
        let userInfo = (window as any).__USERINFO__
        let limitBtns = (window as any).__LIMIT_BUTTONS__
        let projectId = projectList[idx].id
        let isvisibleBim = (window as any).__ISVISIBLE_BIM__
        let userIndentity = (window as any).__USER_IDENTITY__
        let parentHost = (window as any).location.origin
        let iframeInfo = { token, userInfo, limitBtns, projectId, isvisibleBim, userIndentity, parentHost, appId, isBim: true }
        for (let index = 0; index < (window as any).frames.length; index++) {
            (window as any).frames[index] && (window as any).frames[index].postMessage(iframeInfo, '*');
        }
        //   yield put({
        //     type: 'projectSelect/setProjectId',
        //     projectId: projectId
        //   })
    } else if (projectList && !!projectList.length && projectList.length == 1) {
        //一个项目，默认选中第一个
        // yield put({
        //   type: 'menuDirectory/getMenuList', params: {
        //     project: projectList[0],
        //     projectId: projectList[0].id,
        //     tenantId,
        //     appId
        //   }
        // });

        //存储被选中的项目ID
        sessionStorage.selectPrjId = projectList[0].id
            (window as any).__SELECT_PROJECT_ID__ = projectList[0].id

        sessionStorage.selectPrj = JSON.stringify(projectList[0]);
        (window as any).__SELECT_PROJECT__ = projectList[0]

        //将项目信息存储到userInfo
        sessionStorage.userInfo = JSON.stringify((window as any).__USERINFO__.project = projectList[0])

        //发送消息给实景
        let token = (window as any).__TOKEN___
        let userInfo = (window as any).__USERINFO__
        let limitBtns = (window as any).__LIMIT_BUTTONS__
        let projectId = projectList[0].id
        let isvisibleBim = (window as any).__ISVISIBLE_BIM__
        let userIndentity = (window as any).__USER_IDENTITY__
        let parentHost = (window as any).location.origin
        let iframeInfo = { token, userInfo, limitBtns, projectId, isvisibleBim, userIndentity, parentHost, appId, isBim: true }
        for (let index = 0; index < (window as any).frames.length; index++) {
            (window as any).frames[index] && (window as any).frames[index].postMessage(iframeInfo, '*');
        }

        //以下操作暂时不只有何作用   //TODO
        // yield put({
        //   type: 'projectSelect/setProjectId',
        //   projectId: projectId
        // })
    }
}

//获取合同段列表
export const getContractList = () => {
    const projectList = (window as any).__ALL_PROJECT_LIST__;
    let contractList: Array<any> = [];
    projectList.forEach((project: any) => {
        contractList = [...contractList, ...project.contractList];
    });
    basalInfo.contractList = contractList;
    //   //存储合同段列表
    localforage.setItem('contractList', contractList);
    (window as any).__CONTRACT_LIST__ = contractList;

    (window as any).__ALL_CONTRACT_LIST__ = contractList
    localforage.setItem('allContractList', contractList)

}

//获取按钮权限列表
export const getButtonPermissions = async () => {
    const res = await services.getButtonPermissions();
    //存储权限按钮
    if(res.code == 200 || res.code == 201){
        localforage.setItem('limitButtons', res.data);
        basalInfo.limitBtns = res.data
        (window as any).__LIMIT_BUTTONS__ = res.data
        localforage.setItem('limitBtns', res.data)
    }
    console.log("权限----",res)
    
}

//获取用户授权菜单列表
export const getMenuList = async () => {
    const res = await services.getMenuList();
    if(res.code == 200 || res.code == 201){

    }
}