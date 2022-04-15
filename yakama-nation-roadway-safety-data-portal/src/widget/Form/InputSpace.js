import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class InputSpace extends Component {
  onChange = (e) => {
    const { actions: { updateFormParams }, name } = this.props;
    updateFormParams({ [name]: e.target.value });
  }

  isDisable() {
    const { formParams } = this.props;
    if (formParams['Select Filter Option'] === 'Select All') {
      return true;
    }
    return false;
  }

  render() {
    const { name, formParams } = this.props;
    const input = formParams[name];
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">{name}</h4>
          <div className="form-group">
            <input
              style={{ textAlign: 'center' }}
              className="form-control"
              type="text"
              name="txt"
              value={input}
              disabled={this.isDisable()}
              onChange={this.onChange}
            />
          </div>
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

InputSpace.propTypes = {
  name: PropTypes.string,
};

InputSpace.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSpace);
