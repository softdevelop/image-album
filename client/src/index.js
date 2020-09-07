import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
// import reducer from "./reducers/index"
import store from "./redux/store"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
// const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
