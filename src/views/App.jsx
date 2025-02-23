import React, { useState } from "react"; // Importing React and useState hook for managing state (em Português: Importando o React e o hook useState para gerenciar o estado)
import "../assets/css/App.css"; // Importing the app's CSS for styling (em Português: Importando o CSS do app para o estilo)
import ParadiseNursery from "../components/ParadiseNursery"; // Importing the ParadiseNursery component, which displays the plant categories (em Português: Importando o componente ParadiseNursery, que exibe as categorias de plantas)
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS for styling (em Português: Importando o CSS do Bootstrap para o estilo)
import AboutUs from "../components/AboutUs"; // Importing the AboutUs component (em Português: Importando o componente AboutUs)

function App() {
  const [showPlants, setShowPlants] = useState(false); // Defining a state to toggle visibility of plant section (em Português: Definindo um estado para alternar a visibilidade da seção de plantas)

  // Function to handle the "Get Started" button click (em Português: Função para lidar com o clique no botão "Get Started")
  const handleGetStarted = () => {
    setShowPlants(true); // Sets the state to true, which makes the plant section visible (em Português: Define o estado como true, o que torna a seção de plantas visível)
  };

  return (
    <>
      <header className="first_page"> {/* Main header section (em Português: Seção principal do cabeçalho) */}
        <div className="main_event"> {/* Main container for the event section (em Português: Contêiner principal da seção do evento) */}
          <div className="first_page_name_btn"> {/* Container for the title and the button (em Português: Contêiner para o título e o botão) */}
            <h1 className="budget_heading">Welcome to CWB Houseplants</h1> {/* Main title (em Português: Título principal) */}
            <p className="budget_sentence">Transform your home with plants!</p> {/* Subtitle (em Português: Subtítulo) */}
            <div className="getstarted_btn"> {/* Button container (em Português: Contêiner do botão) */}
              <button onClick={() => handleGetStarted()} className="get-started-btn">
                Get Started {/* Button text (em Português: Texto do botão) */}
              </button>
            </div>
          </div>
          <div className="aboutus_main"> {/* About Us section (em Português: Seção "Sobre nós") */}
            <AboutUs /> {/* AboutUs component (em Português: Componente AboutUs) */}
          </div>
        </div>
      </header>

      {/* Plant section container */}
      <div className={`event-list-container ${showPlants ? 'visible' : ''}`}>
        {/* If showPlants is true, it will display the ParadiseNursery component (em Português: Se showPlants for true, o componente ParadiseNursery será exibido) */}
        <ParadiseNursery /> {/* ParadiseNursery component that shows the plant categories (em Português: Componente ParadiseNursery que exibe as categorias de plantas) */}
      </div>
    </>
  );
}

export default App; // Exporting the App component (em Português: Exportando o componente App)
