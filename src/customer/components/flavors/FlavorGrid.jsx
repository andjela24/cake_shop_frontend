import React from 'react';
import { cakeFlavors } from "./Flavors";

export default function FlavorGrid(){
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cakeFlavors.map((flavor, index) => (
          <div className="bg-white rounded-lg overflow-hidden shadow-md" key={index}>
            <img src={flavor.image} alt={flavor.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{flavor.name}</h3>
              <p className="text-gray-600 mt-2">{flavor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
