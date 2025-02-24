import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/plantsSlice";
import NavigationBar from "./Navbar";
import TotalCost from "./TotalCost";
import "../assets/css/ParadiseNursery.css";

const ParadiseNursery = () => {
  const plants = useSelector((state) => state.plants);
  const dispatch = useDispatch();

  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const indoorRef = useRef(null);
  const outdoorRef = useRef(null);
  const exoticRef = useRef(null);

  const updateCartCount = () => {
    const totalItems = Object.keys(plants).reduce((total, category) => {
      return (
        total +
        (Array.isArray(plants[category])
          ? plants[category].reduce((catTotal, plant) => catTotal + plant.quantity, 0)
          : 0)
      );
    }, 0);
    setCartItemCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();
  }, [plants]);

  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category }));
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  const handleRemoveFromCart = (plant, category) => {
    dispatch(removeFromCart({ id: plant.id, category }));
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  const handleSmoothScroll = (target) => {
    if (target === "indoor" && indoorRef.current) {
      indoorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target === "outdoor" && outdoorRef.current) {
      outdoorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target === "exotic" && exoticRef.current) {
      exoticRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const isPlantInCart = (plant, category) => {
    return plants[category]?.some((item) => item.id === plant.id && item.quantity > 0);
  };

  return (
    <>
      <NavigationBar
        cartCount={cartItemCount}
        handleCartClick={handleToggleCartVisibility}
        handleSmoothScroll={handleSmoothScroll}
        isNavbarVisible={!isCartVisible} // Esconde a navbar na página de carrinho
        isTotalCostPage={isCartVisible} // Passa se a página é a de carrinho para ocultar a navegação
      />
      <Container className="my-4">
        {isCartVisible ? (
          <TotalCost
            items={Object.values(plants).flat()}
            totalAmount={Object.values(plants)
              .flat()
              .reduce((total, item) => total + item.price * item.quantity, 0)}
            handleContinueShopping={() => setIsCartVisible(false)} // Retorna para a loja de plantas
          />
        ) : (
          <>
            {["Indoor", "Outdoor", "Exotic"].map((category) => (
              <div
                key={category}
                id={category}
                className="plant-category"
                ref={
                  category === "Indoor"
                    ? indoorRef
                    : category === "Outdoor"
                    ? outdoorRef
                    : exoticRef
                }
              >
                <h2 className="text-center">{category} Plants</h2>
                <div className="row">
                  {Array.isArray(plants[category]) &&
                    plants[category].map((plant) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={plant.id}>
                        <Card
                          className={`plant-card ${
                            hoveredCard === plant.id
                              ? hoveredButton === "remove"
                                ? "remove-hovered"
                                : hoveredButton === "add"
                                ? "add-hovered"
                                : ""
                              : ""
                          }`}
                          onMouseEnter={() => setHoveredCard(plant.id)}
                          onMouseLeave={() => {
                            setHoveredCard(null);
                            setHoveredButton(null);
                          }}
                        >
                          <Card.Img variant="top" src={plant.image} alt={plant.name} />
                          <Card.Body>
                            <Card.Title>{plant.name}</Card.Title>
                            <Card.Text>
                              <strong>${plant.price}</strong>
                            </Card.Text>
                            <div className="button-container">
                              <Button
                                className="btn-remove"
                                onMouseEnter={() => setHoveredButton("remove")}
                                onMouseLeave={() => setHoveredButton(null)}
                                onClick={() => handleRemoveFromCart(plant, category)}
                                disabled={!isPlantInCart(plant, category)}
                              >
                                Remove
                              </Button>
                              <Button
                                className="btn-add"
                                onMouseEnter={() => setHoveredButton("add")}
                                onMouseLeave={() => setHoveredButton(null)}
                                onClick={() => handleAddToCart(plant, category)}
                                disabled={isPlantInCart(plant, category)}
                              >
                                {isPlantInCart(plant, category) ? "In Cart" : "Buy"}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default ParadiseNursery;
