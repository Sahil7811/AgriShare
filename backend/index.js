const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 if specified in .env

// Load routers
const userRouter = require("./routes/user.route");
const rentedProductsRoute = require("./routes/rentedProducts");
const productRouter = require("./routes/product.route");
const paymentRoutes = require("./routes/paymentRoutes");
const cropRoutes = require("./routes/cropRoutes");

// Enable CORS for requests from frontend (React app)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use("/api", userRouter);
// app.use('/api', weatherRouter); // Mount the weather router
app.use("/api", productRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/rented-products", rentedProductsRoute);
app.use("/api/crops", cropRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose is connected"))
  .catch((err) => console.log("Error in connecting Mongoose:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
