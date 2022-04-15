import React, { Component } from 'react';
import Nav from './Nav';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="sidebar">
        <div className="brand">
          <img src={require('../../assets/images/usdot.png')} alt="logo" className="logo" />
          <a href="/" className="brand-name">
            <p>Yakama Nation Roadway Safety Data Portal</p>
          </a>
        </div>
        <div className="sidebar-wrapper">
          <div className="line" />
          <Nav />
        </div>
      </div>
    );
  }
}

export default SideBar;
