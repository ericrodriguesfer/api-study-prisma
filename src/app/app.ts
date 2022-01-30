import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import router from '../routes/index';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(router);

export default app;
