import React from 'react';
import Lottie from 'react-lottie';
import * as loadingAnimation from '../../assets/images/loading_2.json';
import * as doneAnimation from '../../assets/images/done_2.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = (props) => {
  const { loading } = props;
  if (!loading) {
    return (
      <div className="loading-animation">
        <Lottie options={defaultOptions2} height={200} width={200} />
      </div>
    );
  }
  return (
    <div className="loading-animation">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loading;
