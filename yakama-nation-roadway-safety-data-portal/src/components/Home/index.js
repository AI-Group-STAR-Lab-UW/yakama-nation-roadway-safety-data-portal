import React, { Component } from 'react';
import '../../assets/styles/form.css';
import Apps from './Apps';
import '../../assets/styles/landingpage.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <Apps />
      </div>
    );
  }
}
