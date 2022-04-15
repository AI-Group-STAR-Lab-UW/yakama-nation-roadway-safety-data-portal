import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/styles/colorbar.css';
import '../assets/styles/form.css';

const colorbarWidth = 150;

const formatFloat = (num, pos) => {
  const size = 10 ** pos;
  return Math.round(num * size) / size;
};

const getColorBar = (listOfColors, start, end, title) => {
  let sampleListOfColors = [];
  const labels = [start, end];

  if (listOfColors.length > colorbarWidth) {
    for (let i = 0; i < listOfColors.length; i += Math.round(listOfColors.length / 150)) {
      sampleListOfColors.push(listOfColors[i]);
    }

    while (sampleListOfColors.length < colorbarWidth) {
      sampleListOfColors.push(sampleListOfColors[sampleListOfColors.length - 1]);
    }
  } else {
    sampleListOfColors = listOfColors;
  }

  const renderColorBar = () => (
    <div className="colorbar" key={uuidv4()}>
      {
        sampleListOfColors.map((color) => {
          const style = {
            backgroundColor: color,
            display: 'inline-block',
            width: `${formatFloat(colorbarWidth / sampleListOfColors.length, 4)}px`,
            height: '15px',
          };

          return (
            <div style={style} />
          );
        })
      }
    </div>
  );

  const renderColorBarTitle = () => (
    <div className="colorbar" style={{ textAlign: 'center', margin: '5px' }}>
      {title}
    </div>
  );

  const renderColorBarLabel = () => (
    <div className="colorbar">

      {labels.map((label, index) => {
        let style = {
          display: 'inline-block',
          width: `${(1 / labels.length) * 100}%`,
          height: '15px',
          textAlign: 'center',
        };

        if (index === 0) {
          style = { ...style, textAlign: 'left' };
          return (
            <div style={style}>
              {start}
            </div>
          );
        } if (index === labels.length - 1) {
          style = { ...style, textAlign: 'right' };
          return (
            <div style={style}>
              {end}
            </div>
          );
        }
        return (
          <div style={style} />
        );
      })}
    </div>
  );

  return (
    <div className="colorbarContainer box card shadow">
      { renderColorBarTitle() }
      { renderColorBar() }
      { renderColorBarLabel() }
    </div>
  );
};

export {
  getColorBar,
};
