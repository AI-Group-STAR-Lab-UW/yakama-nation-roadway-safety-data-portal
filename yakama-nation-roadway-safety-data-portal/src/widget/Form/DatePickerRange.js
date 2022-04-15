import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class DatePickerRange extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dateRangeFocusedInput: null,
    };
  }

  onSelectedDatesChange = ({ startDate, endDate }) => {
    const { actions: { updateFormParams } } = this.props;
    if (startDate) {
      const startDatesString = startDate.format('YYYY-MM-DD');
      updateFormParams({ startDate: startDatesString });
    }
    if (endDate) {
      const endDateString = endDate.format('YYYY-MM-DD');
      updateFormParams({ endDate: endDateString });
    }
  }

  render() {
    const { name, value, formParams } = this.props;
    const { dateRangeFocusedInput } = this.state;
    const startDate = moment(formParams.startDate);
    const endDate = moment(formParams.endDate);
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">{name}</h4>
          {/*
          <p style={{ fontSize: '14px' }}> Data are available from {value.minDate} to {value.maxDate}</p>
          */}
          <div className="form-group">
            <DateRangePicker
              className="DateRangePicker"
              startDate={startDate}
              endDate={endDate}
              focusedInput={dateRangeFocusedInput}
              onFocusChange={(focusedInput) => this.setState({ dateRangeFocusedInput: focusedInput })}
              onDatesChange={this.onSelectedDatesChange}
              isOutsideRange={(date) => date.isBefore(value.minDate) || date.isAfter(value.maxDate)}
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

DatePickerRange.propTypes = {
  name: PropTypes.string,
};

DatePickerRange.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerRange);
