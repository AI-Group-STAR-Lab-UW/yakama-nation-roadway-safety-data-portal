const initialState = {
  incidentFrequencyInfo: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_INCIDENT_FREQUENCY_INFO':
      const { incidentFrequencyInfo } = action.payload;
      return { ...state, incidentFrequencyInfo };
    case 'RESET_INCIDENT_FREQUENCY':
      return { ...state, incidentFrequencyInfo: [] };
    default:
      return state;
  }
}
