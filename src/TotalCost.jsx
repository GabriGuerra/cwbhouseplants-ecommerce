import React from "react";
import { Card, ListGroup, Button, Image } from "react-bootstrap";
import "./TotalCost.css"; // Importando arquivo CSS externo

const TotalCost = ({ items, updateQuantity, removeItem, handleSmoothScroll }) => {
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleContinueShopping = () => {
    handleSmoothScroll("indoor");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Proceeding to checkout...");
      // Aqui pode ser adicionado redirecionamento para a página de pagamento
    }
  };

  return (
    <div className="container my-4">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded total-cost-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h3>Shopping Cart</h3>
            <h5 className="total-items">Total Items: {totalItems}</h5>
          </Card.Title>

          <div className="text-center mb-4 total-amount">
            <h2>${totalAmount.toFixed(2)}</h2>
          </div>

          <ListGroup variant="flush">
            {items.length > 0 ? (
              items.map((item) => (
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
                    {/* Botão de diminuir a quantidade */}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => 
                         removeItem(item.id) // Remover o item
                      }
                    >
                      -
                    </Button>
                    <span className="mx-2 item-quantity">{item.quantity}</span>
                    {/* Botão de aumentar a quantidade */}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    {/* Botão de remover item */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ml-3 remove-button"
                      onClick={() => removeItem(item.id)}
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
    </div>
  );
};

export default TotalCost;
