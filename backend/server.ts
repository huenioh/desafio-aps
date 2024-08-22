import express, { Express } from 'express';
import clientRoutes from './routes/clientRoutes';
import cors from 'cors';

const app: Express = express();
app.use(express.json());

app.use('/clientes', clientRoutes);
app.use(cors())

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});