// import React from 'react';
import React, { Component } from 'react';
// import ChartistGraph from 'react-chartist';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Form from '../../Form';
// import FormParamsConstants from './formParamsConstants';
import FormAction from '../../../actions/Form/FormAction';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ color: '#2F86A6' }}>Yakama Nation DNR Engineering</h4>
            <hr />
            <h5 className="title" style={{ color: '#2F86A6' }}><a href="mailto: al_pinkham@yakama.com">Al Pinkham, Engineering Planner II<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#2F86A6' }}><a href="mailto: hollyanna_littlebull@yakama.com">HollyAnna Littlebull, Traffic Safety Coordinator<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#2F86A6' }}><a href="mailto: portia_shields@yakama.com">Portia Shields, Data Manager<i className="pe-7s-mail" /></a></h5>
          </div>
        </div>
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ color: '#172774' }}>U.S. Department of Transportation</h4>
            <hr />
            <h5 className="title" style={{ color: '#172774' }}><a href="mailto: paul.teicher@dot.gov">Paul Teicher, Senior Policy Analyst<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#172774' }}><a href="mailto: tom.bragan@dot.gov">Tom Bragan, Traffic Records Division, NHTSA<i className="pe-7s-mail" /></a></h5>
          </div>
        </div>
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ color: '#3E065F' }}>University of Washington, STAR Lab</h4>
            <hr />
            <h5 className="title" style={{ color: '#3E065F' }}><a href="mailto: yinhai@uw.edu">Dr. Yinhai Wang, Professor and Director of PacTrans<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#3E065F' }}><a href="mailto: wsun91@uw.edu">Dr. Wei Sun, Postdoc Research Associate<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#3E065F' }}><a href="mailto: mjtsai@uw.edu">Meng-Ju (Dennis) Tsai, Research Assistant<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#3E065F' }}><a href="mailto: samuelsr@uw.edu">Sam Ricord, Research Assistant<i className="pe-7s-mail" /></a></h5>
            <h5 className="title" style={{ color: '#3E065F' }}><a href="mailto: meixin92@uw.edu">Meixin Zhu, Research Assistant<i className="pe-7s-mail" /></a></h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(FormAction, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(ContactInfo);
