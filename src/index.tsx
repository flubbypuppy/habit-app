import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


