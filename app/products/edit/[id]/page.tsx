'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, productSelectors, updateProduct } from '@/app/lib/redux/features/productSlice';
import { useParams,useRouter } from 'next/navigation';

interface ProductState {
  title: string;
  price: number;
}

const AddProducts: React.FC = () => {
  // Use 'useState' to manage state
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const product = useSelector((state) => productSelectors.selectById(state, id));

  useEffect(() => {
    // You may not need this if you only want to fetch a specific product by ID
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for updating the product
    await dispatch(updateProduct({ id, title, price }))
    router.push('/products')
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
