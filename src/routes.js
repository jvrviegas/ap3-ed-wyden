/* eslint-disable prettier/prettier */
import { Router } from 'express';

import ProductController from './app/controllers/ProductController';
import QueueController from './app/controllers/QueueController';

const routes = new Router();

// Define routes
routes.get('/', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Product routes
routes.get('/products/list', ProductController.index);
routes.post('/products/create', ProductController.store);
routes.delete('/products/delete/:id', ProductController.delete);

// Queue routes
routes.get('/queue/list', QueueController.index);
routes.post('/queue/add/:id', QueueController.store);
routes.delete('/queue/delete/:id', QueueController.delete);

export default routes;
