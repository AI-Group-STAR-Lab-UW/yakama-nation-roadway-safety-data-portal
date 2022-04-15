const initialState = {
  accidentHeatmapIndex: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_HEATMAP_INDEX':
      const { accidentHeatmapIndex } = action.payload;
      return { ...state, accidentHeatmapIndex };
    case 'RESET_HEATMAP_INDEX':
      return { ...state, accidentHeatmapIndex: [] };
    default:
      return state;
  }
}
