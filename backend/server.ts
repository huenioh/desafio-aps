import express, { Express } from 'express';
import clientRoutes from './routes/clientRoutes';

const app: Express = express();
app.use(express.json());

app.use('/clientes', clientRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});