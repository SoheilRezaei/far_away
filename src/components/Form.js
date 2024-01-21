import React, { useState } from "react";
import { initialItems } from "./App";

export default function Form({ onAddHandle }) {
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
