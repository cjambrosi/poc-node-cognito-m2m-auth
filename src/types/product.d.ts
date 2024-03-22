import { Request } from 'express';
import { HttpResponse } from './http';

export interface IProductDTO {
  id: string;
  name: string;
  type: string;
}

export interface IProductController {
  create(req: Request): Promise<HttpResponse<IProductDTO>>;
  getAll(): Promise<HttpResponse<IProductDTO[]>>;
}

export interface IProductRepository {
  addItem(product: Omit<IProductDTO, 'id'>): IProductDTO;
  getAll(): IProductDTO[];
}
