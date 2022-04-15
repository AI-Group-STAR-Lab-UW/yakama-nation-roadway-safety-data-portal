import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './config/configureStore';

const rootElement = document.getElementById('root');

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement,
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    const NextApp = require('./components/Main').default;
    renderApp(NextApp);
  });
}
