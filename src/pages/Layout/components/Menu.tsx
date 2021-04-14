import React from 'react';
import '../styles/menu.less';
class Menu extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hoverMenuId: '', //鼠标停留的菜单ID
      clickMenuId: '', //鼠标点击的菜单ID
      boxScrollLeft: 0,
      maxScrollLeft: 0,
      boxWidth: 0,
      scorllWidth: 0,
      menuList: [], //菜单列表
      curLevelOneMenu: {}, //被选中的一级菜单
      showLeftBtn: false,
      showRightBtn: true,
    };
    window.addEventListener('resize', () => {
      //   this.initBox()
    });
    window.addEventListener('load', () => {
      //   this.initBox()
    });
  }

  render() {
    return (
      <div className="_ewec_layout_menu_">
        <ul>
          <li>首页</li>
          <li>首页1</li>
          <li>首页2</li>
          <li>首页3</li>
        </ul>
      </div>
    );
  }
}
export default Menu;
