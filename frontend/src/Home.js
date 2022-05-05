import React from 'react';
import { Helmet } from 'react-helmet-async';
import data from './data';
import './Home.css';
import Product from './product';
import FlipMove from 'react-flip-move';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Mango</title>
      </Helmet>
      <FlipMove className="products">
        {data.products.map((product) => (
          <div key={product.slug} className="product">
            <Product product={product}></Product>
          </div>
        ))}
      </FlipMove>
    </div>
  );
}

export default Home;
