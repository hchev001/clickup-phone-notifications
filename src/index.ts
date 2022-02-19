import express from 'express';

const app = express();
const port = 5002;

app.get('/', (req, res) => {
  res.status(200).send();
});

app.listen(port, () => console.log('Listening on port 5002'));
