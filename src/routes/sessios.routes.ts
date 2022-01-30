import { Router } from 'express';
import SessionController from '../controllers/SessionControllers';

const session: Router = Router();

session.post('/', new SessionController().signin);

export default session;
