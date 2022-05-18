import express from 'express';
import data from './data.js';
import Product from './productModel.js';
import User from './userModel.js';

const seedRouter = express.Router();

/*seedRouter.get('/', async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});*/

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRouter;
