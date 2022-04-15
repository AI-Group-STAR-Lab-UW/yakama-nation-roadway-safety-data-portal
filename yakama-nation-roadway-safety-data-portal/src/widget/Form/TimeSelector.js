import React, { Component } from 'react';
// import TimeInput from 'react-time-input';
// import TimeInput from 'react-input-time';
import TimePicker from 'react-time-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class TimeSelector extends Component {
  onTimeChange = (value) => {
    if (value != null) {
      const { actions: { updateFormParams }, name } = this.props;
      updateFormParams({ [name]: value });
    }
  }

  render() {
    const { name, formParams } = this.props;
    const currT = formParams[name];
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">Select {name}</h4>
          <div className="form-group">
            <TimePicker
              style={{ backgroundColor: 'red' }}
              value={currT}
              className="form-control"
              mountFocus={false}
              onChange={this.onTimeChange}
              disableClock="true"
              clearIcon=""
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

TimeSelector.propTypes = {
  name: PropTypes.string,
};

TimeSelector.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelector);
