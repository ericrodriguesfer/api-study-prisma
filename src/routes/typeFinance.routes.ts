import { Router } from 'express';
import TypeFinancesController from '../controllers/TypeFinancesController';
import authenticated from '../middlewares/authenticated';

const typeFinances: Router = Router();

typeFinances.use(authenticated);

typeFinances.get('/', new TypeFinancesController().list);
typeFinances.post('/', new TypeFinancesController().create);
typeFinances.delete('/:id', new TypeFinancesController().delete);

export default typeFinances;
