import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class CheckBox extends Component {
  onChange = (e) => {
    const { actions: { updateFormParams }, name } = this.props;
    updateFormParams({ [name]: e.target.checked });
    if (!e.target.checked && name === 'Incident') {
      updateFormParams({ 'Closure by Incident': null });
      updateFormParams({ 'Incident Type': null });
    } else if (!e.target.checked && name === 'Weather') {
      updateFormParams({ 'Precipitation Type': null });
      updateFormParams({ Intensity: null });
    }
  }

  isDisable() {
    const { formParams, name } = this.props;
    if (formParams['Data Source'] === 'HERE Data' && name === 'HOV Lanes') {
      return true;
    }
    return false;
  }

  checkStatus() {
    const { formParams, name } = this.props;
    if (formParams['Data Source'] === 'HERE Data' && name === 'HOV Lanes') {
      return false;
    }
    return formParams[name];
  }

  render() {
    const { name } = this.props;
    return (
      <div className="row">
        <div
          className="col-md-12"
          style={{ margin: '10px' }}
        >
          <Checkbox
            defaultChecked={this.checkStatus()}
            onChange={this.onChange}
            disabled={this.isDisable()}
          />
          &nbsp;
          {' '}
          <p style={{ display: 'inline' }}>{name}</p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => (
  {
    formParams: state.FormReducer.formParams,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(FormAction, dispatch),
  }
);

CheckBox.propTypes = {
  name: PropTypes.string,
};

CheckBox.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
