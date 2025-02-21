import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap"; // Importando componentes do Bootstrap

// Atualize para aceitar uma lista de itens no carrinho e calcular o total corretamente.
const TotalCost = ({ totalCosts, items }) => {
  // Calculando o total geral com base nos itens do carrinho.
  const total_amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-4">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h3>Total Cost</h3>
          </Card.Title>
          
          {/* Substituindo o Card.Text por uma div */}
          <div className="text-center mb-4">
            <h2 className="price">
              ${total_amount.toFixed(2)} {/* Exibe o valor total formatado */}
            </h2>
          </div>

          <ListGroup variant="flush">
            {/* Exibindo os itens no carrinho */}
            {items.length > 0 ? (
              items.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5> {/* Nome da planta */}
                    <p className="mb-1">Category: {item.category}</p> {/* Exibindo o tipo da planta */}
                    <p className="mb-0">
                      {item.quantity} x ${item.price.toFixed(2)} {/* Quantidade e preço unitário */}
                    </p>
                  </div>
                  <span>Total: ${(item.quantity * item.price).toFixed(2)}</span> {/* Cálculo do total para o item */}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center">No items in cart</p>
            )}
          </ListGroup>

          {/* Botão para voltar ou fechar o carrinho */}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => alert("Proceed to checkout!")}>
              Checkout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TotalCost;
