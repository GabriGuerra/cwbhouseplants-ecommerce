import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indoor: [
    { id: 1, name: "Fern", price: 39.99, image: "./src/assets/images/fern.jpg", quantity: 0, category: "Indoor" },
    { id: 2, name: "Snake Plant", price: 29.99, image: "./src/assets/images/snake-plant.jpg", quantity: 0, category: "Indoor" },
    { id: 3, name: "Peace Lily", price: 34.99, image: "./src/assets/images/peace-lily.jpg", quantity: 0, category: "Indoor" },
    { id: 4, name: "Pothos", price: 24.99, image: "./src/assets/images/pothos.jpg", quantity: 0, category: "Indoor" },
    { id: 5, name: "Spider Plant", price: 19.99, image: "./src/assets/images/spider-plant.jpg", quantity: 0, category: "Indoor" },
    { id: 6, name: "ZZ Plant", price: 44.99, image: "./src/assets/images/zz-plant.jpg", quantity: 0, category: "Indoor" },
  ],
  outdoor: [
    { id: 7, name: "Desert Rose", price: 59.99, image: "/images/desert-rose.jpg", quantity: 0, category: "Outdoor" },
    { id: 8, name: "Bougainvillea", price: 89.99, image: "/images/bougainvillea.jpg", quantity: 0, category: "Outdoor" },
    { id: 9, name: "Lavender", price: 39.99, image: "/images/lavender.jpg", quantity: 0, category: "Outdoor" },
    { id: 10, name: "Rosemary", price: 25.99, image: "/images/rosemary.jpg", quantity: 0, category: "Outdoor" },
    { id: 11, name: "Sunflower", price: 15.99, image: "/images/sunflower.jpg", quantity: 0, category: "Outdoor" },
    { id: 12, name: "Hibiscus", price: 49.99, image: "/images/hibiscus.jpg", quantity: 0, category: "Outdoor" },
  ],
  exotic: [
    { id: 13, name: "Black Orchid", price: 129.99, image: "/images/black-orchid.jpg", quantity: 0, category: "Exotic" },
    { id: 14, name: "Venus Flytrap", price: 79.99, image: "/images/venus-flytrap.jpg", quantity: 0, category: "Exotic" },
    { id: 15, name: "Bonsai Tree", price: 199.99, image: "/images/bonsai.jpg", quantity: 0, category: "Exotic" },
    { id: 16, name: "Corpse Flower", price: 299.99, image: "/images/corpse-flower.jpg", quantity: 0, category: "Exotic" },
    { id: 17, name: "Pitcher Plant", price: 99.99, image: "/images/pitcher-plant.jpg", quantity: 0, category: "Exotic" },
    { id: 18, name: "Lithops (Living Stones)", price: 34.99, image: "/images/lithops.jpg", quantity: 0, category: "Exotic" },
  ],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { category, id } = action.payload;
      const plant = state[category].find((p) => p.id === id);
      if (plant) {
        plant.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const { category, id } = action.payload;
      const plant = state[category].find((p) => p.id === id);
      if (plant && plant.quantity > 0) {
        plant.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart } = plantsSlice.actions;
export default plantsSlice.reducer;
