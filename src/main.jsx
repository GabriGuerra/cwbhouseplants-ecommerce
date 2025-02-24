import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App.jsx'; // Certifique-se de que o caminho para o App está correto
import './assets/css/App.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Usando JSX diretamente em vez de React.createElement
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
