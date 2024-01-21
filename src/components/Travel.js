import React, { useState } from "react";
import Item from "./Item";

export default function Travel({ travel, onDeleteItem, onCheckHandle }) {
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
