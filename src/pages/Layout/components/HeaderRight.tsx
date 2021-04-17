import React from 'react';
import localforage from 'localforage';
import {
    Icon,
    Badge,
    Select,
    Tooltip,
    Popover,
    Modal,
    Dropdown,
    Menu,
    Button,
} from 'antd';
import question from '../assets/icon/question.png';
import message from '../assets/icon/message.png';
import email from '../assets/icon/email.png';
import '../styles/HeaderRight.less';

import * as CF from '../utils/commonFun'


const { Option } = Select;
//渲染操作的待办、通知、帮助与支持
const renderOperationIcon = (list: Array<Object>) => {
    return list.map((item: any,index) => {
        return (
            <div className="_ewec_layout_operate_badge_" onClick={item.onClick} key = {index}>
                <Tooltip title="待办" placement="bottom">
                    <Badge
                        count={item.number}
                        className="_ewec_layout_badge_"
                        style={{
                            background: 'red',
                            padding: '0 3px',
                            height: '14px',
                            lineHeight: '14px',
                            boxShadow: 'none',
                        }}
                    >
                        <img
                            src={item.img}
                            style={{ width: item.width, height: item.height }}
                        />
                    </Badge>
                </Tooltip>
            </div>
        );
    });
};
export default (props: any) => {
    const { noticeNum = 99 } = props;
    const iconList = [
        {
            number: 10,
            name: '待办',
            width: 20,
            height: 20,
            onclick: () => { },
            img: message,
        },
        {
            number: 10,
            name: '通知',
            width: 20,
            height: 15,
            onclick: () => { },
            img: email,
        },
        {
            number: 10,
            name: '帮助与支持',
            width: 20,
            height: 20,
            onclick: () => { },
            img: question,
        },
    ];
    let topicColor = '#1890ff';
    const topicList = [
        //主题
        { name: '默认蓝', color: '#1890ff' },
        { name: '叶兰绿', color: '#1cc392' },
        { name: '赤城红', color: '#eb3149' },
        { name: '玉烟紫', color: '#9958dc' },
        { name: '芙蕖粉', color: '#f7889c' },
        { name: '露莓黑', color: '#304269' },
        { name: '经典蓝', color: '#114f8e' },
    ];
    const topicListCon = (
        <ul style={{ listStyle: 'none', margin: 0, padding: '0' }}>
            {topicList.map((item, index) => (
                <li
                    key={index}
                    //   onClick={this.chooseTopic.bind(this, item.color)}
                    //   onMouseEnter={this.hoverTopic.bind(this, item.color)}
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        cursor: 'pointer',
                        padding: '0',
                        lineHeight: '26px',
                        fontSize: '12px',
                        // color: topicId == item.color && topicColor
                    }}
                >
                    {item.name}
                    {topicColor == item.color && (
                        <Icon
                            type="check"
                            style={{ float: 'right', marginTop: '8px', fontSize: '12px' }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
    const operationList = (
        <div
            style={{
                background: '#fff',
                width: '90px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                borderRadius: '5px',
                padding: '0 10px',
                fontSize: 14,
            }}
        >
            <p
                style={{
                    borderBottom: '2px solid #f0f0f0',
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                操作
            </p>
            <p style={{ height: 32, lineHeight: '32px', cursor: 'pointer' }}>
                个人中心
            </p>
            <p style={{ height: 32, lineHeight: '32px', cursor: 'pointer' }}>
                返回平台
            </p>
            <p style={{ height: 32, lineHeight: '32px', cursor: 'pointer' }}>
                注销登录
            </p>
            <Popover trigger="hover" content={topicListCon} placement="leftTop">
                <p
                    style={{ height: 32, lineHeight: '32px', cursor: 'pointer' }}
                //   style={{margin: 0, fontSize: '14px', cursor: 'pointer',lineHeight: '32px', color: operateId == "topic" && topicColor}}
                //   onMouseEnter={this.hoverOperate.bind(this, 'topic')}
                >
                    个性主题
                    <Icon
                        type="caret-right"
                        style={{ fontSize: '10px', color: '#ccc' }}
                    />
                </p>
            </Popover>
        </div>
    );
    const { Consumer } = CF
    const onChangeSelectProject = (value:string,setState:Function,basalState:any)=>{
        debugger
        const {allProjectList} = basalState
        let newPro:Array<any> = allProjectList.filter((item:any) => item.id == value)
        let newCtr = newPro[0].contractList
        localforage.setItem('projectList', newPro);
        (window as any).__PROJECT_LIST__ = newPro;
        localforage.setItem('contractList', newCtr);
        (window as any).__CONTRACT_LIST__ = newCtr;
        setState({...basalState,projectList:newPro,contractList:newCtr})
    }
    return (
        <Consumer>
            {
                (value) => {
                    const { allProjectList = [], setState, userIndentity, selectProjectId, visibleSelectProject } = value
                    console.log('allProjectList----',allProjectList)
                    console.log('selectProjectId----',selectProjectId)
                    return (
                        <div className="_ewec_layout_operate_">
                            {userIndentity !== 'owner' && selectProjectId && !visibleSelectProject &&
                                // <div className='_ewec_layout_operate_select_'>
                                    <Select defaultValue={selectProjectId}
                                        showSearch = {true}
                                        filterOption={(input, option:any) =>
                                            option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{width:100,marginRight:10}}
                                        onChange = {
                                            (val:string)=>{onChangeSelectProject(val,setState,value)}
                                        }
                                    >
                                        {allProjectList.map((item: any) =>
                                            <Option key={item.id} value={item.id}>
                                                <Tooltip title={item.name} placement="left">
                                                    {item.name}
                                                </Tooltip>
                                            </Option>
                                        )}
                                    </Select>
                                // </div>
                            }
                            {renderOperationIcon(iconList)}
                            <Tooltip title="操作列表" placement="bottom">
                                <Dropdown trigger={['click']} overlay={operationList}>
                                    {/* <Dropdown trigger="click" > */}
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            // cursor: 'pointer',
                                            // background: chooseOperate ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                                            background: 1 == 1 ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                                            lineHeight: '35px',
                                            borderRadius: '.5em',
                                            padding: '0 .5em',
                                        }}
                                    // onClick={this.chooseOperate.bind(this)}
                                    >
                                        <span style={{ color: '#fff' }}>{(window as any).__USERINFO__ ?.name}</span>
                                        <Icon
                                            type="caret-down"
                                            style={{ color: '#fff', marginLeft: '3px' }}
                                        />
                                    </div>
                                </Dropdown>
                            </Tooltip>
                        </div>
                    )
                }
            }
        </Consumer>
    );
};
