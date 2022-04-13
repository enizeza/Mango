import express from 'express';

const app = express();

app.get('/', (request, response) => response.status(200).send('hello world'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
