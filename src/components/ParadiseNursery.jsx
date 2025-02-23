import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/plantsSlice";
import NavigationBar from "./Navbar";
import TotalCost from "./TotalCost"; // Importando o TotalCost para ser exibido como carrinho
import "../assets/css/ParadiseNursery.css";

const ParadiseNursery = () => {
  const plants = useSelector((state) => state.plants);
  const dispatch = useDispatch();

  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false); // Estado para controle de visibilidade do carrinho
  const [animateCart, setAnimateCart] = useState(false);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Controle de visibilidade da Navbar

  // Refs para as seções de plantas
  const indoorRef = useRef(null);
  const outdoorRef = useRef(null);
  const exoticRef = useRef(null);

  // Função para atualizar o número de itens no carrinho
  const updateCartCount = () => {
    const totalItems = Object.keys(plants).reduce((total, category) => {
      return total + (Array.isArray(plants[category]) ? plants[category].reduce((catTotal, plant) => catTotal + plant.quantity, 0) : 0);
    }, 0);
    setCartItemCount(totalItems);
  };

  // Função para animação do botão do carrinho
  const handleCartButtonAnimation = () => {
    setAnimateCart(true);
    setTimeout(() => {
      setAnimateCart(false);
    }, 300); // Tempo da animação
  };

  // Função para alternar a visibilidade da Navbar
  const handleToggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    updateCartCount();
  }, [plants]);

  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category }));
    handleCartButtonAnimation();
  };

  const handleRemoveFromCart = (plant, category) => {
    dispatch(removeFromCart({ id: plant.id, category }));
    handleCartButtonAnimation();
  };

  // Função de rolagem suave
  const handleSmoothScroll = (target) => {
    if (target === "indoor" && indoorRef.current) {
      indoorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target === "outdoor" && outdoorRef.current) {
      outdoorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target === "exotic" && exoticRef.current) {
      exoticRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para alternar a visibilidade do carrinho
  const handleToggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
    handleToggleNavbar(); // Alterna a visibilidade da navbar ao alternar o carrinho
  };

  // Função para continuar comprando (esconde o carrinho e volta para as plantas)
  const handleContinueShopping = () => {
    setIsCartVisible(false);
    setIsNavbarVisible(true); // Exibe a Navbar novamente ao continuar comprando
  };

  return (
    <>
      {/* Passa o estado da Navbar como prop para o NavigationBar */}
      <NavigationBar
        isNavbarVisible={isNavbarVisible} // Passa o estado para controlar a visibilidade da Navbar
        cartCount={cartItemCount}
        handleCartClick={handleToggleCartVisibility} // Passa a função de alternância para a Navbar
        handleSmoothScroll={handleSmoothScroll}
      />
      <Container className="my-4">
        {isCartVisible ? ( // Exibe o carrinho de compras se isCartVisible for true
          <TotalCost
            items={Object.values(plants).flat()} // Passa todos os itens do carrinho
            totalAmount={Object.values(plants).flat().reduce((total, item) => total + item.price * item.quantity, 0)} // Calculando o total
            handleContinueShopping={handleContinueShopping} // Função para voltar para as plantas
            handleCheckout={() => console.log("Proceeding to checkout...")} // Lógica de checkout
          />
        ) : ( // Exibe as plantas se isCartVisible for false
          <>
            {["Indoor", "Outdoor", "Exotic"].map((category) => (
              <div
                key={category}
                id={category}
                className="plant-category"
                ref={category === "Indoor" ? indoorRef : category === "Outdoor" ? outdoorRef : exoticRef}
              >
                <h2 className="text-center">{category} Plants</h2>
                <div className="row">
                  {Array.isArray(plants[category]) && plants[category].map((plant) => (
                    <div className="col-md-4 mb-4" key={plant.id}>
                      <Card className="plant-card">
                        <Card.Img variant="top" src={plant.image} alt={plant.name} className="card-img-top" />
                        <Card.Body>
                          <Card.Title>{plant.name}</Card.Title>
                          <Card.Text>${plant.price.toFixed(2)}</Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, category)}>-</Button>
                            <span>{plant.quantity}</span>
                            <Button className="btn-add" onClick={() => handleAddToCart(plant, category)}>+</Button>
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
