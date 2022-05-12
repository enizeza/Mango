import { Button } from '@mui/material';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import data from './data';
import { Store } from './Store';
import './ProductScreen.css';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  let found = data.products.find((product) => product.slug === slug);

  const addToCart = () => {
    const existItem = cart.cartItems.find((x) => x._id === found._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...found,
        quantity,
      },
    });
  };
  return (
    <div className="product-screen">
      <div className="product-image">
        <img src={found.image} alt={found.name}></img>
      </div>
      <div className="product-detail">
        <h1 className="product-title">{found.name}</h1>
        <p>€{found.price}</p>
        <p>Description:</p>
        <p className="product-description">{found.description}</p>
        {found.countInStock === 0 ? (
          <Button variant="contained" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={addToCart} variant="contained">
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
export default ProductScreen;
