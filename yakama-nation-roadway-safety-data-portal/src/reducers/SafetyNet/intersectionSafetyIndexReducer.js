const initialState = {
  intersectionAreaSafetyIndex: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_INTERSECTION_AREA_SAFETY_INDEX':
      const { intersectionAreaSafetyIndex } = action.payload;
      return { ...state, intersectionAreaSafetyIndex };
    case 'RESET_INTERSECTION_SAFETY_INDEX':
      return { ...state, intersectionAreaSafetyIndex: [] };
    default:
      return state;
  }
}
