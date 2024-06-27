import React from 'react';
import { prices } from "./Prices";
import { Typography } from '@mui/material'


export default function PriceList(){
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Cenovnik
      </Typography>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Naziv proizvoda</th>
            <th className="border border-gray-300 px-4 py-2">Cena</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}