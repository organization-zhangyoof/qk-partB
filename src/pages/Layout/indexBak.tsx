import React,{useEffect,useState,Component,createContext} from 'react';
import { useRequest,useMount } from 'ahooks';
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
import {useChangeState} from './utils/hookFun'
import * as CF from './utils/commonFun'
const {Provider,Consumer} = CF


interface ordinaryObj {
    [propName: string] : any;
}
class EwecLayout extends Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            visibleSelectProject: false,
            basalInfo: {}
        };
    }

    async componentDidMount(){
        let that = this
        //获取平台基本信息
        const basalInfo = await CF.startFun()
        if(basalInfo.userIndentity !== 'owner'){//非业主
            await CF.userNotOwnerHandleProject(that)
        }
        this.setState({basalInfo})
    }
    // updateBasalInfo = ({isChangState = false,key = '',value = ''}:{isChangState:boolean,key:string,value:any}) => {
    //     let params:ordinaryObj = {}
    //     let that = this
    //     if(isChangState){
    //         params.that = that
    //     }
    //     CF.updateBasalInfor(params)
    // }
    render(){
        const { visibleSelectProject, basalInfo } = this.state
        const { menuList, curLevelOneMenu } = basalInfo
        const menuProps = {
            menuList,
            curLevelOneMenu,
        }
        return (
            <Provider value={{...basalInfo,that:this}}>
                <div className="_ewec_layout_container_">
                {/* 头部区域 */}
                <div className="_ewec_layout_header_box_">
                    {/* 头部左侧包含title和logo */}
                    <HeaderLeft />
                    {/* 头部中间菜单区域 */}
                    <Menu {...menuProps}/>
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
                        visibleSelectProject?<SelectProject/>:this.props.children
                    }
                    
                </Content>
                {/* </basalContext.Provider> */}
                {/* 左侧边栏 */}
                {/* <WorkTab /> */}
                </div>
            </Provider>
          );
    }
  

};
export default EwecLayout;
