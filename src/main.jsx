import React from 'react'; // Importing React library to create a React component (em Português: Importando a biblioteca React para criar um componente React)
import ReactDOM from 'react-dom/client'; // Importing ReactDOM to interact with the DOM (em Português: Importando ReactDOM para interagir com o DOM)
import App from './views/App.jsx'; // Importing the main App component (em Português: Importando o componente principal App)
import './assets/css/App.css'; // Importing the App's CSS for styling (em Português: Importando o CSS do App para o estilo)

import { Provider } from 'react-redux'; // Importing the Provider component from React Redux (em Português: Importando o componente Provider do React Redux)
import store from './redux/store.js'; // Importing the Redux store from the store.js file (em Português: Importando o store do Redux do arquivo store.js)

ReactDOM.createRoot(document.getElementById('root')).render( 
  // This creates the root of the React application and renders the app to the root element in the HTML (em Português: Cria a raiz da aplicação React e renderiza o app no elemento root do HTML)
  <React.StrictMode> 
    {/* React.StrictMode is a wrapper that helps with identifying potential problems in the application during development (em Português: React.StrictMode é um wrapper que ajuda a identificar problemas potenciais na aplicação durante o desenvolvimento) */}
    <Provider store={store}> 
      {/* The Provider component makes the Redux store available to all components in the app (em Português: O componente Provider torna o store do Redux disponível para todos os componentes na aplicação) */}
      <App /> {/* Rendering the App component inside the Provider (em Português: Renderizando o componente App dentro do Provider) */}
    </Provider>
  </React.StrictMode>,
);
