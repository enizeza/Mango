import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './seedRoutes.js';
import userRouter from './userRoutes.js';
import orderRouter from './orderRoutes.js';
import cors from 'cors';
import Stripe from 'stripe';
import productRouter from './productRoutes.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_ID);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'eur',
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (request, response) => response.status(200).send('hello world'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
