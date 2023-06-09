import express from 'express';
import routes from '../routes/index';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
const app = express();

// parse body params and attach them to req.body
app.use(json());
app.use(urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

export default app;
