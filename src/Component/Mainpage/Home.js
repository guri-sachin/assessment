import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3305'); // Change the URL based on your server

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const socket = io.connect("http://localhost:3305");
      
socket.emit();
    socket.on("connect", () => {
      console.log('Socket connected:', socket.connected);
    });

    // Fetch initial product data
    fetch('http://localhost:3305/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    // Listen for real-time updates
    socket.on('productUpdate', (updatedProduct) => {
         console.log("Received product update:", updatedProduct);
           setProducts((prevData) => {
            
        console.log("Previous Data:", prevData);
        const updatedDataArray = prevData.map(product => {
          if (product.id == updatedProduct.id) {
           return { ...product, ...updatedProduct };
          } else {
           return product;
          }
        });
        // const updatedDataArray =prevData.map(product =>
        //   product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
        // );
        console.log("Updated Data:", updatedDataArray);
        return updatedDataArray;
    
        });
        

    });
    console.log(products)
    
    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts


  return (
    <div>
     <h2 style={{color:"black",fontFamily:"cursive",margin:"10px"}}><center>All PRODUCTS</center></h2>
     <div style={{ display: "flex", flexWrap: "wrap" ,margin:"30px"}}>
        {
          products.map((product =>
            <div key={product.id} class="product-card" style={{ margin: "10px" }}>
              <div class="badge">{product.name}</div>
              <div class="product-tumb">
                <img     src="/filename_1704099143928.jpg"alt="" />
              </div>
              <div class="product-details">
                <span class="product-catagory">{product.name}</span>
                
                <p>Lorem ipsum dolor sit amet,!</p>
                <div class="product-bottom-details">
                  <div class="product-price">
                    <small>$96.00</small>
                    {product.price}
                  </div>
                  <div class="product-links">
                    <a href="">
                      <i class="fa fa-heart"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-shopping-cart"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
                      
 

    </div>
  );
};

export default Home;
