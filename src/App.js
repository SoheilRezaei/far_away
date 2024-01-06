import React, { useState } from "react";

const initialItems = [
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
  return (
    <div className="app">
      <Header />
      <Form onAddHandle={handleAddButton} />
      <Tupack travel={travels} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>💼 Far Away 🏝️</h1>
    </div>
  );
}

function Form({ onAddHandle }) {
  const [selectedTravel, setSelectedTravel] = useState(initialItems[0]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity: parseInt(quantity),
      packed: false,
    };
    console.log(selectedTravel);
    const updatedItems = [...selectedTravel.items, newItem];

    console.log(updatedItems);

    const updatedTravel = {
      ...selectedTravel,
      items: updatedItems,
    };

    console.log(updatedTravel);
    console.log(selectedTravel.id);

    initialItems.forEach(
      (travel, index) => {
        if (travel.id === updatedTravel.id) {
          initialItems[index] = updatedTravel;
        }
      }
      // index + 1 === selectedTravel.id ? updatedTravel : travel
    );

    onAddHandle(initialItems);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>👩🏻‍💻 Honey! Have we packed everything?...</h3>
      <select
        value={selectedTravel.id} // Update the value to selectedTravel.id
        onChange={
          (e) =>
            setSelectedTravel(
              initialItems.find((item) => item.id === parseInt(e.target.value))
            ) // Update the onChange handler to find the selected travel by id
        }
      >
        {initialItems.map((travel, index) => (
          <option value={travel.id} key={travel.id}>
            {" "}
            {travel.title}
          </option>
        ))}
      </select>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
function Tupack({ travel }) {
  return (
    <div className="list">
      <h5> My travel packing list: 📋</h5>
      {travel.map((travel) => (
        <Travel travel={travel} key={travel.id} />
      ))}
    </div>
  );
}

function Travel({ travel }) {
  return (
    <div>
      <h4>🏝️{travel.title}</h4>
      <ul key={travel.id}>
        {travel.items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Footer() {
  return (
    <footer className="stats">
      <em>You have X items listed for packing, and so far you've packed %X</em>
    </footer>
  );
}
