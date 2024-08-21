import express, { Router, Request, Response } from 'express';
import clientController from '../controllers/clientController';

const router: Router = express.Router();

router.post('/', clientController.createClient);
router.get('/', clientController.getAllClient);
router.get('/:cnpj', clientController.getClientByCnpj);
router.put('/:id', clientController.updateClient);
router.delete('/:cnpj', clientController.deleteClient);

export default router;