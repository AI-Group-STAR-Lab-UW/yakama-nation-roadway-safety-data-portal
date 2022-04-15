const accidentHeatmapAction = {
  resetAccidentHeatmapData: () => ({
    type: 'RESET_HEATMAP_INDEX',
  }),
  setAccidentHeatmapData: (listOfAccidents) => ({
    type: 'SET_HEATMAP_INDEX',
    payload: {
      accidentHeatmapIndex: listOfAccidents,
    },
  }),
};

export default accidentHeatmapAction;
