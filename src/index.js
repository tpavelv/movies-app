import React from 'react';
import ReactDOM from 'react-dom/client';
import { Online, Offline } from 'react-detect-offline';
import Alert from 'antd/es/alert/Alert';

import './index.css';
import App from './components/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <div className="offline">
        <Alert type="error" message={'ОТСУТСТВУЕТ ПОДКЛЮЧЕНИЕ К СЕТИ'} />
      </div>
    </Offline>
  </>

  //   { content }
);
