import bcrypt from 'bcryptjs';

const data = {
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
};
export default data;
