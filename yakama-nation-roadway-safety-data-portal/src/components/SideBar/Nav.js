import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  onClickSignInAlert = () => {
    const { actions: { showSignInAlert } } = this.props;
    showSignInAlert();
  }

  isPathActive(path) {
    const { location } = this.props;
    return location.pathname.startsWith(path);
  }

  render() {
    return (
      <ul className="nav">
        <li className={this.isPathActive('/applications/point-safety-index') ? 'active' : null}>
          <Link to="/applications/point-safety-index">
            <i className="pe-7s-map-marker" />
            <p>Point-based Crash Visualization</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/segment-safety-index') ? 'active' : null}>
          <Link to="/applications/segment-safety-index">
            <i className="pe-7s-graph1" />
            <p>Segment-based Safety Index</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/zipcode-safety-index') ? 'active' : null}>
          <Link to="/applications/zipcode-safety-index">
            <i className="pe-7s-graph" />
            <p>Zipcode-based Safety Index</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/intersection-safety-index') ? 'active' : null}>
          <Link to="/applications/intersection-safety-index">
            <i className="pe-7s-car" />
            <p>Intersection-based Safety Index</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/accident-heatmap') ? 'active' : null}>
          <Link to="/applications/accident-heatmap">
            <i className="pe-7s-map" />
            <p>Crash Heatmap</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/incident-frequency') ? 'active' : null}>
          <Link to="/applications/incident-frequency">
            <i className="pe-7s-graph3" />
            <p>Safety Performance Regression</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/crash-data-download') ? 'active' : null}>
          <Link to="/applications/crash-data-download">
            <i className="pe-7s-cloud-download" />
            <p>Crash Data Download</p>
          </Link>
        </li>

        <li className={this.isPathActive('/applications/summary-report') ? 'active' : null}>
          <Link to="/applications/summary-report">
            <i className="pe-7s-news-paper" />
            <p>Summary Report</p>
          </Link>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
    }, dispatch),
  }
);

export default withRouter(connect(null, mapDispatchToProps)(Nav));
