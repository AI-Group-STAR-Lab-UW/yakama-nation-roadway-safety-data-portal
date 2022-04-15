import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      focus: false,
    };
  }

  onSelectedDatesChange = (date) => {
    const { actions: { updateFormParams }, name } = this.props;
    const dateString = date.format('YYYY-MM-DD');
    updateFormParams({ [name]: dateString });
  }

  render() {
    const { name, value, formParams } = this.props;
    const { focus } = this.state;
    const currDate = moment(formParams[name]);
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">Select {name}</h4>
          {/*
          <p style={{ fontSize: '14px' }}> Data are available from {value.minDate} to {value.maxDate}</p>
          */}
          <div className="form-group">
            <SingleDatePicker
              date={currDate}
              onDateChange={this.onSelectedDatesChange}
              focused={focus}
              onFocusChange={({ focused }) => this.setState({ focus: focused })}
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

DatePicker.propTypes = {
  name: PropTypes.string,
};

DatePicker.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
