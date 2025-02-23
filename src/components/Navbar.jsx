import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../assets/css/Navbar.css';

const NavigationBar = ({ cartCount, handleCartClick, handleSmoothScroll, isNavbarVisible }) => {
  const [animateCart, setAnimateCart] = useState(false);

  // Animar o ícone do carrinho quando houver uma atualização
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500); // Tempo da animação (500ms)
      return () => clearTimeout(timer); // Limpar o timer quando o componente for desmontado
    }
  }, [cartCount]);

  // Função de rolagem suave para as seções
  const handleSmoothScrollClick = (e, target) => {
    e.preventDefault(); // Impede o comportamento padrão do link
    handleSmoothScroll(target); // Chama a função para rolar até a seção
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className={`custom-navbar fixed-top ${isNavbarVisible ? "" : "d-none"}`}>
      <Container>
        <div className="navbar-brand-container">
          <i className="bi bi-tree"></i>
          <Navbar.Brand href="/">CWB HousePlants</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {/* Links de navegação com rolagem suave */}
            <Nav.Link href="#indoor" onClick={(e) => handleSmoothScrollClick(e, "indoor")}>
              Indoor Plants
            </Nav.Link>
            <Nav.Link href="#outdoor" onClick={(e) => handleSmoothScrollClick(e, "outdoor")}>
              Outdoor Plants
            </Nav.Link>
            <Nav.Link href="#exotic" onClick={(e) => handleSmoothScrollClick(e, "exotic")}>
              Exotic Plants
            </Nav.Link>
          </Nav>

          {/* Ícone do carrinho com animação */}
          <div
            onClick={handleCartClick}
            className={`cart-icon ${animateCart ? "animate" : ""}`}
            id="cart-icon"
          >
            <i className="bi bi-cart"></i>
            <span className="cart-count">{cartCount}</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
