import React from 'react';
import DatePickerRange from '../widget/Form/DatePickerRange';
import TimeSelector from '../widget/Form/TimeSelector';
import SelectPicker from '../widget/Form/SelectPicker';
import MultiSelectPicker from '../widget/Form/MultiSelectPicker';
import SliderPage from '../widget/Form/SliderPage';
import DatePicker from '../widget/Form/DatePicker';
import InputSpace from '../widget/Form/InputSpace';
import CheckBox from '../widget/Form/CheckBox';

function renderFormHelper(name, type, value, key) {
  switch (type) {
    case 'TITLE':
      return (
        <div className="header" key={key}>
          <h3>{name}</h3>
        </div>
      );
    case 'DATE_PICKER_RANGE':
      return (
        <div className="form-group" key={key}>
          <div className="col-md-12">
            <DatePickerRange name={name} value={value} />
          </div>
        </div>
      );
    case 'DATE_PICKER':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-12">
            <DatePicker name={name} value={value} />
          </div>
        </div>
      );
    case 'TIME_SELECTOR':
      return (
        <div className="form-group" key={key}>
          <div className="col-md-12">
            <TimeSelector name={name} />
          </div>
        </div>
      );
    case 'SELECT_PICKER':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-12">
            <SelectPicker name={name} dropdownOptions={value} />
          </div>
        </div>
      );
    case 'HALF_SELECT_PICKER':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-6">
            <SelectPicker name={name} dropdownOptions={value} />
          </div>
        </div>
      );
    case 'MULTI_SELECT_PICKER':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-12">
            <MultiSelectPicker name={name} dropdownOptions={value} />
          </div>
        </div>
      );
    case 'SILDER':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-12">
            <SliderPage name={name} config={value} />
          </div>
        </div>
      );
    case 'INPUT':
      return (
        <div className="form-group">
          <div className="col-sm-12">
            <InputSpace name={name} />
          </div>
        </div>
      );
    case 'HALF_INPUT':
      return (
        <div className="form-group">
          <div className="col-sm-6">
            <InputSpace name={name} />
          </div>
        </div>
      );
    case 'CHECKBOX':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-12">
            <CheckBox name={name} />
          </div>
        </div>
      );
    case 'HALF_CHECKBOX':
      return (
        <div className="form-group" key={key}>
          <div className="col-sm-6">
            <CheckBox name={name} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default renderFormHelper;
