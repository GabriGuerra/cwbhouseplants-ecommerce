import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../assets/css/Navbar.css';

const NavigationBar = ({ cartCount, handleCartClick, handleSmoothScroll, isNavbarVisible, isTotalCostPage }) => {
  const [animateCart, setAnimateCart] = useState(false);
  const [animateCartCount, setAnimateCartCount] = useState(false); // Estado para animação do contador

  // Animar o ícone do carrinho e o contador quando houver uma atualização
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      setAnimateCartCount(true);
      const timer = setTimeout(() => {
        setAnimateCart(false);
        setAnimateCartCount(false); // Parar animação do contador
      }, 500); // Tempo da animação (500ms)
      return () => clearTimeout(timer); // Limpar o timer quando o componente for desmontado
    }
  }, [cartCount]);

  // Função de rolagem suave para as seções
  const handleSmoothScrollClick = (e, target) => {
    e.preventDefault(); // Impede o comportamento padrão do link
    handleSmoothScroll(target); // Chama a função para rolar até a seção
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="custom-navbar fixed-top">
      <Container>
        <div className="navbar-brand-container">
          <i className="bi bi-tree"></i>
          <Navbar.Brand href="/">CWB HousePlants</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Condicionalmente renderizando links com base na página atual */}
          <Nav className={`mx-auto ${isNavbarVisible && !isTotalCostPage ? "" : "d-none"}`}>
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
          
          {/* Exibindo apenas o link 'Back to Plant Store' na página TotalCost */}
          {isTotalCostPage && (
            <Nav className="ml-auto">
              <Nav.Link href="/" className="text-white">
                
              </Nav.Link>
            </Nav>
          )}

          {/* Ícone do carrinho com animação */}
          <div
            onClick={handleCartClick}
            className={`cart-icon ${animateCart ? "animate" : ""}`}
            id="cart-icon"
          >
            <i className="bi bi-cart"></i>
            {/* Contador de itens com animação */}
            <span className={`cart-count ${animateCartCount ? "animate" : ""}`}>
              {cartCount}
            </span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
