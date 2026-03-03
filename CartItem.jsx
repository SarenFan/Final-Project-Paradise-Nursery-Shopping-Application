import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.cost * item.quantity;
    });
    return totalAmount;
  };

  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1 and user clicks '-', remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-list">
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '5px', marginRight: '20px' }} />
            
            <div className="cart-item-details" style={{ flexGrow: 1 }}>
              <h3 className="cart-item-name">{item.name}</h3>
              <div className="cart-item-cost">Unit Price: ${item.cost}</div>
              <div className="cart-item-total" style={{ fontWeight: 'bold', marginTop: '5px' }}>Subtotal: ${calculateTotalCost(item)}</div>
              
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                <span className="cart-item-quantity-value" style={{ margin: '0 15px', fontSize: '1.2rem' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
              </div>
              
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginTop: '15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={(e) => handleContinueShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
