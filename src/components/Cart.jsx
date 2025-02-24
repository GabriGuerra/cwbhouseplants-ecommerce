import React from "react";
import { Card, Button, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, removeItemCompletely, addToCart } from "../redux/plantsSlice";
import TotalCost from "./TotalCost"; 
const Cart = ({ handleContinueShopping, handleCheckout }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.plants.cart);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ id: item.id, category: item.category }));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleRemoveFromCartCompletely = (item) => {
    dispatch(removeItemCompletely({ id: item.id }));
  };

  return (
    <Card className="shadow-lg p-3 mb-5 rounded total-cost-card">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h3 style={{ color: "#2e7d32" }}>Shopping Cart</h3>
          <h5 className="total-items">Total Items: {cart.length}</h5>
        </Card.Title>

        {/* Componente TotalCost exibindo o total do carrinho */}
        <TotalCost cart={cart} />

        <ListGroup variant="flush">
          {cart.length > 0 ? (
            cart.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center item-row">
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
                  <Button variant="outline-secondary" size="sm" onClick={() => handleRemoveFromCart(item)}>-</Button>
                  <span className="mx-2 item-quantity">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleAddToCart(item)}>+</Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFromCartCompletely(item)}>Remove</Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center empty-cart">No items in cart</p>
          )}
        </ListGroup>

        <div className="text-center mt-4 button-group">
          <Button variant="secondary" onClick={handleContinueShopping}>Continue Shopping</Button>
          <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cart;
