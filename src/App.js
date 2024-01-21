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
    const updatedItems = [...selectedTravel.items, newItem];

    const updatedTravel = {
      ...selectedTravel,
      items: updatedItems,
    };

    initialItems.forEach((travel, index) => {
      if (travel.id === updatedTravel.id) {
        initialItems[index] = updatedTravel;
      }
    });

    onAddHandle(initialItems);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>👩🏻‍💻 Honey! Have we packed everything?...</h3>
      <select
        value={selectedTravel.id}
        onChange={(e) =>
          setSelectedTravel(
            initialItems.find((item) => item.id === parseInt(e.target.value))
          )
        }
      >
        {initialItems.map((travel) => (
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

function Tupack({ travel, onDeleteHandle, onCheckHandle }) {
  function handleDeleteItem(travel_id, item_id) {
    console.log(travel_id, item_id);
    let updatedTravels = travel.map((trip) => {
      if (trip.id === travel_id) {
        return {
          ...trip,
          items: trip.items.filter((item) => item.id !== item_id),
        };
      }
      return trip;
    });
    console.log(updatedTravels);
    onDeleteHandle(updatedTravels);
  }

  function handleCheckItem(travel_id, item_id) {
    console.log(travel_id, item_id);
    const updatedTravels = travel.map((trip) => {
      if (trip.id === travel_id) {
        return {
          ...trip,
          items: trip.items.map((item) =>
            item.id === item_id ? { ...item, packed: !item.packed } : item
          ),
        };
      }
      return trip;
    });
    console.log(updatedTravels);
    onCheckHandle(updatedTravels);
  }

  return (
    <div className="list">
      <h5> My travel packing list: 📋</h5>
      {travel.map((travel) => (
        <Travel
          travel={travel}
          onDeleteItem={handleDeleteItem}
          onCheckHandle={handleCheckItem}
          key={travel.id}
        />
      ))}
    </div>
  );
}

function Travel({ travel, onDeleteItem, onCheckHandle }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  let sortedTravel = travel;
  console.log(sortedTravel);

  if (sortBy === "input") sortedItems = travel.items;
  if (sortBy === "description")
    sortedItems = travel.items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = travel.items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  sortedTravel.items = sortedItems;

  function parseDeleteItem(item_id) {
    console.log(item_id);
    onDeleteItem(travel.id, item_id);
  }
  function parseCheckItem(item_id) {
    console.log(item_id);
    onCheckHandle(travel.id, item_id);
  }
  return (
    <div>
      <h4>🏝️{sortedTravel.title}</h4>
      <ul key={sortedTravel.id}>
        {sortedTravel.items.map((item) => (
          <Item
            item={item}
            onDeleteItem={parseDeleteItem}
            onCheckHandle={parseCheckItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheckHandle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onCheckHandle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
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
