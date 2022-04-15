import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../../Form';
import FormParamsConstants from './formParamsConstants';
import FormAction from '../../../actions/Form/FormAction';

class IntersectionSafetyIndexForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { AreaSafetyIndex } = FormParamsConstants;
    const { actions: { setUiForm } } = this.props;
    setUiForm(AreaSafetyIndex);
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

export default connect(null, mapDispatchToProps)(IntersectionSafetyIndexForm);
