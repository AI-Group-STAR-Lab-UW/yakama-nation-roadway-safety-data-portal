import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class features extends Component {
  renderAllFeatures = () => {
    return (
      this.props.data ? (this.props.data.map((d, i) => (
        <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3 hover-bg pb-3" style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            style={{ display: 'table-cell' }}
            href={d.link}
            rel="noopener noreferrer"
          >
            <i className={d.icon} />
            <h3>{d.title}</h3>
            <p>{d.text}<br /></p>
          </a>
        </div>
      ))) : ('Loading...')
    );
  }

  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Applications</h2>
          </div>
          <div className="row">
            { this.renderAllFeatures() }
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(features);
