import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../../Form';
// import CrashSeverity from './crashSeverity';
import FormParamsConstants from './formParamsConstants';
import FormAction from '../../../actions/Form/FormAction';
// import Mask from '../../../widget/Form/Mask';

class SummayForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { SummaryReport } = FormParamsConstants;
    const { actions: { setUiForm } } = this.props;
    setUiForm(SummaryReport);
    return (
      <div>
        <Form />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(FormAction, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(SummayForm);
