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
import { Spin } from 'antd'
import { useChangeState } from './utils/hookFun'
import * as CF from './utils/commonFun'
const { Provider, Consumer } = CF

interface ordinaryObj {
    [propName: string]: any;
}
export default  (props: any) => {
    const [basalState, _setBasalState] = useState<ordinaryObj>({visibleSelectProject:false,isRequestDid:false});
    const [todoNum,_setToDoNum] = useState<number>(0);
    const [noticeNum,_setNoticeNum] = useState<number>(0);
    
    (window as any).__Consumer__ = Consumer;
    useMount(()=>{
        CF.startFun().then(basalInfo=>{
            _setToDoNum(basalInfo.todoNum)
            _setNoticeNum(basalInfo.noticeNum)
            if (basalInfo.userIndentity !== 'owner') {//非业主
                console.log(basalInfo) 
                CF.userNotOwnerHandleProject().then(()=>{
                    _setBasalState({ ...basalState, ...basalInfo, visibleSelectProject: true,})
                    }
                )
            }else{
                _setBasalState({ ...basalState, ...basalInfo})
                _setToDoNum(basalInfo.todoNum)
                _setNoticeNum(basalInfo.noticeNum)
            }
        })
    })
    const { menuInfo, visibleSelectProject, isRequestDid } = basalState
    debugger
    console.log("render-------------",)
    return (
        <Provider value={{ ...basalState,_setBasalState,Consumer,noticeNum,_setNoticeNum,todoNum,_setToDoNum }}>
        {/* <Provider value={{ ...basalState,_setBasalState,Consumer,aaaa:'哈哈哈哈'}}> */}
            <div className="_ewec_layout_container_">
                {/* 头部区域 */}
                <div className="_ewec_layout_header_box_">
                    {/* 头部左侧包含title和logo */}
                    <HeaderLeft />
                    {/* 头部中间菜单区域 */}
                    <Menu />
                    {/* 头部菜单下拉区域 */}
                    <SubMenu />
                    {/* 头部菜单右侧操作区域 */}
                    <HeaderRight />
                </div>
                {/* 导航区 */}
                <NavBar />
                {/* 内容区 */}
                {/* <basalContext.Provider value={basalInfo}> */}
                {
                    isRequestDid?<Spin size="large" className="_ewec_layout_content_spin_"/>:
                    visibleSelectProject?
                    <Content>
                        { 
                            isRequestDid?<Spin size="large" className="_ewec_layout_content_spin_"/>:visibleSelectProject ? <SelectProject /> : props.children
                            // visibleSelectProject ? <SelectProject /> : <div style={{width:'100%',height:'100%',background:'green'}}></div>
                        }
                    </Content>:
                    <Provider value={{a:1,b:2}}>
                        <Content>
                            { props.children }
                        </Content>
                    </Provider>

                }
                {/* <Provider value={{a:1,b:2}}>
                    <Content>
                        { 
                            isRequestDid?<Spin size="large" className="_ewec_layout_content_spin_"/>:visibleSelectProject ? <SelectProject /> : props.children
                            // visibleSelectProject ? <SelectProject /> : <div style={{width:'100%',height:'100%',background:'green'}}></div>
                        }

                    </Content>
                </Provider> */}
                {/* 左侧边栏 */}
                {/* <WorkTab /> */}
            </div>
        </Provider>
        // <div>456465464</div>
    );
}
