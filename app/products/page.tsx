'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, productSelectors } from '../lib/redux/features/productSlice';
import Link from 'next/link';

interface ProductProps {
  title: string;
  price: string;
}

interface RootState {
  products: ProductProps[];
}

const ShowProducts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Specify the type for the products array
  const products = useSelector((state: RootState) => productSelectors.selectAll(state));

  console.log(products);

  return (
    <div className="box mt-4">
      <table className="table is-stripped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
               <Link className="is-info button" href={`/products/edit/${product.id}`}>Edit</Link>
                <button onClick={()=> {dispatch(deleteProduct(product.id))}} className="is-danger button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProducts;
