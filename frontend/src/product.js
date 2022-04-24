import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Store } from './Store';

function Product(props) {
  const navigate = useNavigate();
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCart = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity,
      },
    });
  };
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
        <Button onClick={addToCart} variant="contained">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default Product;
