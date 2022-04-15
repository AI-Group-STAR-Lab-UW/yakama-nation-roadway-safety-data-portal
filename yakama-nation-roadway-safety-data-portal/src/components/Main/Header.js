import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import '../../assets/styles/basic.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <div className="separator" />

          <Nav>
            <NavItem href="/">
              <i className="fa fa fa-home" />
            </NavItem>
          </Nav>

          <Nav pullRight>
            <NavItem href="https://www.transportation.gov/SafetyDataInitiative" target="_blank">
              <a style={{ fontSize: '16px', color: '#0b1f61' }}>Want to know more about the study?</a>
            </NavItem>
          </Nav>

        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

Header.propTypes = {};

Header.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
