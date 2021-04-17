import React, { useEffect, useState, Component, createContext } from 'react';
import { useRequest, useMount } from 'ahooks';
import {
    HeaderLeft,
    Menu,
    NavBar,
    SubMenu,
    HeaderRight,
    Content,
    WorkTab,
    SelectProject,
} from './components';
import './index.less';
import { useChangeState } from './utils/hookFun'
import * as CF from './utils/commonFun'
const { Provider, Consumer } = CF


interface ordinaryObj {
    [propName: string]: any;
}
export default  (props: any) => {
    const [basalState, setState] = useState<ordinaryObj>({visibleSelectProject:false})
    
    useMount(()=>{
        CF.startFun().then(basalInfo=>{
            if (basalInfo.userIndentity !== 'owner') {//非业主
                console.log(basalInfo) 
                CF.userNotOwnerHandleProject()
                console.log('----',basalInfo) 
                setState({ ...basalState, ...basalInfo, visibleSelectProject: true })
            }else{
                setState({ ...basalState, ...basalInfo})
            }
        })
    })
    const { menuList, curLevelOneMenu, visibleSelectProject } = basalState
    const menuProps = {
        menuList,
        curLevelOneMenu,
    }
    debugger
    return (
        <Provider value={{ ...basalState,setState }}>
            <div className="_ewec_layout_container_">
                {/* 头部区域 */}
                <div className="_ewec_layout_header_box_">
                    {/* 头部左侧包含title和logo */}
                    <HeaderLeft />
                    {/* 头部中间菜单区域 */}
                    <Menu {...menuProps} />
                    {/* 头部菜单下拉区域 */}
                    <SubMenu />
                    {/* 头部菜单右侧操作区域 */}
                    <HeaderRight />
                </div>
                {/* 导航区 */}
                <NavBar />
                {/* 内容区 */}
                {/* <basalContext.Provider value={basalInfo}> */}
                <Content>
                    {
                        // visibleSelectProject ? <SelectProject /> : props.children
                        visibleSelectProject ? <SelectProject /> : <div style={{width:'100%',height:'100%',background:'green'}}></div>
                    }

                </Content>
                {/* 左侧边栏 */}
                {/* <WorkTab /> */}
            </div>
        </Provider>
        // <div>456465464</div>
    );
}
