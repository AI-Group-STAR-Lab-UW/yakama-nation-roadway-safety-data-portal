import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (

      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header" style={{ verticalAlign: 'middle', display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {' '}
              <span className="sr-only">Toggle navigation</span>{' '}
              <span className="icon-bar" />{' '}
              <span className="icon-bar" />{' '}
              <span className="icon-bar" />{' '}
            </button>
            <img src={require('../../assets/images/usdot.png')} alt="logo" className="landing-page-logo" />
            <a
              className="navbar-brand page-scroll"
              href="https://www.transportation.gov/SafetyDataInitiative"
              style={{ display: 'table-cell' }}
              rel="noopener noreferrer"
            >
              U.S. Department of Transportation
            </a>{' '}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
              <li>
                <a href="#features" className="page-scroll">
                  Applications
                </a>
              </li>
              <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
              {/*
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
              */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = () => (
  {
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
