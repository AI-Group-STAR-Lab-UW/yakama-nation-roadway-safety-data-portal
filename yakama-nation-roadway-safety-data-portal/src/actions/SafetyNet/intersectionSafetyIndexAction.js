const intersectionSafetyIndexAction = {

  setIntersectionAreasAndColors: (listOfGeojsons) => ({
    type: 'SET_INTERSECTION_AREA_SAFETY_INDEX',
    payload: {
      intersectionAreaSafetyIndex: listOfGeojsons,
    },
  }),
  resetIntersectionSafetyIndexData: () => ({
    type: 'RESET_INTERSECTION_SAFETY_INDEX',
  }),
};

export default intersectionSafetyIndexAction;
