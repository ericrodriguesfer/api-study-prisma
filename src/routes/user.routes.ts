import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticated from '../middlewares/authenticated';

const users: Router = Router();

users.post('/', new UserController().create);
users.put('/', authenticated, new UserController().update);

export default users;
