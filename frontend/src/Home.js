import React from 'react';
import data from './data';
import './Home.css';
import Product from './product';

function Home() {
  return (
    <div>
      <title>Mango</title>
      <div className="products">
        {data.products.map((product) => (
          <div key={product.slug} className="product">
            <Product product={product}></Product>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
