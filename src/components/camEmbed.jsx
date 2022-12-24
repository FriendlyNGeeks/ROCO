import React, { Component } from "react";

export default class CamEmbed extends Component {

  constructor(props) {
    super(props);
    if (this.props.data.stats.display) {
      this.state = {
       style: {
         width: '75%',
         position: 'fixed',
         right: '0px',
         top: '0px'
        },
       url: {
         path: this.props.data.urlCheck.path
       }
      };
    }else {
      this.state = {
        style: {
          width: '100%',
          position: 'fixed',
          right: '0px',
          top: '0px'
        },
        url: {
          path: this.props.data.urlCheck.path
        }
       };
    }
    this.statsTempGraphStyle = {
        width: "calc(25%-16px)"
    }
  }

  render() {
    return (
      <>
        <img alt="camera embed" src={this.state.url.path+"/webcam/?action=stream"} style={ this.state.style } />
      </>
    );
  }
}
