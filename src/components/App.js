import React, { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import Tupack from "./Tupack";

export const initialItems = [
  {
    id: 1,
    title: "Santa Fe",
    date: "",
    items: [
      { id: 1, description: "Passports", quantity: 2, packed: false },
      { id: 2, description: "Socks", quantity: 12, packed: true },
    ],
  },
  {
    id: 2,
    title: "Alabama",
    date: "",
    items: [
      { id: 1, description: "Suit", quantity: 2, packed: false },
      { id: 2, description: "Jacket", quantity: 2, packed: true },
      { id: 3, description: "Socks", quantity: 12, packed: false },
      { id: 4, description: "Charger", quantity: 2, packed: false },
      { id: 5, description: "Lighter", quantity: 1, packed: true },
      { id: 6, description: "Razer", quantity: 1, packed: false },
      { id: 7, description: "Laptop", quantity: 1, packed: false },
    ],
  },
  {
    id: 3,
    title: "Georgia",
    date: "",
    items: [
      { id: 1, description: "Suit", quantity: 2, packed: false },
      { id: 2, description: "Jacket", quantity: 2, packed: false },
      { id: 3, description: "Gifts", quantity: 2, packed: true },
      { id: 4, description: "Trousers", quantity: 2, packed: false },
      { id: 5, description: "Shirts", quantity: 2, packed: false },
    ],
  },
];

export default function App() {
  const [travels, setTravels] = useState(initialItems);

  function handleAddButton(updatedTravels) {
    setTravels(updatedTravels);
    console.log(travels);
  }

  function handleDeleteItem(updatedTravels) {
    setTravels(updatedTravels);
    console.log(travels);
  }

  function handleToggleItem(updatedTravels) {
    setTravels(updatedTravels);
    console.log(travels);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddHandle={handleAddButton} />
      <Tupack
        travel={travels}
        onDeleteHandle={handleDeleteItem}
        onCheckHandle={handleToggleItem}
      />
      <Footer travel={travels} />
    </div>
  );
}

function Footer({ travel }) {
  console.log(travel);

  // if (!travel.items?.length)
  //   return (
  //     <p className="footer">
  //       <em>Start adding items to packing list!</em>
  //     </p>
  //   );

  // const numItems = travel.items.length;
  // const numPacked = travel.items.filter((item) => item.packed).length;
  // const precentage = Math.round((numPacked / numItems) * 100);
  // return (
  //   <footer className="stats">
  //     <em>
  //       {precentage === 100
  //         ? "You got everything packed! 🎉"
  //         : `You have {numItems} items listed for packing, and so far you've packed{" "}
  //       {numPacked} ({precentage}%)`}
  //     </em>
  //   </footer>
  // );
}
