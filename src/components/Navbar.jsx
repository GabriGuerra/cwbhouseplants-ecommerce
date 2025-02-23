import React from "react"; // Importing React to create a functional component (em Português: Importando o React para criar um componente funcional)
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importing necessary components from React Bootstrap (em Português: Importando os componentes necessários do React Bootstrap)
import '../assets/css/Navbar.css'; // Importing custom CSS for styling (em Português: Importando o CSS personalizado para o estilo)

const NavigationBar = ({ cartCount, handleCartClick, handleSmoothScroll }) => { // Defining the NavigationBar component with props (em Português: Definindo o componente NavigationBar com as propriedades)
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="custom-navbar"> 
      {/* Navbar component from React Bootstrap with a custom background color (em Português: Componente Navbar do React Bootstrap com uma cor de fundo personalizada) */}
      <Container> {/* Container to wrap the navbar content (em Português: Container para envolver o conteúdo da navbar) */}
       
        <div className="navbar-brand-container">
          {/* A custom div that contains the logo icon and the brand name */}
          <i className="bi bi-tree"></i> {/* Bootstrap Icons for a tree icon */}
          <Navbar.Brand href="/">CWB HousePlants</Navbar.Brand> {/* The brand name of the website as a clickable link */}
        </div>

        <Navbar.Toggle aria-controls="navbar-nav" /> {/* Navbar toggle button for mobile view */}
        <Navbar.Collapse id="navbar-nav"> {/* Collapsible part of the navbar for responsive design */}
         
          <Nav className="mx-auto"> {/* Nav component with horizontal spacing */}
            {/* Links for different plant categories with smooth scrolling */}
            <Nav.Link href="#" onClick={() => handleSmoothScroll("indoor")}>
              Indoor Plants
            </Nav.Link>
            <Nav.Link href="#" onClick={() => handleSmoothScroll("outdoor")}>
              Outdoor Plants
            </Nav.Link>
            <Nav.Link href="#" onClick={() => handleSmoothScroll("exotic")}>
              Exotic Plants
            </Nav.Link>
          </Nav>

          {/* Custom cart icon with cart count */}
          <div onClick={handleCartClick} className="cart-icon-container"> 
            <i className="bi bi-cart"></i> {/* Cart icon */}
            <span className="cart-count">({cartCount})</span> {/* Displaying the cart count */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; // Exporting the NavigationBar component (em Português: Exportando o componente NavigationBar)
