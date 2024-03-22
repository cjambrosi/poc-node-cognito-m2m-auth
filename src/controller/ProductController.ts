import { Request } from 'express';
import { IProductController, IProductRepository } from '../types/product';

export class ProductController implements IProductController {
  constructor(private readonly productRepository: IProductRepository) {}

  async create(req: Request) {
    try {
      if (!req.body) {
        return {
          statusCode: 400,
          body: 'Please specify a body'
        };
      }

      const response = await this.productRepository.addItem(req.body);

      return {
        statusCode: 201,
        body: response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      };
    }
  }

  async getAll() {
    try {
      const response = await this.productRepository.getAll();

      return {
        statusCode: 200,
        body: response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      };
    }
  }
}
