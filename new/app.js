import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequestHandler } from '@remix-run/node';

import * as build from './build/server/index.js';
import contactRouter from './api/routes/contact.js';
import visitRouter from './api/routes/visit.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build/client')));

app.use('/api/contact', contactRouter);
app.use('/api/visit', visitRouter);

app.all('*', createRequestHandler({build}))

export default app;
