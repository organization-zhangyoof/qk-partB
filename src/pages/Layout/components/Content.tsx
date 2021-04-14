import React from 'react';
import '../styles/content.less';
class Content extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="_ewec_layout_content_">{this.props.children}</div>;
  }
}
export default Content;
