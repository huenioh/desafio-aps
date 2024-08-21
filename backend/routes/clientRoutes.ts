import express, { Router, Request, Response } from 'express';
import clientController from '../controllers/clientController';

const router: Router = express.Router();

router.post('/', clientController.createClient);
router.get('/', clientController.getAllClient);
router.put('/', clientController.updateClient);
router.delete('/', clientController.deleteClient);

export default router;