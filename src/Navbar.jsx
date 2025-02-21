import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const NavigationBar = ({ cartCount, handleCartClick, handleSmoothScroll }) => {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        {/* Ícone e nome da empresa estilizados */}
        <div className="navbar-brand-container">
          <i className="bi bi-tree"></i>
          <Navbar.Brand href="/">CWB HousePlants</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Centraliza os links */}
          <Nav className="mx-auto">
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

          {/* Ícone do carrinho estilizado */}
          <div onClick={handleCartClick} className="cart-icon-container">
            <i className="bi bi-cart"></i>
            <span className="cart-count">({cartCount})</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
