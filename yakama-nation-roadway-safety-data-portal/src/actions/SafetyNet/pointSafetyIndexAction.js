const pointSafetyIndexAction = {
  resetPointSafetyIndexData: () => ({
    type: 'RESET_POINT_SAFETY_INDEX',
  }),
  setPointSafetyIndexData: (listOfAccidents) => ({
    type: 'SET_POINT_SAFETY_INDEX',
    payload: {
      pointSafetyIndex: listOfAccidents,
    },
  }),
};

export default pointSafetyIndexAction;
