import { Router } from 'express';
import users from './user.routes';
import session from './sessios.routes';
import typeFinances from './typeFinance.routes';
import finances from './finance.routes';

const router: Router = Router();

router.use('/users', users);
router.use('/session', session);
router.use('/typefinances', typeFinances);
router.use('/finances', finances);

export default router;
