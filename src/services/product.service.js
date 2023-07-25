import httpStatus from 'http-status';
import ApiError from '../utils/error/ApiError.js';

class ProductService {
  constructor(product) {
    this.product = product;

    this.createProduct = this.createProduct.bind(this);
    this.queryProducts = this.queryProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProductById = this.updateProductById.bind(this);
    this.deleteProductById = this.deleteProductById.bind(this);
  }

  async createProduct(productBody) {
    return this.product.create(productBody);
  }

  async queryProducts(filter, options) {
    const customLabels = {
      docs: 'items',
      totalDocs: 'totalItems',
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: false,
      nextPage: false,
    };

    const result = await this.product.paginate(filter, { ...options, customLabels });
    delete result.false;

    return result;
  }

  async getProductById(productId) {
    const product = await this.product.findById(productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'The requested product was not found');
    }

    return product;
  }

  async updateProductById(productId, productBody) {
    const product = await this.getProductById(productId);

    Object.assign(product, productBody);
    await product.save();

    return product;
  }

  async deleteProductById(productId) {
    const product = await this.getProductById(productId);

    await this.product.deleteOne({ _id: productId });

    return product;
  }
}

export default ProductService;
