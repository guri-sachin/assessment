const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql');
const cors = require("cors");

const path =require("path");
const app = express();

// const server = http.createServer(app);
app.use(express.json());
// const io = socketIO(server);
app.use(cors());
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


app.use(express.static(path.join(__dirname, 'build')));

//create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kids'
});



//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//route for products 
app.get('/products',(req,res) =>{
    let sql ="SELECT * FROM products";
    let query =conn.query (sql,(err,results)=>{
        if (err) {
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  res.json(results);
                }
    });
});


//route for delete product
app.delete('/productdelete/:id',function(req,res){
  const id=req.params.id;
  console.log(id);
  
  let sql ="DELETE FROM products WHERE id="+id;
  let query =conn.query(sql, (err,results)=>{
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
      });
});



app.put('/productsupdate/:id', async (req, resp) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    let updatedProduct = {
      name,
      price,
      id
    };
 // Update the product with the provided _id
    const updateQuery = 'UPDATE products SET name=?, price=? WHERE id=?';
    const values = [updatedProduct.name, updatedProduct.price, id];

    conn.query(updateQuery, values, (error, result) => {
      if (error) {
        console.error('Error updating product:', error);
        resp.status(500).json({ error: 'An error occurred while updating the product' });
      } else {
        // After updating, emit the updated data to all connected clients
        console.log('Emitting productUpdate:', updatedProduct);
        io.emit('productUpdate', updatedProduct);

        resp.send(result);
      }
    });
  } catch (error) {
    resp.status(500).json({ error: 'An error occurred while updating the product' });
  }
});



// Socket.IO Connection
// io.on('connection', socket => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

});


const PORT = process.env.PORT || 3305;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
