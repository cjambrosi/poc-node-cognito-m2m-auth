import express from 'express';
import { ProductRepository } from '../repository/ProductRepository';
import { ProductController } from '../controller/ProductController';
import { authVerify } from '../middlewares/AuthJWT';

const router = express.Router();

router.get('/products', authVerify, async (req, res) => {
  const productRepository = new ProductRepository();
  const productController = new ProductController(productRepository);

  const { body, statusCode } = await productController.getAll();

  res.send(body).status(statusCode);
});

router.post('/products', authVerify, async (req, res) => {
  const productRepository = new ProductRepository();
  const productController = new ProductController(productRepository);

  const { body, statusCode } = await productController.create(req);

  res.send(body).status(statusCode);
});

export { router as ProductRouter };
