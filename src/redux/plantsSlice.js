import { createSlice } from "@reduxjs/toolkit"; // Importing the createSlice function from Redux Toolkit (em Português: Importando a função createSlice do Redux Toolkit)

const initialState = {
  // Initial state for different plant categories (em Português: Estado inicial para diferentes categorias de plantas)
  Indoor: [
    { id: 1, name: "Fern", price: 39.99, image: "./src/assets/images/fern.jpg", quantity: 0, category: "Indoor" },
    { id: 2, name: "Snake Plant", price: 29.99, image: "./src/assets/images/snake-plant.jpg", quantity: 0, category: "Indoor" },
    { id: 3, name: "Peace Lily", price: 34.99, image: "./src/assets/images/peace-lily.jpg", quantity: 0, category: "Indoor" },
    { id: 4, name: "Pothos", price: 24.99, image: "./src/assets/images/pothos.jpg", quantity: 0, category: "Indoor" },
    { id: 5, name: "Spider Plant", price: 19.99, image: "./src/assets/images/spider-plant.jpg", quantity: 0, category: "Indoor" },
    { id: 6, name: "ZZ Plant", price: 44.99, image: "./src/assets/images/zz-plant.jpg", quantity: 0, category: "Indoor" },
  ],
  Outdoor: [
    { id: 7, name: "Desert Rose", price: 59.99, image: "./src/assets/images/desert-rose.jpg", quantity: 0, category: "Outdoor" },
    { id: 8, name: "Bougainvillea", price: 89.99, image: "./src/assets/images/bougainvillea.jpg", quantity: 0, category: "Outdoor" },
    { id: 9, name: "Lavender", price: 39.99, image: "./src/assets/images/lavender.jpg", quantity: 0, category: "Outdoor" },
    { id: 10, name: "Rosemary", price: 25.99, image: "./src/assets/images/rosemary.jpg", quantity: 0, category: "Outdoor" },
    { id: 11, name: "Sunflower", price: 15.99, image: "./src/assets/images/sunflower.jpg", quantity: 0, category: "Outdoor" },
    { id: 12, name: "Hibiscus", price: 49.99, image: "./src/assets/images/hibiscus.jpg", quantity: 0, category: "Outdoor" },
  ],
  Exotic: [
    { id: 13, name: "Orchid", price: 129.99, image: "./src/assets/images/orchid.jpg", quantity: 0, category: "Exotic" },
    { id: 14, name: "Venus Flytrap", price: 79.99, image: "./src/assets/images/venus-flytrap.jpg", quantity: 0, category: "Exotic" },
    { id: 15, name: "Bonsai Tree", price: 199.99, image: "./src/assets/images/bonsai-tree.jpg", quantity: 0, category: "Exotic" },
    { id: 16, name: "Cactus", price: 299.99, image: "./src/assets/images/cactus.jpg", quantity: 0, category: "Exotic" },
    { id: 17, name: "Pitcher Plant", price: 99.99, image: "./src/assets/images/pitcher-plant.jpg", quantity: 0, category: "Exotic" },
    { id: 18, name: "Lithops (Living Stones)", price: 34.99, image: "./src/assets/images/lithops.jpg", quantity: 0, category: "Exotic" },
  ],
};

const plantsSlice = createSlice({
  name: "plants", // The name of the slice (em Português: Nome da slice)
  initialState, // The initial state for this slice (em Português: O estado inicial para essa slice)
  reducers: {
    // Reducers to handle actions (em Português: Redutores para manipular ações)
    addToCart: (state, action) => {
      const { category, id } = action.payload; // Destructuring to get category and plant id from the action payload (em Português: Desestruturando para obter a categoria e o ID da planta do payload da ação)
      const plant = state[category].find((p) => p.id === id); // Finding the plant in the specific category (em Português: Encontrando a planta na categoria específica)
      if (plant) {
        plant.quantity += 1; // Increment the quantity of the plant in the cart (em Português: Incrementando a quantidade da planta no carrinho)
      }
    },
    removeFromCart: (state, action) => {
      const { category, id } = action.payload; // Destructuring to get category and plant id from the action payload (em Português: Desestruturando para obter a categoria e o ID da planta do payload da ação)
      const plant = state[category].find((p) => p.id === id); // Finding the plant in the specific category (em Português: Encontrando a planta na categoria específica)
      if (plant && plant.quantity > 0) {
        plant.quantity -= 1; // Decrement the quantity of the plant in the cart (em Português: Decrementando a quantidade da planta no carrinho)
      }
    },
  },
});

export const { addToCart, removeFromCart } = plantsSlice.actions; // Exporting the actions from the slice (em Português: Exportando as ações da slice)
export default plantsSlice.reducer; // Exporting the reducer (em Português: Exportando o redutor)
