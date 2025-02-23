import React from "react";
import { Card, Button, ListGroup, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItemCompletely } from "../redux/plantsSlice";
import '../assets/css/TotalCost.css';
import Swal from 'sweetalert2'; // Importando SweetAlert2 para alertas bonitos

const TotalCost = ({ items, totalAmount, handleContinueShopping }) => {
  const dispatch = useDispatch();

  // Filtra os itens que possuem quantidade maior que 0
  const filteredItems = items.filter(item => item.quantity > 0);

  // Função para adicionar item ao carrinho
  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category }));
  };

  // Função para remover item do carrinho
  const handleRemoveFromCart = (plant, category) => {
    if (plant.quantity > 0) {
      dispatch(removeFromCart({ id: plant.id, category }));
    }
  };

  // Função para remover completamente o item do carrinho
  const handleRemoveFromCartCompletely = (plant, category) => {
    if (plant.quantity > 0) {
      dispatch(removeItemCompletely({ id: plant.id, category }));
    }
  };

  // Função para lidar com o checkout
  const handleCheckout = () => {
    if (filteredItems.length === 0) {
      // Alerta se o carrinho estiver vazio
      Swal.fire({
        title: 'Oops!',
        text: 'Your cart is empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#fff3cd',
        iconColor: '#f39c12',
      });
    } else {
      // Alerta de sucesso após a compra
      Swal.fire({
        title: 'Thank you for your purchase!',
        text: 'We appreciate your order and will process it shortly.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#d4edda',
        iconColor: '#28a745',
      });
    }
  };

  return (
    <Card className="shadow-lg p-3 mb-5 rounded total-cost-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h3 style={{ color: "#2e7d32" }}>Shopping Cart</h3>
          <h5 className="total-items">
            Total Items: {filteredItems.reduce((total, item) => total + item.quantity, 0)}
          </h5>
        </Card.Title>

        <div className="text-center mb-4 total-amount">
          <h2>${totalAmount.toFixed(2)}</h2>
        </div>

        {/* Lista de itens no carrinho */}
        <ListGroup variant="flush">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center item-row"
              >
                <div className="d-flex align-items-center item-details">
                  <Image src={item.image} alt={item.name} className="item-image" />
                  <div>
                    <h5 className="item-name">{item.name}</h5>
                    <p className="item-category">Category: {item.category}</p>
                    <p className="item-price">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="item-actions">
                  {/* Botões para ajustar a quantidade ou remover itens */}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item, item.category)}
                  >
                    -
                  </Button>
                  <span className="mx-2 item-quantity">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleAddToCart(item, item.category)}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-3 remove-button"
                    onClick={() => handleRemoveFromCartCompletely(item, item.category)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center empty-cart">No items in cart</p>
          )}
        </ListGroup>

        {/* Botões para continuar comprando ou finalizar a compra */}
        <div className="text-center mt-4 button-group">
          <Button variant="secondary" className="mr-3 continue-shopping" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button variant="primary" className="checkout-button" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalCost;
