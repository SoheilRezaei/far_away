import React from "react";
import Travel from "./Travel";

export default function Tupack({ travel, onDeleteHandle, onCheckHandle }) {
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
