const areaSafetyIndexAction = {

  setAreasAndColors: (listOfGeojsons) => ({
    type: 'SET_AREA_SAFETY_INDEX',
    payload: {
      areaSafetyIndex: listOfGeojsons,
    },
  }),
  resetAreaSafetyIndexData: () => ({
    type: 'RESET_AREA_SAFETY_INDEX',
  }),
};

export default areaSafetyIndexAction;
