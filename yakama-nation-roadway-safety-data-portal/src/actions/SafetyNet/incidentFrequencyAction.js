const incidentFrequencyAction = {
  setRoutesAndColors: (listOfCoordinatesAndColor) => ({
    type: 'SET_INCIDENT_FREQUENCY_INFO',
    payload: {
      incidentFrequencyInfo: listOfCoordinatesAndColor,
    },
  }),
  resetIncidentFrequencyData: () => ({
    type: 'RESET_INCIDENT_FREQUENCY',
  }),
};

export default incidentFrequencyAction;
