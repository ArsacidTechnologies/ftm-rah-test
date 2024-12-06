require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');

const jwt = require('jsonwebtoken');

const path = require('path');

const router = express.Router();

const app = express();


app.use(express.json());
app.use(cors());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  console.log(req.path);
  if (req.path.includes('user') && !req.headers['authtoken']) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
});




const Product = mongoose.model("Product", {       // &$ toghether
  barcode: { type: Number},
  name: { type: String, required: true },

  category: { type: String},
  new_price: { type: Number },
  old_price: { type: Number },
  image: { type: String },
});

const User = mongoose.model("Users", {
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});

mongoose.connect("mongodb+srv://fatemerahmanabadi1:4zT3BfrAC1j8Ae2e@cluster1.2ixxr.mongodb.net/")

const products = [
  { name: "Hat A", category: "bestsellers", new_price: 20, old_price: 25 },
  { name: "Hat B", category: "bestsellers", new_price: 18, old_price: 22 },
];


app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});


app.get('/api/bestsellers', async (req, res) => {
  const bestsellers = await Product.find({ category: 'sda' }).limit(5);
  res.json(bestsellers);
});


// Endpoint to get dashboard stats
app.get('/api/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments(); //const totalOrders = await Order.countDocuments(); // Ensure Order model exists or remove//const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalProducts,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// Add this to your existing Express backend










// Endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// POST route to create a new product
/*app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Error saving product' });
  }
});*/

// upload image
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { barcode, name, category, new_price, old_price } = req.body;
    const imagePath = req.file ? req.file.path : null;  // Ensure the file is uploaded correctly

    if (!name || !category || !new_price || !old_price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      barcode,
      name,
      category,
      new_price,
      old_price,
      image: imagePath,  // Save the image path in the product
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error.message);  // Make sure error is logged
    res.status(500).json({ message: 'Error saving product' });
  }
});
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
// Endpoint to delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    //await Product.findOneAndDelete({ OuID: parseInt(req.params.id) });  //await Product.findByIdAndDelete(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});
// backend/index.js

// Get a product by ID
app.get('/api/products/:barcode', async (req, res) => {
  const { barcode } = req.params;  // Extract the barcode from the request parameters

  try {
    const product = await Product.findOne({ barcode: barcode });  // Find product by barcode
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/




app.get('/user/products', async (req, res) => {
  try {
    const token = req.headers['authToken'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, 'super_secret_key');
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ products: user.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
/*app.get('/user/products', async (req, res) => {
  try {
    const token = req.headers['authToken'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, 'super_secret_key');
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const products = await Product.find({ id: { $in: Object.keys(user.cartData) } });
    res.status(200).json({ products: user.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/

app.post('/user/save-product', async (req, res) => {
  console.log(5);
  const { barcode, quantity } = req.body;
  //console.log(barcode, quantity);
  console.log(req.params.id);
  const token = req.headers['authtoken'];
  console.log(token);
  try {
    const decoded = jwt.verify(token, 'super_secret_key');
    const userId = decoded.userId;

    console.log(userId);



    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the user's cart
    if (user.cartData[barcode]) {
      user.cartData[barcode] += quantity; // Increment the quantity
    } else {
      user.cartData[barcode] = quantity; // Add the product with the specified quantity
    }
    console.log(user.cartData);

    // Save the updated user document
    //await user.save();
    await User.findOneAndUpdate({_id:userId},{cartData:user.cartData});

    // Return a success response to the client
    return res.status(200).json({ message: "Product added to cart successfully", cartData: user.cartData });



  } catch (error) {
    //console.error("Error decoding token or saving product:", error);
    //return res.status(500).json({ message: "Internal server error" });
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});





app.post('/signup', async (req, res) => {
  console.log("User Registration");
  let isSuccessful = false;

  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ isSuccessful, message: "User already registered with this email" });
    }

    // Set up a default empty cart
    const initialCart = Array(300).fill(0).reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {});

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      cartData: initialCart,
    });

    // Save the user to the database
    await newUser.save();

    // Generate token
    const payload = { userId: newUser._id };
    const authToken = jwt.sign(payload, 'super_secret_key');

    isSuccessful = true;
    res.status(201).json({ isSuccessful, authToken }); // Changed 'token' to 'authToken'
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccessful, message: "Internal server error", error: error.message }); // Added error message
  }
});

// Login route
// Login route
app.post('/login', async (req, res) => {
  console.log("User Login");
  let isSuccessful = false;

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ isSuccessful, message: "User not found. Please sign up." });
    }

    // Verify password (use bcrypt for hashed password in production)
    if (user.password !== password) { // Replace with bcrypt comparison in production
      return res.status(401).json({ isSuccessful, message: "Incorrect password. Please try again." });
    }

    // Generate token
    const payload = { userId: user._id };
    const authToken = jwt.sign(payload, 'super_secret_key');

    isSuccessful = true;
    return res.status(200).json({ isSuccessful, data: { authToken } });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccessful, message: "Internal server error" });
  }
});
/*app.post('/login', async (req, res) => {
  console.log("User Login");
  let isSuccessful = false;

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ isSuccessful, message: "User not found" });
    }

    // Verify password (use bcrypt for hashed password in production)
    if (user.password !== password) { // Replace with bcrypt comparison in production
      return res.status(401).json({ isSuccessful, message: "Incorrect password" });
    }

    // Generate token
    const payload = { userId: user._id };
    const authToken = jwt.sign(payload, 'super_secret_key');

    //await User.findOneAndUpdate({ email }, { token: authToken }) //

    isSuccessful = true;
    res.status(200).json({ isSuccessful, data: { authToken } }); //
    //    res.status(200).json({ isSuccessful, data: { authToken, user: userFromDB } }); //
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccessful, message: "Internal server error" });
  }
});*/
app.get('/api/women-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'w' }); // Assuming 'w' stands for women hats
    res.json(hats);
  } catch (error) {
    console.error('Error fetching women hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/men-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'm' }); // Assuming 'm' stands for men hats
    res.json(hats);
  } catch (error) {
    console.error('Error fetching men hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/children-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'c' }); // Assuming 'c' stands for children hats
    res.json(hats);
  } catch (error) {
    console.error('Error fetching children hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Endpoint to update the user's cart
app.patch('/cart/update', async (req, res) => {
  console.log("Updating Cart");

  try {
    const { userId, updatedCart } = req.body;

    // Find user by ID and update the cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartData = { ...user.cartData, ...updatedCart };
    await user.save();

    res.status(200).json({ message: "Cart successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// Endpoint to handle purchases
app.post('/purchase', async (req, res) => {
  console.log("Processing Purchase");

  try {
    const { userId } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Process the purchase (clear cart as an example)
    user.cartData = {}; // Reset the cart after purchase
    await user.save();

    res.status(200).json({ message: "Purchase completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process purchase" });
  }
});















//

app.get('/api/user', (req, res) => {

  console.log(req.header)

  User
  res.json({ message: 'user' });
})





const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
