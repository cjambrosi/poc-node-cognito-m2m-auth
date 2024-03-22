import { v4 as uuidv4 } from 'uuid';
import { IProductDTO, IProductRepository } from '../types/product';

export class ProductRepository implements IProductRepository {
  private static userList = new Map<string, IProductDTO>();

  addItem(product: Omit<IProductDTO, 'id'>) {
    const id = uuidv4();
    const currentProduct = { id, ...product };

    ProductRepository.userList.set(id, currentProduct);

    return currentProduct;
  }

  getAll() {
    return [...ProductRepository.userList.values()];
  }
}
