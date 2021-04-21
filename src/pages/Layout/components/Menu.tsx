import React, { useEffect, useState, Component, createContext } from 'react';
import { useRequest, useMount,useUpdate } from 'ahooks';
import '../styles/menu.less';
import * as CF from '../utils/commonFun'

const { Consumer, selectProject } = CF
// class Menu extends React.Component<any,any>{
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       hoverMenuId: '', //鼠标停留的菜单ID
//       clickMenuId: '', //鼠标点击的菜单ID
//       boxScrollLeft: 0,
//       maxScrollLeft: 0,
//       boxWidth: 0,
//       scorllWidth: 0,
//       menuList: [], //菜单列表
//       curLevelOneMenu: {}, //被选中的一级菜单
//       showLeftBtn: false,
//       showRightBtn: true,
//     };
//     window.addEventListener('resize', () => {
//       //   this.initBox()
//     });
//     window.addEventListener('load', () => {
//       //   this.initBox()
//     });
//   }
export default (props: any) => {
    // useUpdate()
    /**
     * 菜单的鼠标悬浮事件
     * @param item  鼠标悬浮或选中的当前数据
     * @param basalInfo  基础数据信息
     * @param fun  更改基础信息方法
     * @param type  0--鼠标移入 1---鼠标移出  3---鼠标点击
     */
    const mouseEvent = ({item,basalInfo,fun,type}:{item:any,basalInfo:any,fun:Function,type:number}) => {
        let menuInfo = basalInfo.menuInfo;
        let {choiceLevelOneId} = menuInfo;
        let hoverMenuId:string = ''
        let showSubmenu = false
        if(type == 0){
            hoverMenuId = item.id
        }else if(type == 1){
            hoverMenuId =  ''
        }else if(type == 2){
            choiceLevelOneId = item.id
        }
        if(item.children && item.children.length && (type == 0 || type ==3)){
            showSubmenu = true
        }
        menuInfo = { ...menuInfo, hoverMenuId,choiceLevelOneId,curLevelOneMenu:item,showSubmenu}
        fun({...basalInfo,menuInfo})
    }
    

    return (
        <Consumer>
            {
                (value) => {
                    const { menuInfo = {}, _setBasalState } = value
                    const { menuList = [], curLevelOneMenu,hoverMenuId,choiceLevelOneId } = menuInfo
                    return (
                        <div className="_ewec_layout_menu_">
                            <ul>
                                {
                                    menuList.map((item: any) => {
                                        return (
                                            <li
                                                key={item.id}
                                                style={{
                                                    background: (hoverMenuId == item.id || choiceLevelOneId == item.id) ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                                                    // background: (curLevelOneMenu.id == item.id || hoverMenuId == item.id || choiceLevelOneId == item.id) ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                                                    color: (curLevelOneMenu.id == item.id || hoverMenuId == item.id || choiceLevelOneId == item.id) ? '#fff' : (item.children && item.children.length > 0 ? 'rgba(255, 255, 255, 0.84)' : (item.route == '#' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.84)')),
                                                    cursor: item.children && item.children.length > 0 ? 'pointer' : (item.route == '#' ? 'not-allowed' : 'pointer')
                                                }}
                                                onMouseEnter={() => mouseEvent({item,basalInfo:value,fun:_setBasalState,type:0})}
                                                onMouseLeave={() => mouseEvent({item,basalInfo:value,fun:_setBasalState,type:1})}
                                                onClick = {() => mouseEvent({item,basalInfo:value,fun:_setBasalState,type:2})}
                                            >
                                                {item.name}
                                                {/* {item.children && !!item.children.length && (choiceLevelOneId == item.id || hoverMenuId == item.id) && <span className='choose'></span>} */}
                                                {item.children && !!item.children.length && (hoverMenuId == item.id) && <span className='choose'></span>}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    );
                }
            }
        </Consumer>
    )
}
