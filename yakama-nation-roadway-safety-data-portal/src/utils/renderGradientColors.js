const val1RGB = [1, 223, 1]; // #01df01
const val2RGB = [138, 8, 8]; // #8a0808

const pad = (n, width, z) => {
  const m = z || '0';
  return n.length >= width ? n : new Array(width - n.length + 1).join(m) + n;
};

const generateGradientColors = (stepsInt) => {
  const colors = [];
  const stepsPerc = 100 / (stepsInt + 1);

  // diffs between two values
  const valClampRGB = [
    val2RGB[0] - val1RGB[0],
    val2RGB[1] - val1RGB[1],
    val2RGB[2] - val1RGB[2],
  ];

  // build the color array out with color steps
  for (let i = 0; i < stepsInt; i++) {
    const clampedR = (valClampRGB[0] > 0)
      ? pad((Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[0] + (valClampRGB[0]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);

    const clampedG = (valClampRGB[1] > 0)
      ? pad((Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[1] + (valClampRGB[1]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);

    const clampedB = (valClampRGB[2] > 0)
      ? pad((Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
      : pad((Math.round((val1RGB[2] + (valClampRGB[2]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);
    colors[i] = [
      '#',
      clampedR,
      clampedG,
      clampedB,
    ].join('');
  }

  return colors;
};

export { generateGradientColors };
