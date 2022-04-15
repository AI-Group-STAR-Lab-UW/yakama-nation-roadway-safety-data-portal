import React, { Component } from 'react';

export class About extends Component {
  render() {
    return (
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6"> <img src={require('../../assets/images/intro_2.png')} alt="" /> </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Yakama Nation Roadway Safety Data Portal</h2>
                <p>{this.props.data ? this.props.data.paragraph : 'loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
