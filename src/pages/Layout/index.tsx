import React,{useEffect,useState,Component} from 'react';
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

class EwecLayout extends Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            visibleSelectProject:false
        };
    }

    async componentDidMount(){
        const basalInfo = await CF.startFun()
        if(basalInfo.userIndentity == 'owner'){//非业主
            this.setState({
                visibleSelectProject:true
            })
        }
    }

    render(){
        const { visibleSelectProject } = this.state
        return (
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
              <Content>
                  {
                    visibleSelectProject?<SelectProject/>:this.props.children
                  }
                  
              </Content>
              {/* 左侧边栏 */}
              <WorkTab />
            </div>
          );
    }
  

};
export default EwecLayout;
