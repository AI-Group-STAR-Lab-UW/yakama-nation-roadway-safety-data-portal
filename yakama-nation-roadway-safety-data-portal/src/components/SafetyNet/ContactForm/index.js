import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../../Form';
// import CrashSeverity from './crashSeverity';
import FormParamsConstants from './formParamsConstants';
import FormAction from '../../../actions/Form/FormAction';
// import Mask from '../../../widget/Form/Mask';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { Contact } = FormParamsConstants;
    const { actions: { setUiForm } } = this.props;
    setUiForm(Contact);
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

export default connect(null, mapDispatchToProps)(ContactForm);
