import bcrypt from 'bcryptjs';

/*const data = {
  users: [
    {
      name: 'Eni',
      email: 'enize2000@gmail.com',
      password: bcrypt.hashSync('root'),
      isAdmin: true,
    },
    {
      name: 'Fil',
      email: 'fil@gmail.com',
      password: bcrypt.hashSync('root'),
      isAdmin: false,
    },
  ],
};*/

const data = {
  products: [
    {
      name: 'Camicia floreale',
      slug: 'camicia-floreale',
      category: 'Shirt',
      image: '/images/p1.jpg',
      price: 120,
      rating: 4.5,
      description: 'high quality product',
      countInStock: 0,
    },
    {
      name: 'Pantalone slim',
      slug: 'pantalone-slim',
      category: 'Pants',
      image: '/images/p2.jpg',
      price: 80,
      rating: 4,
      description: 'high quality product',
      countInStock: 200,
    },
    {
      name: 'T-shirt essential',
      slug: 't-shirt-essential',
      category: 'T-shirt',
      image: '/images/p3.jpg',
      price: 10,
      rating: 5,
      description: 'high quality product',
      countInStock: 400,
    },
    {
      name: 'Camicia',
      slug: 'camicia-semplice',
      category: 'Shirt',
      image: '/images/p4.jpg',
      price: 75,
      rating: 4,
      description: 'high quality product',
      countInStock: 500,
    },
  ],
};
export default data;
