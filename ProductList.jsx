import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  
  // Retrieve cart items from Redux to calculate total quantity and disable buttons
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Array of 18 plants, grouped into 3 categories
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: 15 },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12 },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", cost: 18 },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", cost: 20 },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: 17 },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", cost: 14 }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134bcba", cost: 20 },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/mint-1117565_1280.jpg", cost: 10 },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: 15 },
        { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", cost: 10 },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", cost: 12 },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2020/06/07/20/46/thyme-5272186_1280.jpg", cost: 11 }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d85e78", cost: 16 },
        { name: "Echeveria", image: "https://images.unsplash.com/photo-1613143615201-381c0022d1b7", cost: 14 },
        { name: "Zebra Haworthia", image: "https://images.unsplash.com/photo-1601980845348-1834cb99ce5b", cost: 12 },
        { name: "String of Pearls", image: "https://images.unsplash.com/photo-1558223363-d14493399066", cost: 22 },
        { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d85e78", cost: 18 },
        { name: "Hens and Chicks", image: "https://images.unsplash.com/photo-1606351833785-523c13c7db17", cost: 15 }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list-container">
      {/* Navbar Section */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div>
          <h2>Paradise Nursery</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#plants" style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
          <a href="#cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            🛒 Cart ({totalCartItems})
          </a>
        </div>
      </nav>

      {/* Product Grid Section */}
      <div id="plants" style={{ padding: '20px' }}>
        {plantsArray.map((categoryObj, index) => (
          <div key={index}>
            <h3 style={{ textAlign: 'center', margin: '30px 0' }}>{categoryObj.category}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {categoryObj.plants.map((plant, pIndex) => {
                // Check if the plant is currently in the Redux store's cart
                const isAdded = cartItems.some(item => item.name === plant.name);
                
                return (
                  <div key={pIndex} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h4>{plant.name}</h4>
                    <p>${plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={isAdded}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: isAdded ? '#ccc' : '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: isAdded ? 'not-allowed' : 'pointer',
                        marginTop: '10px'
                      }}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
