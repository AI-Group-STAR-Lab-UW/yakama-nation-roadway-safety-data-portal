const segmentSafetyIndexAction = {
  resetSegmentSafetyIndexData: () => ({
    type: 'RESET_SEGMENT_SAFETY_INDEX',
  }),
  setSegmentSafetyIndexData: (listOfSegments) => ({
    type: 'SET_SEGMENT_SAFETY_INDEX',
    payload: {
      segmentSafetyIndex: listOfSegments,
    },
  }),
};

export default segmentSafetyIndexAction;
