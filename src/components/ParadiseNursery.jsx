import React from "react"; // Importing the React library
import Swal from 'sweetalert2'; // Importing SweetAlert2 for beautiful alerts
import { Container, Button, Card, ListGroup, Image } from "react-bootstrap"; // Importing React-Bootstrap components
import { useSelector, useDispatch } from "react-redux"; // Redux hooks to access state and dispatch actions
import { addToCart, removeFromCart } from "../redux/plantsSlice"; // Redux functions to add/remove items from the cart
import NavigationBar from "./Navbar"; // Importing the navigation bar component
import '../assets/css/ParadiseNursery.css'; // Updated path
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

const ParadiseNursery = () => {
  // Obtaining plants from the Redux state (in Portuguese: Obtém as plantas do estado do Redux)
  const plants = useSelector((state) => state.plants); 
  const dispatch = useDispatch(); // Function to dispatch actions

  // Calculating the total number of items in the cart (em Português: Calcula o total de itens no carrinho)
  const cartCount = Object.keys(plants).reduce((total, category) => {
    return total + plants[category].reduce((catTotal, plant) => catTotal + plant.quantity, 0);
  }, 0);

  // Function to calculate the total cost for each plant category (em Português: Função para calcular o custo total de cada categoria de plantas)
  const calculateTotalCost = (category) => {
    return plants[category].reduce((totalCost, plant) => {
      return totalCost + plant.price * plant.quantity; // Sum up total price based on quantity
    }, 0);
  };

  // Functions to add/remove plants from the cart (em Português: Funções para adicionar/remover plantas do carrinho)
  const handleAddToCart = (plant, category) => {
    dispatch(addToCart({ id: plant.id, category })); // Adds plant to the cart
  };

  const handleRemoveFromCart = (plant, category) => {
    dispatch(removeFromCart({ id: plant.id, category })); // Removes one plant unit from the cart
  };

  const handleRemoveFromCartCompletely = (plant, category) => {
    // Completely removes the item from the cart
    while (plant.quantity > 0) {
      dispatch(removeFromCart({ id: plant.id, category }));
      plant.quantity -= 1; // Updates locally to avoid infinite loop (em Português: Atualiza localmente para evitar loop infinito)
    }
  };

  // Function to update the quantity of an item (em Português: Função para atualizar a quantidade de um item)
  const updateQuantity = (id, newQuantity) => {
    Object.keys(plants).forEach((category) => {
      plants[category].forEach((plant) => {
        if (plant.id === id) {
          if (newQuantity > 0) {
            dispatch(addToCart({ id: plant.id, category })); // Add to cart if quantity > 0
          } else {
            dispatch(removeFromCart({ id: plant.id, category })); // Remove from cart if quantity is 0
          }
        }
      });
    });
  };

  // Function to get all items in the cart with a quantity greater than 0 (em Português: Função para obter todos os itens do carrinho com quantidade maior que 0)
  const getItemsFromTotalCost = () => {
    const items = [];
    Object.keys(plants).forEach((category) => {
      plants[category].forEach((plant) => {
        if (plant.quantity > 0) {
          items.push({ ...plant, category }); // Adds the plant to the list
        }
      });
    });
    return items;
  };

  // Getting the items in the cart (em Português: Obtém os itens do carrinho)
  const items = getItemsFromTotalCost();

  // Calculating the total cost for each category (em Português: Cálculos do custo total por categoria)
  const totalCosts = {
    indoor: calculateTotalCost("Indoor"),
    outdoor: calculateTotalCost("Outdoor"),
    exotic: calculateTotalCost("Exotic"),
  };

  // Cart section smooth scroll function (em Português: Função de rolagem suave para a seção do carrinho)
  const handleCartClick = () => {
    const totalCostSection = document.getElementById("totalcost");
    if (totalCostSection) {
      totalCostSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the cart section
    }
  };

  // Smooth scroll to any section by ID (em Português: Rolagem suave para qualquer seção pelo ID)
  const handleSmoothScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculating total amount and total number of items (em Português: Cálculo do valor total e número total de itens)
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0); // Total amount in cart
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0); // Total quantity of items

  // Continue shopping function (em Português: Função para continuar comprando)
  const handleContinueShopping = () => {
    handleSmoothScroll("Indoor"); // Scrolls to the "Indoor" section
  };

  // Checkout function (em Português: Função para lidar com o checkout)
  const handleCheckout = () => {
    if (items.length === 0) {
      // Alert if cart is empty (em Português: Alerta se o carrinho estiver vazio)
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
      // Success alert after purchase (em Português: Alerta de sucesso após a compra)
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
    <>
      {/* Navigation with cart count and smooth scroll function (em Português: Navegação com contagem do carrinho e função de rolagem suave) */}
      <NavigationBar cartCount={cartCount} handleCartClick={handleCartClick} handleSmoothScroll={handleSmoothScroll} /> 
      
      <Container className="my-4">
        {/* Displaying the plant categories (em Português: Exibindo as categorias de plantas) */}
        {["Indoor", "Outdoor", "Exotic"].map((category) => (
          <div key={category} id={category} className="plant-category">
            {/* Category title with styling (em Português: Título da categoria com estilo) */}
            <h2 className="text-center my-4 py-2 position-relative text-success fw-semibold fancy-title">
              <div className="mx-auto w-25 border-top border-success opacity-75 title-line"></div>
              <span className="d-inline-block px-3">{category.charAt(0).toUpperCase() + category.slice(1)} Plants</span>
              <div className="mx-auto w-25 border-bottom border-success opacity-75 title-line"></div>
            </h2>

            {/* List of plants in the category (em Português: Lista de plantas na categoria) */}
            <div className="plants-list row">
              {plants[category].map((plant) => (
                <div className="plant-card col-md-4 mb-4" key={plant.id}>
                  <div className="card">
                    <img src={plant.image} alt={plant.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{plant.name}</h5>
                      <p className="card-text">${plant.price}</p>
                      <div className="d-flex justify-content-between">
                        {/* Buttons to add or remove plants from the cart (em Português: Botões para adicionar ou remover plantas do carrinho) */}
                        <Button className="btn-remove" onClick={() => handleRemoveFromCart(plant, category)}>-</Button>
                        <span>{plant.quantity}</span>
                        <Button className="btn-add" onClick={() => handleAddToCart(plant, category)}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        ))}

        {/* Shopping cart section (em Português: Seção do carrinho de compras) */}
        
        <Card  className="shadow-lg p-3 mb-5 rounded total-cost-card">
            <Card.Body>
              <Card.Title className="text-center mb-4" >
              <h3 style={{ color: "#2e7d32" }}>Shopping Cart</h3>

                <h5 className="total-items">Total Items: {totalItems}</h5>
              </Card.Title>

              <div className="text-center mb-4 total-amount">
                <h2>${totalAmount.toFixed(2)}</h2>
              </div>

              {/* List of items in the cart (em Português: Lista dos itens no carrinho) */}
              <ListGroup variant="flush">
                {items.length > 0 ? (
                  items.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      className="d-flex justify-content-between align-items-center item-row"
                      
                    >
                      <div className="d-flex align-items-center item-details" >
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
                        {/* Buttons to adjust quantity or remove items (em Português: Botões para ajustar a quantidade ou remover itens) */}
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
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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

              {/* Buttons to continue shopping or checkout (em Português: Botões para continuar comprando ou finalizar a compra) */}
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
        
      </Container>
    </>
  );
};

export default ParadiseNursery;
