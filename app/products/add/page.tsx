'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveProduct } from '@/app/lib/redux/features/productSlice'; 
import { useRouter } from 'next/navigation'; 


interface ProductState {
  title: string;
  price: number;
}

const AddProducts: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter(); // Use the correct import
interface IProps {
  title: string;
  price: number;
}

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Use the async thunk directly, it will be handled by useDispatch
  await dispatch(saveProduct({ title, price }));
  
  router.push('/products'); 
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
