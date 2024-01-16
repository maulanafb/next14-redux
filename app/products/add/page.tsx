'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


// Define a TypeScript interface for the state
interface ProductState {
  title: string;
  price: number;
}

const AddProducts: React.FC = () => {
  // Use 'useState' to manage state
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div>
      <form className="box mt-5" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">
            Title
          </label>
          <div className="control">
            <input
              id="title"
              type="text"
              className="input"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="price" className="label">
            Price
          </label>
          <div className="control">
            <input
              id="price"
              type="number"
              className="input"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-success">
            Tambah Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
