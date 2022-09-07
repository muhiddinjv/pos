import express from 'express';
import { addBillsController } from '../controllers/billsController.js';

const billsRouter = express.Router();

billsRouter.post("/addbills", addBillsController);

export default billsRouter;