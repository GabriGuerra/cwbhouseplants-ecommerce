import React from "react";
import { Container, Button, Card, ListGroup, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./plantsSlice";
import NavigationBar from "./Navbar";
import './ParadiseNursery.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ParadiseNursery = () => {
  const plants = useSelector((state) => state.plants); 
  const dispatch = useDispatch();

  const cartCount = Object.keys(plants).reduce((total, category) => {
    return total + plants[category].reduce((catTotal, plant) => catTotal + plant.quantity, 0);
  }, 0);

  const calculateTotalCost = (category) => {
    return plants[category].reduce((totalCost, plant) => {
      return totalCost + plant.price * plant.quantity;
    }, 0);
  };

  // Funções para manipular o carrinho
  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category }));
  };

  const handleRemoveFromCart = (plant, category) => {
    dispatch(removeFromCart({ id: plant.id, category }));
  };

  const handleRemoveFromCartCompletely = (plant, category) => {
    while (plant.quantity > 0) {
      dispatch(removeFromCart({ id: plant.id, category }));
      plant.quantity -= 1; // Atualiza localmente para evitar loop infinito
    }
  };
  

  const updateQuantity = (id, newQuantity) => {
    Object.keys(plants).forEach((category) => {
      plants[category].forEach((plant) => {
        if (plant.id === id) {
          if (newQuantity > 0) {
            dispatch(addToCart({ id: plant.id, category }));
          } else {
            dispatch(removeFromCart({ id: plant.id, category }));
          }
        }
      });
    });
  };

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

  const items = getItemsFromTotalCost();
  const totalCosts = {
    indoor: calculateTotalCost("indoor"),
    outdoor: calculateTotalCost("outdoor"),
    exotic: calculateTotalCost("exotic"),
  };

  const handleCartClick = () => {
    const totalCostSection = document.getElementById("totalcost");
    if (totalCostSection) {
      totalCostSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSmoothScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lógica do carrinho dentro do ParadiseNursery.jsx
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
    <>
      <NavigationBar cartCount={cartCount} handleCartClick={handleCartClick} handleSmoothScroll={handleSmoothScroll} /> 
      <Container className="my-4">
        {/* Categorias de plantas */}
        {["indoor", "outdoor", "exotic"].map((category) => (
          <div key={category} id={category} className="plant-category">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Plants</h2>
            <div className="plants-list row">
              {plants[category].map((plant) => (
                <div className="plant-card col-md-4 mb-4" key={plant.id}>
                  <div className="card">
                    <img src={plant.image} alt={plant.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{plant.name}</h5>
                      <p className="card-text">${plant.price}</p>
                      <div className="d-flex justify-content-between">
                        <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, category)}>-</Button>
                        <span>{plant.quantity}</span>
                        <Button className="btn-add" onClick={() => handleAddToCart(plant, category)}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>Total Cost: ${totalCosts[category]}</div>
          </div>
        ))}

        {/* Carrinho de Compras */}
        <div id="totalcost" className="cart-details">
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
                          onClick={() => handleRemoveFromCart(item, item.category)}
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
      </Container>
    </>
  );
};

export default ParadiseNursery;
