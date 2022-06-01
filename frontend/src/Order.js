import React from 'react';

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order.createdAt.substring(0, 10)}</p>
      <p className="order__id">
        <small>{order._id}</small>
      </p>
      {order.orderItems.map((item) => (
        <div className="checkoutProduct">
          <img
            className="checkoutProduct__image"
            src={item.image}
            alt={item.name}
          />

          <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{item.name}</p>
            <p className="checkoutProduct__quantity">
              Quantity: {item.quantity}
            </p>
            <p className="checkoutProduct__price">
              <strong>Price: </strong>
              <small>€</small>
              <strong>{item.price}</strong>
            </p>
          </div>
        </div>
      ))}
      <h3 className="order__total">
        Order Total: {order.itemsPrice.toFixed(2)}
      </h3>
    </div>
  );
}

export default Order;
