import { Router } from 'express';
import FinanceController from '../controllers/FinanceController';
import authenticated from '../middlewares/authenticated';

const finances: Router = Router();

finances.use(authenticated);

finances.get('/', new FinanceController().list);
finances.get('/in', new FinanceController().listIn);
finances.get('/out', new FinanceController().listOut);
finances.get('/balance', new FinanceController().balance);
finances.post('/', new FinanceController().create);
finances.put('/:id', new FinanceController().update);
finances.delete('/:id', new FinanceController().delete);

export default finances;
