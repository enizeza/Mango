import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import './Home.css';
import Product from './product';

import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Mango</title>
      </Helmet>
      <div className="products">
        {loading ? (
          <div>Caricamento</div>
        ) : error ? (
          <div variant="danger">{error}</div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.slug} className="product">
                <Product product={product}></Product>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
