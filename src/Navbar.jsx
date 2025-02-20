// Navbar.jsx

import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';



const NavigationBar = ({ cartCount, toggleShowItems }) => {
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
            <Nav.Link href="#indoor" onClick={toggleShowItems}>
              Indoor Plants
            </Nav.Link>
            <Nav.Link href="#outdoor" onClick={toggleShowItems}>
              Outdoor Plants
            </Nav.Link>
            <Nav.Link href="#exotic" onClick={toggleShowItems}>
              Exotic Plants
            </Nav.Link>
          </Nav>

          {/* Ícone do carrinho estilizado */}
          <div onClick={toggleShowItems} className="cart-icon-container">
            <i className="bi bi-cart"></i>
            <span className="cart-count">({cartCount})</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

