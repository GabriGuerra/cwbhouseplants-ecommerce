import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./plantsSlice";
import NavigationBar from "./Navbar";
import './ParadiseNursery.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ParadiseNursery = () => {
  const plants = useSelector((state) => state.plants); 
  const dispatch = useDispatch();

  // Calculando a quantidade total de itens no carrinho
  const cartCount = Object.keys(plants).reduce((total, category) => {
    return total + plants[category].reduce((catTotal, plant) => catTotal + plant.quantity, 0);
  }, 0);

  // Função para calcular o custo total de cada categoria de plantas
  const calculateTotalCost = (category) => {
    return plants[category].reduce((totalCost, plant) => {
      if (plant.quantity > 0) {
        totalCost += plant.price * plant.quantity;
      }
      return totalCost;
    }, 0);
  };

  // Função para adicionar uma planta ao carrinho
  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category }));
  };

  // Função para remover uma planta do carrinho
  const handleRemoveFromCart = (plant, category) => {
    dispatch(removeFromCart({ id: plant.id, category }));
  };

  // Função para obter todos os itens do carrinho com suas categorias
  const getItemsFromTotalCost = () => {
    const items = [];
    Object.keys(plants).forEach((category) => {
      plants[category].forEach((plant) => {
        if (plant.quantity > 0) {
          items.push({ ...plant, category });
        }
      });
    });
    return items;
  };

  // Obtendo todos os itens do carrinho
  const items = getItemsFromTotalCost();
  const totalCosts = {
    indoor: calculateTotalCost("indoor"),
    outdoor: calculateTotalCost("outdoor"),
    exotic: calculateTotalCost("exotic"),
  };

  // Função para rolar até a seção TotalCost
  const handleCartClick = () => {
    const totalCostSection = document.getElementById("totalcost");
    if (totalCostSection) {
      totalCostSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para rolar até a seção com o id fornecido
  const handleSmoothScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <NavigationBar 
        cartCount={cartCount} 
        handleCartClick={handleCartClick}
        handleSmoothScroll={handleSmoothScroll}
      /> 
      <Container className="my-4">
        {/* Indoor Plants */}
        <div id="indoor" className="plant-category">
          <h2>Indoor Plants</h2>
          <div className="plants-list row">
            {plants.indoor.map((plant) => (
              <div className="plant-card col-md-4 mb-4" key={plant.id}>
                <div className="card">
                  <img src={plant.image} alt={plant.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{plant.name}</h5>
                    <p className="card-text">${plant.price}</p>
                    <div className="d-flex justify-content-between">
                      <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, 'indoor')}>-</Button>
                      <span>{plant.quantity}</span>
                      <Button className="btn-add" onClick={() => handleAddToCart(plant, 'indoor')}>+</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>Total Cost: ${totalCosts.indoor}</div>
        </div>

        {/* Outdoor Plants */}
        <div id="outdoor" className="plant-category">
          <h2>Outdoor Plants</h2>
          <div className="plants-list row">
            {plants.outdoor.map((plant) => (
              <div className="plant-card col-md-4 mb-4" key={plant.id}>
                <div className="card">
                  <img src={plant.image} alt={plant.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{plant.name}</h5>
                    <p className="card-text">${plant.price}</p>
                    <div className="d-flex justify-content-between">
                      <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, 'outdoor')}>-</Button>
                      <span>{plant.quantity}</span>
                      <Button className="btn-add" onClick={() => handleAddToCart(plant, 'outdoor')}>+</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>Total Cost: ${totalCosts.outdoor}</div>
        </div>

        {/* Exotic Plants */}
        <div id="exotic" className="plant-category">
          <h2>Exotic Plants</h2>
          <div className="plants-list row">
            {plants.exotic.map((plant) => (
              <div className="plant-card col-md-4 mb-4" key={plant.id}>
                <div className="card">
                  <img src={plant.image} alt={plant.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{plant.name}</h5>
                    <p className="card-text">${plant.price}</p>
                    <div className="d-flex justify-content-between">
                      <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, 'exotic')}>-</Button>
                      <span>{plant.quantity}</span>
                      <Button className="btn-add" onClick={() => handleAddToCart(plant, 'exotic')}>+</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>Total Cost: ${totalCosts.exotic}</div>
        </div>

        {/* Carrinho de Compras */}
        <div id="totalcost" className="cart-details">
          <TotalCost totalCosts={totalCosts} items={items} />
        </div>
      </Container>
    </>
  );
};

export default ParadiseNursery;
