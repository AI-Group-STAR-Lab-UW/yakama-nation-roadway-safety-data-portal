const FormParamsConstants = {};

FormParamsConstants.IncidentFrequencyData = {
  formTitle: 'Safety Performance Visualization',
  buttons: ['Visualize Incident Frequency', 'Estimated Crash Mean'],
  uiList: [
    {
      name: 'Start Date',
      type: 'DATE_PICKER',
      value: {
        minDate: '2013-01-01',
        maxDate: '2017-12-31',
      },
    },
    {
      name: 'Start Time',
      type: 'TIME_SELECTOR',
    },
    {
      name: 'End Date',
      type: 'DATE_PICKER',
      value: {
        minDate: '2013-01-01',
        maxDate: '2017-12-31',
      },
    },
    {
      name: 'End Time',
      type: 'TIME_SELECTOR',
    },
    {
      name: 'Choose Route',
      type: 'SELECT_PICKER',
      value: {
        options: ['010', '012', '022', '024', '082', '090', '097', '241', '410', '821', '823', '970', 'All Routes'],
        defaultOption: '012',
      },
    },
  ],
  defaultUiList: {
    'Start Date': '2013-01-01',
    'Start Time': '00:00',
    'End Date': '2017-12-31',
    'End Time': '00:00',
    'Choose Route': 'All Routes',
  },
};

export default FormParamsConstants;
