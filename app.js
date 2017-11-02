import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to fruit bot');
});

app.post('/webhook', (req, res) => {
  const oldQuantity = req.body.result.contexts[0].parameters.quantity;
  const fruit = req.body.result.contexts[0].parameters.fruit;
  const newQuantity = req.body.result.parameters.quantity;
  const total = oldQuantity + newQuantity;
  const speech = `I've added ${newQuantity} ${fruit} to your cart. You now have ${total} ${fruit}s`;
  const output = {
    speech,
    displayText: speech,
    data: {},
    contextOut: [
      {
        name: 'cart',
        parameters: {
          fruit,
          quantity: total
        }
      }
    ],
    source: 'Fruit-bot'
  };

  res.send(JSON.stringify(output));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App started on ${port}`);
});
