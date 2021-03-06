import { Button } from '@mui/material';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from './Store';
import './ProductScreen.css';

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

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
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

  let found = products.find((product) => product.slug === slug);

  const addToCart = () => {
    const existItem = cart.cartItems.find((x) => x._id === found._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...found,
        quantity,
      },
    });
  };
  return (
    <div className="product-screen">
      {loading ? (
        <div>Caricamento</div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
export default ProductScreen;
