import React, { useEffect, useState, Component, createContext } from 'react';
import { useRequest, useMount, useUpdate } from 'ahooks';
import '../styles/submenu.less';
import * as CF from '../utils/commonFun'

const { Consumer, selectProject } = CF

export default (props: any) => {
    const mouseEvent = ({fun,key,keyValue,basalInfo,type}:{fun:Function,key:string,keyValue:any,basalInfo:any,type:number}) => {
        let { menuInfo } = basalInfo
        menuInfo[key] = keyValue
        if(type == 1){
            menuInfo = {...menuInfo,hoverMenuId:'',}
        }
        fun({...basalInfo,menuInfo})
    }
    const menuClick = ({currentMenu,originMenu,currentLevel,basalState}:{currentMenu:any,originMenu:any,currentLevel:number,basalState:any}) =>{

        let nav:Array<any> = [];
        let { menuInfo = {}, _setBasalState,noticeNum} = basalState;
        menuInfo.curLevelOneMenu = originMenu.levelOne;
        nav.push(originMenu.levelOne);
        if(currentLevel == 2){
            nav.push(currentMenu);
        }else if(currentLevel == 3){
            nav = [...nav,originMenu.levelTwo,currentMenu];
        }

        let currentRoute:string = currentMenu.route;
        let currentNavbar:Array<any> = nav;
        let choiceMenuId:string = currentMenu.id;
        let choiceLevelOneId:string = originMenu.levelOne.id;
        
        menuInfo = {...menuInfo,currentRoute,currentNavbar,choiceMenuId,choiceLevelOneId};
        (window as any).__CUR_LEVEL_ONE_MENU__ = originMenu.levelOne;
        (window as any).__CUR_LEVEL_TWO_MENU_LIST__ = originMenu.levelOne.children;
        _setBasalState({...basalState,menuInfo});
    }
    const renderSubMenu= (params:any,basalState:any) => {
        const {choiceMenuId} = basalState.menuInfo
        const levelOne = params
        const levelTwo:Array<any> = levelOne.children
        return levelTwo.map((item:any)=>{
            return (
                <div className= '_ewec_layout_submenu_item_' key={item.id}>
                    <div className= {choiceMenuId == item.id?'_ewec_layout_submenu_item_two_ choice_menu':'_ewec_layout_submenu_item_two_'}
                        style={{cursor:item.children && item.children.length > 0?'auto':'pointer'}}
                        onClick={()=>menuClick({currentMenu:item,originMenu:{levelOne:levelOne},currentLevel:2,basalState})}
                    ><span></span>{item.name}</div>
                    {
                        (item.children && item.children.length > 0) && <div  className= '_ewec_layout_submenu_item_three_'>
                            {
                                item.children.map((tmp:any) => {
                                    return <div
                                    className = {choiceMenuId == tmp.id?"choice_menu":''}
                                    key = {tmp.id}
                                    onClick={()=>menuClick({currentMenu:tmp,originMenu:{levelOne:levelOne,levelTwo:item},currentLevel:3,basalState})}
                                    >{tmp.name}</div>
                                })
                            }
                        </div>
                    }
                    
                </div>
            )
        })
    }
    return(
        <Consumer>
            {
                (value) => {
                    const { menuInfo = {}, _setBasalState,} = value
                    const { showSubmenu = false, curLevelOneMenu = []} = menuInfo
                    
                    return(
                        showSubmenu && <div 
                            className ="_ewec_layout_submenu_"
                            onMouseEnter = {()=>{mouseEvent({fun:_setBasalState,key:'showSubmenu',keyValue:true,basalInfo:value,type:0})}}
                            onMouseLeave = {()=>{mouseEvent({fun:_setBasalState,key:'showSubmenu',keyValue:false,basalInfo:value,type:1})}}
                        >
                            {
                                renderSubMenu(curLevelOneMenu,value)
                            }
                        </div>
                    )
                }
            }
        </Consumer>
    )
};
