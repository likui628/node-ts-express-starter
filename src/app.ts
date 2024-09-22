import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes/v1';
import {errorHandler, notFound} from "./middlewares";

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
