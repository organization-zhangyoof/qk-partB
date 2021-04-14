import React from 'react';
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

//渲染操作的待办、通知、帮助与支持
const renderOperationIcon = (list: Array<Object>) => {
  return list.map((item: any) => {
    return (
      <p className="_ewec_layout_operate_badge_" onClick={item.onClick}>
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
      </p>
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
      onclick: () => {},
      img: message,
    },
    {
      number: 10,
      name: '通知',
      width: 20,
      height: 15,
      onclick: () => {},
      img: email,
    },
    {
      number: 10,
      name: '帮助与支持',
      width: 20,
      height: 20,
      onclick: () => {},
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
      <p style={{ height: 32, lineHeight: '32px', cursor: 'pointer' }}>
        个性主题
        <Icon type="caret-right" style={{ fontSize: '10px', color: '#ccc' }} />
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
  console.log(
    'renderOperationIcon(iconList)===',
    renderOperationIcon(iconList),
  );
  return (
    <div className="_ewec_layout_operate_">
      {renderOperationIcon(iconList)}
      <Tooltip title="操作列表" placement="bottom">
        <Dropdown trigger="click" overlay={operationList}>
          {/* <Dropdown trigger="click" > */}
          <p
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
            <span style={{ color: '#fff' }}>{window.__USERINFO__?.name}</span>
            <Icon
              type="caret-down"
              style={{ color: '#fff', marginLeft: '3px' }}
            />
          </p>
        </Dropdown>
      </Tooltip>
    </div>
  );
};
