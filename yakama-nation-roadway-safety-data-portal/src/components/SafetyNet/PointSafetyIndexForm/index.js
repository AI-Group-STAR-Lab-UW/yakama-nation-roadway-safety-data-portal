import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../../Form';
import FormParamsConstants from './formParamsConstants';
import FormAction from '../../../actions/Form/FormAction';

class PointSafetyIndexForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { PointSafetyIndex } = FormParamsConstants;
    const { actions: { setUiForm } } = this.props;
    setUiForm(PointSafetyIndex);
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

export default connect(null, mapDispatchToProps)(PointSafetyIndexForm);
