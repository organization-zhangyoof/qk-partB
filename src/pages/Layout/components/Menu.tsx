import React,{Component}  from 'react';
import '../styles/menu.less';


class Menu extends React.Component<any,any>{
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
      const { menuList = [],curLevelOneMenu } = this.props
      const { hoverMenuId, clickMenuId } = this.state
      console.log("menuList---",menuList)
    return (
      <div className="_ewec_layout_menu_">
        <ul>
            {
                menuList.map((item: any) => {
                    // console.log("item.name--",item.name)
                    return (
                        <li
                            key = {item.id}
                            style={{
                                background: (curLevelOneMenu.id == item.id || hoverMenuId == item.id || clickMenuId == item.id) ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                                color: (curLevelOneMenu.id == item.id || hoverMenuId == item.id || clickMenuId == item.id) ? '#fff' : (item.children && item.children.length > 0 ? 'rgba(255, 255, 255, 0.84)' : (item.route == '#' ? 'rgba(255, 255, 255, 0.3)' :'rgba(255, 255, 255, 0.84)')),
                                cursor: item.children && item.children.length > 0 ? 'pointer' : (item.route == '#' ? 'not-allowed' : 'pointer')
                            }}
                        >{item.name}</li>
                    )
                })
            }
        </ul>
      </div>
    );
  }
}
export default Menu;
