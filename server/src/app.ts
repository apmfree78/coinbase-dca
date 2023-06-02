import express, {Request, Response} from 'express';

const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/purchase', (req: Request, res: Response) => {
  console.log('purchase BTC');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
