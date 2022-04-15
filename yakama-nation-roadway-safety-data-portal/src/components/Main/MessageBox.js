import React, { Component } from 'react';
import '../../assets/styles/basic.css';

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      notificationStatus: 'notification-box',
    };
  }

  render() {
    const { notificationStatus } = this.state;
    return (
      <div className={notificationStatus}>
        <div className="notification-box-message">
          You are currently in DRIVE NET Version 4. <a href="http://www.uwdrive.net/" className="hyper-link" target="_blank">Click Here  to Go back to DRIVE Net Version 3!</a>
        </div>
        <span className="notification-box-dismiss" onClick={() => this.setState({ notificationStatus: 'notification-box-hide' })}>
          x
        </span>
      </div>
    );
  }
}
