import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App.jsx'; // Certifique-se de que o caminho para o App está correto
import './assets/css/App.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Criar a raiz do React e renderizar a aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(
    React.StrictMode,
    null, // Não há props para o StrictMode
    React.createElement(
      Provider,
      { store: store },
      React.createElement(App)
    )
  )
);
