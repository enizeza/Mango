import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Product(props) {
  const { product } = props;
  return (
    <div>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        ></img>
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <p>€{product.price}</p>
        <Button variant="contained">Add to cart</Button>
      </div>
    </div>
  );
}

export default Product;
