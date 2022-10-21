import express from 'express';
import { addBillsController,getBillsController } from '../controllers/billsController.js';

const billsRouter = express.Router();

billsRouter.get("/getbills", getBillsController);
billsRouter.post("/addbills", addBillsController);

export default billsRouter;