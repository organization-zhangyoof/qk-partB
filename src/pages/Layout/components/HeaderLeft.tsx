import React from 'react';
// import logo from '../assets/00.jpg';
import '../styles/HeaderLeft.less';
export default (props: any) => {
  const logo =
    'http://dd-test.gcnao.cn/gateway/application/ddApplicationManage/download?id=fff65187cc5d4d539eb12dd8cda4b511';
  return (
    <div className="_ewec_layout_logo_">
      <p className="_ewec_layout_logo_img_">
        <img src={logo} alt="" />
      </p>
      <p className="_ewec_layout_logo_title_">这是title</p>
    </div>
  );
};
